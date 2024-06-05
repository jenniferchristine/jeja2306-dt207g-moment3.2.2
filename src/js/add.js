"ust strict";

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', () => {
    addData();
});

async function addData() {
    const companyname = document.getElementById("companyname").value; // hämta värde från inputs
    const jobtitle = document.getElementById("jobtitle").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    document.getElementById("companynameError").textContent = "";
    document.getElementById("jobtitleError").textContent = "";
    document.getElementById("locationError").textContent = "";
    document.getElementById("descriptionError").textContent = "";

    const workexperience = { // skapar objekt för insamlad data
        companyname: companyname, // värde för varje nyckel
        jobtitle: jobtitle,
        location: location,
        description: description
    };

    const url = "https://jeja2306-dt207g-moment3-2-1.onrender.com/workexperiences";

    try {
        const response = await fetch(url, {
            method: 'POST', //postförfrågan
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workexperience)
        }); 
        
        if (!response.ok) {
            const errorData = await response.json();
            handleValidation(errorData.errors);
            throw new Error("Failed to add data");
        }

        document.getElementById('companyname').value = ""; // töm fält efter tillägg
        document.getElementById('jobtitle').value = "";
        document.getElementById('location').value = "";
        document.getElementById('description').value = "";

        const data = await response.json();
        console.log("Data added", data);

        const confirmationDiv = document.getElementById("confirmation");
        confirmationDiv.innerHTML = `Din arbetslivserfarenhet har lagts till! <br> 
        <p class="text">> Klicka <a href="index.html">här</a> för att komma till ditt CV<p>`;
        confirmationDiv.style.display = "block";

    } catch (error) {
        console.error("Error when adding data", error);
    }
}

function handleValidation(errors) {
    if (errors) {
        if (errors.companyname) {
            document.getElementById("companynameError").textContent = errors.companyname;
        }
        if (errors.jobtitle) {
            document.getElementById("jobtitleError").textContent = errors.jobtitle;
        }
        if (errors.location) {
            document.getElementById("locationError").textContent = errors.location;
        }
        if (errors.description) {
            document.getElementById("descriptionError").textContent = errors.description;
        }
    } else {
        console.error("Validation errors object is undefined");
    }
}