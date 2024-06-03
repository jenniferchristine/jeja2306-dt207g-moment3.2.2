"use strict";

async function fetchData() {
    const url = "https://jeja2306-dt207g-moment3-2-1.onrender.com/workexperiences";

    try {
        const response = await fetch(url);
        if (!response.ok) { // felhantering
            throw new Error("Could not connect to API" + response.statusText);
        }
        const data = await response.json();
        return data; // returnerar från api
    } catch (error) {
        console.error("Could not fetch data", error);
        throw error;
    }
};

async function displayData() {
    const resultDiv = document.getElementById("result");

    try {
        const data = await fetchData();
        data.forEach( item => {
            const workExperience = document.createElement("div");
            workExperience.classList.add("workexperience");

            workExperience.innerHTML = `
            <h2>Arbetsplats: ${item.companyname}</h2>
            <h3>Jobbtitel ${item.jobtitle}</h3>
            <h4>Ort: ${item.location}</h4>
            <p><span class="desc">"</span> ${item.description} <span class="desc">"</span>`
    
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("material-symbols-outlined");
            deleteBtn.innerHTML = "delete";

            deleteBtn.addEventListener('click', async (e) => {
                try {
                    const confirmation = confirm("OBS: Är du säker på att du vill radera denna?");

                    if (confirmation) {
                        // kalla på radera funktion
                        resultDiv.removeChild(workExperience); // tar bort från sida
                    }
                } catch (error) {
                    console.error("Error while deleting data", error);
                }
            });
        });
    } catch (error) {
        console.error("Fault accured: ", error);
    }
};

fetchData();