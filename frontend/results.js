const table = document.getElementById("bedsTable");

const filters =
    JSON.parse(localStorage.getItem("bedFilters")) || {};

async function loadBeds() {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Нет авторизации");
            window.location.href = "login.html";
            return;
        }

        const res = await fetch(
            "http://localhost:5000/api/beds/filter",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(filters)
            }
        );

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Ошибка загрузки данных");
        }

        const beds = await res.json();

        table.innerHTML = "";

        if (!beds || beds.length === 0) {
            table.innerHTML =
                `<tr><td colspan="4">Нет данных</td></tr>`;
            return;
        }

        beds.forEach(bed => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${bed.number ?? "-"}</td>
                <td>${bed.department ?? "-"}</td>
                <td>${bed.status ?? "-"}</td>
                <td>${bed.patientName || "-"}</td>
            `;

            table.appendChild(row);
        });

    } catch (e) {

        console.error("BEDS ERROR:", e);

        alert("Ошибка загрузки данных: " + e.message);
    }
}

function goBack() {
    window.location.href = "glavnauy.html";
}

function printReport() {
    window.print();
}

function exportReport() {

    const tableEl = document.querySelector("table");

    let csv = [];

    for (let row of tableEl.rows) {

        let cols = [];

        for (let cell of row.cells) {
            cols.push(cell.innerText);
        }

        csv.push(cols.join(";"));
    }

    const blob = new Blob([csv.join("\n")], {
        type: "text/csv"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "bed_report.csv";

    link.click();
}

loadBeds();