import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'shared/services/auth.dart';
import 'student_app.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<AuthBase>(
      create: (context) => Auth(),
      child: MaterialApp(
        title: 'Student App',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(primarySwatch: Colors.indigo),
        home: StudentApp(),
      ),
    );
  }
}
