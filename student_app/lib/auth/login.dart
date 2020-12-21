import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:studentapp/shared/models/req/login_req.dart';
import 'package:studentapp/shared/services/auth.dart';
import 'package:studentapp/shared/widgets/button.dart';
import 'package:studentapp/shared/widgets/input.dart';

import 'bloc/sign_in_bloc.dart';

class Login extends StatefulWidget {
  static route() => MaterialPageRoute(builder: (context) => Login());
  final SignInBloc bloc;

  Login({this.bloc});

  static Widget create(BuildContext context) {
    final AuthBase auth = Provider.of<AuthBase>(context);
    return Provider<SignInBloc>(
      create: (_) => SignInBloc(auth),
      dispose: (context, bloc) => bloc.dispose(),
      child: Consumer<SignInBloc>(
        builder: (context, bloc, _) => Login(bloc: bloc),
      ),
    );
  }

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  Future<void> _login() async {
    try {
      await widget.bloc.login();
    } catch (e) {
      _scaffoldKey.currentState.showSnackBar(
        SnackBar(content: Text(e.toString()), backgroundColor: Colors.red, duration: Duration(seconds: 3)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.teal,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text('Student Login', style: TextStyle(fontSize: 35, color: Colors.white, fontWeight: FontWeight.w400)),
          SizedBox(height: 10),
          StreamBuilder<LoginReq>(
              stream: widget.bloc.modalStream,
              initialData: LoginReq(),
              builder: (context, snapshot) {
                LoginReq _req = snapshot.data;

                return Padding(
                  padding: EdgeInsets.all(10),
                  child: Card(
                    child: Padding(
                      padding: EdgeInsets.all(10),
                      child: Column(
                        children: <Widget>[
                          Padding(
                            padding: EdgeInsets.all(5),
                            child: Input(
                              icon: Icons.person_outline,
                              placeHolder: 'Username ...',
                              onChange: (data) => widget.bloc.updateWith(username: data),
                              value: _req.username,
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.all(5),
                            child: Input(
                              icon: Icons.lock_open,
                              suffixIcon: _req.isObscureText ? Icons.visibility : Icons.visibility_off,
                              placeHolder: 'Password ...',
                              onChange: (data) => widget.bloc.updateWith(password: data),
                              value: _req.password,
                              isObscureText: _req.isObscureText,
                              onSuffixTap: () {
                                widget.bloc.updateWith(isObscureText: !_req.isObscureText);
                              },
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: _req.isLoading
                                ? CircularProgressIndicator()
                                : Button(
                                    label: 'LOGIN',
                                    icon: Icons.keyboard_arrow_right,
                                    iconSize: 15,
                                    verticalPadding: 5,
                                    onClick: () =>_login()
                                  ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Text(
          'Powered by EverestWalk',
          style: TextStyle(color: Colors.white70),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
