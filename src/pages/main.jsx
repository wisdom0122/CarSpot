import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as Server from '../apis/Server.js';
import XMLParser from 'react-xml-parser';

function Main() {
    const mapRef = useRef();
    //GET DATA
    const [position, setPosition] = useState({ lat: 37.5005, lng: 127.038 });
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { naver } = window;

        const mapOptions = {
            center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
            zoom: 18,
        };

        const map = new naver.maps.Map(mapRef.current, mapOptions);
    }, []);

    useEffect(() => {
        setLoading(true);
        Server.getDataFromApi(position, ({ ApiData } = {}) => {
            // const temp = [];
            // ApiData.map(e => {
            //     const dataArr = new XMLParser().parseFromString(e.data).children[2].children[3].children;
            //     temp.push(...dataArr);
            // });
            setApiData(prev => [...prev, ...ApiData]);
            setLoading(false);
        });
    }, [position]);

    console.log(apiData);
    return (
        <>
            <Map ref={mapRef}></Map>
        </>
    );
}

const Map = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default Main;
