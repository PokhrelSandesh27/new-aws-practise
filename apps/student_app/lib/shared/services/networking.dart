import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:student_app/shared/services/storage.dart';

class NetworkService {
  final String baseUrl = 'https://api.ams.everestwalk.com/api/';

  getHeaders() async {
    var headers = {'Content-Type': 'application/json'};

    String token = await StorageService.getToken();
    if (token != null) {
      headers['token'] = token;
    }

    return headers;
  }

  Future<dynamic> post(url, body) async {
    var headers = await getHeaders();

    try {
      http.Response response = await http.post(
        baseUrl + url,
        headers: headers,
        body: jsonEncode(body),
      );

      int status = response.statusCode;

      if (status == 400) {
        throw (response.body);
      } else if (status == 200) {
        return json.decode(response.body);
      }
    } catch (e) {
      print('Something went wrong, retry later');
      rethrow;
    }
  }

  Future get(String url) async {
    var headers = await getHeaders();

    try {
      http.Response response = await http.get(baseUrl + url, headers: headers);

      String responseBody = response.body;
      if (response.statusCode == 200) {
        var data = json.decode(response.body);
        return data;
      } else {
        var data = jsonDecode(response.body);

        throw new NetworkException(
          code: response.statusCode,
          message: data['message'],
          details: data['details'],
        );
      }
    } catch (e) {
      rethrow;
//      _showErrorSnack('Something went wrong, retry later');
    }
  }
}

class NetworkException implements Exception {
  int code;
  String message;
  String details;

  NetworkException({this.code, this.message, this.details});
}
