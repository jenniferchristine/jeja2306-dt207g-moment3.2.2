"use strict";

async function fetchData() {
    const url = "https://jeja2306-dt207g-moment3-2-1.onrender.com/workexperiences";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not connect to API" + response.statusText);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Could not fetch data", error);
    }
}

fetchData();