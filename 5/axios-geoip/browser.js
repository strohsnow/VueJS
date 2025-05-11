axios
    .get("https://json.geoiplookup.io/")
    .then((response) => {
        console.log("GeoIP Browser Response:", response.data);
    })
    .catch((error) => {
        console.error("GeoIP Browser Error:", error);
    });
