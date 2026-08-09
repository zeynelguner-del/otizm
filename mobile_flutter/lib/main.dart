import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

import 'src/app.dart';
import 'src/core/notifications/notification_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Global Flutter error handler
  FlutterError.onError = (FlutterErrorDetails details) {
    FlutterError.presentError(details);
    debugPrint('FlutterError: ${details.exceptionAsString()}');
  };

  // Global asynchronous error handler to prevent fatal app crash
  PlatformDispatcher.instance.onError = (Object error, StackTrace stack) {
    debugPrint('Uncaught Platform Error: $error\n$stack');
    return true; // Mark as handled
  };

  // Safe service initializations
  try {
    await NotificationService.instance.init();
  } catch (e) {
    debugPrint('NotificationService initialization error: $e');
  }

  try {
    await MobileAds.instance.initialize();
  } catch (e) {
    debugPrint('MobileAds initialization error: $e');
  }

  runApp(const ProviderScope(child: App()));
}
