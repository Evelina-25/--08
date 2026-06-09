const form = document.getElementById("filterForm");

// отправка фильтров
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const filters = {
        department: form.department.value,
        status: form.status.value
    };

    localStorage.setItem("bedFilters", JSON.stringify(filters));

    window.location.href = "bed-results.html";
});

// сброс фильтров
form.addEventListener("reset", () => {
    localStorage.removeItem("bedFilters");
});