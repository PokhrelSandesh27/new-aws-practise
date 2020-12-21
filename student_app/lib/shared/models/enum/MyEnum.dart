import 'group.dart';
import 'user_status.dart';

class MyEnum {
  static UserStatus toUserStatus(String str) {
    return UserStatus.values.firstWhere((statusEnum) => statusEnum.toString() == 'UserStatus.$str');
  }

  static Group toGroup(String str) {
    return Group.values.firstWhere((statusEnum) => statusEnum.toString() == 'Group.$str');
  }
}
