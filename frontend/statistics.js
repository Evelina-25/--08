async function loadStatistics() {

    try {

        // ✔️ ПРОВЕРКА АВТОРИЗАЦИИ (ДОБАВЛЕНО)
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Нет авторизации. Войдите в систему.");
            window.location.href = "avt.html";
            return;
        }

        const response =
            await fetch(
                "http://localhost:5000/api/beds/statistics",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        document.getElementById(
            "totalBeds"
        ).textContent =
            data.totalBeds;

        document.getElementById(
            "occupiedBeds"
        ).textContent =
            data.occupiedBeds;

        document.getElementById(
            "freeBeds"
        ).textContent =
            data.freeBeds;

        document.getElementById(
            "occupancyPercent"
        ).textContent =
            data.occupancyPercent + "%";

        createPieChart(data);

        createDepartmentChart(data);

    } catch (error) {

        console.error(error);

        alert(
            "Ошибка загрузки статистики"
        );

    }
}

function createPieChart(data) {

    const ctx =
        document
            .getElementById("pieChart");

    new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Занято",
                "Свободно"
            ],

            datasets: [{
                data: [
                    data.occupiedBeds,
                    data.freeBeds
                ]
            }]
        }
    });
}

function createDepartmentChart(data) {

    const ctx =
        document
            .getElementById(
                "departmentChart"
            );

    new Chart(ctx, {

        type: "bar",

        data: {

            labels:
                data.departments.map(
                    d => d._id
                ),

            datasets: [{
                label:
                    "Количество коек",

                data:
                    data.departments.map(
                        d => d.count
                    )
            }]
        }
    });
}

loadStatistics();