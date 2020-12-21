import 'slot.dart';

class TimeTable {
  String id;
  String link;
  Slot slot;
  String subject;

  TimeTable({this.id, this.link, this.slot, this.subject});

  TimeTable.fromJSON(var json) {
    id = json['_id'];
    link = json['link'];
    slot = Slot.fromJSON(json['slot']);
    subject = json['subject']['name'];
  }

  @override
  String toString() {
    return 'TimeTable{id: $id, link: $link, slot: $slot, subject: $subject}';
  }
}
