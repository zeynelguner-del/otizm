import 'dart:io';

class AdHelper {
  /// Returns the AdMob Banner Ad Unit ID.
  /// 
  /// Currently configured with Google's official Test Ad Unit IDs.
  /// Swap these with your real AdMob Banner Ad Unit IDs when ready for production.
  static String get bannerAdUnitId {
    if (Platform.isAndroid) {
      // Android Production Banner Ad Unit ID
      return 'ca-app-pub-6555296619233151/6468479658';
    } else if (Platform.isIOS) {
      // iOS Production Banner Ad Unit ID
      return 'ca-app-pub-6555296619233151/6839180593';
    } else {
      throw UnsupportedError('Unsupported platform');
    }
  }

  /// Returns the AdMob Interstitial Ad Unit ID.
  /// 
  /// Currently configured with Google's official Test Ad Unit IDs.
  /// Swap these with your real AdMob Interstitial Ad Unit IDs when ready for production.
  static String get interstitialAdUnitId {
    if (Platform.isAndroid) {
      // Android Production Interstitial Ad Unit ID
      return 'ca-app-pub-6555296619233151/1076552175';
    } else if (Platform.isIOS) {
      // iOS Production Interstitial Ad Unit ID
      return 'ca-app-pub-6555296619233151/7148265807';
    } else {
      throw UnsupportedError('Unsupported platform');
    }
  }
}
