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
        data.forEach( item => { // loopar igenom resultat
            const workExperience = document.createElement("div"); // skapar div och klass för varje
            workExperience.classList.add("workexperience");

            // målar ut
            workExperience.innerHTML = `
            <h2>Arbetsplats: ${item.companyname}</h2>
            <h3>Jobbtitel: ${item.jobtitle}</h3>
            <h4>Ort: ${item.location}</h4>
            <p><span class="desc">"</span> ${item.description} <span class="desc">"</span>`
    
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("material-symbols-outlined");
            deleteBtn.innerHTML = "delete";

            workExperience.appendChild(deleteBtn);
            resultDiv.appendChild(workExperience);

            deleteBtn.addEventListener('click', async (e) => {
                try { // provar en bekräftelse via funktionen
                    const confirmed = await showConfirmation("Är du säker på att du vill radera denna erfarenhet?");

                    if (confirmed) { // om confirmad raderas
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

async function showConfirmation(message) {
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block"; // overlay blir synglig när denna funktion körs

    return new Promise((resolve, reject) => { // skapar promise för resultatet
        const confirmation = document.createElement("div");
        confirmation.classList.add("confirmation-box");
        confirmation.innerHTML = `
        <div>${message}</div>
        <button class="confirmBtn" id="yes">Ja</button>
        <button class="confirmBtn" id="no">Nej</button>`;

        document.body.appendChild(confirmation);
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("button-div");

        const yesBtn = document.getElementById("yes");
        const noBtn = document.getElementById("no");

        buttonDiv.appendChild(yesBtn);
        buttonDiv.appendChild(noBtn);
        confirmation.appendChild(buttonDiv);

        yesBtn.addEventListener('click', () => {
            document.body.removeChild(confirmation);
            overlay.style.display = "none"; // overlay försvinner när klickad
            resolve(true); // ja blir klickad
        });

        noBtn.addEventListener('click', () => {
            document.body.removeChild(confirmation);
            overlay.style.display = "none";
            resolve(false); // nej blir klickad
        });
    })
}

async function deleteData(id) { // hämtar specifikt resultat
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