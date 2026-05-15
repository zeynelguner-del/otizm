# Flutter Mobil Uygulama — Sayfa Tasarım Dokümanı

## Global Styles
- Yaklaşım: Mobile-first (375px referans), tabletlerde genişleyen grid.
- Renkler: Arka plan `#FAFAFA` (zinc-50), kart `#FFFFFF`, metin `#18181B` (zinc-900), vurgu `#10B981` (emerald).
- Tipografi: Başlıklar 20–28sp, gövde 14–16sp, küçük metin 12sp; satır aralığı 1.3–1.5.
- Bileşenler: Köşe yuvarlama 16–24dp; butonlar “Primary (emerald)”, “Secondary (zinc)”.
- Durumlar: loading skeleton, hata banner’ı; buton disabled gri.

## 1) Giriş/Kayıt & KVKK
- Layout: Tek kolon, scroll; alt kısımda sabit CTA.
- Meta: Title “Giriş / Kayıt”, description “E-posta ile giriş yapın”.
- Yapı:
  - Üstte logo + uygulama adı.
  - Sekmeler: “Giriş” / “Kayıt Ol”.
  - Form alanları:
    - E-posta, Şifre; kayıt modunda Şifre (Tekrar).
  - KVKK modal/overlay:
    - Metin + “Kabul Ediyorum” butonu.
    - Kabul edilmeden giriş/kayıt CTA disabled.
  - Hata mesajı kutusu (form validasyon ve sunucu hataları).

## 2) Ana Sayfa (Modül Menüsü)
- Layout: AppBar + içerik; içerikte 2 kolon kart grid (telefon), tablet 3 kolon.
- Meta: Title “Ana Sayfa”, description “Modüller”.
- Yapı:
  - AppBar:
    - Sol: “Aile Paneli” ikonu
    - Sağ: Çıkış ikonu
    - (Yönetici ise) “Yönetim” kısayolu
  - Profil özeti kartı:
    - Aktif çocuk fotoğrafı (yuvarlak), ad, doğum tarihi/yaş.
  - Modül kartları:
    - Bilgilendirme, OSB, Duygularım, Eğitici Oyunlar, Sosyal Öyküler, Müzik ve Ses, ACC, Takvim.
    - Kart içinde ikon + başlık + kısa açıklama.

## 3) Modül Ekranı (Şablon)
- Layout: AppBar + scroll içerik; uzun metinlerde “okuma modu”.
- Meta: Title modül adına göre (örn. “Duygularım”).
- Yapı:
  - Üst: modül başlığı + açıklama.
  - İçerik alanı:
    - Bilgilendirme/OSB/Öyküler: metin blokları + görsel (varsa).
    - Duygularım: duygu kartları/ikonları + seçildiğinde açıklama.
    - Müzik: ses/ritim etkinlik listesi + oynat/durdur.
    - ACC: kart grid; karta basınca tam ekran kart.
    - Takvim: gün/hafta görünümü + etkinlik listesi.
  - Oyunlar:
    - Oyun listesi (Boyama, Sayma, Eşleştirme, Hafıza, Şekiller) ve her biri ayrı oyun ekranına gider.

## 4) Aile Paneli & Ayarlar
- Layout: Sekmeli yapı (Profil / İletişim / Gizlilik).
- Meta: Title “Aile Paneli”, description “Profil ve ayarlar”.
- Yapı:
  - Profil sekmesi:
    - Profil listesi (çocuklar) + “Yeni Profil”
    - Profil düzenleme: ad, doğum tarihi, aile notu, eğitim notu, fotoğraf.
    - “Aktif Profil” seçimi.
  - İletişim sekmesi:
    - Kullanıcı ad-soyad, telefon.
    - Eğitmen telefonu, doktor telefonu.
    - Kaydet butonu + başarı toast.
  - Gizlilik sekmesi:
    - “Verileri Dışa Aktar (JSON)” (dosya indir/ paylaş).
    - “Hesabı Sil” (confirm=“SIL” + şifre girişi).

## 5) Yönetim (Yalnız Yönetici)
- Layout: KPI kartları + liste.
- Meta: Title “Yönetim”, description “İstatistikler”.
- Yapı:
  - KPI kartları: toplam kullanıcı, aktif session, KVKK kabul, kayıtlı profil, son 7 gün kullanıcı.
  - Profil listesi (son güncellenenler): e-posta + profil isimleri + profil sayısı.

## Opsiyonel Tasarım Notları
- Offline: Modül içerikleri ve profil özetinde “Çevrimdışı” rozet; son senkron zamanı.
- Push: Takvim ekranında “Hatırlatmaları Aç” izin akışı ve durum göstergesi.