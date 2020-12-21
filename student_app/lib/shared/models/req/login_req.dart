class LoginReq {
  String username;
  String password;
  bool isLoading;
  bool submitted;
  bool isObscureText;

  LoginReq({
    this.username = '',
    this.password = '',
    this.isLoading = false,
    this.submitted = false,
    this.isObscureText = true,
  });

  LoginReq copyWith({String username, String password, bool isLoading, bool submitted, bool isObscureText}) {
    return LoginReq(
      username: username ?? this.username,
      password: password ?? this.password,
      isLoading: isLoading ?? this.isLoading,
      submitted: submitted ?? this.submitted,
      isObscureText: isObscureText ?? this.isObscureText,
    );
  }
}
