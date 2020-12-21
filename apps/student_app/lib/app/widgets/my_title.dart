import 'package:flutter/material.dart';

class MyTitle extends StatelessWidget {
  final int pageIndex;

  MyTitle(this.pageIndex);

  getTitle() {
    switch (pageIndex) {
      case 0:
        return 'Time Table';
        break;
      case 1:
        return 'Exams';
        break;
      case 2:
        return 'Library';
        break;
      case 3:
        return 'Payments';
        break;
      case 4:
        return 'Settings';
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(getTitle());
  }
}
