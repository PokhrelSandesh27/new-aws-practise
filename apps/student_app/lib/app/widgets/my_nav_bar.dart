import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

const navTextStyle = TextStyle(fontWeight: FontWeight.bold, fontSize: 10);

class MyNavBar extends StatelessWidget {
  final int pageIndex;
  final PageController pageController;

  MyNavBar(this.pageIndex, this.pageController);

  @override
  Widget build(BuildContext context) {
    return CupertinoTabBar(
      currentIndex: pageIndex,
      onTap: (index) {
        pageController.jumpToPage(index);
      },
      activeColor: Theme.of(context).primaryColor,
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.calendar_today, size: 20),
          title: Text('Time Table', style: navTextStyle),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.work, size: 20),
          title: Text('Exams', style: navTextStyle),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.work, size: 20),
          title: Text('Library', style: navTextStyle),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.monetization_on, size: 20),
          title: Text('Payments', style: navTextStyle),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.settings, size: 20),
          title: Text('Settings', style: navTextStyle),
        ),
      ],
    );
  }
}
