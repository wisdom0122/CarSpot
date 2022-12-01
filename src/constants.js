const { naver } = window;

export class Constants {
  static apiUrl = "http://openapi.seoul.go.kr:8088/"; //openApiUrl

  static spotArg = "/xml/citydata/1/5/";

  static initLocation = new naver.maps.LatLng(37.540765, 126.946055); //지도 처음 위치
  static initZoom = 18; //지도 처음 확대 정도
}
