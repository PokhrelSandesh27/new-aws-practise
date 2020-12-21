class Slot {
  String id;
  String period;
  String startTime;
  String endTime;

  Slot({this.id, this.period, this.startTime, this.endTime});

  static from(var json) {
    return Slot(
      id: json['_id'],
      period: json['name'],
      startTime: _formatTime(json['startTime'].toString()),
      endTime: _formatTime(json['endTime'].toString()),
    );
  }

  static String _formatTime(String time) {
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
