import 'package:flutter/material.dart';
import 'package:student_app/app/screens/app.dart';
import 'package:student_app/login/screens/login_screen.dart';
import 'package:student_app/login/widgets/powered_by.dart';
import 'package:student_app/shared/services/auth.dart';

TextStyle titleStyle = TextStyle(fontSize: 80, color: Colors.white, fontWeight: FontWeight.w600);
TextStyle subTitleStyle = TextStyle(fontSize: 30, color: Colors.white70, fontWeight: FontWeight.w300);

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    bool isAuthenticated = await Auth.isAuthenticated();

    if (isAuthenticated) {
      Navigator.pushReplacement(context, App.route());
    } else {
      Navigator.pushReplacement(context, LoginScreen.route());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF4186E4),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text('AMS', style: titleStyle, textAlign: TextAlign.center),
          Text('Student App', style: subTitleStyle, textAlign: TextAlign.center),
        ],
      ),
      bottomNavigationBar: PoweredBy(),
    );
  }
}
