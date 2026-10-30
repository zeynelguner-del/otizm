import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:otizm_destek_app/l10n/app_localizations.dart';

import '../../state/api_client_provider.dart';

class AdminPage extends ConsumerWidget {
  const AdminPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(loc.adminTitle)),
      body: ref.watch(adminStatsProvider).when(
        data: (s) => ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _kpi(loc.adminTotalUsers, s.usersTotal),
            _kpi(loc.adminActiveSessions, s.sessionsActive),
            _kpi(loc.adminKvkkAccepted, s.kvkkAccepted),
            _kpi(loc.adminProfilesSaved, s.profilesSaved),
            _kpi(loc.adminUsersLast7Days, s.usersLast7Days),
          ],
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('${loc.adminNoAuth}$err')),
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
