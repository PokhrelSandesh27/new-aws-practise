class Book {
  String id;
  String name;
  String subtitle;
  String description;
  String author;
  String link;
  String coverLink;

  Book(
      {this.id,
      this.name,
      this.subtitle,
      this.description,
      this.author,
      this.link,
      this.coverLink});

  Book.fromJSON(var json) {
    id = json['_id'];
    name = json['name'];
    subtitle = json['subtitle'];
    description = json['description'];
    author = json['author'];
    link = json['link'];
    coverLink = json['coverLink'];
  }

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'name': name,
      'subtitle': subtitle,
      'description': description,
      'author': author,
      'link': link,
      'coverLink': coverLink
    };
  }

  @override
  String toString() {
    return 'Book{id: $id, name: $name, subtitle: $subtitle,description: $description,author: $author,link: $link,coverLink: $coverLink}';
  }
}
