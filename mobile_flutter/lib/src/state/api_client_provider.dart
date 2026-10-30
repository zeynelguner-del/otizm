import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/api/api_client.dart';
import '../core/api/api_models.dart';
import 'session_controller.dart';

final apiClientProvider = FutureProvider<ApiClient>((ref) async {
  return ApiClient.create();
});

final profileProvider = FutureProvider<ProfileEnvelope?>((ref) async {
  ref.watch(sessionControllerProvider);
  final api = await ref.watch(apiClientProvider.future);
  return api.getProfile();
});

final userMetaProvider = FutureProvider<UserMeta?>((ref) async {
  ref.watch(sessionControllerProvider);
  final api = await ref.watch(apiClientProvider.future);
  return api.getUserMeta();
});

final adminStatsProvider = FutureProvider<AdminStats>((ref) async {
  ref.watch(sessionControllerProvider);
  final api = await ref.watch(apiClientProvider.future);
  return api.adminStats();
});

