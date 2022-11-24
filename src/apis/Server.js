import axios from 'axios';
import SpotList from './SpotList.json';

const Key = '51567348436d6d6d363472416a7653';
const baseURL = 'http://openapi.seoul.go.kr:8088/' + Key + '/xml/citydata/1/5/';
const visitedCheck = [];
const getCloseSpot = current_position => {
    return SpotList.map(spot => {
        return { ...spot, distance: (current_position.lat - spot.lat) ** 2 + (current_position.lng - spot.lat) ** 2 };
    })
        .sort((a, b) => (a.distance > b.distance ? 1 : -1))
        .slice(0, 3);
};
export const getDataFromApi = async (current_position, callback) => {
    const closeSpot = getCloseSpot(current_position).filter(e => !visitedCheck.includes(e.id));
    closeSpot.map(e => {
        visitedCheck.push(e.id);
    });
    console.log(closeSpot);

    try {
        // console.log('try');
        await axios.all(closeSpot.map(L => axios.get(`${baseURL}${L.spot}`))).then(res =>
            callback({
                ApiData: res,
            })
        );
    } catch (error) {
        // console.log('error');
    }

    return null;
};
