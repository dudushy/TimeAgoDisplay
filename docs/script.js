const TITLE = "TimeDisplay";
const clockArray = localStorage.getItem("clockArray") ? JSON.parse(localStorage.getItem("clockArray")) : [];
console.log(`[${TITLE}] clockArray`, clockArray);

loadClocks();

function calculateTimeDifference(dateInput, sample = false) {
  console.log(`[${TITLE}#calculateTimeDifference] dateInput`, dateInput);

  if (sample) {
    dateInput = document.getElementById("sampleDateInput").value;
    console.log(`[${TITLE}#calculateTimeDifference] (sample) dateInput`, dateInput);
  }

  if (!dateInput) return null;

  const selectedDate = new Date(`${dateInput}T00:00:00`);
  console.log(`[${TITLE}#calculateTimeDifference] selectedDate`, selectedDate);

  const currentDate = new Date();
  console.log(`[${TITLE}#calculateTimeDifference] currentDate`, currentDate);

  const timeDiff = Math.abs(selectedDate - currentDate) / 1000;
  console.log(`[${TITLE}#calculateTimeDifference] timeDiff`, timeDiff);

  const years = Math.floor(timeDiff / (365 * 24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] years`, years);

  const months = Math.floor((timeDiff % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] months`, months);

  const weeks = Math.floor((timeDiff % (30 * 24 * 60 * 60)) / (7 * 24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] weeks`, weeks);

  const days = Math.floor((timeDiff % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] days`, days);

  const fullDays = Math.floor(timeDiff / (24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] fullDays`, fullDays);

  const hours = Math.floor((timeDiff % (24 * 60 * 60)) / (60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] hours`, hours);

  const minutes = Math.floor((timeDiff % (60 * 60)) / 60);
  console.log(`[${TITLE}#calculateTimeDifference] minutes`, minutes);

  const seconds = Math.floor(timeDiff % 60);
  console.log(`[${TITLE}#calculateTimeDifference] seconds`, seconds);

  let resultTime = `${years}y ${months}mo ${weeks}w ${days}d ${hours}h ${minutes}min ${seconds}s`;
  console.log(`[${TITLE}#calculateTimeDifference] (BEFORE) resultTime`, resultTime);

  if (selectedDate <= currentDate) resultTime += " ago";
  console.log(`[${TITLE}#calculateTimeDifference] (AFTER) resultTime`, resultTime);

  if (sample) document.getElementById("output").textContent = resultTime;
  else return resultTime;
}

function clearClocks() {
  console.log(`[${TITLE}#clearClocks] (BEFORE) clockArray`, clockArray);

  clockArray.forEach((clock) => {
    clearInterval(clock.intervalId);
  });

  document.getElementById("clocks").innerHTML = "";

  clockArray.length = 0;
  localStorage.setItem("clockArray", JSON.stringify(clockArray));

  console.log(`[${TITLE}#clearClocks] (AFTER) clockArray`, clockArray);

  clearInterval();
}

function loadClocks() {
  console.log(`[${TITLE}#loadClocks] clockArray`, clockArray);

  clockArray.forEach((clock) => {
    const clockElement = document.createElement("p");
    clockElement.setAttribute("id", `clock-${clock.id}`);
    setInterval(updateClock, 1000, clockElement, clock.date)
    document.getElementById("clocks").appendChild(clockElement);
  });
}

function addClock() {
  const dateInput = document.getElementById("sampleDateInput").value;
  console.log(`[${TITLE}#addClock] dateInput`, dateInput);

  if (!dateInput) {
    alert("Please enter a date");
    return;
  }

  console.log(`[${TITLE}#addClock] (BEFORE) clockArray`, clockArray);

  // clockInput.setAttribute("onchange", "calculateTimeDifference(this.value)");

  const clockElement = document.createElement("p");
  clockElement.setAttribute("id", `clock-${clockArray.length}`);
  const clockIntervalId = setInterval(updateClock, 1000, clockElement, dateInput)
  document.getElementById("clocks").appendChild(clockElement);

  clockArray.push({
    date: dateInput,
    id: clockArray.length,
    intervalId: clockIntervalId,
  });

  console.log(`[${TITLE}#addClock] (AFTER) clockArray`, clockArray);
  localStorage.setItem("clockArray", JSON.stringify(clockArray));
}

function updateClock(clock, dateInput) {
  console.log(`[${TITLE}#updateClock] (${dateInput}) clock`, clock);

  clock.innerText = calculateTimeDifference(dateInput);
}
