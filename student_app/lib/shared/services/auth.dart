import 'dart:async';
import 'dart:convert';

import 'package:studentapp/shared/models/user.dart';

import 'networking.dart';
import 'storage.dart';

abstract class AuthBase {
  Stream<User> get onAuthStateChanged;

  Future<User> login(Map<String, String> req);

  Future<void> logOut();
}

class Auth implements AuthBase {
  NetworkService networkService = NetworkService();
  StorageService storageService = StorageService();

  final controller = StreamController<User>();

  Auth() {
    _initUser();
  }

  Future<void> _initUser() async {
    String str = await StorageService.getUser();

    if (str != null) {
      controller.add(User.from(jsonDecode(str)));
    } else {
      controller.add(null);
    }
  }

  Stream<User> get onAuthStateChanged {
    return controller.stream;
  }

  @override
  Future<User> login(loginObj) async {
    try {
      var resp = await networkService.post('auth/', loginObj);

      if (resp['student'] != null) {
        User user = User.from(resp);
        storageService.setToken(resp['token']);
        storageService.setUser(user.toMap());
        controller.add(user);

        return user;
      } else {
        throw new CustomException('Only students can login');
      }
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logOut() async {
    await StorageService.removeAll();
    controller.add(null);

    return null;
  }
}

class CustomException implements Exception {
  String cause;

  @override
  String toString() {
    return cause;
  }

  CustomException(this.cause);
}
