class Classroom {
  String id;
  int grade;
  String section;

  Classroom({this.id, this.grade, this.section});

  static Classroom from(var json) {
    return Classroom(id: json['_id'], grade: json['grade'], section: json['section']);
  }

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'grade': grade,
      'section': section
    };
  }

  @override
  String toString() {
    return 'Classroom{id: $id, grade: $grade, section: $section}';
  }
}
