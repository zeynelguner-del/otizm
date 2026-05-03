import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/config.dart';
import '../../state/api_client_provider.dart';
import '../../state/session_controller.dart';

class AuthPage extends ConsumerStatefulWidget {
  const AuthPage({super.key});

  @override
  ConsumerState<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends ConsumerState<AuthPage> with SingleTickerProviderStateMixin {
  late final TabController _tab;
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _password2 = TextEditingController();
  bool _busy = false;
  String? _error;
  bool _kvkkAcceptedLocal = false;

  @override
  void initState() {
    super.initState();
    _tab = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tab.dispose();
    _email.dispose();
    _password.dispose();
    _password2.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _error = null;
      _busy = true;
    });
    try {
      final api = await ref.read(apiClientProvider.future);
      final email = _email.text.trim();
      final password = _password.text;
      final isRegister = _tab.index == 1;
      if (email.isEmpty || !email.contains('@')) {
        throw Exception('Geçerli bir e-posta girin.');
      }
      if (password.length < 8) {
        throw Exception('Şifre en az 8 karakter olmalı.');
      }
      if (isRegister && password != _password2.text) {
        throw Exception('Şifreler eşleşmiyor.');
      }
      if (!_kvkkAcceptedLocal) {
        throw Exception('Devam etmek için KVKK onayı gerekli.');
      }

      if (isRegister) {
        await api.register(email: email, password: password);
      } else {
        await api.login(email: email, password: password);
      }

      await ref.read(sessionControllerProvider.notifier).refresh();
    } catch (e) {
      setState(() {
        _error = e.toString().replaceFirst('Exception: ', '');
      });
    } finally {
      if (mounted) {
        setState(() {
          _busy = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              const SizedBox(height: 8),
              Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(16),
                    child: Image.network(
                      '$appBaseUrl/loogo.png',
                      width: 56,
                      height: 56,
                      fit: BoxFit.cover,
                    ),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Text(
                      'Otizm Destek',
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TabBar(
                controller: _tab,
                tabs: const [Tab(text: 'Giriş'), Tab(text: 'Kayıt Ol')],
              ),
              const SizedBox(height: 16),
              if (_error != null)
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFE4E6),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    _error!,
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              if (_error != null) const SizedBox(height: 12),
              TextField(
                controller: _email,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: 'E-posta',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _password,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Şifre',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              AnimatedBuilder(
                animation: _tab,
                builder: (context, child) {
                  if (_tab.index != 1) return const SizedBox.shrink();
                  return Column(
                    children: [
                      TextField(
                        controller: _password2,
                        obscureText: true,
                        decoration: const InputDecoration(
                          labelText: 'Şifre (Tekrar)',
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                  );
                },
              ),
              Card(
                elevation: 0,
                color: const Color(0xFFF4F4F5),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Devam ederek KVKK Açık Rıza metnini kabul etmiş olursunuz.',
                          style: TextStyle(color: Colors.grey.shade800, fontWeight: FontWeight.w600),
                        ),
                      ),
                      Switch(
                        value: _kvkkAcceptedLocal,
                        onChanged: _busy ? null : (v) => setState(() => _kvkkAcceptedLocal = v),
                      ),
                    ],
                  ),
                ),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  onPressed: _busy ? null : _submit,
                  child: Text(_busy ? 'Lütfen bekleyin...' : (_tab.index == 1 ? 'Kayıt Ol' : 'Giriş Yap')),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
