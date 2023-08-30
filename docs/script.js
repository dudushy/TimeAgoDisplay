const TITLE = "TimeDisplay";
const clockArray = localStorage.getItem("clockArray") ? JSON.parse(localStorage.getItem("clockArray")) : [];
console.log(`[${TITLE}] clockArray`, clockArray);

setupDateTime("Base");
setupDateTime("Target");

loadClocks();

setInterval(updateClocks, 1000);

function calculateTimeDifference(baseDateInput, baseTimeInput, targetDateInput, targetTimeInput, baseCurrentDateTime = false, targetCurrentDateTime = false, sample = false) {
  console.log(`[${TITLE}#calculateTimeDifference] baseDateInput`, baseDateInput);
  console.log(`[${TITLE}#calculateTimeDifference] baseTimeInput`, baseTimeInput);
  console.log(`[${TITLE}#calculateTimeDifference] baseCurrentDateTime`, baseCurrentDateTime);

  console.log(`[${TITLE}#calculateTimeDifference] targetDateInput`, targetDateInput);
  console.log(`[${TITLE}#calculateTimeDifference] targetTimeInput`, targetTimeInput);
  console.log(`[${TITLE}#calculateTimeDifference] targetCurrentDateTime`, targetCurrentDateTime);

  if (sample) {
    baseDateInput = document.getElementById("sampleBaseDateInput").value || baseCurrentDateTime;
    console.log(`[${TITLE}#calculateTimeDifference] (sample) baseDateInput`, baseDateInput);

    baseTimeInput = document.getElementById("sampleBaseTimeInput").value || baseCurrentDateTime;
    console.log(`[${TITLE}#calculateTimeDifference] (sample) baseTimeInput`, baseTimeInput);

    targetDateInput = document.getElementById("sampleTargetDateInput").value || targetCurrentDateTime;
    console.log(`[${TITLE}#calculateTimeDifference] (sample) targetDateInput`, targetDateInput);

    targetTimeInput = document.getElementById("sampleTargetTimeInput").value || targetCurrentDateTime;
    console.log(`[${TITLE}#calculateTimeDifference] (sample) targetTimeInput`, targetTimeInput);
  }

  if (!baseDateInput || !baseTimeInput || !targetDateInput || !targetTimeInput) return null;

  const baseDateTime = baseCurrentDateTime ? new Date() : new Date(`${baseDateInput}T${baseTimeInput}:00`);
  console.log(`[${TITLE}#calculateTimeDifference] baseDateTime`, baseDateTime);

  const targetDateTime = targetCurrentDateTime ? new Date() : new Date(`${targetDateInput}T${targetTimeInput}:00`);
  console.log(`[${TITLE}#calculateTimeDifference] targetDateTime`, targetDateTime);

  const timeDiff = Math.abs(targetDateTime - baseDateTime) / 1000;
  console.log(`[${TITLE}#calculateTimeDifference] timeDiff`, timeDiff);

  const fullDays = Math.floor(timeDiff / (24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] fullDays`, fullDays);

  const years = Math.floor(timeDiff / (365 * 24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] years`, years);

  const months = Math.floor((timeDiff % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] months`, months);

  const weeks = Math.floor((timeDiff % (30 * 24 * 60 * 60)) / (7 * 24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] weeks`, weeks);

  const days = Math.floor((timeDiff % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] days`, days);

  const hours = Math.floor((timeDiff % (24 * 60 * 60)) / (60 * 60));
  console.log(`[${TITLE}#calculateTimeDifference] hours`, hours);

  const minutes = Math.floor((timeDiff % (60 * 60)) / 60);
  console.log(`[${TITLE}#calculateTimeDifference] minutes`, minutes);

  const seconds = Math.floor(timeDiff % 60);
  console.log(`[${TITLE}#calculateTimeDifference] seconds`, seconds);

  let resultTime = `${years}y ${months}mo ${weeks}w ${days}d ${hours}h ${minutes}min ${seconds}s`;
  console.log(`[${TITLE}#calculateTimeDifference] (BEFORE) resultTime`, resultTime);

  if (targetDateTime <= baseDateTime) resultTime += " ago";
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
    console.log(`[${TITLE}#loadClocks] clock`, clock);

    const clockElement = document.createElement("p");
    clockElement.setAttribute("id", `clock-${clock.id}`);
    // setInterval(updateClock, 1000, clockElement, clock.baseDate, clock.baseTime, clock.targetDate, clock.targetTime, clock.baseCurrentDateTime, clock.targetCurrentDateTime)
    document.getElementById("clocks").appendChild(clockElement);
  });
}

async function addClock() {
  const clockNameInput = document.getElementById("clockNameInput").value;
  console.log(`[${TITLE}#addClock] clockNameInput`, clockNameInput);

  const clockIconInput = document.getElementById("clockIconInput");
  console.log(`[${TITLE}#addClock] clockIconInput`, clockIconInput);

  const baseDateInput = document.getElementById("sampleBaseDateInput").value;
  console.log(`[${TITLE}#addClock] baseDateInput`, baseDateInput);

  const baseTimeInput = document.getElementById("sampleBaseTimeInput").value;
  console.log(`[${TITLE}#addClock] baseTimeInput`, baseTimeInput);

  const targetDateInput = document.getElementById("sampleTargetDateInput").value;
  console.log(`[${TITLE}#addClock] targetDateInput`, targetDateInput);

  const targetTimeInput = document.getElementById("sampleTargetTimeInput").value;
  console.log(`[${TITLE}#addClock] targetTimeInput`, targetTimeInput);

  const baseCurrentDateTime = document.getElementById("sampleBaseCurrentDateTime").checked;
  console.log(`[${TITLE}#addClock] baseCurrentDateTime`, baseCurrentDateTime);

  const targetCurrentDateTime = document.getElementById("sampleTargetCurrentDateTime").checked;
  console.log(`[${TITLE}#addClock] targetCurrentDateTime`, targetCurrentDateTime);

  if (!clockNameInput || !baseDateInput || !baseTimeInput || !targetDateInput || !targetTimeInput) {
    alert("Please complete all fields.");
    return;
  }

  console.log(`[${TITLE}#addClock] (BEFORE) clockArray`, clockArray);

  const clockElement = document.createElement("p");
  clockElement.setAttribute("id", `clock-${clockArray.length}`);
  // const clockIntervalId = setInterval(updateClock, 1000, clockElement, baseDateInput, baseTimeInput, targetDateInput, targetTimeInput, baseCurrentDateTime, targetCurrentDateTime)
  document.getElementById("clocks").appendChild(clockElement);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        // reject(error);
        reject("");
      };
    });
  };

  const iconBase64 = clockIconInput.files.length > 0 ? await convertBase64(clockIconInput.files[0]) : "";
  console.log(`[${TITLE}#addClock] iconBase64`, iconBase64);

  clockArray.push({
    name: clockNameInput,
    icon: iconBase64,
    baseDate: baseDateInput,
    baseTime: baseTimeInput,
    baseCurrentDateTime: baseCurrentDateTime,
    targetDate: targetDateInput,
    targetTime: targetTimeInput,
    targetCurrentDateTime: targetCurrentDateTime,
    id: clockArray.length,
    // intervalId: clockIntervalId,
  });

  console.log(`[${TITLE}#addClock] (AFTER) clockArray`, clockArray);
  localStorage.setItem("clockArray", JSON.stringify(clockArray));
}

function updateClock(clock, baseDateInput, baseTimeInput, targetDateInput, targetTimeInput, baseCurrentDateTime, targetCurrentDateTime) {
  console.log(`[${TITLE}#updateClock] (${targetDateInput}) clock`, clock);

  clock.innerText = calculateTimeDifference(baseDateInput, baseTimeInput, targetDateInput, targetTimeInput, baseCurrentDateTime, targetCurrentDateTime);
}

function updateClocks() {
  console.log(`[${TITLE}#updateClocks] clockArray`, clockArray);

  clockArray.forEach((clock) => {
    console.log(`[${TITLE}#updateClocks] (${clock.id}) clock`, clock);

    const clockElement = document.getElementById(`clock-${clock.id}`);
    console.log(`[${TITLE}#updateClocks] (${clock.id}) clockElement`, clockElement);

    // const clockIcon = document.createElement("img");
    // clockIcon.setAttribute("src", clock.icon);
    // clockElement.appendChild(clockIcon);

    // const clockName = document.createElement("span");
    // clockName.innerText = `${clock.name}`;
    // clockElement.appendChild(clockName);

    const clockDateTime = calculateTimeDifference(clock.baseDate, clock.baseTime, clock.targetDate, clock.targetTime, clock.baseCurrentDateTime, clock.targetCurrentDateTime);
    console.log(`[${TITLE}#updateClocks] (${clock.id}) clockDateTime`, clockDateTime);

    clockElement.innerText = `${clock.name}: [${clock.baseDate} ${clock.baseTime}] ${clockDateTime}`;
  });
}

function setupDateTime(type) {
  console.log(`[${TITLE}#setupDateTime] type`, type);

  const currentDateTime = new Date();
  console.log(`[${TITLE}#setupDateTime] currentDateTime`, currentDateTime);

  const dateInput = document.getElementById(`sample${type}DateInput`);
  console.log(`[${TITLE}#setupDateTime] (BEFORE) dateInput`, dateInput.value);

  dateInput.value = currentDateTime.toISOString().slice(0, 10);
  console.log(`[${TITLE}#setupDateTime] (AFTER) dateInput`, dateInput.value);

  const timeInput = document.getElementById(`sample${type}TimeInput`);
  console.log(`[${TITLE}#setupDateTime] (BEFORE) timeInput`, timeInput.value);

  timeInput.value = currentDateTime.toTimeString().slice(0, 5);
  console.log(`[${TITLE}#setupDateTime] (AFTER) timeInput`, timeInput.value);
}

function hideSampleInput(type, event) {
  console.log(`[${TITLE}#hideSampleInput] (${type})`, event);

  const sampleInputs = document.getElementsByClassName(`sample${type}Input`);
  console.log(`[${TITLE}#hideSampleInput] sampleInputs`, sampleInputs);

  for (let i = 0; i < sampleInputs.length; i++) {
    const sampleInput = sampleInputs[i];
    console.log(`[${TITLE}#hideSampleInput] sampleInput`, sampleInput);

    sampleInput.disabled = !sampleInput.disabled;
  }
}
