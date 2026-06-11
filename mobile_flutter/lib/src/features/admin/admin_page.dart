import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../state/api_client_provider.dart';

class AdminPage extends ConsumerWidget {
  const AdminPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Yönetim')),
      body: ref.watch(adminStatsProvider).when(
        data: (s) => ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _kpi('Toplam Kullanıcı', s.usersTotal),
            _kpi('Aktif Oturum', s.sessionsActive),
            _kpi('KVKK Kabul', s.kvkkAccepted),
            _kpi('Kayıtlı Profil', s.profilesSaved),
            _kpi('Son 7 Gün Kullanıcı', s.usersLast7Days),
          ],
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('Yetkiniz yok veya hata: $err')),
      ),
    );
  }

  Widget _kpi(String title, int value) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20), side: const BorderSide(color: Color(0xFFE4E4E7))),
      child: ListTile(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
        trailing: Text('$value', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
      ),
    );
  }
}

