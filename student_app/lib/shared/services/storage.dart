import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  static Future<String> getToken() async {
    final SharedPreferences prefs = await _prefs;
    String token = prefs.getString('token');

    return token;
  }

  Future<void> setToken(String token) async {
    final SharedPreferences prefs = await _prefs;
    prefs.setString('token', token);
  }

  static Future<void> removeAll() async {
    final SharedPreferences prefs = await _prefs;

    for (String key in prefs.getKeys()) {
      prefs.remove(key);
    }
  }

  Future<void> setUser(Map<String, dynamic> user) async {
    final SharedPreferences prefs = await _prefs;
    prefs.setString('user', json.encode(user));
  }

  static Future<String> getUser() async {
    final SharedPreferences prefs = await _prefs;
    return prefs.getString('user');
  }
}
