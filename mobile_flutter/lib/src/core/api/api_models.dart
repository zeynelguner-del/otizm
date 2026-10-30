class SessionInfo {
  final String? email;
  final bool kvkkAccepted;

  const SessionInfo({required this.email, required this.kvkkAccepted});

  factory SessionInfo.fromJson(Map<String, dynamic> json) {
    final session = json['session'];
    final email = session is Map<String, dynamic> ? session['email'] : null;
    return SessionInfo(
      email: email is String ? email : null,
      kvkkAccepted: json['kvkkAccepted'] == true,
    );
  }
}

class Profile {
  final String id;
  final String name;
  final String birthDate;
  final String familyNotes;
  final String educationNotes;
  final String legacyAge;
  final String photoDataUrl;

  const Profile({
    required this.id,
    required this.name,
    required this.birthDate,
    required this.familyNotes,
    required this.educationNotes,
    required this.legacyAge,
    required this.photoDataUrl,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: (json['id'] as String?) ?? '',
      name: (json['name'] as String?) ?? '',
      birthDate: (json['birthDate'] as String?) ?? '',
      familyNotes: (json['familyNotes'] as String?) ?? '',
      educationNotes: (json['educationNotes'] as String?) ?? '',
      legacyAge: (json['legacyAge'] as String?) ?? '',
      photoDataUrl: (json['photoDataUrl'] as String?) ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'birthDate': birthDate,
      'familyNotes': familyNotes,
      'educationNotes': educationNotes,
      'legacyAge': legacyAge,
      'photoDataUrl': photoDataUrl,
    };
  }
}

class ProfileEnvelope {
  final List<Profile> profiles;
  final String activeProfileId;

  const ProfileEnvelope({required this.profiles, required this.activeProfileId});

  factory ProfileEnvelope.fromJson(Map<String, dynamic> json) {
    final p = json['profiles'];
    final list = p is List
        ? p.whereType<Map>().map((e) => Profile.fromJson(e.cast<String, dynamic>())).toList()
        : <Profile>[];
    final active = json['activeProfileId'];
    return ProfileEnvelope(
      profiles: list,
      activeProfileId: active is String ? active : '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'profiles': profiles.map((e) => e.toJson()).toList(),
      'activeProfileId': activeProfileId,
    };
  }
}

class UserMeta {
  final String userFullName;
  final String userPhone;
  final String instructorPhone;
  final String doctorPhone;

  const UserMeta({
    required this.userFullName,
    required this.userPhone,
    required this.instructorPhone,
    required this.doctorPhone,
  });

  factory UserMeta.fromJson(Map<String, dynamic> json) {
    return UserMeta(
      userFullName: (json['userFullName'] as String?) ?? '',
      userPhone: (json['userPhone'] as String?) ?? '',
      instructorPhone: (json['instructorPhone'] as String?) ?? '',
      doctorPhone: (json['doctorPhone'] as String?) ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userFullName': userFullName,
      'userPhone': userPhone,
      'instructorPhone': instructorPhone,
      'doctorPhone': doctorPhone,
    };
  }
}

class AdminStats {
  final int usersTotal;
  final int sessionsActive;
  final int kvkkAccepted;
  final int profilesSaved;
  final int usersLast7Days;

  const AdminStats({
    required this.usersTotal,
    required this.sessionsActive,
    required this.kvkkAccepted,
    required this.profilesSaved,
    required this.usersLast7Days,
  });

  factory AdminStats.fromJson(Map<String, dynamic> json) {
    int asInt(dynamic v) => v is int ? v : (v is num ? v.toInt() : 0);
    return AdminStats(
      usersTotal: asInt(json['usersTotal']),
      sessionsActive: asInt(json['sessionsActive']),
      kvkkAccepted: asInt(json['kvkkAccepted']),
      profilesSaved: asInt(json['profilesSaved']),
      usersLast7Days: asInt(json['usersLast7Days']),
    );
  }
}

class ApiException implements Exception {
  final String message;
  const ApiException(this.message);

  @override
  String toString() => message;
}

