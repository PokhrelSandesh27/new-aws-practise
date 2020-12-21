import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final IconData icon;
  final double iconSize;
  final String label;
  final Function onClick;
  final double horizontalPadding;
  final double verticalPadding;
  final Color color;
  final TextStyle labelStyle;
  final EdgeInsets padding;
  final double spaceInBetween;

  Button({
    this.icon,
    this.iconSize = 9,
    this.label,
    this.onClick,
    this.horizontalPadding = 0,
    this.verticalPadding = 0,
    this.color,
    this.labelStyle,
    this.padding,
    this.spaceInBetween = 5,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onClick,
        child: Ink(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.all(Radius.circular(3)),
            color: color ?? Color(0xFF4186E4),
          ),
          padding: padding ?? EdgeInsets.only(top: 10, bottom: 10),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: horizontalPadding, vertical: verticalPadding),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(label, style: labelStyle ?? TextStyle(color: Colors.white, fontWeight: FontWeight.w800)),
                SizedBox(width: spaceInBetween),
                Icon(icon, color: Colors.white, size: iconSize)
              ],
            ),
          ),
        ),
      ),
    );
  }
}
