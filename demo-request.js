//Run Program Using This Format: node demo-request.js "*insert-artist-name-here*"
import soundcharts from "./soundcharts.js";

const query = process.argv[2];

if (!query) {
    console.error("Please Provide an Artist/Band Name.");
    process.exit(1);
}

async function searchArtist(query) {
    try {
        const res = await soundcharts.get("/search/artist", {
            params: { q: query },
        });
        console.log(JSON.stringify(res.data, null, 2));
    } catch (error) {
        console.error("Error Finding Artst: ", error.response?.data || error.message);
        console.error("Request URL: ", error.config?.url);
    }
}

searchArtist(query);