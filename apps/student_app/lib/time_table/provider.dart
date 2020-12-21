import 'package:flutter/cupertino.dart';
import 'package:student_app/shared/models/user.dart';
import 'package:student_app/shared/services/auth.dart';

import '../shared/models/time_table.dart';

import '../shared/services/networking.dart';

class TimeTableProvider with ChangeNotifier {
  List<TimeTable> _timeTableDetails = [];
  User user;
  List<TimeTable> get timeTableDetails {
    return [..._timeTableDetails];
  }

  NetworkService networkService = NetworkService();

  Future<void> fetchAndGetTimeTables(Map<String, String> search) async {
    try {
      if (search.isEmpty) return;
      var resp = await networkService.post('timetables/search', search);
      if (resp != null) {
        final List<TimeTable> loadedTimeTableDetails = [];

        resp.forEach((timeTableData) {
          loadedTimeTableDetails.add(TimeTable.fromJSON(timeTableData));
        });

        _timeTableDetails = loadedTimeTableDetails;

        notifyListeners();
      } else {
        throw new MyException('could\'t load the data');
      }
    } catch (e) {
      rethrow;
    }
  }
}
