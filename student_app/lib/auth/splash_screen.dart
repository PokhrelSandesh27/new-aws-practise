import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF4186E4),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'AMS',
            style: TextStyle(fontSize: 80, color: Colors.white, fontWeight: FontWeight.w600),
            textAlign: TextAlign.center,
          ),
          Text(
            'Student App',
            style: TextStyle(fontSize: 30, color: Colors.white70, fontWeight: FontWeight.w300),
            textAlign: TextAlign.center,
          ),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(
          'Powered by Everestwalk',
          style: TextStyle(fontSize: 20, color: Colors.white38, fontWeight: FontWeight.w300),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
