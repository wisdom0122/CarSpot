import { useEffect, useRef, useState } from "react";
import icon from "../images/parkingIcon.png";
import styled from "styled-components";
import SpotList from "../SpotList.json";

function Main() {
  const mapRef = useRef();
  let markers = []; // 마커들의 정보들을 담을 배열
  let infoWindows = []; // 공영 주차장 정보들을 담을 배열

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
    for (let key = 0; key < SpotList.length; key++) {
      let position = new naver.maps.LatLng(
        SpotList[key].lat,
        SpotList[key].lng
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

      let infoWindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          key +
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

    for (let i = 0; i < markers.length; i++) {
      naver.maps.Event.addListener(markers[i], "click", openInfoBox(i)); // 클릭한 마커 핸들러
      // console.log("marker " + i + "" + markers[i].getPosition());
    }
  }, []);

  return <Map ref={mapRef}></Map>;
}

const Map = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Main;
