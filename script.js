console.log("Main.js working");

const populate = async (value, currency) => {
    let myStr = "";
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=${currency}`;
    let response = await fetch(url);
    let rJson = await response.json();

    document.querySelector(".output").style.display = "block";

    for (let key of Object.keys(rJson["data"])) {
        myStr += `
            <tr>
                <td>${key}</td>
                <td>${rJson["data"][key]["code"]}</td>
                <td>${(rJson["data"][key]["value"] * value).toFixed(2)}</td>
            </tr>`;
    }

    document.querySelector("tbody").innerHTML = myStr;
    document.getElementById("search").dispatchEvent(new Event("keyup"));
};

// Handle form submission
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;
    populate(value, currency);
});

// Search functionality
document.getElementById("search").addEventListener("keyup", function () {
    let filter = this.value.toUpperCase();
    document.querySelectorAll("tbody tr").forEach(row => {
        row.style.display = row.cells[1].textContent.toUpperCase().includes(filter) ? "" : "none";
    });
});

// Mobile Menu Toggle
document.querySelector(".menu-toggle").addEventListener("click", () => {
    document.querySelector("nav ul").classList.toggle("active");
});
