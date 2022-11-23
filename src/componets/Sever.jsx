import { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import SpotList from './SpotList.json';
import styled from 'styled-components';
const GetData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const reshapeData = res => {
        const PRK_STTS = [];
        res.map(e => {
            new XMLParser().parseFromString(e.data).children[2].children[3].children.map(e => PRK_STTS.push(e.children));
        });
        // console.log(PRK_STTS);
        setData(PRK_STTS);
    };
    useEffect(() => {
        const Key = '51567348436d6d6d363472416a7653';
        const baseURL = 'http://openapi.seoul.go.kr:8088/' + Key + '/xml/citydata/1/99/';
        const getApi = async () => {
            try {
                // console.log('try');

                //데이터초기화
                setError(null);
                setData(null);
                //로딩중
                setLoading(true);

                await axios.all(SpotList.map(L => axios.get(`${baseURL}${L.spot}`))).then(res => reshapeData(res));
            } catch (error) {
                // console.log('error');
                //에러표시
                setError(error); //error
            }
            setLoading(false);
        };

        getApi();
    }, []);

    if (loading) return <Notice>로딩중..</Notice>;
    if (error) return <Notice>에러</Notice>;
    if (!data) return null;
    return <Notice>데이터 GET 성공</Notice>;
};

const Notice = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    color: red;
    font-size: 50px;
`;
export default GetData;
