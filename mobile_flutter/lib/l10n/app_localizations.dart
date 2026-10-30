import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';

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
  static const List<Locale> supportedLocales = <Locale>[Locale('en')];

  /// No description provided for @welcome.
  ///
  /// In en, this message translates to:
  /// **'Welcome'**
  String get welcome;

  /// No description provided for @featuredGuide.
  ///
  /// In en, this message translates to:
  /// **'Featured Guide'**
  String get featuredGuide;

  /// No description provided for @categories.
  ///
  /// In en, this message translates to:
  /// **'Categories'**
  String get categories;

  /// No description provided for @headings.
  ///
  /// In en, this message translates to:
  /// **'Headings'**
  String get headings;

  /// No description provided for @moduleInfoTitle.
  ///
  /// In en, this message translates to:
  /// **'Autism Info'**
  String get moduleInfoTitle;

  /// No description provided for @moduleOsbTitle.
  ///
  /// In en, this message translates to:
  /// **'ASD (Autism Spectrum Disorder)'**
  String get moduleOsbTitle;

  /// No description provided for @moduleEducationTitle.
  ///
  /// In en, this message translates to:
  /// **'Education'**
  String get moduleEducationTitle;

  /// No description provided for @moduleEmotionsTitle.
  ///
  /// In en, this message translates to:
  /// **'My Emotions'**
  String get moduleEmotionsTitle;

  /// No description provided for @moduleGamesTitle.
  ///
  /// In en, this message translates to:
  /// **'Educational Games'**
  String get moduleGamesTitle;

  /// No description provided for @moduleStoriesTitle.
  ///
  /// In en, this message translates to:
  /// **'Social Stories'**
  String get moduleStoriesTitle;

  /// No description provided for @moduleMusicTitle.
  ///
  /// In en, this message translates to:
  /// **'Music & Sounds'**
  String get moduleMusicTitle;

  /// No description provided for @moduleAccTitle.
  ///
  /// In en, this message translates to:
  /// **'Communication Cards (AAC)'**
  String get moduleAccTitle;

  /// No description provided for @moduleCalendarTitle.
  ///
  /// In en, this message translates to:
  /// **'Calendar & Schedule'**
  String get moduleCalendarTitle;

  /// No description provided for @moduleReminderTitle.
  ///
  /// In en, this message translates to:
  /// **'Education Reminder'**
  String get moduleReminderTitle;

  /// No description provided for @appTitle.
  ///
  /// In en, this message translates to:
  /// **'Autintellect'**
  String get appTitle;

  /// No description provided for @adminTitle.
  ///
  /// In en, this message translates to:
  /// **'Admin Panel'**
  String get adminTitle;

  /// No description provided for @adminNoAuth.
  ///
  /// In en, this message translates to:
  /// **'Not authorized or error: '**
  String get adminNoAuth;

  /// No description provided for @adminTotalUsers.
  ///
  /// In en, this message translates to:
  /// **'Total Users'**
  String get adminTotalUsers;

  /// No description provided for @adminActiveSessions.
  ///
  /// In en, this message translates to:
  /// **'Active Sessions'**
  String get adminActiveSessions;

  /// No description provided for @adminKvkkAccepted.
  ///
  /// In en, this message translates to:
  /// **'Privacy Policy Accepted'**
  String get adminKvkkAccepted;

  /// No description provided for @adminProfilesSaved.
  ///
  /// In en, this message translates to:
  /// **'Saved Profiles'**
  String get adminProfilesSaved;

  /// No description provided for @adminUsersLast7Days.
  ///
  /// In en, this message translates to:
  /// **'Users in Last 7 Days'**
  String get adminUsersLast7Days;

  /// No description provided for @homeTitle.
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get homeTitle;

  /// No description provided for @homeModules.
  ///
  /// In en, this message translates to:
  /// **'Modules'**
  String get homeModules;

  /// No description provided for @homeError.
  ///
  /// In en, this message translates to:
  /// **'Error: '**
  String get homeError;

  /// No description provided for @homeUser.
  ///
  /// In en, this message translates to:
  /// **'User: '**
  String get homeUser;

  /// No description provided for @homeNoActiveProfile.
  ///
  /// In en, this message translates to:
  /// **'Active child profile: Not specified'**
  String get homeNoActiveProfile;

  /// No description provided for @homeUnnamed.
  ///
  /// In en, this message translates to:
  /// **'Unnamed'**
  String get homeUnnamed;

  /// No description provided for @homeNoBirthDate.
  ///
  /// In en, this message translates to:
  /// **'Birth date: -'**
  String get homeNoBirthDate;

  /// No description provided for @homeBirthDate.
  ///
  /// In en, this message translates to:
  /// **'Birth date: '**
  String get homeBirthDate;

  /// No description provided for @modInfo.
  ///
  /// In en, this message translates to:
  /// **'Info'**
  String get modInfo;

  /// No description provided for @modOsb.
  ///
  /// In en, this message translates to:
  /// **'ASD'**
  String get modOsb;

  /// No description provided for @modEducation.
  ///
  /// In en, this message translates to:
  /// **'Education'**
  String get modEducation;

  /// No description provided for @modEmotions.
  ///
  /// In en, this message translates to:
  /// **'Emotions'**
  String get modEmotions;

  /// No description provided for @modGames.
  ///
  /// In en, this message translates to:
  /// **'Educational Games'**
  String get modGames;

  /// No description provided for @modStories.
  ///
  /// In en, this message translates to:
  /// **'Stories'**
  String get modStories;

  /// No description provided for @modMusic.
  ///
  /// In en, this message translates to:
  /// **'Music'**
  String get modMusic;

  /// No description provided for @modAcc.
  ///
  /// In en, this message translates to:
  /// **'AAC'**
  String get modAcc;

  /// No description provided for @modCalendar.
  ///
  /// In en, this message translates to:
  /// **'Calendar'**
  String get modCalendar;

  /// No description provided for @modEduReminder.
  ///
  /// In en, this message translates to:
  /// **'Education Reminder'**
  String get modEduReminder;

  /// No description provided for @authEmailErr.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email.'**
  String get authEmailErr;

  /// No description provided for @authPwdErr.
  ///
  /// In en, this message translates to:
  /// **'Password must be at least 8 characters.'**
  String get authPwdErr;

  /// No description provided for @authPwdMatchErr.
  ///
  /// In en, this message translates to:
  /// **'Passwords do not match.'**
  String get authPwdMatchErr;

  /// No description provided for @authKvkkErr.
  ///
  /// In en, this message translates to:
  /// **'Terms & Privacy Policy approval is required to continue.'**
  String get authKvkkErr;

  /// No description provided for @authTitle.
  ///
  /// In en, this message translates to:
  /// **'Autism Support'**
  String get authTitle;

  /// No description provided for @authLogin.
  ///
  /// In en, this message translates to:
  /// **'Login'**
  String get authLogin;

  /// No description provided for @authRegister.
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get authRegister;

  /// No description provided for @authEmailLabel.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get authEmailLabel;

  /// No description provided for @authPwdLabel.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get authPwdLabel;

  /// No description provided for @authPwd2Label.
  ///
  /// In en, this message translates to:
  /// **'Password (Repeat)'**
  String get authPwd2Label;

  /// No description provided for @authKvkkText.
  ///
  /// In en, this message translates to:
  /// **'By continuing, you accept the Terms & Privacy Policy.'**
  String get authKvkkText;

  /// No description provided for @authWait.
  ///
  /// In en, this message translates to:
  /// **'Please wait...'**
  String get authWait;

  /// No description provided for @authBtnRegister.
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get authBtnRegister;

  /// No description provided for @authBtnLogin.
  ///
  /// In en, this message translates to:
  /// **'Login'**
  String get authBtnLogin;

  /// No description provided for @familyTitle.
  ///
  /// In en, this message translates to:
  /// **'Family Panel'**
  String get familyTitle;

  /// No description provided for @familyProfile.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get familyProfile;

  /// No description provided for @familyContact.
  ///
  /// In en, this message translates to:
  /// **'Contact'**
  String get familyContact;

  /// No description provided for @familyPrivacy.
  ///
  /// In en, this message translates to:
  /// **'Privacy'**
  String get familyPrivacy;

  /// No description provided for @familyNewProfile.
  ///
  /// In en, this message translates to:
  /// **'New Profile'**
  String get familyNewProfile;

  /// No description provided for @familyEditProfile.
  ///
  /// In en, this message translates to:
  /// **'Edit Profile'**
  String get familyEditProfile;

  /// No description provided for @familyChildName.
  ///
  /// In en, this message translates to:
  /// **'Child\'s name'**
  String get familyChildName;

  /// No description provided for @familyBirthDateHint.
  ///
  /// In en, this message translates to:
  /// **'Birth date (YYYY-MM-DD)'**
  String get familyBirthDateHint;

  /// No description provided for @familyAgeOpt.
  ///
  /// In en, this message translates to:
  /// **'Age (optional)'**
  String get familyAgeOpt;

  /// No description provided for @familyNotes.
  ///
  /// In en, this message translates to:
  /// **'Family notes'**
  String get familyNotes;

  /// No description provided for @familyEduNotes.
  ///
  /// In en, this message translates to:
  /// **'Education notes'**
  String get familyEduNotes;

  /// No description provided for @btnSave.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get btnSave;

  /// No description provided for @familyProfiles.
  ///
  /// In en, this message translates to:
  /// **'Child Profiles'**
  String get familyProfiles;

  /// No description provided for @btnNew.
  ///
  /// In en, this message translates to:
  /// **'New'**
  String get btnNew;

  /// No description provided for @familyNoProfile.
  ///
  /// In en, this message translates to:
  /// **'No profiles yet.'**
  String get familyNoProfile;

  /// No description provided for @familyActive.
  ///
  /// In en, this message translates to:
  /// **'Active'**
  String get familyActive;

  /// No description provided for @familyContactInfo.
  ///
  /// In en, this message translates to:
  /// **'Contact Information'**
  String get familyContactInfo;

  /// No description provided for @familySaved.
  ///
  /// In en, this message translates to:
  /// **'Saved.'**
  String get familySaved;

  /// No description provided for @familyNameSurname.
  ///
  /// In en, this message translates to:
  /// **'Name Surname'**
  String get familyNameSurname;

  /// No description provided for @familyPhone.
  ///
  /// In en, this message translates to:
  /// **'Phone'**
  String get familyPhone;

  /// No description provided for @familyInstructorPhone.
  ///
  /// In en, this message translates to:
  /// **'Instructor Phone'**
  String get familyInstructorPhone;

  /// No description provided for @familyDoctorPhone.
  ///
  /// In en, this message translates to:
  /// **'Doctor Phone'**
  String get familyDoctorPhone;

  /// No description provided for @familyDeleteAcc.
  ///
  /// In en, this message translates to:
  /// **'Delete Account'**
  String get familyDeleteAcc;

  /// No description provided for @familyDeleteAccMsg.
  ///
  /// In en, this message translates to:
  /// **'Enter your password to delete the account.'**
  String get familyDeleteAccMsg;

  /// No description provided for @btnCancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get btnCancel;

  /// No description provided for @btnDelete.
  ///
  /// In en, this message translates to:
  /// **'Delete'**
  String get btnDelete;

  /// No description provided for @familyPwdMinLength.
  ///
  /// In en, this message translates to:
  /// **'Password required (at least 8 characters).'**
  String get familyPwdMinLength;

  /// No description provided for @emoNoise.
  ///
  /// In en, this message translates to:
  /// **'Noise'**
  String get emoNoise;

  /// No description provided for @emoCrowd.
  ///
  /// In en, this message translates to:
  /// **'Crowd'**
  String get emoCrowd;

  /// No description provided for @emoChange.
  ///
  /// In en, this message translates to:
  /// **'Change'**
  String get emoChange;

  /// No description provided for @emoWaiting.
  ///
  /// In en, this message translates to:
  /// **'Waiting'**
  String get emoWaiting;

  /// No description provided for @emoFatigue.
  ///
  /// In en, this message translates to:
  /// **'Fatigue'**
  String get emoFatigue;

  /// No description provided for @emoHunger.
  ///
  /// In en, this message translates to:
  /// **'Hunger'**
  String get emoHunger;

  /// No description provided for @emoLight.
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get emoLight;

  /// No description provided for @emoTouch.
  ///
  /// In en, this message translates to:
  /// **'Touch'**
  String get emoTouch;

  /// No description provided for @emoScreen.
  ///
  /// In en, this message translates to:
  /// **'Screen'**
  String get emoScreen;

  /// No description provided for @emoSeparation.
  ///
  /// In en, this message translates to:
  /// **'Separation'**
  String get emoSeparation;

  /// No description provided for @emoDeepBreath.
  ///
  /// In en, this message translates to:
  /// **'Deep Breath'**
  String get emoDeepBreath;

  /// No description provided for @emoBreak.
  ///
  /// In en, this message translates to:
  /// **'Take a Break'**
  String get emoBreak;

  /// No description provided for @emoHug.
  ///
  /// In en, this message translates to:
  /// **'Hug'**
  String get emoHug;

  /// No description provided for @emoHeadphones.
  ///
  /// In en, this message translates to:
  /// **'Headphones'**
  String get emoHeadphones;

  /// No description provided for @emoDrinkWater.
  ///
  /// In en, this message translates to:
  /// **'Drink Water'**
  String get emoDrinkWater;

  /// No description provided for @emoCalmCorner.
  ///
  /// In en, this message translates to:
  /// **'Calm Corner'**
  String get emoCalmCorner;

  /// No description provided for @emoMusic.
  ///
  /// In en, this message translates to:
  /// **'Music'**
  String get emoMusic;

  /// No description provided for @emoSqueezeBall.
  ///
  /// In en, this message translates to:
  /// **'Squeeze Ball'**
  String get emoSqueezeBall;

  /// No description provided for @emoHappy.
  ///
  /// In en, this message translates to:
  /// **'Happy'**
  String get emoHappy;

  /// No description provided for @emoSad.
  ///
  /// In en, this message translates to:
  /// **'Sad'**
  String get emoSad;

  /// No description provided for @emoAngry.
  ///
  /// In en, this message translates to:
  /// **'Angry'**
  String get emoAngry;

  /// No description provided for @emoSurprised.
  ///
  /// In en, this message translates to:
  /// **'Surprised'**
  String get emoSurprised;

  /// No description provided for @emoScared.
  ///
  /// In en, this message translates to:
  /// **'Scared'**
  String get emoScared;

  /// No description provided for @emoExcited.
  ///
  /// In en, this message translates to:
  /// **'Excited'**
  String get emoExcited;

  /// No description provided for @emoHowDoYouFeel.
  ///
  /// In en, this message translates to:
  /// **'How do you feel?'**
  String get emoHowDoYouFeel;

  /// No description provided for @emoIntensity.
  ///
  /// In en, this message translates to:
  /// **'Intensity:'**
  String get emoIntensity;

  /// No description provided for @emoTriggers.
  ///
  /// In en, this message translates to:
  /// **'Triggers (Optional)'**
  String get emoTriggers;

  /// No description provided for @emoWhatHelps.
  ///
  /// In en, this message translates to:
  /// **'What Helps You? (Optional)'**
  String get emoWhatHelps;

  /// No description provided for @emoBefore.
  ///
  /// In en, this message translates to:
  /// **'What happened before?'**
  String get emoBefore;

  /// No description provided for @emoAction.
  ///
  /// In en, this message translates to:
  /// **'What did you feel/do?'**
  String get emoAction;

  /// No description provided for @emoAfter.
  ///
  /// In en, this message translates to:
  /// **'What happened after?'**
  String get emoAfter;

  /// No description provided for @emoNotes.
  ///
  /// In en, this message translates to:
  /// **'Additional Notes'**
  String get emoNotes;

  /// No description provided for @emoPastRecords.
  ///
  /// In en, this message translates to:
  /// **'Past Records'**
  String get emoPastRecords;

  /// No description provided for @storyGrocery.
  ///
  /// In en, this message translates to:
  /// **'Grocery Shopping'**
  String get storyGrocery;

  /// No description provided for @storyGrocery1.
  ///
  /// In en, this message translates to:
  /// **'The store was crowded.'**
  String get storyGrocery1;

  /// No description provided for @storyGrocery2.
  ///
  /// In en, this message translates to:
  /// **'I put on my headphones when the sounds bothered me.'**
  String get storyGrocery2;

  /// No description provided for @storyGrocery3.
  ///
  /// In en, this message translates to:
  /// **'I felt happy when I found the snack I wanted.'**
  String get storyGrocery3;

  /// No description provided for @storyGrocery4.
  ///
  /// In en, this message translates to:
  /// **'I waited calmly in line at the checkout.'**
  String get storyGrocery4;

  /// No description provided for @storyVisit.
  ///
  /// In en, this message translates to:
  /// **'Visiting Guests'**
  String get storyVisit;

  /// No description provided for @storyVisit1.
  ///
  /// In en, this message translates to:
  /// **'We went to a new house.'**
  String get storyVisit1;

  /// No description provided for @storyVisit2.
  ///
  /// In en, this message translates to:
  /// **'First, I said hello.'**
  String get storyVisit2;

  /// No description provided for @storyVisit3.
  ///
  /// In en, this message translates to:
  /// **'I shared my toys.'**
  String get storyVisit3;

  /// No description provided for @storyVisit4.
  ///
  /// In en, this message translates to:
  /// **'I said goodbye when leaving.'**
  String get storyVisit4;

  /// No description provided for @storyBarber.
  ///
  /// In en, this message translates to:
  /// **'Going to the Barber'**
  String get storyBarber;

  /// No description provided for @storyBarber1.
  ///
  /// In en, this message translates to:
  /// **'We went to the barber for a haircut.'**
  String get storyBarber1;

  /// No description provided for @storyBarber2.
  ///
  /// In en, this message translates to:
  /// **'The clipper sound was a bit loud but I endured it.'**
  String get storyBarber2;

  /// No description provided for @storyBarber3.
  ///
  /// In en, this message translates to:
  /// **'I looked very handsome when my hair was cut.'**
  String get storyBarber3;

  /// No description provided for @storyBarber4.
  ///
  /// In en, this message translates to:
  /// **'We thanked the barber and left.'**
  String get storyBarber4;

  /// No description provided for @storyDoctor.
  ///
  /// In en, this message translates to:
  /// **'Going to the Doctor'**
  String get storyDoctor;

  /// No description provided for @storyDoctor1.
  ///
  /// In en, this message translates to:
  /// **'We went for a check-up today.'**
  String get storyDoctor1;

  /// No description provided for @storyDoctor2.
  ///
  /// In en, this message translates to:
  /// **'The doctor listened to my heart.'**
  String get storyDoctor2;

  /// No description provided for @storyDoctor3.
  ///
  /// In en, this message translates to:
  /// **'He said well done to me.'**
  String get storyDoctor3;

  /// No description provided for @storyDoctor4.
  ///
  /// In en, this message translates to:
  /// **'Being healthy is wonderful.'**
  String get storyDoctor4;

  /// No description provided for @storyTitle.
  ///
  /// In en, this message translates to:
  /// **'Social Story'**
  String get storyTitle;

  /// No description provided for @storyRead.
  ///
  /// In en, this message translates to:
  /// **'Read Story'**
  String get storyRead;

  /// No description provided for @btnBack.
  ///
  /// In en, this message translates to:
  /// **'Back'**
  String get btnBack;

  /// No description provided for @btnNext.
  ///
  /// In en, this message translates to:
  /// **'Next'**
  String get btnNext;

  /// No description provided for @btnFinish.
  ///
  /// In en, this message translates to:
  /// **'Finish'**
  String get btnFinish;

  /// No description provided for @storyQuestion.
  ///
  /// In en, this message translates to:
  /// **'Question'**
  String get storyQuestion;

  /// No description provided for @storyQuizQ.
  ///
  /// In en, this message translates to:
  /// **'Which one is the name of this story?'**
  String get storyQuizQ;

  /// No description provided for @storyQuizCorrect.
  ///
  /// In en, this message translates to:
  /// **'Correct!'**
  String get storyQuizCorrect;

  /// No description provided for @storyQuizWrong.
  ///
  /// In en, this message translates to:
  /// **'Try again.'**
  String get storyQuizWrong;

  /// No description provided for @musicCalming.
  ///
  /// In en, this message translates to:
  /// **'Calming Melody'**
  String get musicCalming;

  /// No description provided for @musicFocus.
  ///
  /// In en, this message translates to:
  /// **'Focus Rhythm'**
  String get musicFocus;

  /// No description provided for @musicJoyful.
  ///
  /// In en, this message translates to:
  /// **'Joyful Kids Melody'**
  String get musicJoyful;

  /// No description provided for @musicSea.
  ///
  /// In en, this message translates to:
  /// **'Sea Sound'**
  String get musicSea;

  /// No description provided for @musicRain.
  ///
  /// In en, this message translates to:
  /// **'Rain Sound'**
  String get musicRain;

  /// No description provided for @musicWind.
  ///
  /// In en, this message translates to:
  /// **'Wind Sound'**
  String get musicWind;

  /// No description provided for @musicWhiteNoise.
  ///
  /// In en, this message translates to:
  /// **'White Noise'**
  String get musicWhiteNoise;

  /// No description provided for @musicPinkNoise.
  ///
  /// In en, this message translates to:
  /// **'Pink Noise'**
  String get musicPinkNoise;

  /// No description provided for @musicBrownNoise.
  ///
  /// In en, this message translates to:
  /// **'Brown Noise'**
  String get musicBrownNoise;

  /// No description provided for @musicSleep.
  ///
  /// In en, this message translates to:
  /// **'Sleep'**
  String get musicSleep;

  /// No description provided for @musicCalmingCat.
  ///
  /// In en, this message translates to:
  /// **'Calming'**
  String get musicCalmingCat;

  /// No description provided for @musicFocusCat.
  ///
  /// In en, this message translates to:
  /// **'Focus'**
  String get musicFocusCat;

  /// No description provided for @musicNowPlaying.
  ///
  /// In en, this message translates to:
  /// **'Now Playing'**
  String get musicNowPlaying;

  /// No description provided for @musicNotSelected.
  ///
  /// In en, this message translates to:
  /// **'Not Selected'**
  String get musicNotSelected;

  /// No description provided for @musicNotStarted.
  ///
  /// In en, this message translates to:
  /// **'You can select a track and start.'**
  String get musicNotStarted;

  /// No description provided for @musicTimeRemaining.
  ///
  /// In en, this message translates to:
  /// **'Time remaining:'**
  String get musicTimeRemaining;

  /// No description provided for @btnStop.
  ///
  /// In en, this message translates to:
  /// **'Stop'**
  String get btnStop;

  /// No description provided for @btnBreathe.
  ///
  /// In en, this message translates to:
  /// **'Breathe'**
  String get btnBreathe;

  /// No description provided for @musicTracks.
  ///
  /// In en, this message translates to:
  /// **'Tracks'**
  String get musicTracks;

  /// No description provided for @musicRhythmTitle.
  ///
  /// In en, this message translates to:
  /// **'Rhythm Suggestion'**
  String get musicRhythmTitle;

  /// No description provided for @musicRhythmDesc.
  ///
  /// In en, this message translates to:
  /// **'3 rounds of breathing exercise:\\n- Inhale for 4 seconds\\n- Hold for 4 seconds\\n- Exhale for 6 seconds\\n\\nYou can play a track you like and repeat.'**
  String get musicRhythmDesc;

  /// No description provided for @musicDesc1.
  ///
  /// In en, this message translates to:
  /// **'For calming and relaxation.'**
  String get musicDesc1;

  /// No description provided for @musicDesc2.
  ///
  /// In en, this message translates to:
  /// **'Rhythm for gathering attention.'**
  String get musicDesc2;

  /// No description provided for @musicDesc3.
  ///
  /// In en, this message translates to:
  /// **'For movement and motivation.'**
  String get musicDesc3;

  /// No description provided for @musicDesc4.
  ///
  /// In en, this message translates to:
  /// **'Relaxing ambient sound before sleep.'**
  String get musicDesc4;

  /// No description provided for @musicDesc5.
  ///
  /// In en, this message translates to:
  /// **'Background sound for calming.'**
  String get musicDesc5;

  /// No description provided for @musicDesc6.
  ///
  /// In en, this message translates to:
  /// **'Light wind ambient sound.'**
  String get musicDesc6;

  /// No description provided for @musicDesc7.
  ///
  /// In en, this message translates to:
  /// **'Constant noise for focus.'**
  String get musicDesc7;

  /// No description provided for @musicDesc8.
  ///
  /// In en, this message translates to:
  /// **'Softer noise profile.'**
  String get musicDesc8;

  /// No description provided for @musicDesc9.
  ///
  /// In en, this message translates to:
  /// **'Deep, low-frequency noise.'**
  String get musicDesc9;

  /// No description provided for @accBasicNeeds.
  ///
  /// In en, this message translates to:
  /// **'Basic Needs'**
  String get accBasicNeeds;

  /// No description provided for @accEmotions.
  ///
  /// In en, this message translates to:
  /// **'Emotions'**
  String get accEmotions;

  /// No description provided for @accPlaceAction.
  ///
  /// In en, this message translates to:
  /// **'Place & Action'**
  String get accPlaceAction;

  /// No description provided for @accCommunication.
  ///
  /// In en, this message translates to:
  /// **'Communication'**
  String get accCommunication;

  /// No description provided for @accWater.
  ///
  /// In en, this message translates to:
  /// **'Water'**
  String get accWater;

  /// No description provided for @accHungry.
  ///
  /// In en, this message translates to:
  /// **'I am hungry'**
  String get accHungry;

  /// No description provided for @accToilet.
  ///
  /// In en, this message translates to:
  /// **'Toilet'**
  String get accToilet;

  /// No description provided for @accSleepy.
  ///
  /// In en, this message translates to:
  /// **'I am sleepy'**
  String get accSleepy;

  /// No description provided for @accHelp.
  ///
  /// In en, this message translates to:
  /// **'Help'**
  String get accHelp;

  /// No description provided for @accHug.
  ///
  /// In en, this message translates to:
  /// **'Hug'**
  String get accHug;

  /// No description provided for @accHappy.
  ///
  /// In en, this message translates to:
  /// **'I am happy'**
  String get accHappy;

  /// No description provided for @accSad.
  ///
  /// In en, this message translates to:
  /// **'I am sad'**
  String get accSad;

  /// No description provided for @accScared.
  ///
  /// In en, this message translates to:
  /// **'I am scared'**
  String get accScared;

  /// No description provided for @accExcited.
  ///
  /// In en, this message translates to:
  /// **'I am excited'**
  String get accExcited;

  /// No description provided for @accAngry.
  ///
  /// In en, this message translates to:
  /// **'I am angry'**
  String get accAngry;

  /// No description provided for @accCalm.
  ///
  /// In en, this message translates to:
  /// **'I am calm'**
  String get accCalm;

  /// No description provided for @accTired.
  ///
  /// In en, this message translates to:
  /// **'I am tired'**
  String get accTired;

  /// No description provided for @accSurprised.
  ///
  /// In en, this message translates to:
  /// **'I am surprised'**
  String get accSurprised;

  /// No description provided for @accGoHome.
  ///
  /// In en, this message translates to:
  /// **'Let\\\'s go home'**
  String get accGoHome;

  /// No description provided for @accGoOut.
  ///
  /// In en, this message translates to:
  /// **'Let\\\'s go out'**
  String get accGoOut;

  /// No description provided for @accDressUp.
  ///
  /// In en, this message translates to:
  /// **'Dress up'**
  String get accDressUp;

  /// No description provided for @accGoPark.
  ///
  /// In en, this message translates to:
  /// **'Let\\\'s go to the park'**
  String get accGoPark;

  /// No description provided for @accGoSchool.
  ///
  /// In en, this message translates to:
  /// **'Let\\\'s go to school'**
  String get accGoSchool;

  /// No description provided for @accPlayMusic.
  ///
  /// In en, this message translates to:
  /// **'Play music'**
  String get accPlayMusic;

  /// No description provided for @accPlayGames.
  ///
  /// In en, this message translates to:
  /// **'Play games'**
  String get accPlayGames;

  /// No description provided for @accCheckCalendar.
  ///
  /// In en, this message translates to:
  /// **'Let\\\'s check the calendar'**
  String get accCheckCalendar;

  /// No description provided for @accMe.
  ///
  /// In en, this message translates to:
  /// **'Me'**
  String get accMe;

  /// No description provided for @accPlease.
  ///
  /// In en, this message translates to:
  /// **'Please'**
  String get accPlease;

  /// No description provided for @accThankYou.
  ///
  /// In en, this message translates to:
  /// **'Thank you'**
  String get accThankYou;

  /// No description provided for @accYes.
  ///
  /// In en, this message translates to:
  /// **'Yes'**
  String get accYes;

  /// No description provided for @accNo.
  ///
  /// In en, this message translates to:
  /// **'No'**
  String get accNo;

  /// No description provided for @accPhone.
  ///
  /// In en, this message translates to:
  /// **'Phone'**
  String get accPhone;

  /// No description provided for @accTapCard.
  ///
  /// In en, this message translates to:
  /// **'Tap a card...'**
  String get accTapCard;

  /// No description provided for @btnClear.
  ///
  /// In en, this message translates to:
  /// **'Clear'**
  String get btnClear;

  /// No description provided for @accSentence.
  ///
  /// In en, this message translates to:
  /// **'Sentence'**
  String get accSentence;

  /// No description provided for @btnShow.
  ///
  /// In en, this message translates to:
  /// **'Show'**
  String get btnShow;

  /// No description provided for @calMorning.
  ///
  /// In en, this message translates to:
  /// **'Morning Routine'**
  String get calMorning;

  /// No description provided for @calMorningDesc.
  ///
  /// In en, this message translates to:
  /// **'Wake up, wash your face, and have breakfast.'**
  String get calMorningDesc;

  /// No description provided for @calSchool.
  ///
  /// In en, this message translates to:
  /// **'School Time'**
  String get calSchool;

  /// No description provided for @calSchoolDesc.
  ///
  /// In en, this message translates to:
  /// **'Go to school and attend your classes.'**
  String get calSchoolDesc;

  /// No description provided for @calLunch.
  ///
  /// In en, this message translates to:
  /// **'Lunch'**
  String get calLunch;

  /// No description provided for @calLunchDesc.
  ///
  /// In en, this message translates to:
  /// **'Finish your food and rest a bit.'**
  String get calLunchDesc;

  /// No description provided for @calFreeTime.
  ///
  /// In en, this message translates to:
  /// **'Free Time'**
  String get calFreeTime;

  /// No description provided for @calFreeTimeDesc.
  ///
  /// In en, this message translates to:
  /// **'Play any game you want.'**
  String get calFreeTimeDesc;

  /// No description provided for @calDinner.
  ///
  /// In en, this message translates to:
  /// **'Dinner'**
  String get calDinner;

  /// No description provided for @calDinnerDesc.
  ///
  /// In en, this message translates to:
  /// **'Family dinner time.'**
  String get calDinnerDesc;

  /// No description provided for @calBedtime.
  ///
  /// In en, this message translates to:
  /// **'Bedtime Preparation'**
  String get calBedtime;

  /// No description provided for @calBedtimeDesc.
  ///
  /// In en, this message translates to:
  /// **'Brush your teeth, wear pajamas, and sleep.'**
  String get calBedtimeDesc;

  /// No description provided for @calToday.
  ///
  /// In en, this message translates to:
  /// **'Today\\\'s Schedule'**
  String get calToday;

  /// No description provided for @calYesterday.
  ///
  /// In en, this message translates to:
  /// **'Yesterday'**
  String get calYesterday;

  /// No description provided for @calTomorrow.
  ///
  /// In en, this message translates to:
  /// **'Tomorrow'**
  String get calTomorrow;

  /// No description provided for @calNotCompleted.
  ///
  /// In en, this message translates to:
  /// **'Not Completed'**
  String get calNotCompleted;

  /// No description provided for @calCompleted.
  ///
  /// In en, this message translates to:
  /// **'Completed!'**
  String get calCompleted;

  /// No description provided for @remMedicine.
  ///
  /// In en, this message translates to:
  /// **'Medicine Time'**
  String get remMedicine;

  /// No description provided for @remMedicineDesc.
  ///
  /// In en, this message translates to:
  /// **'Don\\\'t forget vitamins.'**
  String get remMedicineDesc;

  /// No description provided for @remExercise.
  ///
  /// In en, this message translates to:
  /// **'Exercise'**
  String get remExercise;

  /// No description provided for @remExerciseDesc.
  ///
  /// In en, this message translates to:
  /// **'15 mins stretching.'**
  String get remExerciseDesc;

  /// No description provided for @remReading.
  ///
  /// In en, this message translates to:
  /// **'Reading Book'**
  String get remReading;

  /// No description provided for @remReadingDesc.
  ///
  /// In en, this message translates to:
  /// **'Bedtime story.'**
  String get remReadingDesc;

  /// No description provided for @remAddReminder.
  ///
  /// In en, this message translates to:
  /// **'Add Reminder'**
  String get remAddReminder;

  /// No description provided for @remTitleLabel.
  ///
  /// In en, this message translates to:
  /// **'Title'**
  String get remTitleLabel;

  /// No description provided for @remTitleHint.
  ///
  /// In en, this message translates to:
  /// **'E.g., Physiotherapy'**
  String get remTitleHint;

  /// No description provided for @remDescLabel.
  ///
  /// In en, this message translates to:
  /// **'Description'**
  String get remDescLabel;

  /// No description provided for @remTimeLabel.
  ///
  /// In en, this message translates to:
  /// **'Time'**
  String get remTimeLabel;

  /// No description provided for @remRepeatLabel.
  ///
  /// In en, this message translates to:
  /// **'Repeat'**
  String get remRepeatLabel;

  /// No description provided for @remNone.
  ///
  /// In en, this message translates to:
  /// **'None'**
  String get remNone;

  /// No description provided for @remDaily.
  ///
  /// In en, this message translates to:
  /// **'Every Day'**
  String get remDaily;

  /// No description provided for @remWeekly.
  ///
  /// In en, this message translates to:
  /// **'Weekly'**
  String get remWeekly;

  /// No description provided for @remMonthly.
  ///
  /// In en, this message translates to:
  /// **'Monthly'**
  String get remMonthly;

  /// No description provided for @remTitle.
  ///
  /// In en, this message translates to:
  /// **'Reminders'**
  String get remTitle;

  /// No description provided for @remNoReminder.
  ///
  /// In en, this message translates to:
  /// **'No reminders yet.'**
  String get remNoReminder;

  /// No description provided for @gameMemory.
  ///
  /// In en, this message translates to:
  /// **'Memory Game'**
  String get gameMemory;

  /// No description provided for @gameMemoryDesc.
  ///
  /// In en, this message translates to:
  /// **'Strengthen your memory by matching cards.'**
  String get gameMemoryDesc;

  /// No description provided for @gameBalloons.
  ///
  /// In en, this message translates to:
  /// **'Colorful Balloons'**
  String get gameBalloons;

  /// No description provided for @gameBalloonsDesc.
  ///
  /// In en, this message translates to:
  /// **'Pop the balloons of the specified color.'**
  String get gameBalloonsDesc;

  /// No description provided for @gameEmotion.
  ///
  /// In en, this message translates to:
  /// **'Emotion Matching'**
  String get gameEmotion;

  /// No description provided for @gameEmotionDesc.
  ///
  /// In en, this message translates to:
  /// **'Match facial expressions with emotions.'**
  String get gameEmotionDesc;

  /// No description provided for @gameShapes.
  ///
  /// In en, this message translates to:
  /// **'Shape Placement'**
  String get gameShapes;

  /// No description provided for @gameShapesDesc.
  ///
  /// In en, this message translates to:
  /// **'Put the missing shapes in the right place.'**
  String get gameShapesDesc;

  /// No description provided for @gameComingSoon.
  ///
  /// In en, this message translates to:
  /// **'Coming soon'**
  String get gameComingSoon;

  /// No description provided for @authErrKvkkRequired.
  ///
  /// In en, this message translates to:
  /// **'Terms & Privacy Policy consent is required to continue.'**
  String get authErrKvkkRequired;

  /// No description provided for @authTextKvkk.
  ///
  /// In en, this message translates to:
  /// **'By continuing, you accept the Terms & Privacy Policy.'**
  String get authTextKvkk;

  /// No description provided for @moduleLabelFeaturedGuide.
  ///
  /// In en, this message translates to:
  /// **'Featured Guide'**
  String get moduleLabelFeaturedGuide;

  /// No description provided for @moduleLabelCategories.
  ///
  /// In en, this message translates to:
  /// **'Categories'**
  String get moduleLabelCategories;

  /// No description provided for @moduleLabelReadMore.
  ///
  /// In en, this message translates to:
  /// **'Read More'**
  String get moduleLabelReadMore;

  /// No description provided for @homeAgeLabel.
  ///
  /// In en, this message translates to:
  /// **'Age: -'**
  String get homeAgeLabel;

  /// No description provided for @homeAgeYears.
  ///
  /// In en, this message translates to:
  /// **'{count} years'**
  String homeAgeYears(int count);

  /// No description provided for @homeAgeMonths.
  ///
  /// In en, this message translates to:
  /// **'{count} months'**
  String homeAgeMonths(int count);

  /// No description provided for @homeAgeDays.
  ///
  /// In en, this message translates to:
  /// **'{count} days'**
  String homeAgeDays(int count);

  /// No description provided for @authSubtitleAwareness.
  ///
  /// In en, this message translates to:
  /// **'Autism Awareness'**
  String get authSubtitleAwareness;

  /// No description provided for @moduleTitleInfo.
  ///
  /// In en, this message translates to:
  /// **'Autism Info'**
  String get moduleTitleInfo;

  /// No description provided for @moduleTitleOsb.
  ///
  /// In en, this message translates to:
  /// **'ASD (Autism Spectrum Disorder)'**
  String get moduleTitleOsb;

  /// No description provided for @moduleTitleOsbResearch.
  ///
  /// In en, this message translates to:
  /// **'Latest Research on ASD'**
  String get moduleTitleOsbResearch;

  /// No description provided for @moduleTitleEducation.
  ///
  /// In en, this message translates to:
  /// **'Education & ABA'**
  String get moduleTitleEducation;

  /// No description provided for @moduleTitleEmotions.
  ///
  /// In en, this message translates to:
  /// **'My Emotions'**
  String get moduleTitleEmotions;

  /// No description provided for @moduleTitleGames.
  ///
  /// In en, this message translates to:
  /// **'Educational Games'**
  String get moduleTitleGames;

  /// No description provided for @moduleTitleStories.
  ///
  /// In en, this message translates to:
  /// **'Social Stories'**
  String get moduleTitleStories;

  /// No description provided for @moduleTitleMusic.
  ///
  /// In en, this message translates to:
  /// **'Music & Sound Therapy'**
  String get moduleTitleMusic;

  /// No description provided for @moduleTitleAcc.
  ///
  /// In en, this message translates to:
  /// **'AAC (Alternative Comm.)'**
  String get moduleTitleAcc;

  /// No description provided for @moduleTitleCalendar.
  ///
  /// In en, this message translates to:
  /// **'Visual Calendar'**
  String get moduleTitleCalendar;

  /// No description provided for @moduleTitleEduReminder.
  ///
  /// In en, this message translates to:
  /// **'Education Reminders'**
  String get moduleTitleEduReminder;

  /// No description provided for @moduleTitleSensory.
  ///
  /// In en, this message translates to:
  /// **'Sensory Integration'**
  String get moduleTitleSensory;

  /// No description provided for @moduleTitleObjects.
  ///
  /// In en, this message translates to:
  /// **'My Objects'**
  String get moduleTitleObjects;

  /// No description provided for @moduleTitleSentenceSounds.
  ///
  /// In en, this message translates to:
  /// **'Sentence Sounds'**
  String get moduleTitleSentenceSounds;

  /// No description provided for @moduleTitleImitation.
  ///
  /// In en, this message translates to:
  /// **'Imitation Skills'**
  String get moduleTitleImitation;

  /// No description provided for @moduleTitleDefault.
  ///
  /// In en, this message translates to:
  /// **'Module'**
  String get moduleTitleDefault;

  /// No description provided for @modSentence.
  ///
  /// In en, this message translates to:
  /// **'Sentence Sounds'**
  String get modSentence;

  /// No description provided for @catTherapy.
  ///
  /// In en, this message translates to:
  /// **'Therapy'**
  String get catTherapy;

  /// No description provided for @catTherapySub.
  ///
  /// In en, this message translates to:
  /// **'Therapy Modules'**
  String get catTherapySub;

  /// No description provided for @modEduGames.
  ///
  /// In en, this message translates to:
  /// **'Educational Games'**
  String get modEduGames;

  /// No description provided for @modSensory.
  ///
  /// In en, this message translates to:
  /// **'Sensory'**
  String get modSensory;

  /// No description provided for @catGuidance.
  ///
  /// In en, this message translates to:
  /// **'Guidance'**
  String get catGuidance;

  /// No description provided for @catGuidanceSub.
  ///
  /// In en, this message translates to:
  /// **'Guidance for Parents'**
  String get catGuidanceSub;

  /// No description provided for @modEduGuide.
  ///
  /// In en, this message translates to:
  /// **'Educational Guide'**
  String get modEduGuide;

  /// No description provided for @modResearch.
  ///
  /// In en, this message translates to:
  /// **'Latest Research'**
  String get modResearch;

  /// No description provided for @activeProfile.
  ///
  /// In en, this message translates to:
  /// **'Active Profile'**
  String get activeProfile;

  /// No description provided for @dailyProgressTitle.
  ///
  /// In en, this message translates to:
  /// **'{name}\'s Daily Progress'**
  String dailyProgressTitle(String name);

  /// No description provided for @moduleProgress.
  ///
  /// In en, this message translates to:
  /// **'Completed {current} / {total}'**
  String moduleProgress(int current, int total);

  /// No description provided for @familyTabPrivacy.
  ///
  /// In en, this message translates to:
  /// **'Privacy'**
  String get familyTabPrivacy;

  /// No description provided for @familyTitleDeleteAccount.
  ///
  /// In en, this message translates to:
  /// **'Delete Account'**
  String get familyTitleDeleteAccount;

  /// No description provided for @profileSettings.
  ///
  /// In en, this message translates to:
  /// **'Profile Settings'**
  String get profileSettings;

  /// No description provided for @logout.
  ///
  /// In en, this message translates to:
  /// **'Logout'**
  String get logout;

  /// No description provided for @helloUser.
  ///
  /// In en, this message translates to:
  /// **'Hello, {name}'**
  String helloUser(String name);

  /// No description provided for @greeting.
  ///
  /// In en, this message translates to:
  /// **'Hi {name}'**
  String greeting(String name);

  /// No description provided for @welcomeSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Welcome back'**
  String get welcomeSubtitle;

  /// No description provided for @catZeka.
  ///
  /// In en, this message translates to:
  /// **'Autintellect'**
  String get catZeka;

  /// No description provided for @catZekaSub.
  ///
  /// In en, this message translates to:
  /// **'AI and Logic Games'**
  String get catZekaSub;

  /// No description provided for @modObjects.
  ///
  /// In en, this message translates to:
  /// **'Objects'**
  String get modObjects;

  /// No description provided for @modImitation.
  ///
  /// In en, this message translates to:
  /// **'Imitation'**
  String get modImitation;

  /// No description provided for @familyTabSettings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get familyTabSettings;

  /// No description provided for @familyErrCallFailed.
  ///
  /// In en, this message translates to:
  /// **'Could not initiate call'**
  String get familyErrCallFailed;

  /// No description provided for @familyErrCallError.
  ///
  /// In en, this message translates to:
  /// **'Error initiating call'**
  String get familyErrCallError;

  /// No description provided for @familyTitleContactInfo.
  ///
  /// In en, this message translates to:
  /// **'Contact Information'**
  String get familyTitleContactInfo;

  /// No description provided for @familyLabelFullName.
  ///
  /// In en, this message translates to:
  /// **'Parent/Guardian Full Name'**
  String get familyLabelFullName;

  /// No description provided for @familyLabelPhone.
  ///
  /// In en, this message translates to:
  /// **'Phone Number'**
  String get familyLabelPhone;

  /// No description provided for @familyLabelInstructorPhone.
  ///
  /// In en, this message translates to:
  /// **'Instructor Phone'**
  String get familyLabelInstructorPhone;

  /// No description provided for @familyLabelDoctorPhone.
  ///
  /// In en, this message translates to:
  /// **'Doctor Phone'**
  String get familyLabelDoctorPhone;

  /// No description provided for @familyMsgSaved.
  ///
  /// In en, this message translates to:
  /// **'Information saved.'**
  String get familyMsgSaved;

  /// No description provided for @familyBtnSave.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get familyBtnSave;

  /// No description provided for @familyDescDeleteAccount.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to delete your account? This action cannot be undone.'**
  String get familyDescDeleteAccount;

  /// No description provided for @familyBtnCancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get familyBtnCancel;

  /// No description provided for @familyBtnDelete.
  ///
  /// In en, this message translates to:
  /// **'Delete'**
  String get familyBtnDelete;

  /// No description provided for @familyErrPasswordRequired.
  ///
  /// In en, this message translates to:
  /// **'Password is required to delete account.'**
  String get familyErrPasswordRequired;

  /// No description provided for @familyTabProfiles.
  ///
  /// In en, this message translates to:
  /// **'Profiles'**
  String get familyTabProfiles;

  /// No description provided for @familyTitleNewProfile.
  ///
  /// In en, this message translates to:
  /// **'New Profile'**
  String get familyTitleNewProfile;

  /// No description provided for @familyTitleEditProfile.
  ///
  /// In en, this message translates to:
  /// **'Edit Profile'**
  String get familyTitleEditProfile;

  /// No description provided for @familyBtnChangePhoto.
  ///
  /// In en, this message translates to:
  /// **'Change Photo'**
  String get familyBtnChangePhoto;

  /// No description provided for @familyLabelChildName.
  ///
  /// In en, this message translates to:
  /// **'Child Name'**
  String get familyLabelChildName;

  /// No description provided for @familyLabelBirthDate.
  ///
  /// In en, this message translates to:
  /// **'Birth Date'**
  String get familyLabelBirthDate;

  /// No description provided for @familyLabelAgeOptional.
  ///
  /// In en, this message translates to:
  /// **'Age (Optional)'**
  String get familyLabelAgeOptional;

  /// No description provided for @familyLabelFamilyNotes.
  ///
  /// In en, this message translates to:
  /// **'Family Notes'**
  String get familyLabelFamilyNotes;

  /// No description provided for @familyLabelEduNotes.
  ///
  /// In en, this message translates to:
  /// **'Educational Notes'**
  String get familyLabelEduNotes;

  /// No description provided for @familyTitleChildProfiles.
  ///
  /// In en, this message translates to:
  /// **'Child Profiles'**
  String get familyTitleChildProfiles;

  /// No description provided for @familyBtnNew.
  ///
  /// In en, this message translates to:
  /// **'New'**
  String get familyBtnNew;

  /// No description provided for @familyTxtNoProfile.
  ///
  /// In en, this message translates to:
  /// **'No profiles found.'**
  String get familyTxtNoProfile;

  /// No description provided for @familyTxtUnnamed.
  ///
  /// In en, this message translates to:
  /// **'Unnamed'**
  String get familyTxtUnnamed;

  /// No description provided for @familyBtnActive.
  ///
  /// In en, this message translates to:
  /// **'Active'**
  String get familyBtnActive;

  /// No description provided for @familyTitlePanel.
  ///
  /// In en, this message translates to:
  /// **'Family Panel'**
  String get familyTitlePanel;

  /// No description provided for @familyTabProfile.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get familyTabProfile;

  /// No description provided for @familyTabContact.
  ///
  /// In en, this message translates to:
  /// **'Contact'**
  String get familyTabContact;

  /// No description provided for @emotionsTitle.
  ///
  /// In en, this message translates to:
  /// **'Choose Emotion'**
  String get emotionsTitle;

  /// No description provided for @emotionsIntensity.
  ///
  /// In en, this message translates to:
  /// **'Intensity (1-5)'**
  String get emotionsIntensity;

  /// No description provided for @emotionsTriggers.
  ///
  /// In en, this message translates to:
  /// **'Triggers'**
  String get emotionsTriggers;

  /// No description provided for @emotionsAntecedent.
  ///
  /// In en, this message translates to:
  /// **'Antecedent (what happened?)'**
  String get emotionsAntecedent;

  /// No description provided for @emotionsBehavior.
  ///
  /// In en, this message translates to:
  /// **'Behavior'**
  String get emotionsBehavior;

  /// No description provided for @emotionsConsequence.
  ///
  /// In en, this message translates to:
  /// **'Consequence'**
  String get emotionsConsequence;

  /// No description provided for @emotionsNotes.
  ///
  /// In en, this message translates to:
  /// **'Additional Notes'**
  String get emotionsNotes;

  /// No description provided for @emotionsHelped.
  ///
  /// In en, this message translates to:
  /// **'What Helped?'**
  String get emotionsHelped;

  /// No description provided for @emotionsSave.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get emotionsSave;

  /// No description provided for @emotionsEmpty.
  ///
  /// In en, this message translates to:
  /// **'No logs yet.'**
  String get emotionsEmpty;

  /// No description provided for @emotionHappy.
  ///
  /// In en, this message translates to:
  /// **'Happy'**
  String get emotionHappy;

  /// No description provided for @emotionSad.
  ///
  /// In en, this message translates to:
  /// **'Sad'**
  String get emotionSad;

  /// No description provided for @emotionAngry.
  ///
  /// In en, this message translates to:
  /// **'Angry'**
  String get emotionAngry;

  /// No description provided for @emotionSurprised.
  ///
  /// In en, this message translates to:
  /// **'Surprised'**
  String get emotionSurprised;

  /// No description provided for @emotionScared.
  ///
  /// In en, this message translates to:
  /// **'Scared'**
  String get emotionScared;

  /// No description provided for @emotionExcited.
  ///
  /// In en, this message translates to:
  /// **'Excited'**
  String get emotionExcited;

  /// No description provided for @triggerNoise.
  ///
  /// In en, this message translates to:
  /// **'Noise'**
  String get triggerNoise;

  /// No description provided for @triggerCrowd.
  ///
  /// In en, this message translates to:
  /// **'Crowd'**
  String get triggerCrowd;

  /// No description provided for @triggerChange.
  ///
  /// In en, this message translates to:
  /// **'Change'**
  String get triggerChange;

  /// No description provided for @triggerWait.
  ///
  /// In en, this message translates to:
  /// **'Waiting'**
  String get triggerWait;

  /// No description provided for @triggerFatigue.
  ///
  /// In en, this message translates to:
  /// **'Fatigue'**
  String get triggerFatigue;

  /// No description provided for @triggerHunger.
  ///
  /// In en, this message translates to:
  /// **'Hunger'**
  String get triggerHunger;

  /// No description provided for @triggerLight.
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get triggerLight;

  /// No description provided for @triggerTouch.
  ///
  /// In en, this message translates to:
  /// **'Touch'**
  String get triggerTouch;

  /// No description provided for @triggerScreen.
  ///
  /// In en, this message translates to:
  /// **'Screen'**
  String get triggerScreen;

  /// No description provided for @triggerSeparation.
  ///
  /// In en, this message translates to:
  /// **'Separation'**
  String get triggerSeparation;

  /// No description provided for @helpBreath.
  ///
  /// In en, this message translates to:
  /// **'Deep Breath'**
  String get helpBreath;

  /// No description provided for @helpBreak.
  ///
  /// In en, this message translates to:
  /// **'Take a Break'**
  String get helpBreak;

  /// No description provided for @helpHug.
  ///
  /// In en, this message translates to:
  /// **'Hug'**
  String get helpHug;

  /// No description provided for @helpHeadphones.
  ///
  /// In en, this message translates to:
  /// **'Headphones'**
  String get helpHeadphones;

  /// No description provided for @helpWater.
  ///
  /// In en, this message translates to:
  /// **'Drink Water'**
  String get helpWater;

  /// No description provided for @helpCorner.
  ///
  /// In en, this message translates to:
  /// **'Quiet Corner'**
  String get helpCorner;

  /// No description provided for @helpMusic.
  ///
  /// In en, this message translates to:
  /// **'Music'**
  String get helpMusic;

  /// No description provided for @helpBall.
  ///
  /// In en, this message translates to:
  /// **'Squeeze Ball'**
  String get helpBall;

  /// No description provided for @homeAgeNewborn.
  ///
  /// In en, this message translates to:
  /// **'Newborn'**
  String get homeAgeNewborn;

  /// No description provided for @storySelect.
  ///
  /// In en, this message translates to:
  /// **'Choose a story'**
  String get storySelect;

  /// No description provided for @musicMainTitle.
  ///
  /// In en, this message translates to:
  /// **'Music & Relaxing Sounds'**
  String get musicMainTitle;

  /// No description provided for @musicMainSubtitle.
  ///
  /// In en, this message translates to:
  /// **'You can choose and start a suitable sound for calming, focusing, or bedtime.'**
  String get musicMainSubtitle;

  /// No description provided for @musicPlaying.
  ///
  /// In en, this message translates to:
  /// **'Playing...'**
  String get musicPlaying;

  /// No description provided for @btnStart.
  ///
  /// In en, this message translates to:
  /// **'Start'**
  String get btnStart;

  /// No description provided for @musicDurationPrefix.
  ///
  /// In en, this message translates to:
  /// **'Duration'**
  String get musicDurationPrefix;

  /// No description provided for @gameSelect.
  ///
  /// In en, this message translates to:
  /// **'Choose a game'**
  String get gameSelect;

  /// No description provided for @gameTitleEmotions.
  ///
  /// In en, this message translates to:
  /// **'Match Emotions'**
  String get gameTitleEmotions;

  /// No description provided for @gameDescEmotions.
  ///
  /// In en, this message translates to:
  /// **'Which emotion matches which word?'**
  String get gameDescEmotions;

  /// No description provided for @gameTitleMatching.
  ///
  /// In en, this message translates to:
  /// **'Matching Game'**
  String get gameTitleMatching;

  /// No description provided for @gameDescMatching.
  ///
  /// In en, this message translates to:
  /// **'Find and match the same fruits'**
  String get gameDescMatching;

  /// No description provided for @gameTitleCounting.
  ///
  /// In en, this message translates to:
  /// **'Counting Game'**
  String get gameTitleCounting;

  /// No description provided for @gameDescCounting.
  ///
  /// In en, this message translates to:
  /// **'Learn numbers with fun'**
  String get gameDescCounting;

  /// No description provided for @gameTitleColors.
  ///
  /// In en, this message translates to:
  /// **'Find Colors'**
  String get gameTitleColors;

  /// No description provided for @gameDescColors.
  ///
  /// In en, this message translates to:
  /// **'Select the correct color'**
  String get gameDescColors;

  /// No description provided for @gameTitleMemory.
  ///
  /// In en, this message translates to:
  /// **'Memory Cards'**
  String get gameTitleMemory;

  /// No description provided for @gameDescMemory.
  ///
  /// In en, this message translates to:
  /// **'Remember card positions'**
  String get gameDescMemory;

  /// No description provided for @gameTitleShapes.
  ///
  /// In en, this message translates to:
  /// **'Recognize Shapes'**
  String get gameTitleShapes;

  /// No description provided for @gameDescShapes.
  ///
  /// In en, this message translates to:
  /// **'Select the correct shape'**
  String get gameDescShapes;

  /// No description provided for @gameTitleColoring.
  ///
  /// In en, this message translates to:
  /// **'Coloring Game'**
  String get gameTitleColoring;

  /// No description provided for @gameDescColoring.
  ///
  /// In en, this message translates to:
  /// **'Color the shapes as you wish'**
  String get gameDescColoring;

  /// No description provided for @gameTargetColorPrefix.
  ///
  /// In en, this message translates to:
  /// **'Target'**
  String get gameTargetColorPrefix;

  /// No description provided for @gameSelectCorrectColor.
  ///
  /// In en, this message translates to:
  /// **'Select the correct color'**
  String get gameSelectCorrectColor;

  /// No description provided for @gameSelectCorrectShape.
  ///
  /// In en, this message translates to:
  /// **'Select the correct shape'**
  String get gameSelectCorrectShape;

  /// No description provided for @gameHowMany.
  ///
  /// In en, this message translates to:
  /// **'How many are there?'**
  String get gameHowMany;

  /// No description provided for @gameNextQuestion.
  ///
  /// In en, this message translates to:
  /// **'New Question'**
  String get gameNextQuestion;

  /// No description provided for @gameStatusMatch.
  ///
  /// In en, this message translates to:
  /// **'Match'**
  String get gameStatusMatch;

  /// No description provided for @gameStatusAllMatched.
  ///
  /// In en, this message translates to:
  /// **'Congratulations, all matched!'**
  String get gameStatusAllMatched;

  /// No description provided for @gameCongratsLevel.
  ///
  /// In en, this message translates to:
  /// **'Congratulations! • Level {level}/{maxLevel}'**
  String gameCongratsLevel(int level, int maxLevel);

  /// No description provided for @gameLevelMoves.
  ///
  /// In en, this message translates to:
  /// **'Level {level}/{maxLevel} • Moves: {moves}'**
  String gameLevelMoves(int level, int maxLevel, int moves);

  /// No description provided for @btnPrev.
  ///
  /// In en, this message translates to:
  /// **'Previous'**
  String get btnPrev;

  /// No description provided for @btnNextLevel.
  ///
  /// In en, this message translates to:
  /// **'Next Level'**
  String get btnNextLevel;

  /// No description provided for @btnRestart.
  ///
  /// In en, this message translates to:
  /// **'Restart'**
  String get btnRestart;

  /// No description provided for @btnTryAgain.
  ///
  /// In en, this message translates to:
  /// **'Retry'**
  String get btnTryAgain;

  /// No description provided for @colorRed.
  ///
  /// In en, this message translates to:
  /// **'Red'**
  String get colorRed;

  /// No description provided for @colorBlue.
  ///
  /// In en, this message translates to:
  /// **'Blue'**
  String get colorBlue;

  /// No description provided for @colorGreen.
  ///
  /// In en, this message translates to:
  /// **'Green'**
  String get colorGreen;

  /// No description provided for @colorYellow.
  ///
  /// In en, this message translates to:
  /// **'Yellow'**
  String get colorYellow;

  /// No description provided for @colorPurple.
  ///
  /// In en, this message translates to:
  /// **'Purple'**
  String get colorPurple;

  /// No description provided for @colorOrange.
  ///
  /// In en, this message translates to:
  /// **'Orange'**
  String get colorOrange;

  /// No description provided for @colorPink.
  ///
  /// In en, this message translates to:
  /// **'Pink'**
  String get colorPink;

  /// No description provided for @shapeCircle.
  ///
  /// In en, this message translates to:
  /// **'Circle'**
  String get shapeCircle;

  /// No description provided for @shapeSquare.
  ///
  /// In en, this message translates to:
  /// **'Square'**
  String get shapeSquare;

  /// No description provided for @shapeTriangle.
  ///
  /// In en, this message translates to:
  /// **'Triangle'**
  String get shapeTriangle;

  /// No description provided for @shapeStar.
  ///
  /// In en, this message translates to:
  /// **'Star'**
  String get shapeStar;

  /// No description provided for @shapeHeart.
  ///
  /// In en, this message translates to:
  /// **'Heart'**
  String get shapeHeart;

  /// No description provided for @emotionSleepy.
  ///
  /// In en, this message translates to:
  /// **'Sleepy'**
  String get emotionSleepy;

  /// No description provided for @gameColoringSelectColor.
  ///
  /// In en, this message translates to:
  /// **'Select Color'**
  String get gameColoringSelectColor;

  /// No description provided for @gameColoringTapAndPaint.
  ///
  /// In en, this message translates to:
  /// **'Tap shape to color'**
  String get gameColoringTapAndPaint;

  /// No description provided for @gameColoringTitle.
  ///
  /// In en, this message translates to:
  /// **'Color Shapes'**
  String get gameColoringTitle;

  /// No description provided for @accCatNeeds.
  ///
  /// In en, this message translates to:
  /// **'Basic Needs'**
  String get accCatNeeds;

  /// No description provided for @accCatEmotions.
  ///
  /// In en, this message translates to:
  /// **'Emotions'**
  String get accCatEmotions;

  /// No description provided for @accCatActions.
  ///
  /// In en, this message translates to:
  /// **'Places & Actions'**
  String get accCatActions;

  /// No description provided for @accCatComm.
  ///
  /// In en, this message translates to:
  /// **'Communication'**
  String get accCatComm;

  /// No description provided for @accLabelWater.
  ///
  /// In en, this message translates to:
  /// **'Water'**
  String get accLabelWater;

  /// No description provided for @accLabelHungry.
  ///
  /// In en, this message translates to:
  /// **'I\'m Hungry'**
  String get accLabelHungry;

  /// No description provided for @accLabelToilet.
  ///
  /// In en, this message translates to:
  /// **'Toilet'**
  String get accLabelToilet;

  /// No description provided for @accLabelSleepy.
  ///
  /// In en, this message translates to:
  /// **'Tired'**
  String get accLabelSleepy;

  /// No description provided for @accLabelBreak.
  ///
  /// In en, this message translates to:
  /// **'Take a Break'**
  String get accLabelBreak;

  /// No description provided for @accLabelHelp.
  ///
  /// In en, this message translates to:
  /// **'Help'**
  String get accLabelHelp;

  /// No description provided for @accLabelHug.
  ///
  /// In en, this message translates to:
  /// **'Hug'**
  String get accLabelHug;

  /// No description provided for @accLabelHappy.
  ///
  /// In en, this message translates to:
  /// **'I\'m Happy'**
  String get accLabelHappy;

  /// No description provided for @accLabelSad.
  ///
  /// In en, this message translates to:
  /// **'I\'m Sad'**
  String get accLabelSad;

  /// No description provided for @accLabelScared.
  ///
  /// In en, this message translates to:
  /// **'I\'m Scared'**
  String get accLabelScared;

  /// No description provided for @accLabelExcited.
  ///
  /// In en, this message translates to:
  /// **'I\'m Excited'**
  String get accLabelExcited;

  /// No description provided for @accLabelAngry.
  ///
  /// In en, this message translates to:
  /// **'I\'m Angry'**
  String get accLabelAngry;

  /// No description provided for @accLabelCalm.
  ///
  /// In en, this message translates to:
  /// **'I\'m Calm'**
  String get accLabelCalm;

  /// No description provided for @accLabelTired.
  ///
  /// In en, this message translates to:
  /// **'I\'m Tired'**
  String get accLabelTired;

  /// No description provided for @accLabelSurprised.
  ///
  /// In en, this message translates to:
  /// **'I\'m Surprised'**
  String get accLabelSurprised;

  /// No description provided for @accLabelGoHome.
  ///
  /// In en, this message translates to:
  /// **'Let\'s Go Home'**
  String get accLabelGoHome;

  /// No description provided for @accLabelGoOut.
  ///
  /// In en, this message translates to:
  /// **'Let\'s Go Outside'**
  String get accLabelGoOut;

  /// No description provided for @accLabelDress.
  ///
  /// In en, this message translates to:
  /// **'Dressing Up'**
  String get accLabelDress;

  /// No description provided for @accLabelGoPark.
  ///
  /// In en, this message translates to:
  /// **'Let\'s Go to the Park'**
  String get accLabelGoPark;

  /// No description provided for @accLabelGoSchool.
  ///
  /// In en, this message translates to:
  /// **'Let\'s Go to School'**
  String get accLabelGoSchool;

  /// No description provided for @accLabelPlayMusic.
  ///
  /// In en, this message translates to:
  /// **'Turn on Music'**
  String get accLabelPlayMusic;

  /// No description provided for @accLabelPlayGame.
  ///
  /// In en, this message translates to:
  /// **'Play a Game'**
  String get accLabelPlayGame;

  /// No description provided for @accLabelLookCalendar.
  ///
  /// In en, this message translates to:
  /// **'Let\'s Look at the Calendar'**
  String get accLabelLookCalendar;

  /// No description provided for @accLabelMe.
  ///
  /// In en, this message translates to:
  /// **'Me'**
  String get accLabelMe;

  /// No description provided for @accLabelPlease.
  ///
  /// In en, this message translates to:
  /// **'Please'**
  String get accLabelPlease;

  /// No description provided for @accLabelThanks.
  ///
  /// In en, this message translates to:
  /// **'Thank You'**
  String get accLabelThanks;

  /// No description provided for @accLabelYes.
  ///
  /// In en, this message translates to:
  /// **'Yes'**
  String get accLabelYes;

  /// No description provided for @accLabelNo.
  ///
  /// In en, this message translates to:
  /// **'No'**
  String get accLabelNo;

  /// No description provided for @accLabelPhone.
  ///
  /// In en, this message translates to:
  /// **'Phone'**
  String get accLabelPhone;

  /// No description provided for @accPlaceholderCard.
  ///
  /// In en, this message translates to:
  /// **'Tap a card...'**
  String get accPlaceholderCard;

  /// No description provided for @accReadSentence.
  ///
  /// In en, this message translates to:
  /// **'Read Sentence'**
  String get accReadSentence;

  /// No description provided for @accSentenceDetailTitle.
  ///
  /// In en, this message translates to:
  /// **'Sentence'**
  String get accSentenceDetailTitle;

  /// No description provided for @calendarTaskMorning.
  ///
  /// In en, this message translates to:
  /// **'Morning Routine'**
  String get calendarTaskMorning;

  /// No description provided for @calendarCatSelfCare.
  ///
  /// In en, this message translates to:
  /// **'Self-care'**
  String get calendarCatSelfCare;

  /// No description provided for @calendarTaskEmotion.
  ///
  /// In en, this message translates to:
  /// **'Emotion Practice'**
  String get calendarTaskEmotion;

  /// No description provided for @calendarCatEducation.
  ///
  /// In en, this message translates to:
  /// **'Education'**
  String get calendarCatEducation;

  /// No description provided for @calendarTaskLunch.
  ///
  /// In en, this message translates to:
  /// **'Lunch'**
  String get calendarTaskLunch;

  /// No description provided for @calendarCatNutrition.
  ///
  /// In en, this message translates to:
  /// **'Nutrition'**
  String get calendarCatNutrition;

  /// No description provided for @calendarTaskMatching.
  ///
  /// In en, this message translates to:
  /// **'Matching Game'**
  String get calendarTaskMatching;

  /// No description provided for @calendarCatPlay.
  ///
  /// In en, this message translates to:
  /// **'Play'**
  String get calendarCatPlay;

  /// No description provided for @calendarTaskGarden.
  ///
  /// In en, this message translates to:
  /// **'Garden Time'**
  String get calendarTaskGarden;

  /// No description provided for @calendarCatActivity.
  ///
  /// In en, this message translates to:
  /// **'Activity'**
  String get calendarCatActivity;

  /// No description provided for @calendarCatCustom.
  ///
  /// In en, this message translates to:
  /// **'Custom'**
  String get calendarCatCustom;

  /// No description provided for @calendarProgressPrefix.
  ///
  /// In en, this message translates to:
  /// **'Progress'**
  String get calendarProgressPrefix;

  /// No description provided for @calendarTokenBalance.
  ///
  /// In en, this message translates to:
  /// **'Tokens'**
  String get calendarTokenBalance;

  /// No description provided for @calendarTimerTitle.
  ///
  /// In en, this message translates to:
  /// **'Timer'**
  String get calendarTimerTitle;

  /// No description provided for @btnPause.
  ///
  /// In en, this message translates to:
  /// **'Pause'**
  String get btnPause;

  /// No description provided for @btnReset.
  ///
  /// In en, this message translates to:
  /// **'Reset'**
  String get btnReset;

  /// No description provided for @calendarDailySchedule.
  ///
  /// In en, this message translates to:
  /// **'Daily Schedule'**
  String get calendarDailySchedule;

  /// No description provided for @calendarAddCustomTaskHint.
  ///
  /// In en, this message translates to:
  /// **'Add custom task'**
  String get calendarAddCustomTaskHint;

  /// No description provided for @btnAdd.
  ///
  /// In en, this message translates to:
  /// **'Add'**
  String get btnAdd;

  /// No description provided for @remDefaultMessage.
  ///
  /// In en, this message translates to:
  /// **'Education time'**
  String get remDefaultMessage;

  /// No description provided for @remPresetFloortime.
  ///
  /// In en, this message translates to:
  /// **'Floortime time'**
  String get remPresetFloortime;

  /// No description provided for @remPresetSpeechTherapy.
  ///
  /// In en, this message translates to:
  /// **'Speech therapy time'**
  String get remPresetSpeechTherapy;

  /// No description provided for @remPresetSpecialEducation.
  ///
  /// In en, this message translates to:
  /// **'Special education time'**
  String get remPresetSpecialEducation;

  /// No description provided for @remPresetErgotherapy.
  ///
  /// In en, this message translates to:
  /// **'Occupational therapy time'**
  String get remPresetErgotherapy;

  /// No description provided for @remPresetMovement.
  ///
  /// In en, this message translates to:
  /// **'Movement training time'**
  String get remPresetMovement;

  /// No description provided for @remPresetEmotionWork.
  ///
  /// In en, this message translates to:
  /// **'Emotion practice time'**
  String get remPresetEmotionWork;

  /// No description provided for @remPresetSensory.
  ///
  /// In en, this message translates to:
  /// **'Sensory integration time'**
  String get remPresetSensory;

  /// No description provided for @remPresetHomework.
  ///
  /// In en, this message translates to:
  /// **'Homework time'**
  String get remPresetHomework;

  /// No description provided for @remPresetReading.
  ///
  /// In en, this message translates to:
  /// **'Reading hour'**
  String get remPresetReading;

  /// No description provided for @remPresetPlay.
  ///
  /// In en, this message translates to:
  /// **'Play time'**
  String get remPresetPlay;

  /// No description provided for @remPresetStory.
  ///
  /// In en, this message translates to:
  /// **'Social story time'**
  String get remPresetStory;

  /// No description provided for @remPresetImitation.
  ///
  /// In en, this message translates to:
  /// **'Imitation practice time'**
  String get remPresetImitation;

  /// No description provided for @remPresetAcc.
  ///
  /// In en, this message translates to:
  /// **'Communication cards time'**
  String get remPresetAcc;

  /// No description provided for @remPresetBreak.
  ///
  /// In en, this message translates to:
  /// **'Break time'**
  String get remPresetBreak;

  /// No description provided for @remPresetWalk.
  ///
  /// In en, this message translates to:
  /// **'Walking time'**
  String get remPresetWalk;

  /// No description provided for @remPresetNutrition.
  ///
  /// In en, this message translates to:
  /// **'Nutrition time'**
  String get remPresetNutrition;

  /// No description provided for @remPresetReward.
  ///
  /// In en, this message translates to:
  /// **'Reward time'**
  String get remPresetReward;

  /// No description provided for @remPresetSleepReady.
  ///
  /// In en, this message translates to:
  /// **'Sleep prep time'**
  String get remPresetSleepReady;

  /// No description provided for @weekdayMonday.
  ///
  /// In en, this message translates to:
  /// **'Monday'**
  String get weekdayMonday;

  /// No description provided for @weekdayTuesday.
  ///
  /// In en, this message translates to:
  /// **'Tuesday'**
  String get weekdayTuesday;

  /// No description provided for @weekdayWednesday.
  ///
  /// In en, this message translates to:
  /// **'Wednesday'**
  String get weekdayWednesday;

  /// No description provided for @weekdayThursday.
  ///
  /// In en, this message translates to:
  /// **'Thursday'**
  String get weekdayThursday;

  /// No description provided for @weekdayFriday.
  ///
  /// In en, this message translates to:
  /// **'Friday'**
  String get weekdayFriday;

  /// No description provided for @weekdaySaturday.
  ///
  /// In en, this message translates to:
  /// **'Saturday'**
  String get weekdaySaturday;

  /// No description provided for @weekdaySunday.
  ///
  /// In en, this message translates to:
  /// **'Sunday'**
  String get weekdaySunday;

  /// No description provided for @remPermissionDenied.
  ///
  /// In en, this message translates to:
  /// **'Notification permission not granted.'**
  String get remPermissionDenied;

  /// No description provided for @remReminderTextTitle.
  ///
  /// In en, this message translates to:
  /// **'Reminder Text'**
  String get remReminderTextTitle;

  /// No description provided for @remCustom.
  ///
  /// In en, this message translates to:
  /// **'Custom...'**
  String get remCustom;

  /// No description provided for @remCustomTextTitle.
  ///
  /// In en, this message translates to:
  /// **'Custom Text'**
  String get remCustomTextTitle;

  /// No description provided for @remCustomTextHint.
  ///
  /// In en, this message translates to:
  /// **'e.g., Floortime time'**
  String get remCustomTextHint;

  /// No description provided for @remMainTitle.
  ///
  /// In en, this message translates to:
  /// **'7-Day Education Reminder'**
  String get remMainTitle;

  /// No description provided for @remMainSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Choose the day and time you want. You will be notified when the time comes.'**
  String get remMainSubtitle;

  /// No description provided for @remTextLabel.
  ///
  /// In en, this message translates to:
  /// **'Text'**
  String get remTextLabel;

  /// No description provided for @remOffLabel.
  ///
  /// In en, this message translates to:
  /// **'Off'**
  String get remOffLabel;

  /// No description provided for @remSelectTimeTooltip.
  ///
  /// In en, this message translates to:
  /// **'Select Time'**
  String get remSelectTimeTooltip;

  /// No description provided for @remSelectTextTooltip.
  ///
  /// In en, this message translates to:
  /// **'Select Text'**
  String get remSelectTextTooltip;

  /// No description provided for @remDisableAll.
  ///
  /// In en, this message translates to:
  /// **'Turn Off All'**
  String get remDisableAll;

  /// No description provided for @sensoryBirds.
  ///
  /// In en, this message translates to:
  /// **'Birds'**
  String get sensoryBirds;

  /// No description provided for @sensorySea.
  ///
  /// In en, this message translates to:
  /// **'Sea'**
  String get sensorySea;

  /// No description provided for @sensoryForest.
  ///
  /// In en, this message translates to:
  /// **'Forest'**
  String get sensoryForest;

  /// No description provided for @sensorySun.
  ///
  /// In en, this message translates to:
  /// **'Sun'**
  String get sensorySun;

  /// No description provided for @objectsQuestion.
  ///
  /// In en, this message translates to:
  /// **'Which one is the {name}?'**
  String objectsQuestion(String name);

  /// No description provided for @objectsCorrectAnswer.
  ///
  /// In en, this message translates to:
  /// **'Yes, this is {name}!'**
  String objectsCorrectAnswer(String name);

  /// No description provided for @objectsWrongAnswer.
  ///
  /// In en, this message translates to:
  /// **'No, this is not {name}.'**
  String objectsWrongAnswer(String name);

  /// No description provided for @objectsNextQuestion.
  ///
  /// In en, this message translates to:
  /// **'Next Question'**
  String get objectsNextQuestion;

  /// No description provided for @tabSentenceBuilder.
  ///
  /// In en, this message translates to:
  /// **'Build Sentence'**
  String get tabSentenceBuilder;

  /// No description provided for @tabSoundsTable.
  ///
  /// In en, this message translates to:
  /// **'Learn Sounds'**
  String get tabSoundsTable;

  /// No description provided for @tabLetterGame.
  ///
  /// In en, this message translates to:
  /// **'Letter Game'**
  String get tabLetterGame;

  /// No description provided for @sentenceBuilderPlaceholder.
  ///
  /// In en, this message translates to:
  /// **'Select a word...'**
  String get sentenceBuilderPlaceholder;

  /// No description provided for @sentenceSpeakButton.
  ///
  /// In en, this message translates to:
  /// **'SPEAK'**
  String get sentenceSpeakButton;

  /// No description provided for @sentenceClearButton.
  ///
  /// In en, this message translates to:
  /// **'CLEAR'**
  String get sentenceClearButton;

  /// No description provided for @letterGameTitle.
  ///
  /// In en, this message translates to:
  /// **'Letter Finding Game'**
  String get letterGameTitle;

  /// No description provided for @letterGameSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Tap on a letter from the boxes and find the word starting with that letter!'**
  String get letterGameSubtitle;

  /// No description provided for @letterGameCorrect.
  ///
  /// In en, this message translates to:
  /// **'Yes, this is {letter}! {letter} is for {word}. {word}.'**
  String letterGameCorrect(String letter, String word);

  /// No description provided for @letterGameCorrectTitle.
  ///
  /// In en, this message translates to:
  /// **'Yes, this is {letter}!'**
  String letterGameCorrectTitle(String letter);

  /// No description provided for @btnClose.
  ///
  /// In en, this message translates to:
  /// **'Close'**
  String get btnClose;

  /// No description provided for @imitationBannerHint.
  ///
  /// In en, this message translates to:
  /// **'You can tap anywhere on the screen to switch to the next imitation move!'**
  String get imitationBannerHint;

  /// No description provided for @imitationStartGame.
  ///
  /// In en, this message translates to:
  /// **'START GAME'**
  String get imitationStartGame;

  /// No description provided for @imitationStartHint.
  ///
  /// In en, this message translates to:
  /// **'Tap anywhere on the screen to start!'**
  String get imitationStartHint;

  /// No description provided for @imitationLivePanel.
  ///
  /// In en, this message translates to:
  /// **'LIVE PANEL'**
  String get imitationLivePanel;

  /// No description provided for @imitationPrefix.
  ///
  /// In en, this message translates to:
  /// **'Imitation'**
  String get imitationPrefix;

  /// No description provided for @imitationReady.
  ///
  /// In en, this message translates to:
  /// **'Are you ready?'**
  String get imitationReady;

  /// No description provided for @moduleComingSoon.
  ///
  /// In en, this message translates to:
  /// **'\"{title}\" module is coming soon.\n\nWe will migrate the content to Flutter step-by-step on this screen.'**
  String moduleComingSoon(String title);

  /// No description provided for @authForgotPassword.
  ///
  /// In en, this message translates to:
  /// **'Forgot Password'**
  String get authForgotPassword;

  /// No description provided for @authResetPassword.
  ///
  /// In en, this message translates to:
  /// **'Reset Password'**
  String get authResetPassword;

  /// No description provided for @authForgotPasswordInstructions.
  ///
  /// In en, this message translates to:
  /// **'Enter the email address registered to your account. We will send you a 6-digit verification code.'**
  String get authForgotPasswordInstructions;

  /// No description provided for @authEmailAddressLabel.
  ///
  /// In en, this message translates to:
  /// **'Email Address'**
  String get authEmailAddressLabel;

  /// No description provided for @authResetPasswordInstructions.
  ///
  /// In en, this message translates to:
  /// **'Enter the 6-digit code sent to {email} and your new password.'**
  String authResetPasswordInstructions(String email);

  /// No description provided for @authVerificationCodeLabel.
  ///
  /// In en, this message translates to:
  /// **'Verification Code'**
  String get authVerificationCodeLabel;

  /// No description provided for @authNewPasswordLabel.
  ///
  /// In en, this message translates to:
  /// **'New Password'**
  String get authNewPasswordLabel;

  /// No description provided for @authNewPassword2Label.
  ///
  /// In en, this message translates to:
  /// **'Confirm New Password'**
  String get authNewPassword2Label;

  /// No description provided for @authBtnSendCode.
  ///
  /// In en, this message translates to:
  /// **'Send Code'**
  String get authBtnSendCode;

  /// No description provided for @authBtnUpdatePassword.
  ///
  /// In en, this message translates to:
  /// **'Update Password'**
  String get authBtnUpdatePassword;

  /// No description provided for @authResetSuccess.
  ///
  /// In en, this message translates to:
  /// **'Your password has been successfully reset. You can now login.'**
  String get authResetSuccess;

  /// No description provided for @authErrVerificationCodeInvalid.
  ///
  /// In en, this message translates to:
  /// **'Enter the 6-digit verification code.'**
  String get authErrVerificationCodeInvalid;

  /// No description provided for @authPwdMinLengthErr.
  ///
  /// In en, this message translates to:
  /// **'Password must be at least 8 characters.'**
  String get authPwdMinLengthErr;

  /// No description provided for @homeGreetingParent.
  ///
  /// In en, this message translates to:
  /// **'Parent'**
  String get homeGreetingParent;

  /// No description provided for @homeErrorPrefix.
  ///
  /// In en, this message translates to:
  /// **'Error: {error}'**
  String homeErrorPrefix(String error);

  /// No description provided for @emotionsChoose.
  ///
  /// In en, this message translates to:
  /// **'Choose your emotion'**
  String get emotionsChoose;

  /// No description provided for @emotionsDiary.
  ///
  /// In en, this message translates to:
  /// **'Emotion Diary'**
  String get emotionsDiary;

  /// No description provided for @emotionsCalming.
  ///
  /// In en, this message translates to:
  /// **'Calming Techniques'**
  String get emotionsCalming;

  /// No description provided for @emotionsCalmingInstructions.
  ///
  /// In en, this message translates to:
  /// **'To calm down: breathe in for 4 seconds, hold for 4 seconds, breathe out for 6 seconds. Take a short break and drink water if you\'d like.'**
  String get emotionsCalmingInstructions;

  /// No description provided for @emotionsSelected.
  ///
  /// In en, this message translates to:
  /// **'Selected emotion: {emotion}'**
  String emotionsSelected(String emotion);

  /// No description provided for @emotionsWhatHelped.
  ///
  /// In en, this message translates to:
  /// **'What helped?'**
  String get emotionsWhatHelped;

  /// No description provided for @emotionsNote.
  ///
  /// In en, this message translates to:
  /// **'Note'**
  String get emotionsNote;

  /// No description provided for @emotionsRecentLogs.
  ///
  /// In en, this message translates to:
  /// **'Recent Logs'**
  String get emotionsRecentLogs;

  /// No description provided for @emotionsNoLogs.
  ///
  /// In en, this message translates to:
  /// **'No logs yet.'**
  String get emotionsNoLogs;

  /// No description provided for @emotionsLogDate.
  ///
  /// In en, this message translates to:
  /// **'Date: {value}'**
  String emotionsLogDate(String value);

  /// No description provided for @emotionsLogEmotion.
  ///
  /// In en, this message translates to:
  /// **'Emotion: {value}'**
  String emotionsLogEmotion(String value);

  /// No description provided for @emotionsLogIntensity.
  ///
  /// In en, this message translates to:
  /// **'Intensity: {value}/5'**
  String emotionsLogIntensity(String value);

  /// No description provided for @emotionsLogTriggers.
  ///
  /// In en, this message translates to:
  /// **'Triggers: {value}'**
  String emotionsLogTriggers(String value);

  /// No description provided for @emotionsLogHelped.
  ///
  /// In en, this message translates to:
  /// **'Helped: {value}'**
  String emotionsLogHelped(String value);

  /// No description provided for @emotionsLogAntecedent.
  ///
  /// In en, this message translates to:
  /// **'Antecedent'**
  String get emotionsLogAntecedent;

  /// No description provided for @emotionsLogBehavior.
  ///
  /// In en, this message translates to:
  /// **'Behavior'**
  String get emotionsLogBehavior;

  /// No description provided for @emotionsLogConsequence.
  ///
  /// In en, this message translates to:
  /// **'Consequence'**
  String get emotionsLogConsequence;

  /// No description provided for @emotionsLogNote.
  ///
  /// In en, this message translates to:
  /// **'Note'**
  String get emotionsLogNote;

  /// No description provided for @authContinueAsGuest.
  ///
  /// In en, this message translates to:
  /// **'Continue as Guest'**
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
      <String>['en'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
