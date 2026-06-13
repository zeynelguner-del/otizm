import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

import '../../core/ads/ad_helper.dart';
import '../../core/utils/photo_data_url.dart';
import '../../state/api_client_provider.dart';
import '../../state/session_controller.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  BannerAd? _bannerAd;
  bool _isAdLoaded = false;
  InterstitialAd? _interstitialAd;
  int _clickCount = 0;

  @override
  void initState() {
    super.initState();
    _loadBannerAd();
    _loadInterstitialAd();
  }

  void _loadBannerAd() {
    _bannerAd = BannerAd(
      adUnitId: AdHelper.bannerAdUnitId,
      request: const AdRequest(),
      size: AdSize.banner,
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          setState(() {
            _isAdLoaded = true;
          });
        },
        onAdFailedToLoad: (ad, err) {
          debugPrint('Failed to load a banner ad: ${err.message}');
          ad.dispose();
        },
      ),
    )..load();
  }

  void _loadInterstitialAd() {
    InterstitialAd.load(
      adUnitId: AdHelper.interstitialAdUnitId,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          _interstitialAd = ad;
        },
        onAdFailedToLoad: (err) {
          debugPrint('Failed to load an interstitial ad: ${err.message}');
          _interstitialAd = null;
        },
      ),
    );
  }

  void _showInterstitialAd(VoidCallback onAdDismissed) {
    _clickCount++;
    // Show ad every 3rd click to balance monetization and user experience
    if (_clickCount % 3 == 0 && _interstitialAd != null) {
      _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          _loadInterstitialAd();
          onAdDismissed();
        },
        onAdFailedToShowFullScreenContent: (ad, err) {
          ad.dispose();
          _loadInterstitialAd();
          onAdDismissed();
        },
      );
      _interstitialAd!.show();
      _interstitialAd = null;
    } else {
      onAdDismissed();
    }
  }

  void _navigateToModule(String keyName) {
    _showInterstitialAd(() {
      if (mounted) {
        context.push('/module/$keyName');
      }
    });
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    _interstitialAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final session = ref.watch(sessionControllerProvider);
    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6), // Cleaner light gray background
      appBar: AppBar(
        scrolledUnderElevation: 0,
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade100, width: 1.5),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Image.asset(
                'assets/otizeka-logo.png',
                height: 32,
                fit: BoxFit.contain,
              ),
            ),
            const SizedBox(width: 10),
            RichText(
              text: const TextSpan(
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.5,
                ),
                children: [
                  TextSpan(
                    text: 'Oti',
                    style: TextStyle(color: Color(0xFF1D5CDB)), // Brand Royal Blue
                  ),
                  TextSpan(
                    text: 'Zeka',
                    style: TextStyle(color: Color(0xFF00B4D8)), // Brand Turquoise/Cyan
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () => context.push('/family'),
            icon: const Icon(Icons.tune_outlined, color: Color(0xFF3F3F46)),
            tooltip: 'Profil Ayarları',
          ),
          IconButton(
            onPressed: () async {
              await ref.read(sessionControllerProvider.notifier).logout();
            },
            icon: const Icon(Icons.power_settings_new_rounded, color: Color(0xFFF43F5E)),
            tooltip: 'Çıkış Yap',
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: session.when(
        data: (s) {
          return CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // Welcome Banner & Child Profile Summary Card
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Personalized welcome
                      ref.watch(userMetaProvider).when(
                            data: (meta) {
                              final displayName = (meta?.userFullName != null && meta!.userFullName.isNotEmpty)
                                  ? meta.userFullName.split(' ').first
                                  : 'Veli';
                              return Text(
                                'Merhaba $displayName 👋',
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.w900,
                                  color: Color(0xFF1F2937),
                                  letterSpacing: -0.5,
                                ),
                              );
                            },
                            loading: () => const Text(
                              'Merhaba Veli 👋',
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.w900,
                                color: Color(0xFF1F2937),
                                letterSpacing: -0.5,
                              ),
                            ),
                            error: (_, __) => const Text(
                              'Merhaba Veli 👋',
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.w900,
                                color: Color(0xFF1F2937),
                                letterSpacing: -0.5,
                              ),
                            ),
                          ),
                      const SizedBox(height: 4),
                      const Text(
                        'Çocuğunuzun bugünkü zeka ve gelişim yolculuğuna hoş geldiniz.',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF6B7280),
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Gorgeous upgraded Profile Card
                      _ProfileSummary(email: s.email ?? '-'),
                    ],
                  ),
                ),
              ),

              // CATEGORY 1: 🧠 Zeka ve Gelişim (Zeka & Learning)
              const SliverToBoxAdapter(
                child: _SectionHeader(
                  title: 'Zeka ve Gelişim',
                  subtitle: 'Eğitici oyunlar, taklit becerileri ve kelime dağarcığı',
                  icon: Icons.psychology_rounded,
                  iconColor: Color(0xFF8B5CF6),
                ),
              ),
              SliverToBoxAdapter(
                child: SizedBox(
                  height: 136,
                  child: ListView(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    scrollDirection: Axis.horizontal,
                    physics: const BouncingScrollPhysics(),
                    children: [
                      _ModuleCarouselTile(
                        title: 'Nesneleri Tanıyalım',
                        keyName: 'objects',
                        icon: Icons.category,
                        gradientColors: const [Color(0xFFEC4899), Color(0xFFF472B6)],
                        onTap: () => _navigateToModule('objects'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Taklit Oyunu',
                        keyName: 'imitation',
                        icon: Icons.accessibility_new_rounded,
                        gradientColors: const [Color(0xFF10B981), Color(0xFF34D399)],
                        onTap: () => _navigateToModule('imitation'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Cümle Kur & Sesler',
                        keyName: 'sentence_sounds',
                        icon: Icons.record_voice_over,
                        gradientColors: const [Color(0xFF8B5CF6), Color(0xFFA78BFA)],
                        onTap: () => _navigateToModule('sentence_sounds'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Eğitim Hatırlatıcı',
                        keyName: 'education_reminder',
                        icon: Icons.alarm,
                        gradientColors: const [Color(0xFF047857), Color(0xFF059669)],
                        onTap: () => _navigateToModule('education_reminder'),
                      ),
                    ],
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 20)),

              // CATEGORY 2: 🎮 Terapi ve Oyun (Therapy & Games)
              const SliverToBoxAdapter(
                child: _SectionHeader(
                  title: 'Terapi ve Oyun',
                  subtitle: 'Müzik terapisi, duyusal odalar ve sosyal hikayeler',
                  icon: Icons.sports_esports_rounded,
                  iconColor: Color(0xFF0284C7),
                ),
              ),
              SliverToBoxAdapter(
                child: SizedBox(
                  height: 136,
                  child: ListView(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    scrollDirection: Axis.horizontal,
                    physics: const BouncingScrollPhysics(),
                    children: [
                      _ModuleCarouselTile(
                        title: 'Eğitici Oyunlar',
                        keyName: 'games',
                        icon: Icons.sports_esports,
                        gradientColors: const [Color(0xFF0284C7), Color(0xFF38BDF8)],
                        onTap: () => _navigateToModule('games'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Duyusal Oda',
                        keyName: 'sensory',
                        icon: Icons.waves,
                        gradientColors: const [Color(0xFF06B6D4), Color(0xFF22D3EE)],
                        onTap: () => _navigateToModule('sensory'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Müzik ve Ses',
                        keyName: 'music',
                        icon: Icons.music_note,
                        gradientColors: const [Color(0xFF4F46E5), Color(0xFF818CF8)],
                        onTap: () => _navigateToModule('music'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Sosyal Öyküler',
                        keyName: 'stories',
                        icon: Icons.auto_stories,
                        gradientColors: const [Color(0xFF059669), Color(0xFF10B981)],
                        onTap: () => _navigateToModule('stories'),
                      ),
                      _ModuleCarouselTile(
                        title: 'Duygularım',
                        keyName: 'emotions',
                        icon: Icons.favorite,
                        gradientColors: const [Color(0xFFE11D48), Color(0xFFFB7185)],
                        onTap: () => _navigateToModule('emotions'),
                      ),
                    ],
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 20)),

              // CATEGORY 3: 📚 Rehberlik ve Takip (Guidance & Track)
              const SliverToBoxAdapter(
                child: _SectionHeader(
                  title: 'Rehberlik ve Takip',
                  subtitle: 'Otizm hakkında bilgi, takvim ve tıbbi araştırmalar',
                  icon: Icons.menu_book_rounded,
                  iconColor: Color(0xFFEA580C),
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                sliver: SliverGrid(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 1.45,
                  ),
                  delegate: SliverChildListDelegate(
                    [
                      _ModuleGridTile(
                        title: 'İletişim Kartları',
                        keyName: 'acc',
                        icon: Icons.chat,
                        color: const Color(0xFFFFFBEB),
                        iconColor: const Color(0xFFD97706),
                        onTap: () => _navigateToModule('acc'),
                      ),
                      _ModuleGridTile(
                        title: 'Takvim ve Program',
                        keyName: 'calendar',
                        icon: Icons.calendar_month,
                        color: const Color(0xFFFFF7ED),
                        iconColor: const Color(0xFFEA580C),
                        onTap: () => _navigateToModule('calendar'),
                      ),
                      _ModuleGridTile(
                        title: 'Otizm Bilgilendirme',
                        keyName: 'info',
                        icon: Icons.info,
                        color: const Color(0xFFEFF6FF),
                        iconColor: const Color(0xFF2563EB),
                        onTap: () => _navigateToModule('info'),
                      ),
                      _ModuleGridTile(
                        title: 'OSB Tanısı Nedir?',
                        keyName: 'osb',
                        icon: Icons.help,
                        color: const Color(0xFFECFEFF),
                        iconColor: const Color(0xFF0891B2),
                        onTap: () => _navigateToModule('osb'),
                      ),
                      _ModuleGridTile(
                        title: 'Eğitim Rehberi',
                        keyName: 'education',
                        icon: Icons.menu_book,
                        color: const Color(0xFFF5F3FF),
                        iconColor: const Color(0xFF7C3AED),
                        onTap: () => _navigateToModule('education'),
                      ),
                      _ModuleGridTile(
                        title: 'OSB Araştırmaları',
                        keyName: 'osb_research',
                        icon: Icons.public,
                        color: const Color(0xFFF0FDF4),
                        iconColor: const Color(0xFF0D9488),
                        onTap: () => _navigateToModule('osb_research'),
                      ),
                    ],
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 32)),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, st) => Center(child: Text('Hata: $e')),
      ),
      bottomNavigationBar: _isAdLoaded
          ? SafeArea(
              child: SizedBox(
                width: _bannerAd!.size.width.toDouble(),
                height: _bannerAd!.size.height.toDouble(),
                child: Center(
                  child: AdWidget(ad: _bannerAd!),
                ),
              ),
            )
          : null,
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color iconColor;

  const _SectionHeader({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: iconColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF111827),
                    letterSpacing: -0.3,
                  ),
                ),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF6B7280),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ProfileSummary extends ConsumerWidget {
  final String email;
  const _ProfileSummary({required this.email});

  DateTime? _parseFlexibleDate(String dateStr) {
    dateStr = dateStr.trim();
    if (dateStr.isEmpty) return null;

    final isoParse = DateTime.tryParse(dateStr);
    if (isoParse != null) return isoParse;

    final separators = ['.', '/', '-'];
    for (final sep in separators) {
      if (dateStr.contains(sep)) {
        final parts = dateStr.split(sep);
        if (parts.length == 3) {
          if (parts[0].length <= 2 && parts[2].length == 4) {
            final day = int.tryParse(parts[0]);
            final month = int.tryParse(parts[1]);
            final year = int.tryParse(parts[2]);
            if (day != null && month != null && year != null) {
              return DateTime(year, month, day);
            }
          } else if (parts[0].length == 4 && parts[2].length <= 2) {
            final year = int.tryParse(parts[0]);
            final month = int.tryParse(parts[1]);
            final day = int.tryParse(parts[2]);
            if (day != null && month != null && year != null) {
              return DateTime(year, month, day);
            }
          }
        }
      }
    }
    return null;
  }

  String _calculateAge(String birthDateStr) {
    if (birthDateStr.isEmpty) return 'Yaş: -';
    try {
      final birthDate = _parseFlexibleDate(birthDateStr);
      if (birthDate == null) {
        return 'Yaş: -';
      }
      final now = DateTime.now();
      if (birthDate.isAfter(now)) {
        return 'Yeni doğan';
      }

      int years = now.year - birthDate.year;
      int months = now.month - birthDate.month;
      int days = now.day - birthDate.day;

      if (days < 0) {
        final prevMonth = DateTime(now.year, now.month, 0);
        days += prevMonth.day;
        months -= 1;
      }

      if (months < 0) {
        months += 12;
        years -= 1;
      }

      final List<String> parts = [];
      if (years > 0) {
        parts.add('$years yaş');
      }
      if (months > 0) {
        parts.add('$months ay');
      }
      if (days > 0 || parts.isEmpty) {
        parts.add('$days gün');
      }

      return parts.join(' ');
    } catch (e) {
      return 'Yaş: -';
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF1E3A8A), // Deep Royal Blue
            Color(0xFF1D4ED8), // Vibrant Royal Blue
            Color(0xFF0284C7), // Sky Blue Accent
          ],
        ),
        borderRadius: BorderRadius.circular(28),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF1E3A8A).withOpacity(0.18),
            blurRadius: 15,
            spreadRadius: 2,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ref.watch(profileProvider).when(
        data: (env) {
          if (env == null) {
            return const Padding(
              padding: EdgeInsets.all(24),
              child: Center(
                child: Text(
                  'Profil Bilgisi Bulunamadı',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                ),
              ),
            );
          }
          final active = env.profiles.where((p) => p.id == env.activeProfileId).cast().toList();
          final profile = active.isNotEmpty ? active.first : (env.profiles.isNotEmpty ? env.profiles.first : null);
          if (profile == null) {
            return const Padding(
              padding: EdgeInsets.all(24),
              child: Center(
                child: Text(
                  'Aktif Çocuk Profili Belirtilmedi',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                ),
              ),
            );
          }
          final bytes = decodeDataUrlImage(profile.photoDataUrl);
          return Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.white24, width: 3),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(17),
                        child: bytes != null
                            ? Image.memory(bytes, width: 64, height: 64, fit: BoxFit.cover)
                            : Container(
                                width: 64,
                                height: 64,
                                color: Colors.white10,
                                alignment: Alignment.center,
                                child: const Icon(Icons.person, color: Colors.white60, size: 32),
                              ),
                      ),
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            profile.name.isEmpty ? 'İsimsiz' : profile.name,
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                              letterSpacing: -0.3,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            _calculateAge(profile.birthDate),
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              color: Colors.white70,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.white12, width: 1),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.stars_rounded, color: Color(0xFFFBBF24), size: 16),
                          SizedBox(width: 4),
                          Text(
                            'AKTİF PROFiL',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 9,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const Divider(height: 1, color: Colors.white12),
                const SizedBox(height: 16),

                // Gamified educational progress bar dashboard
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${profile.name.split(' ').first} İçin Günlük İlerleme'.toUpperCase(),
                      style: const TextStyle(
                        color: Colors.white60,
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.0,
                      ),
                    ),
                    const Text(
                      '8 / 12 MODÜL',
                      style: TextStyle(
                        color: Color(0xFF00E5FF), // Glowing cyan
                        fontSize: 11,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Container(
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Colors.white10,
                    ),
                    child: FractionallySizedBox(
                      alignment: Alignment.centerLeft,
                      widthFactor: 0.66, // 66% progress indicator
                      child: Container(
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              Color(0xFF00B4D8),
                              Color(0xFF00E5FF),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
        loading: () => const Padding(
          padding: EdgeInsets.all(24),
          child: Center(child: CircularProgressIndicator(color: Colors.white)),
        ),
        error: (err, _) => Padding(
          padding: const EdgeInsets.all(24),
          child: Center(
            child: Text(
              'Profil Yüklenemedi: $err',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
        ),
      )
    );
  }
}

class _ModuleCarouselTile extends StatelessWidget {
  final String title;
  final String keyName;
  final IconData icon;
  final List<Color> gradientColors;
  final VoidCallback onTap;

  const _ModuleCarouselTile({
    required this.title,
    required this.keyName,
    required this.icon,
    required this.gradientColors,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 156,
      margin: const EdgeInsets.only(right: 12),
      child: Card(
        margin: EdgeInsets.zero,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(24),
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: gradientColors,
              ),
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: gradientColors.first.withOpacity(0.2),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(icon, color: Colors.white, size: 24),
                ),
                Text(
                  title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                    fontSize: 14,
                    height: 1.15,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ModuleGridTile extends StatelessWidget {
  final String title;
  final String keyName;
  final IconData icon;
  final Color color;
  final Color iconColor;
  final VoidCallback onTap;

  const _ModuleGridTile({
    required this.title,
    required this.keyName,
    required this.icon,
    required this.color,
    required this.iconColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      elevation: 0,
      color: color,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: BorderSide(color: Colors.white.withOpacity(0.6), width: 1.5),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(24),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.6),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: iconColor, size: 22),
              ),
              Text(
                title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  color: iconColor.withOpacity(0.9),
                  fontSize: 13.5,
                  height: 1.1,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
