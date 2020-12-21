import 'package:flutter/material.dart';

class LibraryScreen extends StatelessWidget {
  static route() => MaterialPageRoute(builder: (context) => LibraryScreen());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              showSearch(context: context, delegate: BookSearch());
            },
          )
        ],
      ),
    );
  }
}

class BookSearch extends SearchDelegate<String> {
  final books = ["Parijat", "Seto Dharti"];
  final recentBooks = ["Parijat"];
  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
          icon: Icon(Icons.clear),
          onPressed: () {
            query = "";
          }),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
        icon: AnimatedIcon(
          icon: AnimatedIcons.menu_arrow,
          progress: transitionAnimation,
        ),
        onPressed: () {
          close(context, null);
        });
  }

  @override
  Widget buildResults(BuildContext context) {
    return Container(
        height: 100,
        width: 100,
        child: Card(
          color: Colors.red,
          shape: StadiumBorder(),
          child: Center(child: Text(query)),
        ));
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final suggestionList = query.isEmpty
        ? recentBooks
        : books.where((element) => element.startsWith(query)).toList();
    return ListView.builder(
        itemBuilder: (context, index) => ListTile(
              onTap: () {
                showResults(context);
              },
              leading: Icon(Icons.location_city),
              title: RichText(
                text: TextSpan(
                    text: suggestionList[index].substring(0, query.length),
                    style: TextStyle(
                        color: Colors.black, fontWeight: FontWeight.bold),
                    children: [
                      TextSpan(
                          text: suggestionList[index].substring(query.length),
                          style: TextStyle(color: Colors.grey))
                    ]),
              ),
            ),
        itemCount: suggestionList.length);
  }
}
