import axios from "axios";
import { useState } from "react";

const deezerApi = axios.create('https://api.deezer.com/');
const [recommendation, setRecommendation] = useState([]);
const [trend, setTrend] = useState([]);

//getting recommended artist as an array

export const recommended = async () => {
    try{
        const response = await deezerApi.get('/chart/0/artists');
        setRecommendation(response.json())
    }catch{
        console.log('error finding artists recommendations')
    }
}

//getting trending tracks as an array

export const trending = async () => {
    try{
        const response = await deezerApi.get('/chart/0/tracks');
        setTrend(response.json());
    }catch{
        console.log('error finding tracks trendings')
    }
}

