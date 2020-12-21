import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:student_app/app/screens/app.dart';
import 'package:student_app/login/kConstants.dart';
import 'package:student_app/login/widgets/powered_by.dart';
import 'package:student_app/shared/widgets/button.dart';
import 'package:student_app/shared/widgets/input.dart';

import '../provider.dart';

class LoginScreen extends StatefulWidget {
  static route() => MaterialPageRoute(builder: (context) => LoginScreen());

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  String _username;
  String _password;
  bool _isObscureText = true;

  Future<void> _login(BuildContext context) async {
    _formKey.currentState.save();

    final action = Provider.of<LoginProvider>(context, listen: false);
    bool loginStatus = await action.login({'username': _username, 'password': _password});

    if (loginStatus) {
      Navigator.pushReplacement(context, App.route());
    }
  }

  @override
  Widget build(BuildContext context) {
    LoginProvider provider = Provider.of<LoginProvider>(context);

    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.teal,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('Student Login', style: TextStyle(fontSize: 35, color: Colors.white, fontWeight: FontWeight.w400)),
          SizedBox(height: 10),
          Padding(
            padding: EdgeInsets.all(10),
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(10),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.all(5),
                        child: Input(
                          icon: Icons.person_outline,
                          placeHolder: 'Username ...',
                          onSaved: (data) => _username = data,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(5),
                        child: Input(
                          icon: _isObscureText ? Icons.lock_outline : Icons.lock_open,
                          suffixIcon: _isObscureText ? Icons.visibility : Icons.visibility_off,
                          placeHolder: 'Password ...',
                          onSaved: (data) => _password = data,
                          isObscureText: _isObscureText,
                          onSuffixTap: () {
                            setState(() {
                              _isObscureText = !_isObscureText;
                            });
                          },
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(10),
                        child: provider.loginState == 1
                            ? CircularProgressIndicator()
                            : Button(
                                label: 'LOGIN',
                                icon: Icons.keyboard_arrow_right,
                                iconSize: 15,
                                verticalPadding: 5,
                                onClick: () => _login(context),
                              ),
                      ),
                      provider.loginState == 3 ? Text(provider.error, style: errorStyle) : Wrap()
                    ],
                  ),
                ),
              ),
            ),
          )
        ],
      ),
      bottomNavigationBar: PoweredBy(),
    );
  }
}
