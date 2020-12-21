import 'package:student_app/shared/utils/time_util.dart';

class Slot with TimeUtil {
  String id;
  String period;
  String startTime;
  String endTime;

  Slot({this.id, this.period, this.startTime, this.endTime});

  Slot.fromJSON(var json) {
    id = json['_id'];
    period = json['name'];
    startTime = formatTime(json['startTime'].toString());
    endTime = formatTime(json['endTime'].toString());
  }
}
