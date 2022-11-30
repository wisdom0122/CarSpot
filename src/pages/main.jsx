import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Charge from "../components/charge";
import Menu from "../components/menu";

import loading from "../assets/images/loading.gif";

import * as parkingApi from "../apis/parkingApi.js";
import * as controlMap from "../components/controlMap.js";

import "../infowindow/infowindow.css";

const { naver } = window;

function Main() {
  const mapRef = useRef();

  //map 중심 좌표(position)에 따라 가까운 spot api data 요청함
  const [visible, setVisible] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState([]);
  const [position, setPosition] = useState({ lng: 37.5005, lat: 127.038 });

  useEffect(() => {
    const map = controlMap.creatMap(mapRef, position);

    //맵 중심 좌표 이동 드래그 이벤트 등록
    naver.maps.Event.addListener(map, "dragend", () => {
      setPosition({
        lat: map.data.map.center.y,
        lng: map.data.map.center.x,
      });
    });
  }, []);
  useEffect(() => {
    const map = controlMap.creatMap(mapRef);
    controlMap.createMaker(apiData, setName);
  }, [apiData]);

  useEffect(() => {
    console.log(position);
    setLoading(true);
    parkingApi.getDataFromApi(position, ({ ApiData } = {}) => {
      setApiData((prev) => [prev, ...ApiData]);
      setLoading(false);
    });

    controlMap.ChangeCenterMaker(position);
  }, [position]);

  return (
    <Page>
      <Menu setVisible={setVisible} />

      {visible && <Charge name={name} />}
      <Map ref={mapRef}></Map>
      <h5>공영주차장 정보안내시스템</h5>
      {loading ? <Roading></Roading> : ""}
    </Page>
  );
}
const Roading = styled.div`
  background: url(${loading});
  position: fixed;
  z-index: 10;
  left: 50%;
  top: calc(50% - 64px);
  width: 64px;
  height: 64px;

  margin: 15px;
`;

const Page = styled.div`
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  h5 {
    margin: 0;
    font-size: 30px;
    font-weight: bold;
    color: black;
    opacity: 0.7;
    position: absolute;
    right: 25px;
    top: 15px;
  }
`;

const Map = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  height: 100vh;
  &:focus {
    outline: none;
  }
`;

export default Main;
