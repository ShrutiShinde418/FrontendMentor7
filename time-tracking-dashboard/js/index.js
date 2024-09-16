let data;
const allActivityTimes = document.querySelectorAll(".activity__time");
const lastWeekActivityTimes = document.querySelectorAll(".activity__last");
const dailyBtn = document.getElementById("daily");
const monthlyBtn = document.getElementById("monthly");
const weeklyBtn = document.getElementById("weekly");

const fetchData = async () => {
  try {
    const response = await fetch("../data/data.json");
    data = await response.json();

    for (let i = 0; i < allActivityTimes.length; i++) {
      allActivityTimes[i].textContent =
        data[i]?.timeframes?.weekly?.current + "hrs";
      lastWeekActivityTimes[i].textContent =
        data[i]?.timeframes?.weekly?.previous + "hrs";
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", fetchData);

[dailyBtn, monthlyBtn, weeklyBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const activeBtn = [dailyBtn, monthlyBtn, weeklyBtn].find((button) =>
      button.classList.contains("active")
    );
    activeBtn.classList.remove("active");
    btn.classList.add("active");
    e.preventDefault();
    for (let i = 0; i < allActivityTimes.length; i++) {
      allActivityTimes[i].textContent =
        data[i]?.timeframes?.[btn.textContent.toLowerCase()]?.current + "hrs";
      lastWeekActivityTimes[i].textContent =
        data[i]?.timeframes?.[btn.textContent.toLowerCase()]?.previous + "hrs";
    }
  });
});
