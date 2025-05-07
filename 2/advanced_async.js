function update_page_load_counter() {
    let count = localStorage.getItem("pageLoadCounter");
    count = count ? parseInt(count) + 1 : 1;
    localStorage.setItem("pageLoadCounter", count);
}
document.addEventListener("DOMContentLoaded", update_page_load_counter);

function task1() {
    let count = localStorage.getItem("pageLoadCounter");
    alert(`You loaded page ${count} times`);
}
document.getElementById("task1").addEventListener("click", task1);


function get_urls() {
    let urls = [];
    for (let i = 0; i < 5; i++) {
        const url = prompt(`Enter the url #${i + 1}:`);
        urls.push(url);
    }
    return urls;
}

function load_image(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject("Can't load image");
    });
}

function task2() {
    const urls = get_urls();
    const container = document.getElementById("task2Images");
    container.innerHTML = "";
    Promise.allSettled(urls.map(url => load_image(url)))
        .then(results => {
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    container.appendChild(result.value);
                } else {
                    const p = document.createElement('p');
                    p.textContent = result.reason;
                    container.appendChild(p);
                }
            });
        });
}
document.getElementById("task2").addEventListener("click", task2);


function append_image(container, url) {
    let img = new Image();
    img.src = url;
    img.onload = () => container.appendChild(img);
    img.onerror = () => {
        const p = document.createElement("p");
        p.textContent = "Can't load image";
        container.appendChild(p);
    };
}

function task3() {
    const container = document.getElementById("task3Images");
    container.innerHTML = "";
    const urls = get_urls();
    urls.forEach(url => append_image(container, url));
}
document.getElementById("task3").addEventListener('click', task3);


async function task2_async() {
    const urls = get_urls();
    const container = document.getElementById("task2AsyncImages");
    container.innerHTML = "";
    for (const url of urls) {
        try {
            const img = await load_image(url);
            container.appendChild(img);
        } catch (error) {
            const p = document.createElement("p");
            p.textContent = error;
            container.appendChild(p);
        }
    }
}
document.getElementById("task2_async").addEventListener("click", task2_async);

async function task3_async() {
    const urls = get_urls();
    const container = document.getElementById("task3AsyncImages");
    container.innerHTML = "";
    urls.forEach(url => {
        (async () => {
            try {
                const img = await load_image(url);
                container.appendChild(img);
            } catch (error) {
                const p = document.createElement('p');
                p.textContent = "Can't load image";
                container.appendChild(p);
            }
        })();
    });
}
document.getElementById('task3_async').addEventListener('click', task3_async);


async function task5() {
    let ips = [];
    for (let i = 0; i < 5; i++) {
        const ip = prompt(`Enter the IP address #${i + 1}:`);
        ips.push(ip);
    }

    const banned_countries = [
        "Russia",
        "Belarus",
        "Afghanistan",
        "China",
        "Venezuela",
        "Iran"
    ];

    try {
        const lookups = ips.map(ip =>
            fetch(`https://ipapi.co/${ip}/json/`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }
                    return res.json();
                })
                .catch(() => null)
        );
        let results = await Promise.all(lookups);

        const blocked = results.some(
            res => res && banned_countries.includes(res.country_name)
        );
        if (blocked) {
            alert("Our services are not available in your country");
        } else {
            alert("Welcome to our website!");
        }
    } catch (error) {
        alert("Failed to check the IP address: ", error);
    }
}
document.getElementById("task5").addEventListener("click", task5);
