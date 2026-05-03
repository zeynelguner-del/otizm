import 'dart:convert';
import 'dart:typed_data';

Uint8List? decodeDataUrlImage(String dataUrl) {
  final v = dataUrl.trim();
  if (!v.startsWith('data:')) return null;
  final idx = v.indexOf(',');
  if (idx < 0) return null;
  final meta = v.substring(0, idx);
  final payload = v.substring(idx + 1);
  if (!meta.contains(';base64')) return null;
  try {
    return base64Decode(payload);
  } catch (_) {
    return null;
  }
}
