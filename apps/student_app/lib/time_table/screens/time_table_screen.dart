import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:jitsi_meet/jitsi_meet.dart';
import 'package:provider/provider.dart';
import 'package:student_app/shared/models/time_table.dart';
import 'package:student_app/shared/models/user.dart';
import 'package:student_app/shared/services/storage.dart';
import 'package:student_app/time_table/widgets/listTimeTable.dart';

import '../provider.dart';

List<String> days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

class TimeTableScreen extends StatefulWidget {
  static route() => MaterialPageRoute(builder: (context) => TimeTableScreen());

  @override
  _TimeTableScreenState createState() => _TimeTableScreenState();
}

class _TimeTableScreenState extends State<TimeTableScreen> {
  //to set the day and filter the timetable according to that
  String selectedDay = days[0];

  //to provide search arguments to the fetchAndGetTimetables method api fucntion
  Map<String, String> search = {};

  //get classroom details for diplaying grade and section
  Map<String, dynamic> classroom;

  //user fullname
  String userFullName;

  _showErrorModal() {
    showDialog(
      context: context,
      child: AlertDialog(
        title: Text('An Error Ocuured'),
        content: Text('There is some error'),
        actions: [
          FlatButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('okay'))
        ],
      ),
    );
  }

  //get the user details from the sharedPrederence
  getUserData() async {
    try {
      final userData = await StorageService.getUser();
      if (userData != null)
        setState(() {
          search = {
            "classroom": User.fromJSON(jsonDecode(userData)).classroom.id,
            "day": selectedDay
          };
          classroom = User.fromJSON(jsonDecode(userData)).classroom.toMap();
          userFullName = User.fromJSON(jsonDecode(userData)).fullName;
        });
    } catch (e) {
      _showErrorModal();
    }
  }

  _joinMeeting(TimeTable timeTable) async {
    try {
      var options = JitsiMeetingOptions()
        ..room = timeTable.link
        // ..serverURL = 'https://someHost.com'
        ..subject =
            '${timeTable.subject} ${classroom['grade']} ${classroom['section']}'
        ..userDisplayName = userFullName
        // ..userEmail = "myemail@email.com"
        ..audioOnly = true
        ..audioMuted = true
        ..videoMuted = true;
      await JitsiMeet.joinMeeting(options);
    } catch (e) {
      _showErrorModal();
    }
  }

  @override
  void initState() {
    super.initState();
    getUserData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: [
        Container(
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(
              color: Color(0xff48F373),
              borderRadius: BorderRadius.circular(23)),
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              classroom == null
                  ? Text('Loading')
                  : Text(
                      'Grade: ${classroom['grade']}${classroom['section']}',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                      ),
                    ),
              DropdownButton<String>(
                value: search['day'],
                elevation: 0,
                items: days.map((String value) {
                  return new DropdownMenuItem<String>(
                    value: value,
                    child: new Text(
                      value,
                    ),
                  );
                }).toList(),
                onChanged: (day) {
                  setState(() {
                    search['day'] = day;
                  });
                  search['day'] = day;
                  // widget.bloc.fetchTimeTable(search);
                },
              )
            ],
          ),
        ),
        Expanded(
          child: FutureBuilder(
            future: Provider.of<TimeTableProvider>(context, listen: false)
                .fetchAndGetTimeTables(search),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(
                  child: CircularProgressIndicator(),
                );
              } else {
                return Consumer<TimeTableProvider>(
                    builder: (context, timeTableData, child) =>
                        ListView.builder(
                          itemBuilder: (context, i) => ListTimeTable(
                              timeTableData.timeTableDetails[i], _joinMeeting),
                          itemCount: timeTableData.timeTableDetails.length,
                        ));
              }
            },
          ),
        ),
      ],
    ));
  }
}
