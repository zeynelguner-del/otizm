import 'dart:io' show Platform;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/config.dart';
import '../../state/api_client_provider.dart';
import '../../state/session_controller.dart';

class SplashPage extends ConsumerStatefulWidget {
  const SplashPage({super.key});

  @override
  ConsumerState<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends ConsumerState<SplashPage> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  
  late final Animation<double> _bannerOpacity;
  late final Animation<Offset> _bannerSlide;

  late final Animation<double> _iconScale;
  late final Animation<double> _iconOpacity;
  
  late final Animation<double> _textOpacity;
  late final Animation<Offset> _textSlide;

  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    );

    // 1. Top Banner Animates First
    _bannerOpacity = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.45, curve: Curves.easeIn),
    );
    _bannerSlide = Tween<Offset>(
      begin: const Offset(0.0, -0.2), // Slides down from the top
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.5, curve: Curves.easeOutCubic),
    ));

    // 2. Middle Child Icon Animates Second
    _iconScale = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.25, 0.75, curve: Curves.easeOutBack),
    );
    _iconOpacity = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.25, 0.65, curve: Curves.easeIn),
    );

    // 3. Bottom Text Animates Last
    _textOpacity = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.5, 0.9, curve: Curves.easeIn),
    );
    _textSlide = Tween<Offset>(
      begin: const Offset(0.0, 0.25), // Slides up from the bottom
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.5, 0.9, curve: Curves.easeOutCubic),
    ));

    _controller.forward().then((_) => _navigateToNextScreen());
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _navigateToNextScreen() async {
    if (!mounted) return;

    try {
      final api = await ref.read(apiClientProvider.future);
      final versionData = await api.getAppVersion();
      
      final minAndroid = versionData['minAndroidVersion'] as String? ?? '1.0.0';
      final minIos = versionData['minIosVersion'] as String? ?? '1.0.0';
      final androidUrl = versionData['androidUrl'] as String? ?? '';
      final iosUrl = versionData['iosUrl'] as String? ?? '';

      final isAndroid = Platform.isAndroid;
      final minVersion = isAndroid ? minAndroid : minIos;
      final storeUrl = isAndroid ? androidUrl : iosUrl;

      if (_isVersionOlder(appVersion, minVersion)) {
        if (!mounted) return;
        _showUpdateDialog(storeUrl);
        return; // Stop execution to force the update
      }
    } catch (e) {
      debugPrint('Version check failed: $e');
    }

    if (!mounted) return;
    final isLoggedIn = ref.read(sessionControllerProvider).valueOrNull?.email != null;
    if (isLoggedIn) {
      context.go('/home');
    } else {
      context.go('/auth');
    }
  }

  bool _isVersionOlder(String current, String minimum) {
    try {
      final currentClean = current.split('+').first.trim();
      final minClean = minimum.split('+').first.trim();
      List<int> currentParts = currentClean.split('.').map(int.parse).toList();
      List<int> minParts = minClean.split('.').map(int.parse).toList();
      
      final maxLen = currentParts.length > minParts.length ? currentParts.length : minParts.length;
      for (int i = 0; i < maxLen; i++) {
        int currentPart = i < currentParts.length ? currentParts[i] : 0;
        int minPart = i < minParts.length ? minParts[i] : 0;
        if (currentPart < minPart) return true;
        if (currentPart > minPart) return false;
      }
    } catch (_) {}
    return false;
  }

  void _showUpdateDialog(String storeUrl) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return PopScope(
          canPop: false,
          child: AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            title: const Row(
              children: [
                Icon(Icons.system_update_alt, color: Color(0xFF10B981)),
                SizedBox(width: 10),
                Text('Güncelleme Gerekli', style: TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
            content: const Text(
              'Uygulamayı kullanmaya devam edebilmeniz için yeni bir sürüm yayınlandı. Lütfen devam etmeden önce güncelleyin.',
              style: TextStyle(height: 1.4),
            ),
            actionsPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            actions: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  minimumSize: const Size(double.infinity, 48),
                ),
                onPressed: () async {
                  final uri = Uri.parse(storeUrl);
                  if (await canLaunchUrl(uri)) {
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  }
                },
                child: const Text('Güncelle', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween, // Perfect vertical distribution to fill screen
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // 1. Top Banner (Formerly at the bottom)
              FadeTransition(
                opacity: _bannerOpacity,
                child: SlideTransition(
                  position: _bannerSlide,
                  child: Container(
                    width: double.infinity,
                    height: 180, // Fills space gracefully
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF7C3AED).withOpacity(0.08),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: Image.asset(
                        'assets/splash_banner.png',
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              ),
              
              // 2. Middle Icon (Child Icon)
              FadeTransition(
                opacity: _iconOpacity,
                child: ScaleTransition(
                  scale: _iconScale,
                  child: Container(
                    width: 156, // Bold presence
                    height: 156,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(36),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF7C3AED).withOpacity(0.12),
                          blurRadius: 24,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(36),
                      child: Image.asset(
                        'assets/splash_logo.png',
                        fit: BoxFit.contain,
                      ),
                    ),
                  ),
                ),
              ),
              
              // 3. Bottom Text Logo (Larger size & premium feel)
              FadeTransition(
                opacity: _textOpacity,
                child: SlideTransition(
                  position: _textSlide,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 20),
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Image.asset(
                            'assets/splash_text.png',
                            height: 92, // Significantly enlarged to make it extremely prominent
                            fit: BoxFit.contain,
                          ),
                          const SizedBox(height: 10),
                          Text(
                            'ÖZEL EĞİTİM PORTALI',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 4.5,
                              color: Colors.grey.shade400,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
