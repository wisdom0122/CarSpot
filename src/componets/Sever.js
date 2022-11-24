import axios from 'axios';
import XMLParser from 'react-xml-parser';

import SpotList from './SpotList.json';
const Key = '51567348436d6d6d363472416a7653';
const baseURL = 'http://openapi.seoul.go.kr:8088/' + Key + '/xml/citydata/1/5/';

const reshapeData = res => {
    console.log('get data');
    const PRK_STTS = [];
    res.map((e, index) => {
        new XMLParser().parseFromString(e.data).children[2].children[3].children.map(e => {
            PRK_STTS.push(e.children);
        });
    });
    return PRK_STTS;
};

const getApi = async () => {
    try {
        console.log('try');
        await axios.all(SpotList.map(L => axios.get(`${baseURL}${L.spot}`))).then(res => reshapeData(res));
    } catch (error) {
        console.log('error');
    }
};
