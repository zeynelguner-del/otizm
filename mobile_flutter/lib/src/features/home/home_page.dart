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
      appBar: AppBar(
        title: const Text('Ana Sayfa'),
        actions: [
          IconButton(
            onPressed: () => context.push('/family'),
            icon: const Icon(Icons.settings),
          ),
          IconButton(
            onPressed: () async {
              await ref.read(sessionControllerProvider.notifier).logout();
            },
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: session.when(
        data: (s) {
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _ProfileSummary(email: s.email ?? '-'),
              const SizedBox(height: 12),
              const Text('Modüller', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
              const SizedBox(height: 12),
              const Wrap(
                spacing: 12,
                runSpacing: 12,
                children: [
                  _ModuleTile(title: 'Otizm Bilgilendirme', keyName: 'info', icon: Icons.info, color: Colors.blue.shade100, iconColor: Colors.blue.shade700),
                  _ModuleTile(title: 'OSB', keyName: 'osb', icon: Icons.help, color: Colors.cyan.shade100, iconColor: Colors.cyan.shade700),
                  _ModuleTile(title: 'Eğitim', keyName: 'education', icon: Icons.menu_book, color: Colors.deepPurple.shade100, iconColor: Colors.deepPurple.shade700),
                  _ModuleTile(title: 'OSB Araştırmaları', keyName: 'osb_research', icon: Icons.public, color: Colors.teal.shade100, iconColor: Colors.teal.shade700),
                  _ModuleTile(title: 'Duygularım', keyName: 'emotions', icon: Icons.favorite, color: Colors.pink.shade100, iconColor: Colors.pink.shade600),
                  _ModuleTile(title: 'Eğitici Oyunlar', keyName: 'games', icon: Icons.sports_esports, color: Colors.lightBlue.shade100, iconColor: Colors.lightBlue.shade700),
                  _ModuleTile(title: 'Sosyal Öyküler', keyName: 'stories', icon: Icons.auto_stories, color: Colors.green.shade100, iconColor: Colors.green.shade700),
                  _ModuleTile(title: 'Müzik ve Ses', keyName: 'music', icon: Icons.music_note, color: Colors.indigo.shade100, iconColor: Colors.indigo.shade600),
                  _ModuleTile(title: 'İletişim Kartları', keyName: 'acc', icon: Icons.chat, color: Colors.amber.shade100, iconColor: Colors.amber.shade800),
                  _ModuleTile(title: 'Takvim ve Program', keyName: 'calendar', icon: Icons.calendar_month, color: Colors.orange.shade100, iconColor: Colors.orange.shade800),
                  _ModuleTile(title: 'Eğitim Hatırlatıcı', keyName: 'education_reminder', icon: Icons.alarm, color: Colors.teal.shade100, iconColor: Colors.teal.shade800),
                  _ModuleTile(title: 'Duyusal Oda', keyName: 'sensory', icon: Icons.waves, color: Colors.lightBlue.shade50, iconColor: Colors.lightBlue.shade600),
                ],
              ),
              const SizedBox(height: 20),
              FutureBuilder(
                future: ref.read(apiClientProvider.future).then((api) => api.adminStats()),
                builder: (context, snapshot) {
                  if (snapshot.hasError) return const SizedBox.shrink();
                  if (!snapshot.hasData) return const SizedBox.shrink();
                  return SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () => context.push('/admin'),
                      icon: const Icon(Icons.admin_panel_settings),
                      label: const Text('Yönetim'),
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
      color: const Color(0xFFF4F4F5),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Kullanıcı: $email', style: const TextStyle(fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
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
                    ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: bytes != null
                          ? Image.memory(bytes, width: 56, height: 56, fit: BoxFit.cover)
                          : Container(
                              width: 56,
                              height: 56,
                              color: Colors.white,
                              alignment: Alignment.center,
                              child: const Icon(Icons.person),
                            ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(profile.name.isEmpty ? 'İsimsiz' : profile.name,
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                          const SizedBox(height: 4),
                          Text(
                            profile.birthDate.isEmpty ? 'Doğum tarihi: -' : 'Doğum tarihi: ${profile.birthDate}',
                            style: const TextStyle(fontWeight: FontWeight.w700),
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
    required this.iconColor
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: (MediaQuery.of(context).size.width - 16 * 2 - 12) / 2,
      height: 110,
      child: InkWell(
        onTap: () => context.push('/module/$keyName'),
        borderRadius: BorderRadius.circular(24),
        child: Ink(
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: Colors.white.withOpacity(0.5), width: 2),
            boxShadow: [
              BoxShadow(
                color: iconColor.withOpacity(0.1),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
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
                    height: 1.1
                  )
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
