import 'dart:io';
import 'package:flutter/foundation.dart' show kIsWeb;

class AdHelper {
  static bool get isSupported => !kIsWeb && (Platform.isAndroid || Platform.isIOS);

  static String get bannerAdUnitId {
    if (kIsWeb) return '';
    if (Platform.isAndroid) {
      return 'ca-app-pub-6555296619233151/6468479658';
    } else if (Platform.isIOS) {
      return 'ca-app-pub-6555296619233151/6839180593';
    } else {
      return '';
    }
  }

  static String get interstitialAdUnitId {
    if (kIsWeb) return '';
    if (Platform.isAndroid) {
      return 'ca-app-pub-6555296619233151/1076552175';
    } else if (Platform.isIOS) {
      return 'ca-app-pub-6555296619233151/7148265807';
    } else {
      return '';
    }
  }
}
