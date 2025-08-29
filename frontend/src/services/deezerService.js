import axios from "axios";

const deezerApi = axios.create({
  baseURL: "/deezer",
  timeout: 10000,
});

//getting top artists

async function getTopArtists() {
  try {
    const response = await deezerApi.get("/chart/0/artists");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//getting popular tracks
async function getPopularTracks() {
  try {
    const response = await deezerApi.get("/chart/0/tracks");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getPopularAlbums() {
  try {
    const response = await deezerApi.get("/chart/0/albums");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//Searching tracks and artists and albums by query

async function search(query, index = 0, limit = 10) {
  try {
    const response = await deezerApi.get("/search", { params: { q: query, index, limit } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { getTopArtists, getPopularTracks,getPopularAlbums, search };
