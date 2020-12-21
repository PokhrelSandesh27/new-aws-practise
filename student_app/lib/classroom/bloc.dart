import 'dart:async';

import 'package:studentapp/shared/models/time_table.dart';

import '../shared/services/networking.dart';

class ClassroomBloc {
  NetworkService networkService = NetworkService();

  final StreamController<TimeTableResp> _controller = StreamController<TimeTableResp>();

  Stream<TimeTableResp> get timeTableStream => _controller.stream;

  TimeTableResp _timeTableResp = TimeTableResp();

  void dispose() {
    _controller.close();
  }

  Future<void> fetchTimeTable(Map<String, String> search) async {
    updateWith(state: 1);

    try {
      var resp = await networkService.post('timetables/search', search);
      List<TimeTable> timeTable = List<TimeTable>.from(resp.map((tt) => TimeTable.from(tt)));

      updateWith(timeTable: timeTable, state: 2);
    } catch (e) {
      print(e);

      updateWith(state: 3);
    }
  }

  updateWith({List<TimeTable> timeTable, int state}) {
    _timeTableResp = _timeTableResp.copyWith(
      timeTable: timeTable,
      state: state,
    );

    _controller.add(_timeTableResp);
  }
}

class TimeTableResp {
  int state;
  List<TimeTable> timeTable = [];

  TimeTableResp({this.state = 0, this.timeTable});

  TimeTableResp copyWith({int state, List<TimeTable> timeTable}) {
    return TimeTableResp(
      state: state ?? this.state,
      timeTable: timeTable ?? this.timeTable,
    );
  }
}
