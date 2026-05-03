import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/api_models.dart';
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
        title: const Text('Aile Paneli'),
        bottom: TabBar(
          controller: _tab,
          tabs: const [
            Tab(text: 'Profil'),
            Tab(text: 'İletişim'),
            Tab(text: 'Gizlilik'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tab,
        children: const [
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

    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            left: 16,
            right: 16,
            top: 16,
            bottom: 16 + MediaQuery.of(context).viewInsets.bottom,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(existing == null ? 'Yeni Profil' : 'Profili Düzenle', style: const TextStyle(fontWeight: FontWeight.w900)),
              const SizedBox(height: 12),
              TextField(controller: name, decoration: const InputDecoration(labelText: 'Çocuğun adı', border: OutlineInputBorder())),
              const SizedBox(height: 12),
              TextField(
                controller: birth,
                decoration: const InputDecoration(labelText: 'Doğum tarihi (YYYY-MM-DD)', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextField(controller: legacyAge, decoration: const InputDecoration(labelText: 'Yaş (opsiyonel)', border: OutlineInputBorder())),
              const SizedBox(height: 12),
              TextField(
                controller: familyNotes,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Aile notları', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: educationNotes,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Eğitim notları', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: FilledButton(
                  onPressed: () => Navigator.of(context).pop(true),
                  child: const Text('Kaydet'),
                ),
              )
            ],
          ),
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
      photoDataUrl: existing?.photoDataUrl ?? '',
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
      if (mounted) setState(() {});
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: ref.read(apiClientProvider.future).then((api) => api.getProfile()),
      builder: (context, snapshot) {
        final env = snapshot.data;
        final profiles = env?.profiles ?? const <Profile>[];
        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Row(
              children: [
                const Expanded(
                  child: Text('Çocuk Profilleri', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                ),
                OutlinedButton(
                  onPressed: _busy
                      ? null
                      : () async {
                          await _editProfile(env ?? const ProfileEnvelope(profiles: [], activeProfileId: ''), existing: null);
                        },
                  child: const Text('Yeni'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (snapshot.connectionState == ConnectionState.waiting)
              const Center(child: Padding(padding: EdgeInsets.all(24), child: CircularProgressIndicator()))
            else if (profiles.isEmpty)
              const Text('Henüz profil yok.', style: TextStyle(fontWeight: FontWeight.w700))
            else
              ...profiles.map((p) {
                final isActive = env?.activeProfileId == p.id;
                return Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20), side: const BorderSide(color: Color(0xFFE4E4E7))),
                  child: ListTile(
                    title: Text(p.name.isEmpty ? 'İsimsiz' : p.name, style: const TextStyle(fontWeight: FontWeight.w900)),
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
                            child: const Text('Aktif'),
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
        const Text('İletişim Bilgileri', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        if (_ok != null)
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: const Color(0xFFECFDF5), borderRadius: BorderRadius.circular(16)),
            child: Text(_ok!, style: const TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF065F46))),
          ),
        if (_ok != null) const SizedBox(height: 12),
        TextField(controller: _fullName, decoration: const InputDecoration(labelText: 'Ad Soyad', border: OutlineInputBorder())),
        const SizedBox(height: 12),
        TextField(controller: _phone, decoration: const InputDecoration(labelText: 'Telefon', border: OutlineInputBorder())),
        const SizedBox(height: 12),
        TextField(controller: _instructor, decoration: const InputDecoration(labelText: 'Eğitmen Telefonu', border: OutlineInputBorder())),
        const SizedBox(height: 12),
        TextField(controller: _doctor, decoration: const InputDecoration(labelText: 'Doktor Telefonu', border: OutlineInputBorder())),
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
                      setState(() => _ok = 'Kaydedildi.');
                    } finally {
                      if (mounted) setState(() => _busy = false);
                    }
                  },
            child: const Text('Kaydet'),
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
          title: const Text('Hesabı Sil'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Hesabı silmek için şifrenizi girin.'),
              const SizedBox(height: 12),
              TextField(controller: controller, obscureText: true, decoration: const InputDecoration(labelText: 'Şifre')),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text('Vazgeç')),
            FilledButton(onPressed: () => Navigator.of(context).pop(true), child: const Text('Sil')),
          ],
        );
      },
    );
    if (ok != true) return;
    final pwd = controller.text;
    if (pwd.length < 8) {
      setState(() => _error = 'Şifre gerekli (en az 8 karakter).');
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
        const Text('Gizlilik', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
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
            child: const Text('Hesabı Sil'),
          ),
        ),
      ],
    );
  }
}

