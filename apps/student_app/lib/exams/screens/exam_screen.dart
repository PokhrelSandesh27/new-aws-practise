import 'package:flutter/material.dart';

class ExamScreen extends StatelessWidget {
  static route() => MaterialPageRoute(builder: (context) => ExamScreen());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Exams'),
      ),
    );
  }
}
