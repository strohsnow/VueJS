const axios = require("axios");

axios
    .get("https://vk.com")
    .then((response) => {
        console.log("VK Response:", response.status, response.statusText);
        console.log("Headers:", response.headers);
    })
    .catch((error) => {
        console.error("VK Error:", error.message);
    });
