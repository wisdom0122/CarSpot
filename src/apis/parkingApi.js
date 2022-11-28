import axios from 'axios';
import { useState } from 'react';
import SpotList from '../assets/spotList.json';

const Key = process.env.REACT_APP_SPOT_KEY;
const baseURL = process.env.REACT_APP_SPOT_ROOT + Key + process.env.REACT_APP_SPOT_ARG;

const getCloseSpot = (current_position) => {
    SpotList.map((spot) => (spot.distance = (current_position.x - spot.lng) ** 2 + (current_position.y - spot.lat) ** 2));

    return SpotList.sort(function (a, b) {
        return a.distance - b.distance;
    })
        .slice(0, 5)
        .filter((e) => !e.check);
};

function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
    }

    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
        return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
            return text + node.nodeValue;
        }, '');
    } else if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == 'undefined') {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == 'undefined') {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

export const getDataFromApi = async (current_position, callback) => {
    const closeSpot = getCloseSpot(current_position);
    closeSpot.map((e) => (e.check = true));
    console.log(closeSpot);
    try {
        await axios.all(closeSpot.map((L) => axios.get(`${baseURL}${L.spot}`))).then((res) => {
            let parser = new DOMParser();
            const return_Data = [];
            res.map((r) => xmlToJson(parser.parseFromString(r.data, 'text/xml').getElementsByTagName('PRK_STTS')[0]).PRK_STTS).map((e) => {
                if (Array.isArray(e)) return_Data.push(...e);
            });

            callback({
                ApiData: return_Data
            });
        });
    } catch (error) {
        // console.log('error');
    }

    return null;
};
