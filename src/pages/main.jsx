import { useEffect, useRef, useState } from "react";
import icon from "./parkingIcon.png";
import styled from "styled-components";
import SpotList from "../SpotList.json";

function Main() {
  const mapRef = useRef();
  let markers = []; // 마커들의 정보들을 담을 배열
  let infoWindows = []; // 공영 주차장 정보들을 담을 배열

  const MARKER_SPRITE_X_OFFSET = 29;
  const MARKER_SPRITE_Y_OFFSET = 50;
  const MARKER_SPRITE_POSITION = {
    A0: [0, 0],
    B0: [MARKER_SPRITE_X_OFFSET, 0],
    C0: [MARKER_SPRITE_X_OFFSET * 2, 0],
    D0: [MARKER_SPRITE_X_OFFSET * 3, 0],
    E0: [MARKER_SPRITE_X_OFFSET * 4, 0],
    F0: [MARKER_SPRITE_X_OFFSET * 5, 0],
    G0: [MARKER_SPRITE_X_OFFSET * 6, 0],
    H0: [MARKER_SPRITE_X_OFFSET * 7, 0],
    I0: [MARKER_SPRITE_X_OFFSET * 8, 0],

    A1: [0, MARKER_SPRITE_Y_OFFSET],
    B1: [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET],
    C1: [MARKER_SPRITE_X_OFFSET * 2, MARKER_SPRITE_Y_OFFSET],
    D1: [MARKER_SPRITE_X_OFFSET * 3, MARKER_SPRITE_Y_OFFSET],
    E1: [MARKER_SPRITE_X_OFFSET * 4, MARKER_SPRITE_Y_OFFSET],
    F1: [MARKER_SPRITE_X_OFFSET * 5, MARKER_SPRITE_Y_OFFSET],
    G1: [MARKER_SPRITE_X_OFFSET * 6, MARKER_SPRITE_Y_OFFSET],
    H1: [MARKER_SPRITE_X_OFFSET * 7, MARKER_SPRITE_Y_OFFSET],
    I1: [MARKER_SPRITE_X_OFFSET * 8, MARKER_SPRITE_Y_OFFSET],

    A2: [0, MARKER_SPRITE_Y_OFFSET * 2],
    B2: [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET * 2],
    C2: [MARKER_SPRITE_X_OFFSET * 2, MARKER_SPRITE_Y_OFFSET * 2],
    D2: [MARKER_SPRITE_X_OFFSET * 3, MARKER_SPRITE_Y_OFFSET * 2],
    E2: [MARKER_SPRITE_X_OFFSET * 4, MARKER_SPRITE_Y_OFFSET * 2],
    F2: [MARKER_SPRITE_X_OFFSET * 5, MARKER_SPRITE_Y_OFFSET * 2],
    G2: [MARKER_SPRITE_X_OFFSET * 6, MARKER_SPRITE_Y_OFFSET * 2],
    H2: [MARKER_SPRITE_X_OFFSET * 7, MARKER_SPRITE_Y_OFFSET * 2],
    I2: [MARKER_SPRITE_X_OFFSET * 8, MARKER_SPRITE_Y_OFFSET * 2],
  };

  // const InfoBox = styled.div`
  //   width: 200px;
  //   height: 200px;
  //   text-align: center;
  //   padding: 10px;
  // `;

  useEffect(() => {
    const { naver } = window;

    const mapOptions = {
      center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
      zoom: 18,
    };

    const map = new naver.maps.Map(mapRef.current, mapOptions);

    let bounds = map.getBounds(),
      southWest = bounds.getSW(),
      northEast = bounds.getNE(),
      lngSpan = northEast.lng() - southWest.lng(),
      latSpan = northEast.lat() - southWest.lat();

    // 지도 처음 위치 마커 표시
    // let markerOptions = {
    //   position: new naver.maps.LatLng(37.540765, 126.946055),
    //   map: map,
    //   icon: {
    //     url: icon,
    //   },
    // };

    // let marker = new naver.maps.Marker(markerOptions);

    // 다중 마커 표시
    for (let key in MARKER_SPRITE_POSITION) {
      let num = parseInt(key);
      let position = new naver.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random()
        // SpotList[num].lat,
        // SpotList[num].lng
      );

      var marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
          url: icon, // 현재 사용 중인 마커 이미지
        },
        // zIndex: 100,
      });

      var infoWindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          key.substr(0, 1) +
          '"</b>.</div>',
      });

      markers.push(marker);
      infoWindows.push(infoWindow);
    }

    // 클릭한 지점 마커 표시
    // naver.maps.Event.addListener(map, "click", function (e) {
    //   marker.setPosition(e.latlng);
    //   map.setCenter(e.latlng); // 클릭한 지점으르 중심으로 화면 이동
    //   if (infoWindow.getMap()) {
    //     infoWindow.close();
    //   }
    // });

    // let infoWindow = new naver.maps.InfoWindow({
    //   content:
    //     '<div style="width: 200px; text-align: center; padding: 10px"><b>마포교육장소</b><br />- 네이버 지도 -</div>',
    // });

    // markers.push(marker);
    // infoWindows.push(infoWindow);

    // 마커 클릭 시 주차장 정보 on/off
    const openInfoBox = (seq) => {
      return function (e) {
        let marker = markers[seq];
        let infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
          map.setCenter(marker.getPosition());
        }
      };
    };

    for (var i = 0; i < markers.length; i++) {
      naver.maps.Event.addListener(markers[i], "click", openInfoBox(i)); // 클릭한 마커 핸들러
    }
  }, []);

  return <Map ref={mapRef}></Map>;
}

const Map = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Main;
