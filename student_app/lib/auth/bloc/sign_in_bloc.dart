import 'dart:async';

import 'package:studentapp/shared/models/req/login_req.dart';
import 'package:studentapp/shared/services/auth.dart';

class SignInBloc {
  SignInBloc(this.auth);

  AuthBase auth;
  final StreamController<LoginReq> _controller = StreamController<LoginReq>();

  Stream<LoginReq> get modalStream => _controller.stream;

  LoginReq _loginReq = LoginReq();

  void dispose() {
    _controller.close();
  }

  Future<void> login() async {
    updateWith(submitted: true, isLoading: true);

    try {
      await auth.login({'username': _loginReq.username.trim(), 'password': _loginReq.password.trim()});
    } catch (e) {
      rethrow;
    } finally {
      updateWith(isLoading: false);
    }
  }

  updateWith({String username, String password, bool isLoading, bool submitted, bool isObscureText}) {
    _loginReq = _loginReq.copyWith(
      username: username,
      password: password,
      isLoading: isLoading,
      submitted: submitted,
      isObscureText: isObscureText,
    );

    _controller.add(_loginReq);
  }
}
