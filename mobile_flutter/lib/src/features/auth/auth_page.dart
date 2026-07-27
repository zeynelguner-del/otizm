import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:otizm_destek_app/l10n/app_localizations.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart';

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
    _loadSavedCredentials();
  }

  Future<void> _loadSavedCredentials() async {
    try {
      final dir = await getApplicationDocumentsDirectory();
      final file = File('${dir.path}/saved_creds.json');
      if (await file.exists()) {
        final content = await file.readAsString();
        final data = jsonDecode(content) as Map<String, dynamic>;
        final timestamp = data['timestamp'] as int;
        final savedTime = DateTime.fromMillisecondsSinceEpoch(timestamp);
        
        // If saved less than 24 hours ago, pre-fill!
        if (DateTime.now().difference(savedTime).inHours < 24) {
          if (mounted) {
            setState(() {
              _email.text = (data['email'] as String?) ?? '';
              _password.text = (data['password'] as String?) ?? '';
              _kvkkAcceptedLocal = true; // Auto check KVKK consent since they previously agreed
            });
          }
        }
      }
    } catch (_) {}
  }

  Future<void> _saveCredentials(String email, String password) async {
    try {
      final dir = await getApplicationDocumentsDirectory();
      final file = File('${dir.path}/saved_creds.json');
      final data = {
        'email': email,
        'password': password,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      };
      await file.writeAsString(jsonEncode(data));
    } catch (_) {}
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

      // Auto-accept KVKK consent for the Google/Apple review test account
      var kvkkAccepted = _kvkkAcceptedLocal;
      if (email.toLowerCase() == 'testuser@otizeka.com') {
        kvkkAccepted = true;
        setState(() {
          _kvkkAcceptedLocal = true;
        });
      }

      if (email.isEmpty || !email.contains('@')) {
        throw Exception(AppLocalizations.of(context)!.authEmailErr);
      }
      if (password.length < 8) {
        throw Exception(AppLocalizations.of(context)!.authPwdErr);
      }
      if (isRegister && password != _password2.text) {
        throw Exception(AppLocalizations.of(context)!.authPwdMatchErr);
      }
      if (!kvkkAccepted) {
        throw Exception(AppLocalizations.of(context)!.authErrKvkkRequired);
      }

      if (isRegister) {
        await api.register(email: email, password: password);
      } else {
        await api.login(email: email, password: password);
      }

      // Save credentials for next launch within 24h
      await _saveCredentials(email, password);

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

  void _showForgotPasswordDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return const _ForgotPasswordDialog();
      },
    );
  }

  Future<void> _loginAsGuest() async {
    setState(() {
      _error = null;
      _busy = true;
    });
    try {
      final api = await ref.read(apiClientProvider.future);
      await api.enableGuestMode();
      setState(() {
        _kvkkAcceptedLocal = true;
      });
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
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 8),
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(5),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.grey.shade100, width: 1.5),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.04),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Image.asset(
                      'assets/otizeka-logo.png',
                      width: 44,
                      height: 44,
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text(
                          'OtiZeka',
                          style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          AppLocalizations.of(context)!.authSubtitleAwareness,
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TabBar(
                controller: _tab,
                tabs: [Tab(text: AppLocalizations.of(context)!.authLogin), Tab(text: AppLocalizations.of(context)!.authRegister)],
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
                decoration: InputDecoration(
                  labelText: AppLocalizations.of(context)!.authEmailLabel,
                  border: const OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _password,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: AppLocalizations.of(context)!.authPwdLabel,
                  border: const OutlineInputBorder(),
                ),
              ),
              AnimatedBuilder(
                animation: _tab,
                builder: (context, child) {
                  if (_tab.index != 0) return const SizedBox.shrink();
                  return Align(
                    alignment: Alignment.centerRight,
                    child: Padding(
                      padding: const EdgeInsets.only(top: 4),
                      child: TextButton(
                        onPressed: _showForgotPasswordDialog,
                        child: Text(
                          AppLocalizations.of(context)!.authForgotPassword,
                          style: const TextStyle(fontWeight: FontWeight.w700),
                        ),
                      ),
                    ),
                  );
                },
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
                        decoration: InputDecoration(
                          labelText: AppLocalizations.of(context)!.authPwd2Label,
                          border: const OutlineInputBorder(),
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
                          AppLocalizations.of(context)!.authTextKvkk,
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
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton(
                  onPressed: _busy ? null : _submit,
                  child: Text(_busy ? AppLocalizations.of(context)!.authWait : (_tab.index == 1 ? AppLocalizations.of(context)!.authBtnRegister : AppLocalizations.of(context)!.authBtnLogin)),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: OutlinedButton(
                  onPressed: _busy ? null : _loginAsGuest,
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFF10B981), width: 1.5),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: Text(
                    AppLocalizations.of(context)!.authContinueAsGuest,
                    style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}
}

class _ForgotPasswordDialog extends ConsumerStatefulWidget {
  const _ForgotPasswordDialog();

  @override
  ConsumerState<_ForgotPasswordDialog> createState() => _ForgotPasswordDialogState();
}

class _ForgotPasswordDialogState extends ConsumerState<_ForgotPasswordDialog> {
  int _step = 1;
  final _emailController = TextEditingController();
  final _codeController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _newPasswordController2 = TextEditingController();
  
  bool _busy = false;
  String? _error;
  String? _successMessage;

  @override
  void dispose() {
    _emailController.dispose();
    _codeController.dispose();
    _newPasswordController.dispose();
    _newPasswordController2.dispose();
    super.dispose();
  }

  Future<void> _sendCode() async {
    final email = _emailController.text.trim();
    if (email.isEmpty || !email.contains('@')) {
      setState(() => _error = AppLocalizations.of(context)!.authEmailErr);
      return;
    }

    setState(() {
      _busy = true;
      _error = null;
    });

    try {
      final api = await ref.read(apiClientProvider.future);
      await api.forgotPassword(email: email);
      setState(() {
        _step = 2;
        _busy = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString().replaceFirst('Exception: ', '');
        _busy = false;
      });
    }
  }

  Future<void> _resetPassword() async {
    final email = _emailController.text.trim();
    final code = _codeController.text.trim();
    final newPass = _newPasswordController.text;
    final newPass2 = _newPasswordController2.text;

    if (code.length != 6) {
      setState(() => _error = AppLocalizations.of(context)!.authErrVerificationCodeInvalid);
      return;
    }
    if (newPass.length < 8) {
      setState(() => _error = AppLocalizations.of(context)!.authPwdMinLengthErr);
      return;
    }
    if (newPass != newPass2) {
      setState(() => _error = AppLocalizations.of(context)!.authPwdMatchErr);
      return;
    }

    setState(() {
      _busy = true;
      _error = null;
    });

    try {
      final api = await ref.read(apiClientProvider.future);
      await api.resetPassword(email: email, code: code, newPassword: newPass);
      setState(() {
        _successMessage = AppLocalizations.of(context)!.authResetSuccess;
        _busy = false;
      });
      await Future.delayed(const Duration(seconds: 2));
      if (mounted) {
        Navigator.pop(context);
      }
    } catch (e) {
      setState(() {
        _error = e.toString().replaceFirst('Exception: ', '');
        _busy = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      title: Row(
        children: [
          const Icon(Icons.lock_reset, color: Color(0xFF0D9488), size: 28),
          const SizedBox(width: 10),
          Text(
            _step == 1 ? AppLocalizations.of(context)!.authForgotPassword : AppLocalizations.of(context)!.authResetPassword,
            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 20),
          ),
        ],
      ),
      content: SingleChildScrollView(
        child: Container(
          width: double.maxFinite,
          constraints: const BoxConstraints(maxWidth: 400),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (_error != null) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFE4E6),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    _error!,
                    style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF9F1239)),
                  ),
                ),
                const SizedBox(height: 16),
              ],
              if (_successMessage != null) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFD1FAE5),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    _successMessage!,
                    style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF065F46)),
                  ),
                ),
                const SizedBox(height: 16),
              ],
              if (_successMessage == null) ...[
                if (_step == 1) ...[
                  Text(
                    AppLocalizations.of(context)!.authForgotPasswordInstructions,
                    style: const TextStyle(fontWeight: FontWeight.w600, color: Colors.grey),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    enabled: !_busy,
                    decoration: InputDecoration(
                      labelText: AppLocalizations.of(context)!.authEmailAddressLabel,
                      border: const OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                      prefixIcon: const Icon(Icons.email_outlined),
                    ),
                  ),
                ] else ...[
                  Text(
                    AppLocalizations.of(context)!.authResetPasswordInstructions(_emailController.text),
                    style: const TextStyle(fontWeight: FontWeight.w600, color: Colors.grey),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _codeController,
                    keyboardType: TextInputType.number,
                    enabled: !_busy,
                    maxLength: 6,
                    decoration: InputDecoration(
                      labelText: AppLocalizations.of(context)!.authVerificationCodeLabel,
                      counterText: '',
                      border: const OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                      prefixIcon: const Icon(Icons.vpn_key_outlined),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _newPasswordController,
                    obscureText: true,
                    enabled: !_busy,
                    decoration: InputDecoration(
                      labelText: AppLocalizations.of(context)!.authNewPasswordLabel,
                      border: const OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                      prefixIcon: const Icon(Icons.lock_outline),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _newPasswordController2,
                    obscureText: true,
                    enabled: !_busy,
                    decoration: InputDecoration(
                      labelText: AppLocalizations.of(context)!.authNewPassword2Label,
                      border: const OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
                      prefixIcon: const Icon(Icons.lock_outline),
                    ),
                  ),
                ],
              ],
            ],
          ),
        ),
      ),
      actionsPadding: const EdgeInsets.only(bottom: 20, right: 20, left: 20),
      actions: [
        if (_successMessage == null) ...[
          TextButton(
            onPressed: _busy ? null : () => Navigator.pop(context),
            child: Text(AppLocalizations.of(context)!.btnCancel, style: const TextStyle(fontWeight: FontWeight.w700)),
          ),
          ElevatedButton(
            onPressed: _busy ? null : (_step == 1 ? _sendCode : _resetPassword),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF0D9488),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            ),
            child: _busy
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white),
                  )
                : Text(
                    _step == 1 ? AppLocalizations.of(context)!.authBtnSendCode : AppLocalizations.of(context)!.authBtnUpdatePassword,
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
          ),
        ],
      ],
    );
  }
}
