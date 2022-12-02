import SpotList from '../assets/spotList.json';
import * as URL from './constants/url';

const Key = process.env.REACT_APP_OPEN_API_KEY;
const baseURL = URL.apiUrl + Key + URL.spotArg;

export const createUrl = (current_position) => {
    SpotList.map((spot) => (spot.distance = (current_position.lng - spot.lng) ** 2 + (current_position.lat - spot.lat) ** 2));

    return SpotList.sort(function (a, b) {
        return a.distance - b.distance;
    })
        .slice(0, 5)
        .map((L) => `${baseURL}${L.spot}`);
};

export default createUrl;
