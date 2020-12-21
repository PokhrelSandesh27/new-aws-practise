import 'slot.dart';

class TimeTable {
  String id;
  String link;
  Slot slot;
  String subject;

  TimeTable({this.id, this.link, this.slot, this.subject});

  static from(var json) {
    return TimeTable(
      id: json['_id'],
      link: json['link'],
      slot: Slot.from(json['slot']),
      subject: json['subject']['name'],
    );
  }

  @override
  String toString() {
    return 'TimeTable{id: $id, link: $link, slot: $slot, subject: $subject}';
  }
}
