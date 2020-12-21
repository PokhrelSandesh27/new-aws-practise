import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:student_app/app/widgets/my_drawer.dart';
import 'package:student_app/app/widgets/my_nav_bar.dart';
import 'package:student_app/app/widgets/my_page_view.dart';
import 'package:student_app/app/widgets/my_title.dart';

class App extends StatefulWidget {
  static route() => MaterialPageRoute(builder: (context) => App());

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  PageController pageController;
  int pageIndex;

  @override
  void initState() {
    super.initState();
    pageIndex = 0;
    pageController = PageController(initialPage: pageIndex);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: MyTitle(pageIndex),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.more_vert, color: Colors.white, size: 30),
            onPressed: () {},
          )
        ],
      ),
      drawer: MyDrawer(),
      body: MyPageView(pageController, (index) {
        setState(() {
          pageIndex = index;
        });
      }),
      bottomNavigationBar: MyNavBar(pageIndex, pageController),
    );
  }
}
