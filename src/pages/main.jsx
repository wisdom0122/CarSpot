import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

function Main() {
    const mapRef = useRef();

    useEffect(() => {
        const { naver } = window;

        const mapOptions = {
            center: new naver.maps.LatLng(37.540765, 126.946055), //지도 처음 위치
            zoom: 18,
        }

        const map = new naver.maps.Map(mapRef.current, mapOptions);
    }, []);

    return (
        <Map ref={mapRef}></Map>
    )
}

const Map = styled.div`
    width: 100vw;
    height: 100vh;
`;


export default Main;