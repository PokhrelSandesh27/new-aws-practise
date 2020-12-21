import 'package:flutter/material.dart';

class Input extends StatelessWidget {
  final IconData icon;
  final IconData suffixIcon;
  final String placeHolder;
  final Function onSaved;
  final Function onChange;
  final Function onSuffixTap;
  bool isObscureText;
  String value;

  Input({
    this.icon,
    this.placeHolder,
    this.suffixIcon,
    this.onSaved,
    this.onChange,
    this.isObscureText = false,
    this.onSuffixTap,
    this.value,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onSaved: onSaved,
      onChanged: onChange,
      obscureText: isObscureText,
      initialValue: value,
      decoration: InputDecoration(
        fillColor: Color(0xFFE7EBEF),
        filled: true,
        border: InputBorder.none,
        focusedBorder: InputBorder.none,
        enabledBorder: InputBorder.none,
        errorBorder: InputBorder.none,
        disabledBorder: InputBorder.none,
        hintText: placeHolder,
        labelStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        prefixIcon: Icon(icon, size: 22),
        suffixIcon: InkWell(onTap: onSuffixTap, child: Icon(suffixIcon, size: 22)),
      ),
    );
  }
}
