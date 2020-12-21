mixin TimeUtil {
  String formatTime(String time) {
    String min = time.substring(time.length - 2);
    int hr = int.parse(time.substring(0, time.length - 2));
    String a = 'AM';

    if (hr > 12) {
      hr = hr - 12;
      a = 'PM';
    }

    return '$hr:$min $a';
  }
}
