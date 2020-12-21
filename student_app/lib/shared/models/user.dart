import 'classroom.dart';
import 'enum/MyEnum.dart';
import 'enum/group.dart';
import 'enum/user_status.dart';

class User with MyEnum {
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

  static User from(var json) {
    return User(
      id: json['_id'],
      username: json['username'],
      fullName: json['fullName'],
      token: json['token'],
      status: MyEnum.toUserStatus(json['status']),
      groups: List<Group>.from(json['groups'].map((group) => MyEnum.toGroup(group))),
      classroom: Classroom.from(json['classroom']),
      student: json['student'],
    );
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
