const TITLE = "TimeAgoDisplay"

console.log(`[${TITLE}] Hello World!`);

function calculateTimeDifference() {
  const dateInput = document.getElementById("dateInput").value;
  const selectedDate = new Date(dateInput);
  console.log(`[${TITLE}] selectedDate`, selectedDate);

  const currentDate = new Date();
  console.log(`[${TITLE}] currentDate`, currentDate);

  const timeDifference = currentDate - selectedDate;
  console.log(`[${TITLE}] timeDifference`, timeDifference);

  const seconds = Math.floor(timeDifference / 1000);
  console.log(`[${TITLE}] seconds`, seconds);

  const minutes = Math.floor(seconds / 60);
  console.log(`[${TITLE}] minutes`, minutes);

  const hours = Math.floor(minutes / 60);
  console.log(`[${TITLE}] hours`, hours);

  const days = Math.floor(hours / 24);
  console.log(`[${TITLE}] days`, days);

  const weeks = Math.floor(days / 7);
  console.log(`[${TITLE}] weeks`, weeks);

  const years = Math.floor(weeks / 52);
  console.log(`[${TITLE}] years`, years);

  const remainingWeeks = weeks % 52;
  console.log(`[${TITLE}] remainingWeeks`, remainingWeeks);

  const remainingDays = days % 7;
  console.log(`[${TITLE}] remainingDays`, remainingDays);

  const remainingHours = hours % 24;
  console.log(`[${TITLE}] remainingHours`, remainingHours);

  const remainingMinutes = minutes % 60;
  console.log(`[${TITLE}] remainingMinutes`, remainingMinutes);

  const remainingSeconds = seconds % 60;
  console.log(`[${TITLE}] remainingSeconds`, remainingSeconds);

  const resultString = `${years}y ${remainingWeeks}w ${remainingDays}d ${remainingHours}h ${remainingMinutes}min ${remainingSeconds}s`;
  console.log(`[${TITLE}] resultString`, resultString);

  document.getElementById("output").textContent = resultString;
}
