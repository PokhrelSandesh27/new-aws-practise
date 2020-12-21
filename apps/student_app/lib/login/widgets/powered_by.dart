import 'package:flutter/material.dart';

TextStyle textStyle = TextStyle(fontSize: 20, color: Colors.white38, fontWeight: FontWeight.w300);

class PoweredBy extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text('Powered by EverestWalk', style: textStyle, textAlign: TextAlign.center),
    );
  }
}
