import soundcharts from "./soundcharts.js";

const query = process.argv[2];

if (!query) {
    console.error("Please Provide a Song Name.");
    process.exit(1);
}

async function songFindrr(songName) {
    try {
        const endpoint = `/api/v2/song/search/${encodeURIComponent(songName)}`;
        const res = await soundcharts.get(endpoint);

        if(!res.data.items || res.data.items.length === 0) {
            console.log("Hmm. It Appears We Could Not Find Results For:", songName);
            return;
        }

        const song = res.data.items[0];
        const { uuid, name, creditName, releaseDate } = song;
        console.log(`Found: "${name}" by ${creditName} (Released on ${releaseDate})`);

        const metadata = `/api/v2.25/song/${uuid}`;
        const res2 = await soundcharts.get(metadata);

        const audio = res2.data?.object?.audio;
        if (!audio) {
            console.log("No Audio Metadata Available For This Song. :(");
            return;
        }

        const { tempo, key, mode } = audio;
        const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const keyName = key != null ? keys[key] : "Unknown";
        const modeName = mode === 1 ? "Major" : mode === 0 ? "Minor" : "";

        console.log("\nSong Metadata:");
        console.log(`Tempo (BPM): ${tempo ?? "N/A"}`);
        console.log(`Key: ${keyName} ${modeName}`);
    } catch (error) {
        console.error("Error Finding Song Metadata: ", error.response?.data || error.message);
        console.error("Request URL: ", error.config?.url);
    }
}

songFindrr(query);