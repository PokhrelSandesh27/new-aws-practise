import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'login/provider.dart';
import 'login/screens/splash_screen.dart';
import 'shared/services/auth.dart';
import 'time_table/provider.dart';
import 'library/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => LoginProvider(new Auth())),
        ChangeNotifierProvider(create: (_) => TimeTableProvider()),
        ChangeNotifierProvider(create: (_) => LibraryProvider())
      ],
      child: MaterialApp(
        title: 'Student App',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: SplashScreen(),
      ),
    );
  }
}
