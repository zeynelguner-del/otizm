import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:otizm_destek_app/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import 'features/admin/admin_page.dart';
import 'features/auth/auth_page.dart';
import 'features/family/family_page.dart';
import 'features/home/home_page.dart';
import 'features/modules/module_page.dart';
import 'features/splash/splash_page.dart';
import 'state/session_controller.dart';

final _routerProvider = Provider<GoRouter>((ref) {
  final session = ref.watch(sessionControllerProvider);
  final sessionListenable = ref.watch(sessionControllerProvider.notifier);
  return GoRouter(
    initialLocation: '/splash',
    refreshListenable: sessionListenable,
    redirect: (context, state) {
      final isLoggedIn = session.valueOrNull?.email != null;
      final goingAuth = state.matchedLocation == '/auth';
      final goingSplash = state.matchedLocation == '/splash';
      
      // If we are currently showing splash, do not redirect immediately.
      if (goingSplash) return null;
      
      if (!isLoggedIn && !goingAuth) return '/auth';
      if (isLoggedIn && goingAuth) return '/home';
      return null;
    },
    routes: [
      GoRoute(path: '/splash', builder: (context, state) => const SplashPage()),
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
      title: 'OtiZeka',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFF10B981),
      ),
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en'),
        Locale('tr'),
      ],
      localeListResolutionCallback: (locales, supportedLocales) {
        if (locales != null && locales.isNotEmpty) {
          final firstLocale = locales.first;
          if (firstLocale.languageCode == 'tr') {
            return const Locale('tr');
          }
        }
        return const Locale('en'); // Default to English for all other languages
      },
      routerConfig: router,
    );
  }
}
