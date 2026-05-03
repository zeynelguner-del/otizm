import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'features/admin/admin_page.dart';
import 'features/auth/auth_page.dart';
import 'features/family/family_page.dart';
import 'features/home/home_page.dart';
import 'features/modules/module_page.dart';
import 'state/session_controller.dart';

final _routerProvider = Provider<GoRouter>((ref) {
  final session = ref.watch(sessionControllerProvider);
  final sessionListenable = ref.watch(sessionControllerProvider.notifier);
  return GoRouter(
    initialLocation: '/home',
    refreshListenable: sessionListenable,
    redirect: (context, state) {
      final isLoggedIn = session.valueOrNull?.email != null;
      final goingAuth = state.matchedLocation == '/auth';
      if (!isLoggedIn && !goingAuth) return '/auth';
      if (isLoggedIn && goingAuth) return '/home';
      return null;
    },
    routes: [
      GoRoute(path: '/auth', builder: (context, state) => const AuthPage()),
      GoRoute(path: '/home', builder: (context, state) => const HomePage()),
      GoRoute(path: '/family', builder: (context, state) => const FamilyPage()),
      GoRoute(path: '/admin', builder: (context, state) => const AdminPage()),
      GoRoute(
        path: '/module/:key',
        builder: (context, state) => ModulePage(moduleKey: state.pathParameters['key'] ?? ''),
      ),
    ],
  );
});

class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(_routerProvider);
    ref.watch(sessionControllerProvider);
    return MaterialApp.router(
      title: 'Otizm Farkındalık',
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFF10B981),
      ),
      routerConfig: router,
    );
  }
}
