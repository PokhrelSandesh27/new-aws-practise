import 'package:flutter/material.dart';
import 'package:jitsi_meet/jitsi_meet.dart';
import 'package:provider/provider.dart';
import 'package:studentapp/classroom/bloc.dart';
import 'package:studentapp/shared/models/time_table.dart';
import 'package:studentapp/shared/models/user.dart';
import 'package:studentapp/shared/services/auth.dart';

List<String> days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

class TodayClass extends StatefulWidget {
  final User user;
  final ClassroomBloc bloc;

  TodayClass(this.user, {this.bloc});

  static Widget create(BuildContext context, User user) {
    final AuthBase auth = Provider.of<AuthBase>(context);
    return Provider<ClassroomBloc>(
      create: (_) => ClassroomBloc(),
      dispose: (context, bloc) => bloc.dispose(),
      child: Consumer<ClassroomBloc>(
        builder: (context, bloc, _) => TodayClass(user, bloc: bloc),
      ),
    );
  }

  @override
  _TodayClassState createState() => _TodayClassState();
}

class _TodayClassState extends State<TodayClass> {

  String selectedDay = days[0];
  Map<String, String> search = {};

  @override
  void initState() {
    super.initState();

    search = {
      'classroom': widget.user.classroom.id,
      'day': selectedDay
    };

    widget.bloc.fetchTimeTable(search);
  }

  _joinMeeting(TimeTable timeTable) async {
    try {
      var options = JitsiMeetingOptions()
        ..room = timeTable.link // Required, spaces will be trimmed
//        ..serverURL = "https://someHost.com"
        ..subject = '${timeTable.subject} ${widget.user.classroom.grade} ${widget.user.classroom.section}'
        ..userDisplayName = widget.user.fullName
        // ..userEmail = "myemail@email.com"
        ..audioOnly = true
        ..audioMuted = true
        ..videoMuted = true;

      await JitsiMeet.joinMeeting(options);
    } catch (error) {
      debugPrint("error: $error");
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthBase>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Hi, ${widget.user.fullName}'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.power_settings_new, color: Colors.white, size: 30),
            onPressed: () => auth.logOut(),
          )
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Grade: ${widget.user.classroom.grade} ${widget.user.classroom.section}',
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                ),
                DropdownButton<String>(
                  value: search['day'],
                  items: days.map((String value) {
                    return new DropdownMenuItem<String>(
                      value: value,
                      child: new Text(value),
                    );
                  }).toList(),
                  onChanged: (day) {
                    setState(() {
                      search['day'] = day;
                    });
                    search['day'] = day;
                    widget.bloc.fetchTimeTable(search);
                  },
                )
              ],
            ),
          ),
          Expanded(
            child: StreamBuilder<TimeTableResp>(
              stream: widget.bloc.timeTableStream,
              initialData: TimeTableResp(),
              builder: (context, snapshot) {
                TimeTableResp resp = snapshot.data;

                if(resp.state == 0) {
                  return Text('Refresh app');
                } else if (resp.state == 1) {
                  return Center(child: CircularProgressIndicator());
                } else if (resp.state == 3) {
                  return Text('Something went wrong');
                }

                return ListView.builder(
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemCount: resp.timeTable.length,
                  itemBuilder: (context, i) {
                    TimeTable timeTable = resp.timeTable[i];

                    return Card(
                      child: ListTile(
                        title: Text(timeTable.subject),
                        trailing: Text('${timeTable.slot.startTime}'),
                        leading: CircleAvatar(
                          child: Text(timeTable.subject[0]),
                        ),
                        subtitle: Text(timeTable.slot.period),
                        onTap: () {
                          _joinMeeting(resp.timeTable[i]);
                        },
                      ),
                    );
                  },
                );
              }
            ),
          )
          // ListView.builder(itemBuilder: null)
        ],
      ),
    );
  }
}
