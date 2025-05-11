axios
    .get("https://vk.com")
    .then((response) => {
        console.log("VK Response:", response);
    })
    .catch((error) => {
        console.error("VK Error:", error);
    });
