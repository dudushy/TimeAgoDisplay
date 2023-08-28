const TITLE = "TimeDisplay";
const clockArray = [];

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

  const timeDifference = selectedDate - currentDate;
  console.log(`[${TITLE}#calculateTimeDifference] timeDifference`, timeDifference);

  const seconds = Math.abs(Math.floor(timeDifference / 1000));
  console.log(`[${TITLE}#calculateTimeDifference] seconds`, seconds);

  const minutes = Math.floor(seconds / 60);
  console.log(`[${TITLE}#calculateTimeDifference] minutes`, minutes);

  const hours = Math.floor(minutes / 60);
  console.log(`[${TITLE}#calculateTimeDifference] hours`, hours);

  const days = Math.floor(hours / 24);
  console.log(`[${TITLE}#calculateTimeDifference] days`, days);

  const weeks = Math.floor(days / 7);
  console.log(`[${TITLE}#calculateTimeDifference] weeks`, weeks);

  const years = Math.floor(weeks / 52);
  console.log(`[${TITLE}#calculateTimeDifference] years`, years);

  const remainingWeeks = weeks % 52;
  console.log(`[${TITLE}#calculateTimeDifference] remainingWeeks`, remainingWeeks);

  const remainingDays = days % 7;
  console.log(`[${TITLE}#calculateTimeDifference] remainingDays`, remainingDays);

  const remainingHours = hours % 24;
  console.log(`[${TITLE}#calculateTimeDifference] remainingHours`, remainingHours);

  const remainingMinutes = minutes % 60;
  console.log(`[${TITLE}#calculateTimeDifference] remainingMinutes`, remainingMinutes);

  const remainingSeconds = seconds % 60;
  console.log(`[${TITLE}#calculateTimeDifference] remainingSeconds`, remainingSeconds);

  let resultTime = `${years}y ${remainingWeeks}w ${remainingDays}d ${remainingHours}h ${remainingMinutes}min ${remainingSeconds}s`;
  console.log(`[${TITLE}#calculateTimeDifference] (BEFORE) resultTime`, resultTime);

  if (timeDifference <= 0) resultTime += " ago";
  console.log(`[${TITLE}#calculateTimeDifference] (AFTER) resultTime`, resultTime);

  if (sample) document.getElementById("output").textContent = resultTime;
  else return resultTime;
}

function addClock() {
  if (!document.getElementById("sampleDateInput").value) {
    alert("Please enter a date");
    return;
  }

  console.log(`[${TITLE}#addClock] clockArray`, clockArray);

  // clockInput.setAttribute("onchange", "calculateTimeDifference(this.value)");
  // clockArray.push(clock);

  const clock = document.createElement("p");
  setInterval(test, 1000, clock, "a")
  document.getElementById("clocks").appendChild(clock);
}

function test(clock, char) {
  console.log(`[${TITLE}#test] (${char}) clock`, clock);

  clock.innerText += char;
}
