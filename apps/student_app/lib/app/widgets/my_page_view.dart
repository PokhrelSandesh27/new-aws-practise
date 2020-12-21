import 'package:flutter/material.dart';
import 'package:student_app/exams/screens/exam_screen.dart';
import 'package:student_app/payment/screens/payment_screen.dart';
import 'package:student_app/library/screens/library_screen.dart';
import 'package:student_app/settings/screens/settings_screen.dart';
import 'package:student_app/time_table/screens/time_table_screen.dart';

class MyPageView extends StatelessWidget {
  final PageController pageController;
  final Function onChange;

  MyPageView(this.pageController, this.onChange);

  @override
  Widget build(BuildContext context) {
    return PageView(
      children: <Widget>[
        TimeTableScreen(),
        ExamScreen(),
        LibraryScreen(),
        PaymentScreen(),
        SettingsScreen(),
      ],
      controller: pageController,
      onPageChanged: onChange,
      physics: NeverScrollableScrollPhysics(),
    );
  }
}
