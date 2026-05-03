# Otizm Destek (Flutter)

Bu klasör Flutter mobil uygulamasıdır ve mevcut Next.js backend API'nize bağlanır.

## Gereksinimler
- Flutter SDK (stable)
- Android Studio / Xcode

## Kurulum
1) Bu klasörde platform dosyaları yoksa Flutter proje iskeletini oluşturun:

```bash
cd mobile_flutter
flutter create --org com.otizmdestek --project-name otizm_destek_app .
```

Eğer bu komut `lib/` içeriğini değiştirirse geri almak için:

```bash
git checkout -- mobile_flutter/lib mobile_flutter/pubspec.yaml
```

2) Paketleri yükleyin:

```bash
flutter pub get
```

## Çalıştırma
Varsayılan backend: `https://www.otizmdestekapp.com`

Başka bir ortam için:

```bash
flutter run --dart-define=BASE_URL=https://<sunucu-domain>
```

Android emülatörde local backend için örnek:

```bash
flutter run --dart-define=BASE_URL=http://10.0.2.2:3000
```

## Notlar
- Giriş oturumu httpOnly cookie (`otizmSessionV1`) ile yönetilir; uygulama cookie'yi cihazda saklar.
- KVKK onayı, giriş sonrası zorunlu akış olarak sunulur.
