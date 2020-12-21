import 'package:student_app/shared/enums/group.dart';
import 'package:student_app/shared/enums/user_status.dart';

mixin StatusUtil {
  UserStatus toUserStatus(String str) {
    return UserStatus.values.firstWhere((statusEnum) => statusEnum.toString() == 'UserStatus.$str');
  }

  Group toGroup(String str) {
    return Group.values.firstWhere((statusEnum) => statusEnum.toString() == 'Group.$str');
  }
}
