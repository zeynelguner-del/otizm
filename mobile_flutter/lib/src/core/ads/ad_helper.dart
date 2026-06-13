import 'dart:io';

class AdHelper {
  /// Returns the AdMob Banner Ad Unit ID.
  /// 
  /// Currently configured with Google's official Test Ad Unit IDs.
  /// Swap these with your real AdMob Banner Ad Unit IDs when ready for production.
  static String get bannerAdUnitId {
    if (Platform.isAndroid) {
      // Android Production Banner Ad Unit ID
      return 'ca-app-pub-7473340730819857/5242355449';
    } else if (Platform.isIOS) {
      // iOS Test Banner Ad Unit ID
      return 'ca-app-pub-3940256099942544/2934735716';
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
      // Android Test Interstitial Ad Unit ID
      return 'ca-app-pub-3940256099942544/1033173712';
    } else if (Platform.isIOS) {
      // iOS Test Interstitial Ad Unit ID
      return 'ca-app-pub-3940256099942544/4411468910';
    } else {
      throw UnsupportedError('Unsupported platform');
    }
  }
}
