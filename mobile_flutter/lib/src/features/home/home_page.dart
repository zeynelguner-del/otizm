import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/utils/photo_data_url.dart';
import '../../state/api_client_provider.dart';
import '../../state/session_controller.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  @override
  Widget build(BuildContext context) {
    final session = ref.watch(sessionControllerProvider);
    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      appBar: AppBar(
        scrolledUnderElevation: 0,
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        title: Image.asset(
          'assets/otizeka-logo.png',
          height: 46,
          fit: BoxFit.contain,
        ),
        actions: [
          IconButton(
            onPressed: () => context.push('/family'),
            icon: const Icon(Icons.tune_outlined, color: Color(0xFF3F3F46)),
          ),
          IconButton(
            onPressed: () async {
              await ref.read(sessionControllerProvider.notifier).logout();
            },
            icon: const Icon(Icons.power_settings_new_rounded, color: Color(0xFFF43F5E)),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: session.when(
        data: (s) {
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _ProfileSummary(email: s.email ?? '-'),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Aktif Modüller'.toUpperCase(),
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.2,
                      color: Colors.grey.shade400,
                    ),
                  ),
                  Text(
                    '12 Modül',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF059669),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              const Wrap(
                spacing: 12,
                runSpacing: 12,
                children: [
                  _ModuleTile(title: 'Otizm Bilgilendirme', keyName: 'info', icon: Icons.info, color: Color(0xFFEFF6FF), iconColor: Color(0xFF2563EB)),
                  _ModuleTile(title: 'OSB', keyName: 'osb', icon: Icons.help, color: Color(0xFFECFEFF), iconColor: Color(0xFF0891B2)),
                  _ModuleTile(title: 'Eğitim', keyName: 'education', icon: Icons.menu_book, color: Color(0xFFF5F3FF), iconColor: Color(0xFF7C3AED)),
                  _ModuleTile(title: 'OSB Araştırmaları', keyName: 'osb_research', icon: Icons.public, color: Color(0xFFF0FDF4), iconColor: Color(0xFF0D9488)),
                  _ModuleTile(title: 'Duygularım', keyName: 'emotions', icon: Icons.favorite, color: Color(0xFFFFF1F2), iconColor: Color(0xFFE11D48)),
                  _ModuleTile(title: 'Eğitici Oyunlar', keyName: 'games', icon: Icons.sports_esports, color: Color(0xFFF0F9FF), iconColor: Color(0xFF0284C7)),
                  _ModuleTile(title: 'Sosyal Öyküler', keyName: 'stories', icon: Icons.auto_stories, color: Color(0xFFECFDF5), iconColor: Color(0xFF059669)),
                  _ModuleTile(title: 'Müzik ve Ses', keyName: 'music', icon: Icons.music_note, color: Color(0xFFEEF2FF), iconColor: Color(0xFF4F46E5)),
                  _ModuleTile(title: 'İletişim Kartları', keyName: 'acc', icon: Icons.chat, color: Color(0xFFFFFBEB), iconColor: Color(0xFFD97706)),
                  _ModuleTile(title: 'Takvim ve Program', keyName: 'calendar', icon: Icons.calendar_month, color: Color(0xFFFFF7ED), iconColor: Color(0xFFEA580C)),
                  _ModuleTile(title: 'Eğitim Hatırlatıcı', keyName: 'education_reminder', icon: Icons.alarm, color: Color(0xFFE6FDF5), iconColor: Color(0xFF047857)),
                  _ModuleTile(title: 'Duyusal Oda', keyName: 'sensory', icon: Icons.waves, color: Color(0xFFF0FDF4), iconColor: Color(0xFF0891B2)),
                ],
              ),
              const SizedBox(height: 24),
              FutureBuilder(
                future: ref.read(apiClientProvider.future).then((api) => api.adminStats()),
                builder: (context, snapshot) {
                  if (snapshot.hasError) return const SizedBox.shrink();
                  if (!snapshot.hasData) return const SizedBox.shrink();
                  return SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () => context.push('/admin'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        side: const BorderSide(color: Colors.amber, width: 1.5),
                        foregroundColor: Colors.amber.shade900,
                      ),
                      icon: const Icon(Icons.admin_panel_settings),
                      label: const Text('Yönetim', style: TextStyle(fontWeight: FontWeight.w900)),
                    ),
                  );
                },
              ),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, st) => Center(child: Text('Hata: $e')),
      ),
    );
  }
}

class _ProfileSummary extends ConsumerWidget {
  final String email;
  const _ProfileSummary({required this.email});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: BorderSide(color: Colors.grey.shade200, width: 1.5),
      ),
      child: Stack(
        children: [
          Positioned.fill(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Opacity(
                opacity: 0.05,
                child: Image.asset(
                  'assets/loogo.png',
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      width: 6,
                      height: 6,
                      decoration: const BoxDecoration(
                        color: Color(0xFF10B981),
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      'OtiZeka Portalı Aktif'.toUpperCase(),
                      style: const TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.1,
                        color: Color(0xFF10B981),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                const Text(
                  'Aile Yönetim Paneli',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF18181B),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Veli: ${email.toLowerCase()}',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    color: Colors.grey.shade500,
                  ),
                ),
                const SizedBox(height: 16),
                const Divider(height: 1, color: Color(0xFFF4F4F5)),
                const SizedBox(height: 16),
                FutureBuilder(
                  future: ref.read(apiClientProvider.future).then((api) => api.getProfile()),
                  builder: (context, snapshot) {
                    final env = snapshot.data;
                    if (env == null) {
                      return const Text('Aktif çocuk profili: Belirtilmedi', style: TextStyle(fontWeight: FontWeight.w700));
                    }
                    final active = env.profiles.where((p) => p.id == env.activeProfileId).cast().toList();
                    final profile = active.isNotEmpty ? active.first : (env.profiles.isNotEmpty ? env.profiles.first : null);
                    if (profile == null) {
                      return const Text('Aktif çocuk profili: Belirtilmedi', style: TextStyle(fontWeight: FontWeight.w700));
                    }
                    final bytes = decodeDataUrlImage(profile.photoDataUrl);
                    return Row(
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(18),
                            border: Border.all(color: Colors.grey.shade200, width: 2),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(16),
                            child: bytes != null
                                ? Image.memory(bytes, width: 56, height: 56, fit: BoxFit.cover)
                                : Container(
                                    width: 56,
                                    height: 56,
                                    color: Colors.grey.shade100,
                                    alignment: Alignment.center,
                                    child: Icon(Icons.person, color: Colors.grey.shade400, size: 28),
                                  ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                profile.name.isEmpty ? 'İsimsiz' : profile.name,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w900,
                                  color: Color(0xFF18181B),
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                profile.birthDate.isEmpty ? 'Doğum tarihi: -' : 'Doğum tarihi: ${profile.birthDate}',
                                style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  color: Colors.grey.shade600,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        )
                      ],
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ModuleTile extends StatelessWidget {
  final String title;
  final String keyName;
  final IconData icon;
  final Color color;
  final Color iconColor;

  const _ModuleTile({
    required this.title,
    required this.keyName,
    required this.icon,
    required this.color,
    required this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: (MediaQuery.of(context).size.width - 16 * 2 - 12) / 2,
      height: 120,
      child: InkWell(
        onTap: () => context.push('/module/$keyName'),
        borderRadius: BorderRadius.circular(24),
        child: Ink(
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: Colors.white.withOpacity(0.6), width: 1.5),
            boxShadow: [
              BoxShadow(
                color: iconColor.withOpacity(0.08),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Stack(
            children: [
              Positioned.fill(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: Opacity(
                    opacity: 0.08,
                    child: Image.asset(
                      'assets/loogo.png',
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              Padding(
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
                      child: Icon(icon, color: iconColor, size: 24),
                    ),
                    Text(
                      title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        color: iconColor.withOpacity(0.9),
                        fontSize: 14,
                        height: 1.1,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
