const axios = require("axios");

axios
    .get("https://json.geoiplookup.io/")
    .then((response) => {
        console.log("GeoIP Node Response:", response.data);
    })
    .catch((error) => {
        console.error("GeoIP Node Error:", error.message);
    });
