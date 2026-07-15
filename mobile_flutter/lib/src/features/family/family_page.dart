import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:otizm_destek_app/l10n/app_localizations.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/api/api_models.dart';
import '../../core/utils/photo_data_url.dart';
import '../../state/api_client_provider.dart';
import '../../state/session_controller.dart';

class FamilyPage extends ConsumerStatefulWidget {
  const FamilyPage({super.key});

  @override
  ConsumerState<FamilyPage> createState() => _FamilyPageState();
}

class _FamilyPageState extends ConsumerState<FamilyPage> with SingleTickerProviderStateMixin {
  late final TabController _tab;

  @override
  void initState() {
    super.initState();
    _tab = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tab.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.familyTitlePanel),
        bottom: TabBar(
          controller: _tab,
          tabs: [
            Tab(text: AppLocalizations.of(context)!.familyTabProfile),
            Tab(text: AppLocalizations.of(context)!.familyTabContact),
            Tab(text: AppLocalizations.of(context)!.familyTabPrivacy),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tab,
        children: [
          _ProfilesTab(),
          _ContactTab(),
          _PrivacyTab(),
        ],
      ),
    );
  }
}

class _ProfilesTab extends ConsumerStatefulWidget {
  const _ProfilesTab();

  @override
  ConsumerState<_ProfilesTab> createState() => _ProfilesTabState();
}

class _ProfilesTabState extends ConsumerState<_ProfilesTab> {
  bool _busy = false;

  Future<void> _editProfile(ProfileEnvelope env, {Profile? existing}) async {
    final name = TextEditingController(text: existing?.name ?? '');
    final birth = TextEditingController(text: existing?.birthDate ?? '');
    final familyNotes = TextEditingController(text: existing?.familyNotes ?? '');
    final educationNotes = TextEditingController(text: existing?.educationNotes ?? '');
    final legacyAge = TextEditingController(text: existing?.legacyAge ?? '');
    String selectedPhoto = existing?.photoDataUrl ?? '';

    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 16,
                right: 16,
                top: 16,
                bottom: 16 + MediaQuery.of(context).viewInsets.bottom,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      existing == null ? AppLocalizations.of(context)!.familyTitleNewProfile : AppLocalizations.of(context)!.familyTitleEditProfile,
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                    ),
                    const SizedBox(height: 20),
                    // Clickable Profile Photo Circle
                    Center(
                      child: GestureDetector(
                        onTap: () async {
                          final ImagePicker picker = ImagePicker();
                          final XFile? image = await picker.pickImage(
                            source: ImageSource.gallery,
                            maxWidth: 512,
                            maxHeight: 512,
                            imageQuality: 80,
                          );
                          if (image != null) {
                            final bytes = await image.readAsBytes();
                            final base64Str = base64Encode(bytes);
                            final mimeType = image.name.endsWith('.png') ? 'image/png' : 'image/jpeg';
                            setModalState(() {
                              selectedPhoto = 'data:$mimeType;base64,$base64Str';
                            });
                          }
                        },
                        child: Column(
                          children: [
                            Container(
                              width: 84,
                              height: 84,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.grey.shade100,
                                border: Border.all(color: const Color(0xFF10B981), width: 3),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.05),
                                    blurRadius: 10,
                                    spreadRadius: 2,
                                  )
                                ],
                              ),
                              alignment: Alignment.center,
                              child: selectedPhoto.isNotEmpty
                                  ? ClipOval(
                                      child: Image.memory(
                                        decodeDataUrlImage(selectedPhoto)!,
                                        width: 78,
                                        height: 78,
                                        fit: BoxFit.cover,
                                      ),
                                    )
                                  : Icon(Icons.add_a_photo, size: 36, color: Colors.grey.shade400),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              AppLocalizations.of(context)!.familyBtnChangePhoto,
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF10B981),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    TextField(controller: name, decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelChildName, border: OutlineInputBorder())),
                    const SizedBox(height: 12),
                    TextField(
                      controller: birth,
                      decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelBirthDate, border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 12),
                    TextField(controller: legacyAge, decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelAgeOptional, border: OutlineInputBorder())),
                    const SizedBox(height: 12),
                    TextField(
                      controller: familyNotes,
                      maxLines: 2,
                      decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelFamilyNotes, border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: educationNotes,
                      maxLines: 2,
                      decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelEduNotes, border: OutlineInputBorder()),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: FilledButton(
                        onPressed: () => Navigator.of(context).pop(true),
                        style: FilledButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: Text(AppLocalizations.of(context)!.familyBtnSave),
                      ),
                    )
                  ],
                ),
              ),
            );
          },
        );
      },
    );

    if (saved != true) return;

    final id = existing?.id ?? 'p${DateTime.now().millisecondsSinceEpoch}${Random().nextInt(999)}';
    final nextProfile = Profile(
      id: id,
      name: name.text.trim(),
      birthDate: birth.text.trim(),
      familyNotes: familyNotes.text.trim(),
      educationNotes: educationNotes.text.trim(),
      legacyAge: legacyAge.text.trim(),
      photoDataUrl: selectedPhoto,
    );

    final nextProfiles = [...env.profiles.where((p) => p.id != id), nextProfile];
    final nextEnv = ProfileEnvelope(
      profiles: nextProfiles,
      activeProfileId: env.activeProfileId.isNotEmpty ? env.activeProfileId : id,
    );

    setState(() => _busy = true);
    try {
      final api = await ref.read(apiClientProvider.future);
      await api.saveProfile(nextEnv);
      ref.invalidate(profileProvider);
      if (mounted) setState(() {});
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _setActive(ProfileEnvelope env, String id) async {
    setState(() => _busy = true);
    try {
      final api = await ref.read(apiClientProvider.future);
      await api.saveProfile(ProfileEnvelope(profiles: env.profiles, activeProfileId: id));
      ref.invalidate(profileProvider);
      if (mounted) setState(() {});
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final profileAsync = ref.watch(profileProvider);
    return profileAsync.when(
      data: (env) {
        final profiles = env?.profiles ?? const <Profile>[];
        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(AppLocalizations.of(context)!.familyTitleChildProfiles, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                ),
                OutlinedButton(
                  onPressed: _busy
                      ? null
                      : () async {
                          await _editProfile(env ?? const ProfileEnvelope(profiles: [], activeProfileId: ''), existing: null);
                        },
                  child: Text(AppLocalizations.of(context)!.familyBtnNew),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (profiles.isEmpty)
              Text(AppLocalizations.of(context)!.familyTxtNoProfile, style: TextStyle(fontWeight: FontWeight.w700))
            else
              ...profiles.map((p) {
                final isActive = env?.activeProfileId == p.id;
                return Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20), side: const BorderSide(color: Color(0xFFE4E4E7))),
                  child: ListTile(
                    title: Text(p.name.isEmpty ? AppLocalizations.of(context)!.familyTxtUnnamed : p.name, style: const TextStyle(fontWeight: FontWeight.w900)),
                    subtitle: Text(p.birthDate.isEmpty ? '-' : p.birthDate, style: const TextStyle(fontWeight: FontWeight.w700)),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          onPressed: _busy || env == null ? null : () => _editProfile(env, existing: p),
                          icon: const Icon(Icons.edit),
                        ),
                        if (!isActive)
                          TextButton(
                            onPressed: _busy || env == null ? null : () => _setActive(env, p.id),
                            child: Text(AppLocalizations.of(context)!.familyBtnActive),
                          )
                        else
                          const Padding(
                            padding: EdgeInsets.only(right: 8),
                            child: Icon(Icons.check_circle, color: Color(0xFF10B981)),
                          ),
                      ],
                    ),
                  ),
                );
              }),
          ],
        );
      },
      loading: () => const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: CircularProgressIndicator(),
        ),
      ),
      error: (err, _) => Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Text('Hata: $err'),
        ),
      ),
    );
  }
}

class _ContactTab extends ConsumerStatefulWidget {
  const _ContactTab();

  @override
  ConsumerState<_ContactTab> createState() => _ContactTabState();
}

class _ContactTabState extends ConsumerState<_ContactTab> {
  final _fullName = TextEditingController();
  final _phone = TextEditingController();
  final _instructor = TextEditingController();
  final _doctor = TextEditingController();
  bool _loaded = false;
  bool _busy = false;
  String? _ok;

  Future<void> _load() async {
    final api = await ref.read(apiClientProvider.future);
    final meta = await api.getUserMeta();
    _fullName.text = meta?.userFullName ?? '';
    _phone.text = meta?.userPhone ?? '';
    _instructor.text = meta?.instructorPhone ?? '';
    _doctor.text = meta?.doctorPhone ?? '';
  }

  Future<void> _launchCaller(String numStr) async {
    final cleanNum = numStr.replaceAll(RegExp(r'\s+'), '');
    final uri = Uri(scheme: 'tel', path: cleanNum);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri);
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(AppLocalizations.of(context)!.familyErrCallFailed)),
          );
        }
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AppLocalizations.of(context)!.familyErrCallError)),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_loaded) {
      _loaded = true;
      _load().then((_) {
        if (mounted) setState(() {});
      });
    }
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(AppLocalizations.of(context)!.familyTitleContactInfo, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        if (_ok != null)
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: const Color(0xFFECFDF5), borderRadius: BorderRadius.circular(16)),
            child: Text(_ok!, style: const TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF065F46))),
          ),
        if (_ok != null) const SizedBox(height: 12),
        TextField(controller: _fullName, decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelFullName, border: OutlineInputBorder())),
        const SizedBox(height: 12),
        TextField(controller: _phone, keyboardType: TextInputType.phone, decoration: InputDecoration(labelText: AppLocalizations.of(context)!.familyLabelPhone, border: OutlineInputBorder())),
        const SizedBox(height: 12),
        TextField(
          controller: _instructor,
          keyboardType: TextInputType.phone,
          decoration: InputDecoration(
            labelText: AppLocalizations.of(context)!.familyLabelInstructorPhone,
            border: const OutlineInputBorder(),
            suffixIcon: IconButton(
              icon: const Icon(Icons.phone, color: Color(0xFF10B981)),
              onPressed: () {
                final num = _instructor.text.trim();
                if (num.isNotEmpty) {
                  _launchCaller(num);
                }
              },
            ),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _doctor,
          keyboardType: TextInputType.phone,
          decoration: InputDecoration(
            labelText: AppLocalizations.of(context)!.familyLabelDoctorPhone,
            border: const OutlineInputBorder(),
            suffixIcon: IconButton(
              icon: const Icon(Icons.phone, color: Color(0xFF10B981)),
              onPressed: () {
                final num = _doctor.text.trim();
                if (num.isNotEmpty) {
                  _launchCaller(num);
                }
              },
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: FilledButton(
            onPressed: _busy
                ? null
                : () async {
                    setState(() {
                      _busy = true;
                      _ok = null;
                    });
                    try {
                      final api = await ref.read(apiClientProvider.future);
                      final meta = UserMeta(
                        userFullName: _fullName.text.trim(),
                        userPhone: _phone.text.trim(),
                        instructorPhone: _instructor.text.trim(),
                        doctorPhone: _doctor.text.trim(),
                      );
                      await api.saveUserMeta(meta);
                      ref.invalidate(userMetaProvider);
                      setState(() => _ok = AppLocalizations.of(context)!.familyMsgSaved);
                    } finally {
                      if (mounted) setState(() => _busy = false);
                    }
                  },
            child: Text(AppLocalizations.of(context)!.familyBtnSave),
          ),
        ),
      ],
    );
  }
}

class _PrivacyTab extends ConsumerStatefulWidget {
  const _PrivacyTab();

  @override
  ConsumerState<_PrivacyTab> createState() => _PrivacyTabState();
}

class _PrivacyTabState extends ConsumerState<_PrivacyTab> {
  bool _busy = false;
  String? _error;

  Future<void> _deleteAccount() async {
    final controller = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(AppLocalizations.of(context)!.familyTitleDeleteAccount),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(AppLocalizations.of(context)!.familyDescDeleteAccount),
              const SizedBox(height: 12),
              TextField(controller: controller, obscureText: true, decoration: InputDecoration(labelText: AppLocalizations.of(context)!.authPwdLabel)),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.of(context).pop(false), child: Text(AppLocalizations.of(context)!.familyBtnCancel)),
            FilledButton(onPressed: () => Navigator.of(context).pop(true), child: Text(AppLocalizations.of(context)!.familyBtnDelete)),
          ],
        );
      },
    );
    if (ok != true) return;
    final pwd = controller.text;
    if (pwd.length < 8) {
      setState(() => _error = AppLocalizations.of(context)!.familyErrPasswordRequired);
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final api = await ref.read(apiClientProvider.future);
      await api.deleteAccount(password: pwd);
      await ref.read(sessionControllerProvider.notifier).logout();
      if (mounted) context.go('/auth');
    } catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(AppLocalizations.of(context)!.familyTabPrivacy, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        if (_error != null)
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: const Color(0xFFFFE4E6), borderRadius: BorderRadius.circular(16)),
            child: Text(_error!, style: const TextStyle(fontWeight: FontWeight.w800)),
          ),
        if (_error != null) const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: FilledButton.tonal(
            onPressed: _busy ? null : _deleteAccount,
            child: Text(AppLocalizations.of(context)!.familyTitleDeleteAccount),
          ),
        ),
      ],
    );
  }
}

