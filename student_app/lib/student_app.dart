import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'auth/login.dart';
import 'auth/splash_screen.dart';
import 'classroom/today_class.dart';
import 'shared/models/user.dart';
import 'shared/services/auth.dart';

class StudentApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthBase>(context);

    return StreamBuilder<User>(
      stream: auth.onAuthStateChanged,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.active) {
          User user = snapshot.data;
          if (user == null) {
            return Login.create(context);
          }
          return TodayClass.create(context, user);
        } else {
          return SplashScreen();
        }
      },
    );
  }
}
