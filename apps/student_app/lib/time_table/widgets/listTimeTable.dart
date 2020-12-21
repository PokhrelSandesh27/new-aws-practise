import 'package:flutter/material.dart';
import 'package:student_app/shared/models/time_table.dart';

class ListTimeTable extends StatelessWidget {
  final TimeTable _timetableDetail;
  final Function _joinMetting;
  ListTimeTable(this._timetableDetail, this._joinMetting);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          Column(
            children: [
              Text(
                _timetableDetail.slot.startTime,
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              ListGen(
                lines: [20.0, 30.0, 40.0, 10.0],
              )
            ],
          ),
          SizedBox(
            width: 20.0,
          ),
          Expanded(
            child: GestureDetector(
              onTap: () {
                _joinMetting(_timetableDetail);
              },
              child: Container(
                  height: 100,
                  decoration: BoxDecoration(
                    color: Color(0xff654f91),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(8.0),
                      bottomLeft: Radius.circular(8.0),
                    ),
                  ),
                  child: Container(
                    color: Color(0xfffcf9f5),
                    margin: const EdgeInsets.only(left: 4),
                    padding: const EdgeInsets.only(left: 16, top: 8),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          height: 21.0,
                          child: Row(
                            children: [
                              Text(
                                  '${_timetableDetail.slot.startTime}-${_timetableDetail.slot.endTime}'),
                              VerticalDivider(),
                              Text(_timetableDetail.slot.period)
                            ],
                          ),
                        ),
                        Container(
                            child: Text(
                          _timetableDetail.subject,
                          style: TextStyle(
                              fontSize: 21.0, fontWeight: FontWeight.bold),
                        ))
                      ],
                    ),
                  )),
            ),
          )
        ],
      ),
    );
  }
}

class ListGen extends StatelessWidget {
  final lines;
  const ListGen({Key key, this.lines}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: List.generate(
          4,
          (index) => Container(
                height: 2.0,
                width: lines[index],
                color: Color(0xffd0d2d8),
                margin: EdgeInsets.symmetric(
                  vertical: 14.0,
                ),
              )),
    );
  }
}

// listtile listtable display card

// Container(
//       margin: const EdgeInsets.symmetric(horizontal: 5),
//       child: ListTile(
//         leading: CircleAvatar(
//           child: FittedBox(
//             child: Text(_timetableDetail.subject.substring(0, 1)),
//           ),
//         ),
//         title: Text(_timetableDetail.subject),
//         subtitle: Text(_timetableDetail.slot.period),
//         trailing: Text('${_timetableDetail.slot.startTime}'),
//         onTap: () {
//           _joinMetting(_timetableDetail);
//         },
//       ),
//     );
