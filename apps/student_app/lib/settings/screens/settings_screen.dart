import 'package:flutter/material.dart';
import 'package:student_app/login/screens/login_screen.dart';
import 'package:student_app/shared/services/storage.dart';

class SettingsScreen extends StatelessWidget {
  static route() => MaterialPageRoute(builder: (context) => SettingsScreen());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FlatButton(
          color: Colors.lightBlueAccent,
          child: Text('logout'),
          onPressed: () async {
            await StorageService.removeAll();
            Navigator.pushReplacement(context, LoginScreen.route());
          },
        ),
      ),
    );
  }
}
