"use strict";

async function fetchData() {
    const url = "https://jeja2306-dt207g-moment3-2-1.onrender.com/workexperiences";

    try {
        const response = await fetch(url);
        if (!response.ok) { // felhantering
            throw new Error("Could not connect to API" + response.statusText);
        }
        const data = await response.json();
        console.log(data);
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

            workExperience.appendChild(deleteBtn);
            resultDiv.appendChild(workExperience);

            deleteBtn.addEventListener('click', async (e) => {
                try {
                    const confirmation = confirm("OBS: Är du säker på att du vill radera denna?");

                    if (confirmation) {
                        await deleteData(item._id);
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

async function deleteData(id) {
    const url = "https://jeja2306-dt207g-moment3-2-1.onrender.com/workexperiences/" + id;

    const response = await fetch(url, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error("Failed to delete data");
    }
    const data = await response.json();
    console.log("Data deleted", data);
}

displayData();