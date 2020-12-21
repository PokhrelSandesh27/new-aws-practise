import 'package:student_app/shared/enums/group.dart';
import 'package:student_app/shared/enums/user_status.dart';
import 'package:student_app/shared/utils/status_util.dart';

import 'classroom.dart';

class User with StatusUtil {
  String id;
  String username;
  String fullName;
  String token;
  UserStatus status;
  List<Group> groups;
  Classroom classroom;
  String student;

  User({
    this.id,
    this.username,
    this.fullName,
    this.token,
    this.status,
    this.groups,
    this.classroom,
    this.student,
  });

  User.fromJSON(var json) {
    id = json['_id'];
    username = json['username'];
    fullName = json['fullName'];
    token = json['token'];
    status = toUserStatus(json['status']);
    groups = List<Group>.from(json['groups'].map((group) => toGroup(group)));
    classroom = Classroom.fromJSON(json['classroom']);
    student = json['student'];
  }

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'username': username,
      'fullName': fullName,
      'token': token,
      'status': status.toString().replaceAll('UserStatus.', ''),
      'groups': groups.map((group) => group.toString().replaceAll('Group.', '')).toList(),
      'classroom': classroom.toMap(),
      'student': student,
    };
  }

  @override
  String toString() {
    return 'User{id: $id, username: $username, fullName: $fullName, token: $token, status: $status, groups: $groups, classroom: $classroom, student: $student}';
  }
}
