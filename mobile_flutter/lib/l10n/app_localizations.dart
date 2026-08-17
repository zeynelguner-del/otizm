import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_tr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('tr')
  ];

  /// No description provided for @appTitle.
  ///
  /// In tr, this message translates to:
  /// **'OtiZeka'**
  String get appTitle;

  /// No description provided for @adminTitle.
  ///
  /// In tr, this message translates to:
  /// **'Yönetim'**
  String get adminTitle;

  /// No description provided for @adminNoAuth.
  ///
  /// In tr, this message translates to:
  /// **'Yetkiniz yok veya hata: '**
  String get adminNoAuth;

  /// No description provided for @adminTotalUsers.
  ///
  /// In tr, this message translates to:
  /// **'Toplam Kullanıcı'**
  String get adminTotalUsers;

  /// No description provided for @adminActiveSessions.
  ///
  /// In tr, this message translates to:
  /// **'Aktif Oturum'**
  String get adminActiveSessions;

  /// No description provided for @adminKvkkAccepted.
  ///
  /// In tr, this message translates to:
  /// **'KVKK Kabul'**
  String get adminKvkkAccepted;

  /// No description provided for @adminProfilesSaved.
  ///
  /// In tr, this message translates to:
  /// **'Kayıtlı Profil'**
  String get adminProfilesSaved;

  /// No description provided for @adminUsersLast7Days.
  ///
  /// In tr, this message translates to:
  /// **'Son 7 Gün Kullanıcı'**
  String get adminUsersLast7Days;

  /// No description provided for @homeTitle.
  ///
  /// In tr, this message translates to:
  /// **'Ana Sayfa'**
  String get homeTitle;

  /// No description provided for @homeModules.
  ///
  /// In tr, this message translates to:
  /// **'Modüller'**
  String get homeModules;

  /// No description provided for @homeError.
  ///
  /// In tr, this message translates to:
  /// **'Hata: '**
  String get homeError;

  /// No description provided for @homeUser.
  ///
  /// In tr, this message translates to:
  /// **'Kullanıcı: '**
  String get homeUser;

  /// No description provided for @homeNoActiveProfile.
  ///
  /// In tr, this message translates to:
  /// **'Aktif çocuk profili: Belirtilmedi'**
  String get homeNoActiveProfile;

  /// No description provided for @homeUnnamed.
  ///
  /// In tr, this message translates to:
  /// **'İsimsiz'**
  String get homeUnnamed;

  /// No description provided for @homeNoBirthDate.
  ///
  /// In tr, this message translates to:
  /// **'Doğum tarihi: -'**
  String get homeNoBirthDate;

  /// No description provided for @homeBirthDate.
  ///
  /// In tr, this message translates to:
  /// **'Doğum tarihi: '**
  String get homeBirthDate;

  /// No description provided for @modInfo.
  ///
  /// In tr, this message translates to:
  /// **'Otizm Bilgilendirme'**
  String get modInfo;

  /// No description provided for @modOsb.
  ///
  /// In tr, this message translates to:
  /// **'OSB (Otizm Spektrum Bozukluğu)'**
  String get modOsb;

  /// No description provided for @modEducation.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim'**
  String get modEducation;

  /// No description provided for @modEmotions.
  ///
  /// In tr, this message translates to:
  /// **'Duygularım'**
  String get modEmotions;

  /// No description provided for @modGames.
  ///
  /// In tr, this message translates to:
  /// **'Eğitici Oyunlar'**
  String get modGames;

  /// No description provided for @modStories.
  ///
  /// In tr, this message translates to:
  /// **'Sosyal Öyküler'**
  String get modStories;

  /// No description provided for @modMusic.
  ///
  /// In tr, this message translates to:
  /// **'Müzik ve Ses'**
  String get modMusic;

  /// No description provided for @modAcc.
  ///
  /// In tr, this message translates to:
  /// **'İletişim Kartları (ACC)'**
  String get modAcc;

  /// No description provided for @modCalendar.
  ///
  /// In tr, this message translates to:
  /// **'Takvim ve Program'**
  String get modCalendar;

  /// No description provided for @modEduReminder.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim Hatırlatıcı'**
  String get modEduReminder;

  /// No description provided for @authEmailErr.
  ///
  /// In tr, this message translates to:
  /// **'Geçerli bir e-posta girin.'**
  String get authEmailErr;

  /// No description provided for @authPwdErr.
  ///
  /// In tr, this message translates to:
  /// **'Şifre en az 8 karakter olmalı.'**
  String get authPwdErr;

  /// No description provided for @authPwdMatchErr.
  ///
  /// In tr, this message translates to:
  /// **'Şifreler eşleşmiyor.'**
  String get authPwdMatchErr;

  /// No description provided for @authKvkkErr.
  ///
  /// In tr, this message translates to:
  /// **'Devam etmek için KVKK onayı gerekli.'**
  String get authKvkkErr;

  /// No description provided for @authTitle.
  ///
  /// In tr, this message translates to:
  /// **'Otizm Destek'**
  String get authTitle;

  /// No description provided for @authLogin.
  ///
  /// In tr, this message translates to:
  /// **'Giriş'**
  String get authLogin;

  /// No description provided for @authRegister.
  ///
  /// In tr, this message translates to:
  /// **'Kayıt Ol'**
  String get authRegister;

  /// No description provided for @authEmailLabel.
  ///
  /// In tr, this message translates to:
  /// **'E-posta'**
  String get authEmailLabel;

  /// No description provided for @authPwdLabel.
  ///
  /// In tr, this message translates to:
  /// **'Şifre'**
  String get authPwdLabel;

  /// No description provided for @authPwd2Label.
  ///
  /// In tr, this message translates to:
  /// **'Şifre (Tekrar)'**
  String get authPwd2Label;

  /// No description provided for @authKvkkText.
  ///
  /// In tr, this message translates to:
  /// **'Devam ederek KVKK Açık Rıza metnini kabul etmiş olursunuz.'**
  String get authKvkkText;

  /// No description provided for @authWait.
  ///
  /// In tr, this message translates to:
  /// **'Lütfen bekleyin...'**
  String get authWait;

  /// No description provided for @authBtnRegister.
  ///
  /// In tr, this message translates to:
  /// **'Kayıt Ol'**
  String get authBtnRegister;

  /// No description provided for @authBtnLogin.
  ///
  /// In tr, this message translates to:
  /// **'Giriş Yap'**
  String get authBtnLogin;

  /// No description provided for @familyTitle.
  ///
  /// In tr, this message translates to:
  /// **'Aile Paneli'**
  String get familyTitle;

  /// No description provided for @familyProfile.
  ///
  /// In tr, this message translates to:
  /// **'Profil'**
  String get familyProfile;

  /// No description provided for @familyContact.
  ///
  /// In tr, this message translates to:
  /// **'İletişim'**
  String get familyContact;

  /// No description provided for @familyPrivacy.
  ///
  /// In tr, this message translates to:
  /// **'Gizlilik'**
  String get familyPrivacy;

  /// No description provided for @familyNewProfile.
  ///
  /// In tr, this message translates to:
  /// **'Yeni Profil'**
  String get familyNewProfile;

  /// No description provided for @familyEditProfile.
  ///
  /// In tr, this message translates to:
  /// **'Profili Düzenle'**
  String get familyEditProfile;

  /// No description provided for @familyChildName.
  ///
  /// In tr, this message translates to:
  /// **'Çocuğun adı'**
  String get familyChildName;

  /// No description provided for @familyBirthDateHint.
  ///
  /// In tr, this message translates to:
  /// **'Doğum tarihi (YYYY-MM-DD)'**
  String get familyBirthDateHint;

  /// No description provided for @familyAgeOpt.
  ///
  /// In tr, this message translates to:
  /// **'Yaş (opsiyonel)'**
  String get familyAgeOpt;

  /// No description provided for @familyNotes.
  ///
  /// In tr, this message translates to:
  /// **'Aile notları'**
  String get familyNotes;

  /// No description provided for @familyEduNotes.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim notları'**
  String get familyEduNotes;

  /// No description provided for @btnSave.
  ///
  /// In tr, this message translates to:
  /// **'Kaydet'**
  String get btnSave;

  /// No description provided for @familyProfiles.
  ///
  /// In tr, this message translates to:
  /// **'Çocuk Profilleri'**
  String get familyProfiles;

  /// No description provided for @welcome.
  ///
  /// In tr, this message translates to:
  /// **'Hoş Geldiniz'**
  String get welcome;

  /// No description provided for @featuredGuide.
  ///
  /// In tr, this message translates to:
  /// **'Öne Çıkan Rehber'**
  String get featuredGuide;

  /// No description provided for @categories.
  ///
  /// In tr, this message translates to:
  /// **'Kategoriler'**
  String get categories;

  /// No description provided for @headings.
  ///
  /// In tr, this message translates to:
  /// **'Başlıklar'**
  String get headings;

  /// No description provided for @moduleInfoTitle.
  ///
  /// In tr, this message translates to:
  /// **'Otizm Bilgilendirme'**
  String get moduleInfoTitle;

  /// No description provided for @moduleOsbTitle.
  ///
  /// In tr, this message translates to:
  /// **'OSB (Otizm Spektrum Bozukluğu)'**
  String get moduleOsbTitle;

  /// No description provided for @moduleEducationTitle.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim'**
  String get moduleEducationTitle;

  /// No description provided for @moduleEmotionsTitle.
  ///
  /// In tr, this message translates to:
  /// **'Duygularım'**
  String get moduleEmotionsTitle;

  /// No description provided for @moduleGamesTitle.
  ///
  /// In tr, this message translates to:
  /// **'Eğitici Oyunlar'**
  String get moduleGamesTitle;

  /// No description provided for @moduleStoriesTitle.
  ///
  /// In tr, this message translates to:
  /// **'Sosyal Öyküler'**
  String get moduleStoriesTitle;

  /// No description provided for @moduleMusicTitle.
  ///
  /// In tr, this message translates to:
  /// **'Müzik ve Ses'**
  String get moduleMusicTitle;

  /// No description provided for @moduleAccTitle.
  ///
  /// In tr, this message translates to:
  /// **'İletişim Kartları (ACC)'**
  String get moduleAccTitle;

  /// No description provided for @moduleCalendarTitle.
  ///
  /// In tr, this message translates to:
  /// **'Takvim ve Program'**
  String get moduleCalendarTitle;

  /// No description provided for @moduleReminderTitle.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim Hatırlatıcı'**
  String get moduleReminderTitle;

  /// No description provided for @btnNew.
  ///
  /// In tr, this message translates to:
  /// **'Yeni'**
  String get btnNew;

  /// No description provided for @familyNoProfile.
  ///
  /// In tr, this message translates to:
  /// **'Henüz profil yok.'**
  String get familyNoProfile;

  /// No description provided for @familyActive.
  ///
  /// In tr, this message translates to:
  /// **'Aktif'**
  String get familyActive;

  /// No description provided for @familyContactInfo.
  ///
  /// In tr, this message translates to:
  /// **'İletişim Bilgileri'**
  String get familyContactInfo;

  /// No description provided for @familySaved.
  ///
  /// In tr, this message translates to:
  /// **'Kaydedildi.'**
  String get familySaved;

  /// No description provided for @familyNameSurname.
  ///
  /// In tr, this message translates to:
  /// **'Ad Soyad'**
  String get familyNameSurname;

  /// No description provided for @familyPhone.
  ///
  /// In tr, this message translates to:
  /// **'Telefon'**
  String get familyPhone;

  /// No description provided for @familyInstructorPhone.
  ///
  /// In tr, this message translates to:
  /// **'Eğitmen Telefonu'**
  String get familyInstructorPhone;

  /// No description provided for @familyDoctorPhone.
  ///
  /// In tr, this message translates to:
  /// **'Doktor Telefonu'**
  String get familyDoctorPhone;

  /// No description provided for @familyDeleteAcc.
  ///
  /// In tr, this message translates to:
  /// **'Hesabı Sil'**
  String get familyDeleteAcc;

  /// No description provided for @familyDeleteAccMsg.
  ///
  /// In tr, this message translates to:
  /// **'Hesabı silmek için şifrenizi girin.'**
  String get familyDeleteAccMsg;

  /// No description provided for @btnCancel.
  ///
  /// In tr, this message translates to:
  /// **'Vazgeç'**
  String get btnCancel;

  /// No description provided for @btnDelete.
  ///
  /// In tr, this message translates to:
  /// **'Sil'**
  String get btnDelete;

  /// No description provided for @familyPwdMinLength.
  ///
  /// In tr, this message translates to:
  /// **'Şifre gerekli (en az 8 karakter).'**
  String get familyPwdMinLength;

  /// No description provided for @emoNoise.
  ///
  /// In tr, this message translates to:
  /// **'Gürültü'**
  String get emoNoise;

  /// No description provided for @emoCrowd.
  ///
  /// In tr, this message translates to:
  /// **'Kalabalık'**
  String get emoCrowd;

  /// No description provided for @emoChange.
  ///
  /// In tr, this message translates to:
  /// **'Değişiklik'**
  String get emoChange;

  /// No description provided for @emoWaiting.
  ///
  /// In tr, this message translates to:
  /// **'Beklemek'**
  String get emoWaiting;

  /// No description provided for @emoFatigue.
  ///
  /// In tr, this message translates to:
  /// **'Yorgunluk'**
  String get emoFatigue;

  /// No description provided for @emoHunger.
  ///
  /// In tr, this message translates to:
  /// **'Açlık'**
  String get emoHunger;

  /// No description provided for @emoLight.
  ///
  /// In tr, this message translates to:
  /// **'Işık'**
  String get emoLight;

  /// No description provided for @emoTouch.
  ///
  /// In tr, this message translates to:
  /// **'Dokunma'**
  String get emoTouch;

  /// No description provided for @emoScreen.
  ///
  /// In tr, this message translates to:
  /// **'Ekran'**
  String get emoScreen;

  /// No description provided for @emoSeparation.
  ///
  /// In tr, this message translates to:
  /// **'Ayrılma'**
  String get emoSeparation;

  /// No description provided for @emoDeepBreath.
  ///
  /// In tr, this message translates to:
  /// **'Derin Nefes'**
  String get emoDeepBreath;

  /// No description provided for @emoBreak.
  ///
  /// In tr, this message translates to:
  /// **'Ara Vermek'**
  String get emoBreak;

  /// No description provided for @emoHug.
  ///
  /// In tr, this message translates to:
  /// **'Sarılma'**
  String get emoHug;

  /// No description provided for @emoHeadphones.
  ///
  /// In tr, this message translates to:
  /// **'Kulaklık'**
  String get emoHeadphones;

  /// No description provided for @emoDrinkWater.
  ///
  /// In tr, this message translates to:
  /// **'Su İçmek'**
  String get emoDrinkWater;

  /// No description provided for @emoCalmCorner.
  ///
  /// In tr, this message translates to:
  /// **'Sakin Köşe'**
  String get emoCalmCorner;

  /// No description provided for @emoMusic.
  ///
  /// In tr, this message translates to:
  /// **'Müzik'**
  String get emoMusic;

  /// No description provided for @emoSqueezeBall.
  ///
  /// In tr, this message translates to:
  /// **'Top Sıkma'**
  String get emoSqueezeBall;

  /// No description provided for @emoHappy.
  ///
  /// In tr, this message translates to:
  /// **'Mutlu'**
  String get emoHappy;

  /// No description provided for @emoSad.
  ///
  /// In tr, this message translates to:
  /// **'Üzgün'**
  String get emoSad;

  /// No description provided for @emoAngry.
  ///
  /// In tr, this message translates to:
  /// **'Kızgın'**
  String get emoAngry;

  /// No description provided for @emoSurprised.
  ///
  /// In tr, this message translates to:
  /// **'Şaşırmış'**
  String get emoSurprised;

  /// No description provided for @emoScared.
  ///
  /// In tr, this message translates to:
  /// **'Korkmuş'**
  String get emoScared;

  /// No description provided for @emoExcited.
  ///
  /// In tr, this message translates to:
  /// **'Heyecanlı'**
  String get emoExcited;

  /// No description provided for @emoHowDoYouFeel.
  ///
  /// In tr, this message translates to:
  /// **'Nasıl Hissediyorsun?'**
  String get emoHowDoYouFeel;

  /// No description provided for @emoIntensity.
  ///
  /// In tr, this message translates to:
  /// **'Şiddeti:'**
  String get emoIntensity;

  /// No description provided for @emoTriggers.
  ///
  /// In tr, this message translates to:
  /// **'Tetikleyiciler (Opsiyonel)'**
  String get emoTriggers;

  /// No description provided for @emoWhatHelps.
  ///
  /// In tr, this message translates to:
  /// **'Sana Ne İyi Gelir? (Opsiyonel)'**
  String get emoWhatHelps;

  /// No description provided for @emoBefore.
  ///
  /// In tr, this message translates to:
  /// **'Öncesinde ne oldu?'**
  String get emoBefore;

  /// No description provided for @emoAction.
  ///
  /// In tr, this message translates to:
  /// **'Ne hissettin/yaptın?'**
  String get emoAction;

  /// No description provided for @emoAfter.
  ///
  /// In tr, this message translates to:
  /// **'Sonrasında ne oldu?'**
  String get emoAfter;

  /// No description provided for @emoNotes.
  ///
  /// In tr, this message translates to:
  /// **'Ek Notlar'**
  String get emoNotes;

  /// No description provided for @emoPastRecords.
  ///
  /// In tr, this message translates to:
  /// **'Geçmiş Kayıtlar'**
  String get emoPastRecords;

  /// No description provided for @storyGrocery.
  ///
  /// In tr, this message translates to:
  /// **'Market Alışverişi'**
  String get storyGrocery;

  /// No description provided for @storyGrocery1.
  ///
  /// In tr, this message translates to:
  /// **'Market kalabalıktı.'**
  String get storyGrocery1;

  /// No description provided for @storyGrocery2.
  ///
  /// In tr, this message translates to:
  /// **'Sesler rahatsız ettiğinde kulaklığımı taktım.'**
  String get storyGrocery2;

  /// No description provided for @storyGrocery3.
  ///
  /// In tr, this message translates to:
  /// **'İstediğim atıştırmalığı bulunca mutlu oldum.'**
  String get storyGrocery3;

  /// No description provided for @storyGrocery4.
  ///
  /// In tr, this message translates to:
  /// **'Kasada sıramı sakince bekledim.'**
  String get storyGrocery4;

  /// No description provided for @storyVisit.
  ///
  /// In tr, this message translates to:
  /// **'Misafirliğe Gitmek'**
  String get storyVisit;

  /// No description provided for @storyVisit1.
  ///
  /// In tr, this message translates to:
  /// **'Yeni bir eve gittik.'**
  String get storyVisit1;

  /// No description provided for @storyVisit2.
  ///
  /// In tr, this message translates to:
  /// **'Önce selam verdim.'**
  String get storyVisit2;

  /// No description provided for @storyVisit3.
  ///
  /// In tr, this message translates to:
  /// **'Oyuncaklarımı paylaştım.'**
  String get storyVisit3;

  /// No description provided for @storyVisit4.
  ///
  /// In tr, this message translates to:
  /// **'Ayrılırken hoşça kal dedim.'**
  String get storyVisit4;

  /// No description provided for @storyBarber.
  ///
  /// In tr, this message translates to:
  /// **'Berbere Gitmek'**
  String get storyBarber;

  /// No description provided for @storyBarber1.
  ///
  /// In tr, this message translates to:
  /// **'Saç kesimi için berbere gittik.'**
  String get storyBarber1;

  /// No description provided for @storyBarber2.
  ///
  /// In tr, this message translates to:
  /// **'Makine sesi biraz yüksekti ama dayandım.'**
  String get storyBarber2;

  /// No description provided for @storyBarber3.
  ///
  /// In tr, this message translates to:
  /// **'Saçlarım kesilince çok yakışıklı oldum.'**
  String get storyBarber3;

  /// No description provided for @storyBarber4.
  ///
  /// In tr, this message translates to:
  /// **'Berbere teşekkür edip çıktık.'**
  String get storyBarber4;

  /// No description provided for @storyDoctor.
  ///
  /// In tr, this message translates to:
  /// **'Doktora Gitmek'**
  String get storyDoctor;

  /// No description provided for @storyDoctor1.
  ///
  /// In tr, this message translates to:
  /// **'Bugün kontrole gittik.'**
  String get storyDoctor1;

  /// No description provided for @storyDoctor2.
  ///
  /// In tr, this message translates to:
  /// **'Doktor kalbimi dinledi.'**
  String get storyDoctor2;

  /// No description provided for @storyDoctor3.
  ///
  /// In tr, this message translates to:
  /// **'Bana aferin dedi.'**
  String get storyDoctor3;

  /// No description provided for @storyDoctor4.
  ///
  /// In tr, this message translates to:
  /// **'Sağlıklı olmak çok güzel.'**
  String get storyDoctor4;

  /// No description provided for @storyTitle.
  ///
  /// In tr, this message translates to:
  /// **'Sosyal Öykü'**
  String get storyTitle;

  /// No description provided for @storyRead.
  ///
  /// In tr, this message translates to:
  /// **'Öyküyü Oku'**
  String get storyRead;

  /// No description provided for @btnBack.
  ///
  /// In tr, this message translates to:
  /// **'Geri'**
  String get btnBack;

  /// No description provided for @btnNext.
  ///
  /// In tr, this message translates to:
  /// **'İleri'**
  String get btnNext;

  /// No description provided for @btnFinish.
  ///
  /// In tr, this message translates to:
  /// **'Bitir'**
  String get btnFinish;

  /// No description provided for @storyQuestion.
  ///
  /// In tr, this message translates to:
  /// **'Soru'**
  String get storyQuestion;

  /// No description provided for @storyQuizQ.
  ///
  /// In tr, this message translates to:
  /// **'Bu öykünün adı hangisi?'**
  String get storyQuizQ;

  /// No description provided for @storyQuizCorrect.
  ///
  /// In tr, this message translates to:
  /// **'Doğru!'**
  String get storyQuizCorrect;

  /// No description provided for @storyQuizWrong.
  ///
  /// In tr, this message translates to:
  /// **'Tekrar dene.'**
  String get storyQuizWrong;

  /// No description provided for @musicCalming.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleştirici Melodi'**
  String get musicCalming;

  /// No description provided for @musicFocus.
  ///
  /// In tr, this message translates to:
  /// **'Odak Ritmi'**
  String get musicFocus;

  /// No description provided for @musicJoyful.
  ///
  /// In tr, this message translates to:
  /// **'Neşeli Çocuk Melodisi'**
  String get musicJoyful;

  /// No description provided for @musicSea.
  ///
  /// In tr, this message translates to:
  /// **'Deniz Sesi'**
  String get musicSea;

  /// No description provided for @musicRain.
  ///
  /// In tr, this message translates to:
  /// **'Yağmur Sesi'**
  String get musicRain;

  /// No description provided for @musicWind.
  ///
  /// In tr, this message translates to:
  /// **'Rüzgar Sesi'**
  String get musicWind;

  /// No description provided for @musicWhiteNoise.
  ///
  /// In tr, this message translates to:
  /// **'Beyaz Gürültü'**
  String get musicWhiteNoise;

  /// No description provided for @musicPinkNoise.
  ///
  /// In tr, this message translates to:
  /// **'Pembe Gürültü'**
  String get musicPinkNoise;

  /// No description provided for @musicBrownNoise.
  ///
  /// In tr, this message translates to:
  /// **'Kahverengi Gürültü'**
  String get musicBrownNoise;

  /// No description provided for @musicSleep.
  ///
  /// In tr, this message translates to:
  /// **'Uyku'**
  String get musicSleep;

  /// No description provided for @musicCalmingCat.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleşme'**
  String get musicCalmingCat;

  /// No description provided for @musicFocusCat.
  ///
  /// In tr, this message translates to:
  /// **'Odak'**
  String get musicFocusCat;

  /// No description provided for @musicNowPlaying.
  ///
  /// In tr, this message translates to:
  /// **'Şu an'**
  String get musicNowPlaying;

  /// No description provided for @musicNotSelected.
  ///
  /// In tr, this message translates to:
  /// **'Seçilmedi'**
  String get musicNotSelected;

  /// No description provided for @musicNotStarted.
  ///
  /// In tr, this message translates to:
  /// **'Bir parça seçip başlatabilirsin.'**
  String get musicNotStarted;

  /// No description provided for @musicTimeRemaining.
  ///
  /// In tr, this message translates to:
  /// **'Kalan süre:'**
  String get musicTimeRemaining;

  /// No description provided for @btnStop.
  ///
  /// In tr, this message translates to:
  /// **'Durdur'**
  String get btnStop;

  /// No description provided for @btnBreathe.
  ///
  /// In tr, this message translates to:
  /// **'Nefes'**
  String get btnBreathe;

  /// No description provided for @musicTracks.
  ///
  /// In tr, this message translates to:
  /// **'Parçalar'**
  String get musicTracks;

  /// No description provided for @musicRhythmTitle.
  ///
  /// In tr, this message translates to:
  /// **'Ritim Önerisi'**
  String get musicRhythmTitle;

  /// No description provided for @musicRhythmDesc.
  ///
  /// In tr, this message translates to:
  /// **'3 tur nefes egzersizi:\\n- 4 saniye nefes al\\n- 4 saniye tut\\n- 6 saniye ver\\n\\nİstersen sevdiğin bir parçayı açıp tekrar edebilirsin.'**
  String get musicRhythmDesc;

  /// No description provided for @musicDesc1.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleşme ve gevşeme için.'**
  String get musicDesc1;

  /// No description provided for @musicDesc2.
  ///
  /// In tr, this message translates to:
  /// **'Dikkati toplamak için ritim.'**
  String get musicDesc2;

  /// No description provided for @musicDesc3.
  ///
  /// In tr, this message translates to:
  /// **'Hareket ve motivasyon için.'**
  String get musicDesc3;

  /// No description provided for @musicDesc4.
  ///
  /// In tr, this message translates to:
  /// **'Uyku öncesi rahatlatıcı ortam sesi.'**
  String get musicDesc4;

  /// No description provided for @musicDesc5.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleşme için arka plan sesi.'**
  String get musicDesc5;

  /// No description provided for @musicDesc6.
  ///
  /// In tr, this message translates to:
  /// **'Hafif rüzgar ortam sesi.'**
  String get musicDesc6;

  /// No description provided for @musicDesc7.
  ///
  /// In tr, this message translates to:
  /// **'Odak için sabit gürültü.'**
  String get musicDesc7;

  /// No description provided for @musicDesc8.
  ///
  /// In tr, this message translates to:
  /// **'Daha yumuşak gürültü profili.'**
  String get musicDesc8;

  /// No description provided for @musicDesc9.
  ///
  /// In tr, this message translates to:
  /// **'Derin, düşük frekanslı gürültü.'**
  String get musicDesc9;

  /// No description provided for @accBasicNeeds.
  ///
  /// In tr, this message translates to:
  /// **'Temel İhtiyaçlar'**
  String get accBasicNeeds;

  /// No description provided for @accEmotions.
  ///
  /// In tr, this message translates to:
  /// **'Duygular'**
  String get accEmotions;

  /// No description provided for @accPlaceAction.
  ///
  /// In tr, this message translates to:
  /// **'Yer ve Eylem'**
  String get accPlaceAction;

  /// No description provided for @accCommunication.
  ///
  /// In tr, this message translates to:
  /// **'İletişim'**
  String get accCommunication;

  /// No description provided for @accWater.
  ///
  /// In tr, this message translates to:
  /// **'Su'**
  String get accWater;

  /// No description provided for @accHungry.
  ///
  /// In tr, this message translates to:
  /// **'Acıktım'**
  String get accHungry;

  /// No description provided for @accToilet.
  ///
  /// In tr, this message translates to:
  /// **'Tuvalet'**
  String get accToilet;

  /// No description provided for @accSleepy.
  ///
  /// In tr, this message translates to:
  /// **'Uykum Geldi'**
  String get accSleepy;

  /// No description provided for @accHelp.
  ///
  /// In tr, this message translates to:
  /// **'Yardım'**
  String get accHelp;

  /// No description provided for @accHug.
  ///
  /// In tr, this message translates to:
  /// **'Sarılmak'**
  String get accHug;

  /// No description provided for @accHappy.
  ///
  /// In tr, this message translates to:
  /// **'Mutluyum'**
  String get accHappy;

  /// No description provided for @accSad.
  ///
  /// In tr, this message translates to:
  /// **'Üzgünüm'**
  String get accSad;

  /// No description provided for @accScared.
  ///
  /// In tr, this message translates to:
  /// **'Korkuyorum'**
  String get accScared;

  /// No description provided for @accExcited.
  ///
  /// In tr, this message translates to:
  /// **'Heyecanlıyım'**
  String get accExcited;

  /// No description provided for @accAngry.
  ///
  /// In tr, this message translates to:
  /// **'Kızgınım'**
  String get accAngry;

  /// No description provided for @accCalm.
  ///
  /// In tr, this message translates to:
  /// **'Sakinim'**
  String get accCalm;

  /// No description provided for @accTired.
  ///
  /// In tr, this message translates to:
  /// **'Yorgunum'**
  String get accTired;

  /// No description provided for @accSurprised.
  ///
  /// In tr, this message translates to:
  /// **'Şaşkınım'**
  String get accSurprised;

  /// No description provided for @accGoHome.
  ///
  /// In tr, this message translates to:
  /// **'Eve Gidelim'**
  String get accGoHome;

  /// No description provided for @accGoOut.
  ///
  /// In tr, this message translates to:
  /// **'Dışarı Çıkalım'**
  String get accGoOut;

  /// No description provided for @accDressUp.
  ///
  /// In tr, this message translates to:
  /// **'Giyinmek'**
  String get accDressUp;

  /// No description provided for @accGoPark.
  ///
  /// In tr, this message translates to:
  /// **'Parka Gidelim'**
  String get accGoPark;

  /// No description provided for @accGoSchool.
  ///
  /// In tr, this message translates to:
  /// **'Okula Gidelim'**
  String get accGoSchool;

  /// No description provided for @accPlayMusic.
  ///
  /// In tr, this message translates to:
  /// **'Müzik Aç'**
  String get accPlayMusic;

  /// No description provided for @accPlayGames.
  ///
  /// In tr, this message translates to:
  /// **'Oyun Oynamak'**
  String get accPlayGames;

  /// No description provided for @accCheckCalendar.
  ///
  /// In tr, this message translates to:
  /// **'Takvime Bakalım'**
  String get accCheckCalendar;

  /// No description provided for @accMe.
  ///
  /// In tr, this message translates to:
  /// **'Ben'**
  String get accMe;

  /// No description provided for @accPlease.
  ///
  /// In tr, this message translates to:
  /// **'Lütfen'**
  String get accPlease;

  /// No description provided for @accThankYou.
  ///
  /// In tr, this message translates to:
  /// **'Teşekkür Ederim'**
  String get accThankYou;

  /// No description provided for @accYes.
  ///
  /// In tr, this message translates to:
  /// **'Evet'**
  String get accYes;

  /// No description provided for @accNo.
  ///
  /// In tr, this message translates to:
  /// **'Hayır'**
  String get accNo;

  /// No description provided for @accPhone.
  ///
  /// In tr, this message translates to:
  /// **'Telefon'**
  String get accPhone;

  /// No description provided for @accTapCard.
  ///
  /// In tr, this message translates to:
  /// **'Bir karta dokun...'**
  String get accTapCard;

  /// No description provided for @btnClear.
  ///
  /// In tr, this message translates to:
  /// **'Temizle'**
  String get btnClear;

  /// No description provided for @accSentence.
  ///
  /// In tr, this message translates to:
  /// **'Cümle'**
  String get accSentence;

  /// No description provided for @btnShow.
  ///
  /// In tr, this message translates to:
  /// **'Göster'**
  String get btnShow;

  /// No description provided for @calMorning.
  ///
  /// In tr, this message translates to:
  /// **'Sabah Rutini'**
  String get calMorning;

  /// No description provided for @calMorningDesc.
  ///
  /// In tr, this message translates to:
  /// **'Uyan, yüzünü yıka ve kahvaltı yap.'**
  String get calMorningDesc;

  /// No description provided for @calSchool.
  ///
  /// In tr, this message translates to:
  /// **'Okul Zamanı'**
  String get calSchool;

  /// No description provided for @calSchoolDesc.
  ///
  /// In tr, this message translates to:
  /// **'Okula git ve derslerine katıl.'**
  String get calSchoolDesc;

  /// No description provided for @calLunch.
  ///
  /// In tr, this message translates to:
  /// **'Öğle Yemeği'**
  String get calLunch;

  /// No description provided for @calLunchDesc.
  ///
  /// In tr, this message translates to:
  /// **'Yemeğini bitir ve biraz dinlen.'**
  String get calLunchDesc;

  /// No description provided for @calFreeTime.
  ///
  /// In tr, this message translates to:
  /// **'Serbest Zaman'**
  String get calFreeTime;

  /// No description provided for @calFreeTimeDesc.
  ///
  /// In tr, this message translates to:
  /// **'İstediğin bir oyunu oyna.'**
  String get calFreeTimeDesc;

  /// No description provided for @calDinner.
  ///
  /// In tr, this message translates to:
  /// **'Akşam Yemeği'**
  String get calDinner;

  /// No description provided for @calDinnerDesc.
  ///
  /// In tr, this message translates to:
  /// **'Ailece yemek vakti.'**
  String get calDinnerDesc;

  /// No description provided for @calBedtime.
  ///
  /// In tr, this message translates to:
  /// **'Uyku Hazırlığı'**
  String get calBedtime;

  /// No description provided for @calBedtimeDesc.
  ///
  /// In tr, this message translates to:
  /// **'Dişlerini fırçala, pijamanı giy, uyu.'**
  String get calBedtimeDesc;

  /// No description provided for @calToday.
  ///
  /// In tr, this message translates to:
  /// **'Bugünün Programı'**
  String get calToday;

  /// No description provided for @calYesterday.
  ///
  /// In tr, this message translates to:
  /// **'Dün'**
  String get calYesterday;

  /// No description provided for @calTomorrow.
  ///
  /// In tr, this message translates to:
  /// **'Yarın'**
  String get calTomorrow;

  /// No description provided for @calNotCompleted.
  ///
  /// In tr, this message translates to:
  /// **'Tamamlanmadı'**
  String get calNotCompleted;

  /// No description provided for @calCompleted.
  ///
  /// In tr, this message translates to:
  /// **'Tamamlandı!'**
  String get calCompleted;

  /// No description provided for @remMedicine.
  ///
  /// In tr, this message translates to:
  /// **'İlaç Zamanı'**
  String get remMedicine;

  /// No description provided for @remMedicineDesc.
  ///
  /// In tr, this message translates to:
  /// **'Vitaminleri unutma.'**
  String get remMedicineDesc;

  /// No description provided for @remExercise.
  ///
  /// In tr, this message translates to:
  /// **'Egzersiz'**
  String get remExercise;

  /// No description provided for @remExerciseDesc.
  ///
  /// In tr, this message translates to:
  /// **'15 dk esneme.'**
  String get remExerciseDesc;

  /// No description provided for @remReading.
  ///
  /// In tr, this message translates to:
  /// **'Kitap Okuma'**
  String get remReading;

  /// No description provided for @remReadingDesc.
  ///
  /// In tr, this message translates to:
  /// **'Uyku öncesi hikaye.'**
  String get remReadingDesc;

  /// No description provided for @remAddReminder.
  ///
  /// In tr, this message translates to:
  /// **'Hatırlatıcı Ekle'**
  String get remAddReminder;

  /// No description provided for @remTitleLabel.
  ///
  /// In tr, this message translates to:
  /// **'Başlık'**
  String get remTitleLabel;

  /// No description provided for @remTitleHint.
  ///
  /// In tr, this message translates to:
  /// **'Örn: Fizyoterapi'**
  String get remTitleHint;

  /// No description provided for @remDescLabel.
  ///
  /// In tr, this message translates to:
  /// **'Açıklama'**
  String get remDescLabel;

  /// No description provided for @remTimeLabel.
  ///
  /// In tr, this message translates to:
  /// **'Saat'**
  String get remTimeLabel;

  /// No description provided for @remRepeatLabel.
  ///
  /// In tr, this message translates to:
  /// **'Tekrar'**
  String get remRepeatLabel;

  /// No description provided for @remNone.
  ///
  /// In tr, this message translates to:
  /// **'Hiçbiri'**
  String get remNone;

  /// No description provided for @remDaily.
  ///
  /// In tr, this message translates to:
  /// **'Her Gün'**
  String get remDaily;

  /// No description provided for @remWeekly.
  ///
  /// In tr, this message translates to:
  /// **'Haftalık'**
  String get remWeekly;

  /// No description provided for @remMonthly.
  ///
  /// In tr, this message translates to:
  /// **'Aylık'**
  String get remMonthly;

  /// No description provided for @remTitle.
  ///
  /// In tr, this message translates to:
  /// **'Hatırlatıcılar'**
  String get remTitle;

  /// No description provided for @remNoReminder.
  ///
  /// In tr, this message translates to:
  /// **'Henüz hatırlatıcı yok.'**
  String get remNoReminder;

  /// No description provided for @gameMemory.
  ///
  /// In tr, this message translates to:
  /// **'Hafıza Oyunu'**
  String get gameMemory;

  /// No description provided for @gameMemoryDesc.
  ///
  /// In tr, this message translates to:
  /// **'Kartları eşleştirerek hafızanı güçlendir.'**
  String get gameMemoryDesc;

  /// No description provided for @gameBalloons.
  ///
  /// In tr, this message translates to:
  /// **'Renkli Balonlar'**
  String get gameBalloons;

  /// No description provided for @gameBalloonsDesc.
  ///
  /// In tr, this message translates to:
  /// **'Belirtilen renkteki balonları patlat.'**
  String get gameBalloonsDesc;

  /// No description provided for @gameEmotion.
  ///
  /// In tr, this message translates to:
  /// **'Duygu Eşleştirme'**
  String get gameEmotion;

  /// No description provided for @gameEmotionDesc.
  ///
  /// In tr, this message translates to:
  /// **'Yüz ifadeleriyle duyguları eşleştir.'**
  String get gameEmotionDesc;

  /// No description provided for @gameShapes.
  ///
  /// In tr, this message translates to:
  /// **'Şekil Yerleştirme'**
  String get gameShapes;

  /// No description provided for @gameShapesDesc.
  ///
  /// In tr, this message translates to:
  /// **'Eksik şekilleri doğru yere koy.'**
  String get gameShapesDesc;

  /// No description provided for @gameComingSoon.
  ///
  /// In tr, this message translates to:
  /// **'Yakında gelecek'**
  String get gameComingSoon;

  /// No description provided for @authErrKvkkRequired.
  ///
  /// In tr, this message translates to:
  /// **'Devam etmek için KVKK onayı gerekli.'**
  String get authErrKvkkRequired;

  /// No description provided for @authTextKvkk.
  ///
  /// In tr, this message translates to:
  /// **'Devam ederek KVKK Açık Rıza metnini kabul etmiş olursunuz.'**
  String get authTextKvkk;

  /// No description provided for @moduleLabelFeaturedGuide.
  ///
  /// In tr, this message translates to:
  /// **'Öne Çıkan Rehber'**
  String get moduleLabelFeaturedGuide;

  /// No description provided for @moduleLabelCategories.
  ///
  /// In tr, this message translates to:
  /// **'Kategoriler'**
  String get moduleLabelCategories;

  /// No description provided for @moduleLabelReadMore.
  ///
  /// In tr, this message translates to:
  /// **'Devamını Oku'**
  String get moduleLabelReadMore;

  /// No description provided for @homeAgeLabel.
  ///
  /// In tr, this message translates to:
  /// **'Yaş: -'**
  String get homeAgeLabel;

  /// No description provided for @homeAgeYears.
  ///
  /// In tr, this message translates to:
  /// **'{count} yaş'**
  String homeAgeYears(int count);

  /// No description provided for @homeAgeMonths.
  ///
  /// In tr, this message translates to:
  /// **'{count} ay'**
  String homeAgeMonths(int count);

  /// No description provided for @homeAgeDays.
  ///
  /// In tr, this message translates to:
  /// **'{count} gün'**
  String homeAgeDays(int count);

  /// No description provided for @authSubtitleAwareness.
  ///
  /// In tr, this message translates to:
  /// **'Otizm Farkındalık'**
  String get authSubtitleAwareness;

  /// No description provided for @moduleTitleInfo.
  ///
  /// In tr, this message translates to:
  /// **'Otizm Bilgilendirme'**
  String get moduleTitleInfo;

  /// No description provided for @moduleTitleOsb.
  ///
  /// In tr, this message translates to:
  /// **'OSB (Otizm Spektrum Bozukluğu)'**
  String get moduleTitleOsb;

  /// No description provided for @moduleTitleOsbResearch.
  ///
  /// In tr, this message translates to:
  /// **'OSB Hakkında Güncel Araştırmalar'**
  String get moduleTitleOsbResearch;

  /// No description provided for @moduleTitleEducation.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim & ABA'**
  String get moduleTitleEducation;

  /// No description provided for @moduleTitleEmotions.
  ///
  /// In tr, this message translates to:
  /// **'Duygularım'**
  String get moduleTitleEmotions;

  /// No description provided for @moduleTitleGames.
  ///
  /// In tr, this message translates to:
  /// **'Eğitici Oyunlar'**
  String get moduleTitleGames;

  /// No description provided for @moduleTitleStories.
  ///
  /// In tr, this message translates to:
  /// **'Sosyal Öyküler'**
  String get moduleTitleStories;

  /// No description provided for @moduleTitleMusic.
  ///
  /// In tr, this message translates to:
  /// **'Müzik & Ses Terapisi'**
  String get moduleTitleMusic;

  /// No description provided for @moduleTitleAcc.
  ///
  /// In tr, this message translates to:
  /// **'ACC (Alternatif İletişim)'**
  String get moduleTitleAcc;

  /// No description provided for @moduleTitleCalendar.
  ///
  /// In tr, this message translates to:
  /// **'Görsel Takvim'**
  String get moduleTitleCalendar;

  /// No description provided for @moduleTitleEduReminder.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim Hatırlatıcıları'**
  String get moduleTitleEduReminder;

  /// No description provided for @moduleTitleSensory.
  ///
  /// In tr, this message translates to:
  /// **'Duyu Bütünleme'**
  String get moduleTitleSensory;

  /// No description provided for @moduleTitleObjects.
  ///
  /// In tr, this message translates to:
  /// **'Eşyalarım'**
  String get moduleTitleObjects;

  /// No description provided for @moduleTitleSentenceSounds.
  ///
  /// In tr, this message translates to:
  /// **'Cümle Sesleri'**
  String get moduleTitleSentenceSounds;

  /// No description provided for @moduleTitleImitation.
  ///
  /// In tr, this message translates to:
  /// **'Taklit Becerileri'**
  String get moduleTitleImitation;

  /// No description provided for @moduleTitleDefault.
  ///
  /// In tr, this message translates to:
  /// **'Modül'**
  String get moduleTitleDefault;

  /// No description provided for @modSentence.
  ///
  /// In tr, this message translates to:
  /// **'Cümle Sesleri'**
  String get modSentence;

  /// No description provided for @catZeka.
  ///
  /// In tr, this message translates to:
  /// **'OtiZeka'**
  String get catZeka;

  /// No description provided for @catZekaSub.
  ///
  /// In tr, this message translates to:
  /// **'Yapay Zeka ve Mantık'**
  String get catZekaSub;

  /// No description provided for @catTherapy.
  ///
  /// In tr, this message translates to:
  /// **'Terapi'**
  String get catTherapy;

  /// No description provided for @catTherapySub.
  ///
  /// In tr, this message translates to:
  /// **'Terapi Modülleri'**
  String get catTherapySub;

  /// No description provided for @modEduGames.
  ///
  /// In tr, this message translates to:
  /// **'Eğitici Oyunlar'**
  String get modEduGames;

  /// No description provided for @modSensory.
  ///
  /// In tr, this message translates to:
  /// **'Duyu Bütünleme'**
  String get modSensory;

  /// No description provided for @modObjects.
  ///
  /// In tr, this message translates to:
  /// **'Eşyalarım'**
  String get modObjects;

  /// No description provided for @modImitation.
  ///
  /// In tr, this message translates to:
  /// **'Taklit'**
  String get modImitation;

  /// No description provided for @catGuidance.
  ///
  /// In tr, this message translates to:
  /// **'Rehberlik'**
  String get catGuidance;

  /// No description provided for @catGuidanceSub.
  ///
  /// In tr, this message translates to:
  /// **'Ebeveyn Rehberliği'**
  String get catGuidanceSub;

  /// No description provided for @modEduGuide.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim Rehberi'**
  String get modEduGuide;

  /// No description provided for @modResearch.
  ///
  /// In tr, this message translates to:
  /// **'Güncel Araştırmalar'**
  String get modResearch;

  /// No description provided for @activeProfile.
  ///
  /// In tr, this message translates to:
  /// **'Aktif Profil'**
  String get activeProfile;

  /// No description provided for @dailyProgressTitle.
  ///
  /// In tr, this message translates to:
  /// **'{name} için Günlük İlerleme'**
  String dailyProgressTitle(String name);

  /// No description provided for @moduleProgress.
  ///
  /// In tr, this message translates to:
  /// **'Tamamlanan {current} / {total}'**
  String moduleProgress(int current, int total);

  /// No description provided for @familyTabPrivacy.
  ///
  /// In tr, this message translates to:
  /// **'Gizlilik'**
  String get familyTabPrivacy;

  /// No description provided for @familyTitleDeleteAccount.
  ///
  /// In tr, this message translates to:
  /// **'Hesabı Sil'**
  String get familyTitleDeleteAccount;

  /// No description provided for @profileSettings.
  ///
  /// In tr, this message translates to:
  /// **'Profil Ayarları'**
  String get profileSettings;

  /// No description provided for @logout.
  ///
  /// In tr, this message translates to:
  /// **'Çıkış Yap'**
  String get logout;

  /// No description provided for @helloUser.
  ///
  /// In tr, this message translates to:
  /// **'Merhaba, {name}'**
  String helloUser(String name);

  /// No description provided for @greeting.
  ///
  /// In tr, this message translates to:
  /// **'Merhaba {name}'**
  String greeting(String name);

  /// No description provided for @welcomeSubtitle.
  ///
  /// In tr, this message translates to:
  /// **'Hoş Geldiniz'**
  String get welcomeSubtitle;

  /// No description provided for @familyTabSettings.
  ///
  /// In tr, this message translates to:
  /// **'Ayarlar'**
  String get familyTabSettings;

  /// No description provided for @familyErrCallFailed.
  ///
  /// In tr, this message translates to:
  /// **'Arama başlatılamadı'**
  String get familyErrCallFailed;

  /// No description provided for @familyErrCallError.
  ///
  /// In tr, this message translates to:
  /// **'Arama başlatılırken hata oluştu'**
  String get familyErrCallError;

  /// No description provided for @familyTitleContactInfo.
  ///
  /// In tr, this message translates to:
  /// **'İletişim Bilgileri'**
  String get familyTitleContactInfo;

  /// No description provided for @familyLabelFullName.
  ///
  /// In tr, this message translates to:
  /// **'Veli/Bakım Veren Ad Soyad'**
  String get familyLabelFullName;

  /// No description provided for @familyLabelPhone.
  ///
  /// In tr, this message translates to:
  /// **'Telefon Numarası'**
  String get familyLabelPhone;

  /// No description provided for @familyLabelInstructorPhone.
  ///
  /// In tr, this message translates to:
  /// **'Eğitmen Telefonu'**
  String get familyLabelInstructorPhone;

  /// No description provided for @familyLabelDoctorPhone.
  ///
  /// In tr, this message translates to:
  /// **'Doktor Telefonu'**
  String get familyLabelDoctorPhone;

  /// No description provided for @familyMsgSaved.
  ///
  /// In tr, this message translates to:
  /// **'Bilgiler kaydedildi.'**
  String get familyMsgSaved;

  /// No description provided for @familyBtnSave.
  ///
  /// In tr, this message translates to:
  /// **'Kaydet'**
  String get familyBtnSave;

  /// No description provided for @familyDescDeleteAccount.
  ///
  /// In tr, this message translates to:
  /// **'Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.'**
  String get familyDescDeleteAccount;

  /// No description provided for @familyBtnCancel.
  ///
  /// In tr, this message translates to:
  /// **'İptal'**
  String get familyBtnCancel;

  /// No description provided for @familyBtnDelete.
  ///
  /// In tr, this message translates to:
  /// **'Sil'**
  String get familyBtnDelete;

  /// No description provided for @familyErrPasswordRequired.
  ///
  /// In tr, this message translates to:
  /// **'Hesabı silmek için şifre gereklidir.'**
  String get familyErrPasswordRequired;

  /// No description provided for @familyTabProfiles.
  ///
  /// In tr, this message translates to:
  /// **'Profiller'**
  String get familyTabProfiles;

  /// No description provided for @familyTitleNewProfile.
  ///
  /// In tr, this message translates to:
  /// **'Yeni Profil'**
  String get familyTitleNewProfile;

  /// No description provided for @familyTitleEditProfile.
  ///
  /// In tr, this message translates to:
  /// **'Profili Düzenle'**
  String get familyTitleEditProfile;

  /// No description provided for @familyBtnChangePhoto.
  ///
  /// In tr, this message translates to:
  /// **'Fotoğrafı Değiştir'**
  String get familyBtnChangePhoto;

  /// No description provided for @familyLabelChildName.
  ///
  /// In tr, this message translates to:
  /// **'Çocuk Adı'**
  String get familyLabelChildName;

  /// No description provided for @familyLabelBirthDate.
  ///
  /// In tr, this message translates to:
  /// **'Doğum Tarihi'**
  String get familyLabelBirthDate;

  /// No description provided for @familyLabelAgeOptional.
  ///
  /// In tr, this message translates to:
  /// **'Yaş (Opsiyonel)'**
  String get familyLabelAgeOptional;

  /// No description provided for @familyLabelFamilyNotes.
  ///
  /// In tr, this message translates to:
  /// **'Aile Notları'**
  String get familyLabelFamilyNotes;

  /// No description provided for @familyLabelEduNotes.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim Notları'**
  String get familyLabelEduNotes;

  /// No description provided for @familyTitleChildProfiles.
  ///
  /// In tr, this message translates to:
  /// **'Çocuk Profilleri'**
  String get familyTitleChildProfiles;

  /// No description provided for @familyBtnNew.
  ///
  /// In tr, this message translates to:
  /// **'Yeni'**
  String get familyBtnNew;

  /// No description provided for @familyTxtNoProfile.
  ///
  /// In tr, this message translates to:
  /// **'Profil bulunamadı.'**
  String get familyTxtNoProfile;

  /// No description provided for @familyTxtUnnamed.
  ///
  /// In tr, this message translates to:
  /// **'İsimsiz'**
  String get familyTxtUnnamed;

  /// No description provided for @familyBtnActive.
  ///
  /// In tr, this message translates to:
  /// **'Aktif'**
  String get familyBtnActive;

  /// No description provided for @familyTitlePanel.
  ///
  /// In tr, this message translates to:
  /// **'Aile Paneli'**
  String get familyTitlePanel;

  /// No description provided for @familyTabProfile.
  ///
  /// In tr, this message translates to:
  /// **'Profil'**
  String get familyTabProfile;

  /// No description provided for @familyTabContact.
  ///
  /// In tr, this message translates to:
  /// **'İletişim'**
  String get familyTabContact;

  /// No description provided for @emotionsTitle.
  ///
  /// In tr, this message translates to:
  /// **'Duygunu seç'**
  String get emotionsTitle;

  /// No description provided for @emotionsIntensity.
  ///
  /// In tr, this message translates to:
  /// **'Şiddet (1-5)'**
  String get emotionsIntensity;

  /// No description provided for @emotionsTriggers.
  ///
  /// In tr, this message translates to:
  /// **'Tetikleyiciler'**
  String get emotionsTriggers;

  /// No description provided for @emotionsAntecedent.
  ///
  /// In tr, this message translates to:
  /// **'Öncesi (ne oldu?)'**
  String get emotionsAntecedent;

  /// No description provided for @emotionsBehavior.
  ///
  /// In tr, this message translates to:
  /// **'Davranış'**
  String get emotionsBehavior;

  /// No description provided for @emotionsConsequence.
  ///
  /// In tr, this message translates to:
  /// **'Sonuç'**
  String get emotionsConsequence;

  /// No description provided for @emotionsNotes.
  ///
  /// In tr, this message translates to:
  /// **'Ek Notlar'**
  String get emotionsNotes;

  /// No description provided for @emotionsHelped.
  ///
  /// In tr, this message translates to:
  /// **'Neler İyi Geldi?'**
  String get emotionsHelped;

  /// No description provided for @emotionsSave.
  ///
  /// In tr, this message translates to:
  /// **'Kaydet'**
  String get emotionsSave;

  /// No description provided for @emotionsEmpty.
  ///
  /// In tr, this message translates to:
  /// **'Henüz kayıt yok.'**
  String get emotionsEmpty;

  /// No description provided for @emotionHappy.
  ///
  /// In tr, this message translates to:
  /// **'Mutlu'**
  String get emotionHappy;

  /// No description provided for @emotionSad.
  ///
  /// In tr, this message translates to:
  /// **'Üzgün'**
  String get emotionSad;

  /// No description provided for @emotionAngry.
  ///
  /// In tr, this message translates to:
  /// **'Kızgın'**
  String get emotionAngry;

  /// No description provided for @emotionSurprised.
  ///
  /// In tr, this message translates to:
  /// **'Şaşırmış'**
  String get emotionSurprised;

  /// No description provided for @emotionScared.
  ///
  /// In tr, this message translates to:
  /// **'Korkmuş'**
  String get emotionScared;

  /// No description provided for @emotionExcited.
  ///
  /// In tr, this message translates to:
  /// **'Heyecanlı'**
  String get emotionExcited;

  /// No description provided for @triggerNoise.
  ///
  /// In tr, this message translates to:
  /// **'Gürültü'**
  String get triggerNoise;

  /// No description provided for @triggerCrowd.
  ///
  /// In tr, this message translates to:
  /// **'Kalabalık'**
  String get triggerCrowd;

  /// No description provided for @triggerChange.
  ///
  /// In tr, this message translates to:
  /// **'Değişiklik'**
  String get triggerChange;

  /// No description provided for @triggerWait.
  ///
  /// In tr, this message translates to:
  /// **'Beklemek'**
  String get triggerWait;

  /// No description provided for @triggerFatigue.
  ///
  /// In tr, this message translates to:
  /// **'Yorgunluk'**
  String get triggerFatigue;

  /// No description provided for @triggerHunger.
  ///
  /// In tr, this message translates to:
  /// **'Açlık'**
  String get triggerHunger;

  /// No description provided for @triggerLight.
  ///
  /// In tr, this message translates to:
  /// **'Işık'**
  String get triggerLight;

  /// No description provided for @triggerTouch.
  ///
  /// In tr, this message translates to:
  /// **'Dokunma'**
  String get triggerTouch;

  /// No description provided for @triggerScreen.
  ///
  /// In tr, this message translates to:
  /// **'Ekran'**
  String get triggerScreen;

  /// No description provided for @triggerSeparation.
  ///
  /// In tr, this message translates to:
  /// **'Ayrılma'**
  String get triggerSeparation;

  /// No description provided for @helpBreath.
  ///
  /// In tr, this message translates to:
  /// **'Derin Nefes'**
  String get helpBreath;

  /// No description provided for @helpBreak.
  ///
  /// In tr, this message translates to:
  /// **'Ara Vermek'**
  String get helpBreak;

  /// No description provided for @helpHug.
  ///
  /// In tr, this message translates to:
  /// **'Sarılma'**
  String get helpHug;

  /// No description provided for @helpHeadphones.
  ///
  /// In tr, this message translates to:
  /// **'Kulaklık'**
  String get helpHeadphones;

  /// No description provided for @helpWater.
  ///
  /// In tr, this message translates to:
  /// **'Su İçmek'**
  String get helpWater;

  /// No description provided for @helpCorner.
  ///
  /// In tr, this message translates to:
  /// **'Sakin Köşe'**
  String get helpCorner;

  /// No description provided for @helpMusic.
  ///
  /// In tr, this message translates to:
  /// **'Müzik'**
  String get helpMusic;

  /// No description provided for @helpBall.
  ///
  /// In tr, this message translates to:
  /// **'Top Sıkma'**
  String get helpBall;

  /// No description provided for @homeAgeNewborn.
  ///
  /// In tr, this message translates to:
  /// **'Yeni doğan'**
  String get homeAgeNewborn;

  /// No description provided for @storySelect.
  ///
  /// In tr, this message translates to:
  /// **'Öykü seç'**
  String get storySelect;

  /// No description provided for @musicMainTitle.
  ///
  /// In tr, this message translates to:
  /// **'Müzik ve Rahatlatıcı Sesler'**
  String get musicMainTitle;

  /// No description provided for @musicMainSubtitle.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleşme, odaklanma veya uyku öncesi için uygun bir ses seçip başlatabilirsiniz.'**
  String get musicMainSubtitle;

  /// No description provided for @musicPlaying.
  ///
  /// In tr, this message translates to:
  /// **'Çalıyor...'**
  String get musicPlaying;

  /// No description provided for @btnStart.
  ///
  /// In tr, this message translates to:
  /// **'Başlat'**
  String get btnStart;

  /// No description provided for @musicDurationPrefix.
  ///
  /// In tr, this message translates to:
  /// **'Süre'**
  String get musicDurationPrefix;

  /// No description provided for @gameSelect.
  ///
  /// In tr, this message translates to:
  /// **'Oyun seç'**
  String get gameSelect;

  /// No description provided for @gameTitleEmotions.
  ///
  /// In tr, this message translates to:
  /// **'Duyguları Eşleştir'**
  String get gameTitleEmotions;

  /// No description provided for @gameDescEmotions.
  ///
  /// In tr, this message translates to:
  /// **'Hangi duygu hangi kelime?'**
  String get gameDescEmotions;

  /// No description provided for @gameTitleMatching.
  ///
  /// In tr, this message translates to:
  /// **'Eşleştirme Oyunu'**
  String get gameTitleMatching;

  /// No description provided for @gameDescMatching.
  ///
  /// In tr, this message translates to:
  /// **'Aynı meyveleri bulup eşleştir'**
  String get gameDescMatching;

  /// No description provided for @gameTitleCounting.
  ///
  /// In tr, this message translates to:
  /// **'Sayı Saymaca'**
  String get gameTitleCounting;

  /// No description provided for @gameDescCounting.
  ///
  /// In tr, this message translates to:
  /// **'Eğlenceli sayılarla öğren'**
  String get gameDescCounting;

  /// No description provided for @gameTitleColors.
  ///
  /// In tr, this message translates to:
  /// **'Renkleri Bul'**
  String get gameTitleColors;

  /// No description provided for @gameDescColors.
  ///
  /// In tr, this message translates to:
  /// **'Doğru rengi seç'**
  String get gameDescColors;

  /// No description provided for @gameTitleMemory.
  ///
  /// In tr, this message translates to:
  /// **'Hafıza Kartları'**
  String get gameTitleMemory;

  /// No description provided for @gameDescMemory.
  ///
  /// In tr, this message translates to:
  /// **'Kartların yerini hatırla'**
  String get gameDescMemory;

  /// No description provided for @gameTitleShapes.
  ///
  /// In tr, this message translates to:
  /// **'Şekilleri Tanı'**
  String get gameTitleShapes;

  /// No description provided for @gameDescShapes.
  ///
  /// In tr, this message translates to:
  /// **'Doğru şekli seç'**
  String get gameDescShapes;

  /// No description provided for @gameTitleColoring.
  ///
  /// In tr, this message translates to:
  /// **'Boyama Oyunu'**
  String get gameTitleColoring;

  /// No description provided for @gameDescColoring.
  ///
  /// In tr, this message translates to:
  /// **'Şekilleri dilediğin renge boya'**
  String get gameDescColoring;

  /// No description provided for @gameTargetColorPrefix.
  ///
  /// In tr, this message translates to:
  /// **'Hedef'**
  String get gameTargetColorPrefix;

  /// No description provided for @gameSelectCorrectColor.
  ///
  /// In tr, this message translates to:
  /// **'Doğru rengi seç'**
  String get gameSelectCorrectColor;

  /// No description provided for @gameSelectCorrectShape.
  ///
  /// In tr, this message translates to:
  /// **'Doğru şekli seç'**
  String get gameSelectCorrectShape;

  /// No description provided for @gameHowMany.
  ///
  /// In tr, this message translates to:
  /// **'Kaç tane var?'**
  String get gameHowMany;

  /// No description provided for @gameNextQuestion.
  ///
  /// In tr, this message translates to:
  /// **'Yeni Soru'**
  String get gameNextQuestion;

  /// No description provided for @gameStatusMatch.
  ///
  /// In tr, this message translates to:
  /// **'Eşleştir'**
  String get gameStatusMatch;

  /// No description provided for @gameStatusAllMatched.
  ///
  /// In tr, this message translates to:
  /// **'Tebrikler, hepsi eşleşti!'**
  String get gameStatusAllMatched;

  /// No description provided for @gameCongratsLevel.
  ///
  /// In tr, this message translates to:
  /// **'Tebrikler! • Seviye {level}/{maxLevel}'**
  String gameCongratsLevel(int level, int maxLevel);

  /// No description provided for @gameLevelMoves.
  ///
  /// In tr, this message translates to:
  /// **'Seviye {level}/{maxLevel} • Hamle: {moves}'**
  String gameLevelMoves(int level, int maxLevel, int moves);

  /// No description provided for @btnPrev.
  ///
  /// In tr, this message translates to:
  /// **'Önceki'**
  String get btnPrev;

  /// No description provided for @btnNextLevel.
  ///
  /// In tr, this message translates to:
  /// **'Sonraki Seviye'**
  String get btnNextLevel;

  /// No description provided for @btnRestart.
  ///
  /// In tr, this message translates to:
  /// **'Yeniden Başlat'**
  String get btnRestart;

  /// No description provided for @btnTryAgain.
  ///
  /// In tr, this message translates to:
  /// **'Yeniden'**
  String get btnTryAgain;

  /// No description provided for @colorRed.
  ///
  /// In tr, this message translates to:
  /// **'Kırmızı'**
  String get colorRed;

  /// No description provided for @colorBlue.
  ///
  /// In tr, this message translates to:
  /// **'Mavi'**
  String get colorBlue;

  /// No description provided for @colorGreen.
  ///
  /// In tr, this message translates to:
  /// **'Yeşil'**
  String get colorGreen;

  /// No description provided for @colorYellow.
  ///
  /// In tr, this message translates to:
  /// **'Sarı'**
  String get colorYellow;

  /// No description provided for @colorPurple.
  ///
  /// In tr, this message translates to:
  /// **'Mor'**
  String get colorPurple;

  /// No description provided for @colorOrange.
  ///
  /// In tr, this message translates to:
  /// **'Turuncu'**
  String get colorOrange;

  /// No description provided for @colorPink.
  ///
  /// In tr, this message translates to:
  /// **'Pembe'**
  String get colorPink;

  /// No description provided for @shapeCircle.
  ///
  /// In tr, this message translates to:
  /// **'Daire'**
  String get shapeCircle;

  /// No description provided for @shapeSquare.
  ///
  /// In tr, this message translates to:
  /// **'Kare'**
  String get shapeSquare;

  /// No description provided for @shapeTriangle.
  ///
  /// In tr, this message translates to:
  /// **'Üçgen'**
  String get shapeTriangle;

  /// No description provided for @shapeStar.
  ///
  /// In tr, this message translates to:
  /// **'Yıldız'**
  String get shapeStar;

  /// No description provided for @shapeHeart.
  ///
  /// In tr, this message translates to:
  /// **'Kalp'**
  String get shapeHeart;

  /// No description provided for @emotionSleepy.
  ///
  /// In tr, this message translates to:
  /// **'Uykulu'**
  String get emotionSleepy;

  /// No description provided for @gameColoringSelectColor.
  ///
  /// In tr, this message translates to:
  /// **'Renk Seç'**
  String get gameColoringSelectColor;

  /// No description provided for @gameColoringTapAndPaint.
  ///
  /// In tr, this message translates to:
  /// **'Şekle dokun ve boya'**
  String get gameColoringTapAndPaint;

  /// No description provided for @gameColoringTitle.
  ///
  /// In tr, this message translates to:
  /// **'Renkleri Boya'**
  String get gameColoringTitle;

  /// No description provided for @accCatNeeds.
  ///
  /// In tr, this message translates to:
  /// **'Temel İhtiyaçlar'**
  String get accCatNeeds;

  /// No description provided for @accCatEmotions.
  ///
  /// In tr, this message translates to:
  /// **'Duygular'**
  String get accCatEmotions;

  /// No description provided for @accCatActions.
  ///
  /// In tr, this message translates to:
  /// **'Yer ve Eylem'**
  String get accCatActions;

  /// No description provided for @accCatComm.
  ///
  /// In tr, this message translates to:
  /// **'İletişim'**
  String get accCatComm;

  /// No description provided for @accLabelWater.
  ///
  /// In tr, this message translates to:
  /// **'Su'**
  String get accLabelWater;

  /// No description provided for @accLabelHungry.
  ///
  /// In tr, this message translates to:
  /// **'Acıktım'**
  String get accLabelHungry;

  /// No description provided for @accLabelToilet.
  ///
  /// In tr, this message translates to:
  /// **'Tuvalet'**
  String get accLabelToilet;

  /// No description provided for @accLabelSleepy.
  ///
  /// In tr, this message translates to:
  /// **'Uykum Geldi'**
  String get accLabelSleepy;

  /// No description provided for @accLabelBreak.
  ///
  /// In tr, this message translates to:
  /// **'Ara Vermek'**
  String get accLabelBreak;

  /// No description provided for @accLabelHelp.
  ///
  /// In tr, this message translates to:
  /// **'Yardım'**
  String get accLabelHelp;

  /// No description provided for @accLabelHug.
  ///
  /// In tr, this message translates to:
  /// **'Sarılmak'**
  String get accLabelHug;

  /// No description provided for @accLabelHappy.
  ///
  /// In tr, this message translates to:
  /// **'Mutluyum'**
  String get accLabelHappy;

  /// No description provided for @accLabelSad.
  ///
  /// In tr, this message translates to:
  /// **'Üzgünüm'**
  String get accLabelSad;

  /// No description provided for @accLabelScared.
  ///
  /// In tr, this message translates to:
  /// **'Korkuyorum'**
  String get accLabelScared;

  /// No description provided for @accLabelExcited.
  ///
  /// In tr, this message translates to:
  /// **'Heyecanlıyım'**
  String get accLabelExcited;

  /// No description provided for @accLabelAngry.
  ///
  /// In tr, this message translates to:
  /// **'Kızgınım'**
  String get accLabelAngry;

  /// No description provided for @accLabelCalm.
  ///
  /// In tr, this message translates to:
  /// **'Sakinim'**
  String get accLabelCalm;

  /// No description provided for @accLabelTired.
  ///
  /// In tr, this message translates to:
  /// **'Yorgunum'**
  String get accLabelTired;

  /// No description provided for @accLabelSurprised.
  ///
  /// In tr, this message translates to:
  /// **'Şaşkınım'**
  String get accLabelSurprised;

  /// No description provided for @accLabelGoHome.
  ///
  /// In tr, this message translates to:
  /// **'Eve Gidelim'**
  String get accLabelGoHome;

  /// No description provided for @accLabelGoOut.
  ///
  /// In tr, this message translates to:
  /// **'Dışarı Çıkalım'**
  String get accLabelGoOut;

  /// No description provided for @accLabelDress.
  ///
  /// In tr, this message translates to:
  /// **'Giyinmek'**
  String get accLabelDress;

  /// No description provided for @accLabelGoPark.
  ///
  /// In tr, this message translates to:
  /// **'Parka Gidelim'**
  String get accLabelGoPark;

  /// No description provided for @accLabelGoSchool.
  ///
  /// In tr, this message translates to:
  /// **'Okula Gidelim'**
  String get accLabelGoSchool;

  /// No description provided for @accLabelPlayMusic.
  ///
  /// In tr, this message translates to:
  /// **'Müzik Aç'**
  String get accLabelPlayMusic;

  /// No description provided for @accLabelPlayGame.
  ///
  /// In tr, this message translates to:
  /// **'Oyun Oynamak'**
  String get accLabelPlayGame;

  /// No description provided for @accLabelLookCalendar.
  ///
  /// In tr, this message translates to:
  /// **'Takvime Bakalım'**
  String get accLabelLookCalendar;

  /// No description provided for @accLabelMe.
  ///
  /// In tr, this message translates to:
  /// **'Ben'**
  String get accLabelMe;

  /// No description provided for @accLabelPlease.
  ///
  /// In tr, this message translates to:
  /// **'Lütfen'**
  String get accLabelPlease;

  /// No description provided for @accLabelThanks.
  ///
  /// In tr, this message translates to:
  /// **'Teşekkür Ederim'**
  String get accLabelThanks;

  /// No description provided for @accLabelYes.
  ///
  /// In tr, this message translates to:
  /// **'Evet'**
  String get accLabelYes;

  /// No description provided for @accLabelNo.
  ///
  /// In tr, this message translates to:
  /// **'Hayır'**
  String get accLabelNo;

  /// No description provided for @accLabelPhone.
  ///
  /// In tr, this message translates to:
  /// **'Telefon'**
  String get accLabelPhone;

  /// No description provided for @accPlaceholderCard.
  ///
  /// In tr, this message translates to:
  /// **'Bir karta dokun...'**
  String get accPlaceholderCard;

  /// No description provided for @accReadSentence.
  ///
  /// In tr, this message translates to:
  /// **'Cümleyi Oku'**
  String get accReadSentence;

  /// No description provided for @accSentenceDetailTitle.
  ///
  /// In tr, this message translates to:
  /// **'Cümle'**
  String get accSentenceDetailTitle;

  /// No description provided for @calendarTaskMorning.
  ///
  /// In tr, this message translates to:
  /// **'Sabah Rutini'**
  String get calendarTaskMorning;

  /// No description provided for @calendarCatSelfCare.
  ///
  /// In tr, this message translates to:
  /// **'Özbakım'**
  String get calendarCatSelfCare;

  /// No description provided for @calendarTaskEmotion.
  ///
  /// In tr, this message translates to:
  /// **'Duygu Çalışması'**
  String get calendarTaskEmotion;

  /// No description provided for @calendarCatEducation.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim'**
  String get calendarCatEducation;

  /// No description provided for @calendarTaskLunch.
  ///
  /// In tr, this message translates to:
  /// **'Öğle Yemeği'**
  String get calendarTaskLunch;

  /// No description provided for @calendarCatNutrition.
  ///
  /// In tr, this message translates to:
  /// **'Beslenme'**
  String get calendarCatNutrition;

  /// No description provided for @calendarTaskMatching.
  ///
  /// In tr, this message translates to:
  /// **'Eşleştirme Oyunu'**
  String get calendarTaskMatching;

  /// No description provided for @calendarCatPlay.
  ///
  /// In tr, this message translates to:
  /// **'Oyun'**
  String get calendarCatPlay;

  /// No description provided for @calendarTaskGarden.
  ///
  /// In tr, this message translates to:
  /// **'Bahçe Saati'**
  String get calendarTaskGarden;

  /// No description provided for @calendarCatActivity.
  ///
  /// In tr, this message translates to:
  /// **'Aktivite'**
  String get calendarCatActivity;

  /// No description provided for @calendarCatCustom.
  ///
  /// In tr, this message translates to:
  /// **'Özel'**
  String get calendarCatCustom;

  /// No description provided for @calendarProgressPrefix.
  ///
  /// In tr, this message translates to:
  /// **'İlerleme'**
  String get calendarProgressPrefix;

  /// No description provided for @calendarTokenBalance.
  ///
  /// In tr, this message translates to:
  /// **'Jeton'**
  String get calendarTokenBalance;

  /// No description provided for @calendarTimerTitle.
  ///
  /// In tr, this message translates to:
  /// **'Zamanlayıcı'**
  String get calendarTimerTitle;

  /// No description provided for @btnPause.
  ///
  /// In tr, this message translates to:
  /// **'Duraklat'**
  String get btnPause;

  /// No description provided for @btnReset.
  ///
  /// In tr, this message translates to:
  /// **'Sıfırla'**
  String get btnReset;

  /// No description provided for @calendarDailySchedule.
  ///
  /// In tr, this message translates to:
  /// **'Günlük Program'**
  String get calendarDailySchedule;

  /// No description provided for @calendarAddCustomTaskHint.
  ///
  /// In tr, this message translates to:
  /// **'Özel görev ekle'**
  String get calendarAddCustomTaskHint;

  /// No description provided for @btnAdd.
  ///
  /// In tr, this message translates to:
  /// **'Ekle'**
  String get btnAdd;

  /// No description provided for @remDefaultMessage.
  ///
  /// In tr, this message translates to:
  /// **'Eğitim zamanı'**
  String get remDefaultMessage;

  /// No description provided for @remPresetFloortime.
  ///
  /// In tr, this message translates to:
  /// **'Floortime zamanı'**
  String get remPresetFloortime;

  /// No description provided for @remPresetSpeechTherapy.
  ///
  /// In tr, this message translates to:
  /// **'Dil terapisi zamanı'**
  String get remPresetSpeechTherapy;

  /// No description provided for @remPresetSpecialEducation.
  ///
  /// In tr, this message translates to:
  /// **'Özel eğitim zamanı'**
  String get remPresetSpecialEducation;

  /// No description provided for @remPresetErgotherapy.
  ///
  /// In tr, this message translates to:
  /// **'Ergo terapi zamanı'**
  String get remPresetErgotherapy;

  /// No description provided for @remPresetMovement.
  ///
  /// In tr, this message translates to:
  /// **'Hareket eğitimi zamanı'**
  String get remPresetMovement;

  /// No description provided for @remPresetEmotionWork.
  ///
  /// In tr, this message translates to:
  /// **'Duygu çalışması zamanı'**
  String get remPresetEmotionWork;

  /// No description provided for @remPresetSensory.
  ///
  /// In tr, this message translates to:
  /// **'Duyu bütünleme zamanı'**
  String get remPresetSensory;

  /// No description provided for @remPresetHomework.
  ///
  /// In tr, this message translates to:
  /// **'Ev ödevi zamanı'**
  String get remPresetHomework;

  /// No description provided for @remPresetReading.
  ///
  /// In tr, this message translates to:
  /// **'Okuma saati'**
  String get remPresetReading;

  /// No description provided for @remPresetPlay.
  ///
  /// In tr, this message translates to:
  /// **'Oyun zamanı'**
  String get remPresetPlay;

  /// No description provided for @remPresetStory.
  ///
  /// In tr, this message translates to:
  /// **'Sosyal öykü zamanı'**
  String get remPresetStory;

  /// No description provided for @remPresetImitation.
  ///
  /// In tr, this message translates to:
  /// **'Taklit çalışması zamanı'**
  String get remPresetImitation;

  /// No description provided for @remPresetAcc.
  ///
  /// In tr, this message translates to:
  /// **'İletişim kartları zamanı'**
  String get remPresetAcc;

  /// No description provided for @remPresetBreak.
  ///
  /// In tr, this message translates to:
  /// **'Mola zamanı'**
  String get remPresetBreak;

  /// No description provided for @remPresetWalk.
  ///
  /// In tr, this message translates to:
  /// **'Yürüyüş zamanı'**
  String get remPresetWalk;

  /// No description provided for @remPresetNutrition.
  ///
  /// In tr, this message translates to:
  /// **'Beslenme zamanı'**
  String get remPresetNutrition;

  /// No description provided for @remPresetReward.
  ///
  /// In tr, this message translates to:
  /// **'Ödül zamanı'**
  String get remPresetReward;

  /// No description provided for @remPresetSleepReady.
  ///
  /// In tr, this message translates to:
  /// **'Uyku hazırlığı zamanı'**
  String get remPresetSleepReady;

  /// No description provided for @weekdayMonday.
  ///
  /// In tr, this message translates to:
  /// **'Pazartesi'**
  String get weekdayMonday;

  /// No description provided for @weekdayTuesday.
  ///
  /// In tr, this message translates to:
  /// **'Salı'**
  String get weekdayTuesday;

  /// No description provided for @weekdayWednesday.
  ///
  /// In tr, this message translates to:
  /// **'Çarşamba'**
  String get weekdayWednesday;

  /// No description provided for @weekdayThursday.
  ///
  /// In tr, this message translates to:
  /// **'Perşembe'**
  String get weekdayThursday;

  /// No description provided for @weekdayFriday.
  ///
  /// In tr, this message translates to:
  /// **'Cuma'**
  String get weekdayFriday;

  /// No description provided for @weekdaySaturday.
  ///
  /// In tr, this message translates to:
  /// **'Cumartesi'**
  String get weekdaySaturday;

  /// No description provided for @weekdaySunday.
  ///
  /// In tr, this message translates to:
  /// **'Pazar'**
  String get weekdaySunday;

  /// No description provided for @remPermissionDenied.
  ///
  /// In tr, this message translates to:
  /// **'Bildirim izni verilmedi.'**
  String get remPermissionDenied;

  /// No description provided for @remReminderTextTitle.
  ///
  /// In tr, this message translates to:
  /// **'Hatırlatıcı Metni'**
  String get remReminderTextTitle;

  /// No description provided for @remCustom.
  ///
  /// In tr, this message translates to:
  /// **'Özel...'**
  String get remCustom;

  /// No description provided for @remCustomTextTitle.
  ///
  /// In tr, this message translates to:
  /// **'Özel Metin'**
  String get remCustomTextTitle;

  /// No description provided for @remCustomTextHint.
  ///
  /// In tr, this message translates to:
  /// **'Örn: Floortime zamanı'**
  String get remCustomTextHint;

  /// No description provided for @remMainTitle.
  ///
  /// In tr, this message translates to:
  /// **'7 Günlük Eğitim Hatırlatıcı'**
  String get remMainTitle;

  /// No description provided for @remMainSubtitle.
  ///
  /// In tr, this message translates to:
  /// **'İstediğin gün ve saati seç. Zaman gelince bildirim gelir.'**
  String get remMainSubtitle;

  /// No description provided for @remTextLabel.
  ///
  /// In tr, this message translates to:
  /// **'Metin'**
  String get remTextLabel;

  /// No description provided for @remOffLabel.
  ///
  /// In tr, this message translates to:
  /// **'Kapalı'**
  String get remOffLabel;

  /// No description provided for @remSelectTimeTooltip.
  ///
  /// In tr, this message translates to:
  /// **'Saat Seç'**
  String get remSelectTimeTooltip;

  /// No description provided for @remSelectTextTooltip.
  ///
  /// In tr, this message translates to:
  /// **'Metin Seç'**
  String get remSelectTextTooltip;

  /// No description provided for @remDisableAll.
  ///
  /// In tr, this message translates to:
  /// **'Tümünü Kapat'**
  String get remDisableAll;

  /// No description provided for @sensoryBirds.
  ///
  /// In tr, this message translates to:
  /// **'Kuşlar'**
  String get sensoryBirds;

  /// No description provided for @sensorySea.
  ///
  /// In tr, this message translates to:
  /// **'Deniz'**
  String get sensorySea;

  /// No description provided for @sensoryForest.
  ///
  /// In tr, this message translates to:
  /// **'Orman'**
  String get sensoryForest;

  /// No description provided for @sensorySun.
  ///
  /// In tr, this message translates to:
  /// **'Güneş'**
  String get sensorySun;

  /// No description provided for @objectsQuestion.
  ///
  /// In tr, this message translates to:
  /// **'{name} hangisi?'**
  String objectsQuestion(String name);

  /// No description provided for @objectsCorrectAnswer.
  ///
  /// In tr, this message translates to:
  /// **'Evet, bu {name}!'**
  String objectsCorrectAnswer(String name);

  /// No description provided for @objectsWrongAnswer.
  ///
  /// In tr, this message translates to:
  /// **'Hayır, bu {name} değil.'**
  String objectsWrongAnswer(String name);

  /// No description provided for @objectsNextQuestion.
  ///
  /// In tr, this message translates to:
  /// **'Sonraki Soru'**
  String get objectsNextQuestion;

  /// No description provided for @tabSentenceBuilder.
  ///
  /// In tr, this message translates to:
  /// **'Cümle Kur'**
  String get tabSentenceBuilder;

  /// No description provided for @tabSoundsTable.
  ///
  /// In tr, this message translates to:
  /// **'Sesleri Tanıyalım'**
  String get tabSoundsTable;

  /// No description provided for @tabLetterGame.
  ///
  /// In tr, this message translates to:
  /// **'Harf Oyunu'**
  String get tabLetterGame;

  /// No description provided for @sentenceBuilderPlaceholder.
  ///
  /// In tr, this message translates to:
  /// **'Bir kelime seç...'**
  String get sentenceBuilderPlaceholder;

  /// No description provided for @sentenceSpeakButton.
  ///
  /// In tr, this message translates to:
  /// **'KONUŞ'**
  String get sentenceSpeakButton;

  /// No description provided for @sentenceClearButton.
  ///
  /// In tr, this message translates to:
  /// **'TEMİZLE'**
  String get sentenceClearButton;

  /// No description provided for @letterGameTitle.
  ///
  /// In tr, this message translates to:
  /// **'Harf Bulma Oyunu'**
  String get letterGameTitle;

  /// No description provided for @letterGameSubtitle.
  ///
  /// In tr, this message translates to:
  /// **'Kutulardan bir harfe bas ve o harfle başlayan kelimeyi bul!'**
  String get letterGameSubtitle;

  /// No description provided for @letterGameCorrect.
  ///
  /// In tr, this message translates to:
  /// **'Evet, bu {letter}! {letter} harfi {word} kelimesinde geçer. {word}.'**
  String letterGameCorrect(String letter, String word);

  /// No description provided for @letterGameCorrectTitle.
  ///
  /// In tr, this message translates to:
  /// **'Evet, bu {letter}!'**
  String letterGameCorrectTitle(String letter);

  /// No description provided for @btnClose.
  ///
  /// In tr, this message translates to:
  /// **'Kapat'**
  String get btnClose;

  /// No description provided for @imitationBannerHint.
  ///
  /// In tr, this message translates to:
  /// **'Ekrana herhangi bir yere dokunarak sıradaki taklit hareketine geçebilirsin!'**
  String get imitationBannerHint;

  /// No description provided for @imitationStartGame.
  ///
  /// In tr, this message translates to:
  /// **'OYUNU BAŞLAT'**
  String get imitationStartGame;

  /// No description provided for @imitationStartHint.
  ///
  /// In tr, this message translates to:
  /// **'Ekranın herhangi bir yerine dokunarak başla!'**
  String get imitationStartHint;

  /// No description provided for @imitationLivePanel.
  ///
  /// In tr, this message translates to:
  /// **'CANLI PANEL'**
  String get imitationLivePanel;

  /// No description provided for @imitationPrefix.
  ///
  /// In tr, this message translates to:
  /// **'Taklit'**
  String get imitationPrefix;

  /// No description provided for @imitationReady.
  ///
  /// In tr, this message translates to:
  /// **'Hazır mısın?'**
  String get imitationReady;

  /// No description provided for @moduleComingSoon.
  ///
  /// In tr, this message translates to:
  /// **'\"{title}\" modülü yakında.\n\nBu ekranda sırayla içerikleri Flutter’a taşıyacağız.'**
  String moduleComingSoon(String title);

  /// No description provided for @authForgotPassword.
  ///
  /// In tr, this message translates to:
  /// **'Şifremi Unuttum'**
  String get authForgotPassword;

  /// No description provided for @authResetPassword.
  ///
  /// In tr, this message translates to:
  /// **'Şifreyi Sıfırla'**
  String get authResetPassword;

  /// No description provided for @authForgotPasswordInstructions.
  ///
  /// In tr, this message translates to:
  /// **'Hesabınıza kayıtlı e-posta adresini girin. Size 6 haneli bir doğrulama kodu göndereceğiz.'**
  String get authForgotPasswordInstructions;

  /// No description provided for @authEmailAddressLabel.
  ///
  /// In tr, this message translates to:
  /// **'E-posta Adresi'**
  String get authEmailAddressLabel;

  /// No description provided for @authResetPasswordInstructions.
  ///
  /// In tr, this message translates to:
  /// **'{email} adresine gönderilen 6 haneli kodu ve yeni şifrenizi girin.'**
  String authResetPasswordInstructions(String email);

  /// No description provided for @authVerificationCodeLabel.
  ///
  /// In tr, this message translates to:
  /// **'Doğrulama Kodu'**
  String get authVerificationCodeLabel;

  /// No description provided for @authNewPasswordLabel.
  ///
  /// In tr, this message translates to:
  /// **'Yeni Şifre'**
  String get authNewPasswordLabel;

  /// No description provided for @authNewPassword2Label.
  ///
  /// In tr, this message translates to:
  /// **'Yeni Şifre (Tekrar)'**
  String get authNewPassword2Label;

  /// No description provided for @authBtnSendCode.
  ///
  /// In tr, this message translates to:
  /// **'Kod Gönder'**
  String get authBtnSendCode;

  /// No description provided for @authBtnUpdatePassword.
  ///
  /// In tr, this message translates to:
  /// **'Şifreyi Güncelle'**
  String get authBtnUpdatePassword;

  /// No description provided for @authResetSuccess.
  ///
  /// In tr, this message translates to:
  /// **'Şifreniz başarıyla sıfırlandı. Giriş yapabilirsiniz.'**
  String get authResetSuccess;

  /// No description provided for @authErrVerificationCodeInvalid.
  ///
  /// In tr, this message translates to:
  /// **'6 haneli doğrulama kodunu girin.'**
  String get authErrVerificationCodeInvalid;

  /// No description provided for @authPwdMinLengthErr.
  ///
  /// In tr, this message translates to:
  /// **'Şifre en az 8 karakter olmalıdır.'**
  String get authPwdMinLengthErr;

  /// No description provided for @homeGreetingParent.
  ///
  /// In tr, this message translates to:
  /// **'Veli'**
  String get homeGreetingParent;

  /// No description provided for @homeErrorPrefix.
  ///
  /// In tr, this message translates to:
  /// **'Hata: {error}'**
  String homeErrorPrefix(String error);

  /// No description provided for @emotionsChoose.
  ///
  /// In tr, this message translates to:
  /// **'Duygunu seç'**
  String get emotionsChoose;

  /// No description provided for @emotionsDiary.
  ///
  /// In tr, this message translates to:
  /// **'Duygu Günlüğü'**
  String get emotionsDiary;

  /// No description provided for @emotionsCalming.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleşme'**
  String get emotionsCalming;

  /// No description provided for @emotionsCalmingInstructions.
  ///
  /// In tr, this message translates to:
  /// **'Sakinleşmek için: 4’e kadar sayarak nefes al, 4’e kadar tut, 6’ya kadar ver. İstersen kısa ara ver ve su iç.'**
  String get emotionsCalmingInstructions;

  /// No description provided for @emotionsSelected.
  ///
  /// In tr, this message translates to:
  /// **'Seçilen duygu: {emotion}'**
  String emotionsSelected(String emotion);

  /// No description provided for @emotionsWhatHelped.
  ///
  /// In tr, this message translates to:
  /// **'Ne yardımcı oldu?'**
  String get emotionsWhatHelped;

  /// No description provided for @emotionsNote.
  ///
  /// In tr, this message translates to:
  /// **'Not'**
  String get emotionsNote;

  /// No description provided for @emotionsRecentLogs.
  ///
  /// In tr, this message translates to:
  /// **'Son Kayıtlar'**
  String get emotionsRecentLogs;

  /// No description provided for @emotionsNoLogs.
  ///
  /// In tr, this message translates to:
  /// **'Henüz kayıt yok.'**
  String get emotionsNoLogs;

  /// No description provided for @emotionsLogDate.
  ///
  /// In tr, this message translates to:
  /// **'Tarih: {value}'**
  String emotionsLogDate(String value);

  /// No description provided for @emotionsLogEmotion.
  ///
  /// In tr, this message translates to:
  /// **'Duygu: {value}'**
  String emotionsLogEmotion(String value);

  /// No description provided for @emotionsLogIntensity.
  ///
  /// In tr, this message translates to:
  /// **'Şiddet: {value}/5'**
  String emotionsLogIntensity(String value);

  /// No description provided for @emotionsLogTriggers.
  ///
  /// In tr, this message translates to:
  /// **'Tetikleyiciler: {value}'**
  String emotionsLogTriggers(String value);

  /// No description provided for @emotionsLogHelped.
  ///
  /// In tr, this message translates to:
  /// **'Yardımcı olanlar: {value}'**
  String emotionsLogHelped(String value);

  /// No description provided for @emotionsLogAntecedent.
  ///
  /// In tr, this message translates to:
  /// **'Öncesi'**
  String get emotionsLogAntecedent;

  /// No description provided for @emotionsLogBehavior.
  ///
  /// In tr, this message translates to:
  /// **'Davranış'**
  String get emotionsLogBehavior;

  /// No description provided for @emotionsLogConsequence.
  ///
  /// In tr, this message translates to:
  /// **'Sonuç'**
  String get emotionsLogConsequence;

  /// No description provided for @emotionsLogNote.
  ///
  /// In tr, this message translates to:
  /// **'Not'**
  String get emotionsLogNote;

  /// No description provided for @authContinueAsGuest.
  ///
  /// In tr, this message translates to:
  /// **'Misafir Olarak Devam Et'**
  String get authContinueAsGuest;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['en', 'tr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
    case 'tr':
      return AppLocalizationsTr();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
