import soundcharts from "./soundcharts.js";

async function searchArtist(query) {
    try {
        const res = await soundcharts.get("/search/artist", {
            params: { q: query },
        });
        console.log(res.data);
    } catch (error) {
        console.error("Error Finding Artst: ", error.response?.data || error.message);
    }
}

searchArtist("Kendrick Lamar");