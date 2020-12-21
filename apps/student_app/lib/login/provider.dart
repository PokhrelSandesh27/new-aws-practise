import 'package:flutter/foundation.dart';
import 'package:student_app/shared/models/user.dart';
import 'package:student_app/shared/services/auth.dart';

class LoginProvider with ChangeNotifier {
  int loginState = 0;
  User user;
  String error;

  AuthBase _auth;

  LoginProvider(AuthBase auth) {
    _auth = auth;
  }

  Future<bool> login(Map<String, String> req) async {
    loginState = 1;
    notifyListeners();

    try {
      user = await _auth.login(req);
      loginState = 2;
    } catch (e) {
      loginState = 3;
      error = e;
    }

    notifyListeners();

    return loginState == 2;
  }
}
