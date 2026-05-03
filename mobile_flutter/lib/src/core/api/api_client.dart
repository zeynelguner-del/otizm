import 'dart:io';

import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

import '../config.dart';
import 'api_models.dart';

class ApiClient {
  final Dio _dio;

  ApiClient._(this._dio);

  static Future<ApiClient> create() async {
    final dio = Dio(
      BaseOptions(
        baseUrl: appBaseUrl,
        headers: {
          HttpHeaders.acceptHeader: 'application/json',
          HttpHeaders.contentTypeHeader: 'application/json',
        },
      ),
    );
    final dir = await getApplicationDocumentsDirectory();
    final cookieDir = Directory(p.join(dir.path, 'cookies'));
    if (!cookieDir.existsSync()) cookieDir.createSync(recursive: true);
    final jar = PersistCookieJar(storage: FileStorage(cookieDir.path));
    dio.interceptors.add(CookieManager(jar));
    return ApiClient._(dio);
  }

  Future<SessionInfo> me() async {
    final res = await _dio.get('/api/auth/me', options: Options(responseType: ResponseType.json));
    final data = _asJsonMap(res.data);
    return SessionInfo.fromJson(data);
  }

  Future<void> login({required String email, required String password}) async {
    final res = await _dio.post('/api/auth/login', data: {'email': email, 'password': password});
    _ensureOk(res);
  }

  Future<void> register({required String email, required String password}) async {
    final res = await _dio.post('/api/auth/register', data: {'email': email, 'password': password});
    _ensureOk(res);
  }

  Future<void> logout() async {
    await _dio.post('/api/auth/logout');
  }

  Future<void> kvkkConsent({required int version}) async {
    final res = await _dio.post('/api/privacy/consent', data: {'version': version});
    _ensureOk(res);
  }

  Future<ProfileEnvelope?> getProfile() async {
    final res = await _dio.get('/api/profile');
    final map = _asJsonMap(res.data);
    final profile = map['profile'];
    if (profile is Map<String, dynamic>) {
      return ProfileEnvelope.fromJson(profile);
    }
    return null;
  }

  Future<void> saveProfile(ProfileEnvelope envelope) async {
    final res = await _dio.post('/api/profile', data: envelope.toJson());
    _ensureOk(res);
  }

  Future<UserMeta?> getUserMeta() async {
    final res = await _dio.get('/api/user-meta');
    final map = _asJsonMap(res.data);
    final meta = map['meta'];
    if (meta is Map<String, dynamic>) {
      return UserMeta.fromJson(meta);
    }
    return null;
  }

  Future<void> saveUserMeta(UserMeta meta) async {
    final res = await _dio.post('/api/user-meta', data: meta.toJson());
    _ensureOk(res);
  }

  Future<void> deleteAccount({required String password}) async {
    final res = await _dio.post('/api/privacy/delete', data: {'confirm': 'SIL', 'password': password});
    _ensureOk(res);
  }

  Future<AdminStats> adminStats() async {
    final res = await _dio.get('/api/admin/stats');
    final map = _asJsonMap(res.data);
    return AdminStats.fromJson(map);
  }

  Map<String, dynamic> _asJsonMap(dynamic v) {
    if (v is Map<String, dynamic>) return v;
    if (v is Map) return v.cast<String, dynamic>();
    throw const ApiException('Sunucu yanıtı okunamadı.');
  }

  void _ensureOk(Response res) {
    if (res.statusCode != null && res.statusCode! >= 200 && res.statusCode! < 300) return;
    throw const ApiException('İstek başarısız.');
  }
}

