import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

import 'src/app.dart';
import 'src/core/notifications/notification_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await NotificationService.instance.init();
  await MobileAds.instance.initialize();
  runApp(const ProviderScope(child: App()));
}
