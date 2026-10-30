import 'dart:convert';
import 'dart:io';

import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

class LocalStore {
  static final LocalStore instance = LocalStore._();
  LocalStore._();

  Future<Directory>? _baseDirFuture;
  Future<void> _writeLock = Future.value();

  Future<Directory> _baseDir() {
    final existing = _baseDirFuture;
    if (existing != null) return existing;
    final created = getApplicationDocumentsDirectory().then((d) async {
      final dir = Directory(p.join(d.path, 'otizm_destek'));
      if (!await dir.exists()) {
        await dir.create(recursive: true);
      }
      return dir;
    });
    _baseDirFuture = created;
    return created;
  }

  Future<File> _file(String name) async {
    final dir = await _baseDir();
    return File(p.join(dir.path, name));
  }

  Future<Object?> readJson(String name) async {
    try {
      final f = await _file(name);
      if (!await f.exists()) return null;
      final raw = await f.readAsString();
      if (raw.trim().isEmpty) return null;
      return jsonDecode(raw);
    } catch (_) {
      return null;
    }
  }

  Future<void> writeJson(String name, Object? value) {
    _writeLock = _writeLock.then((_) async {
      final f = await _file(name);
      final raw = const JsonEncoder.withIndent('  ').convert(value);
      await f.writeAsString(raw);
    }).catchError((_) {});
    return _writeLock;
  }
}

