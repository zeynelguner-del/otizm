import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/api/api_client.dart';
import '../core/api/api_models.dart';
import 'api_client_provider.dart';

class SessionController extends AsyncNotifier<SessionInfo> with ChangeNotifier {
  @override
  Future<SessionInfo> build() async {
    final api = await ref.watch(apiClientProvider.future);
    try {
      final me = await api.me();
      return me;
    } catch (_) {
      return const SessionInfo(email: null, kvkkAccepted: false);
    }
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final api = await ref.read(apiClientProvider.future);
      return api.me();
    });
    notifyListeners();
  }

  Future<void> logout() async {
    final api = await ref.read(apiClientProvider.future);
    try {
      await api.logout();
    } catch (_) {}
    state = const AsyncData(SessionInfo(email: null, kvkkAccepted: false));
    notifyListeners();
  }
}

final sessionControllerProvider = AsyncNotifierProvider<SessionController, SessionInfo>(SessionController.new);
