import 'package:flutter/material.dart';
import 'package:student_app/login/screens/login_screen.dart';
import 'package:student_app/shared/services/storage.dart';

class PaymentScreen extends StatelessWidget {
  static route() => MaterialPageRoute(builder: (context) => PaymentScreen());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Payment'),
      ),
    );
  }
}
