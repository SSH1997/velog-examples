const capture = document.getElementById("capture");
const stop = document.getElementById("stop");

const div = [];

div.push(document.getElementById("start"));
div.push(document.getElementById("progress"));
div.push(document.getElementById("end"));

const phase = document.getElementById("phase");

const getPhase = (phase) => {
  switch (phase) {
    case 1:
      return "Capture Phase";
    case 2:
      return "Target Phase";
    case 3:
      return "Bubbling Phase";
  }
};

document.addEventListener("mouseup", () => {
  div.forEach((element) => {
    element.style.backgroundColor = null;
  });
  phase.innerText = "";
});

const callback = (event) => {
  if (stop.checked) {
    event.stopPropagation();
  }
  event.target.style.backgroundColor = "red";
  switch (event.currentTarget.id) {
    case "start":
      phase.innerText += `Start Div : ${getPhase(event.eventPhase)}\n`;
      break;
    case "progress":
      phase.innerText += `Progress Div : ${getPhase(event.eventPhase)}\n`;
      break;
    case "end":
      phase.innerText += `End Div : ${getPhase(event.eventPhase)}\n`;
      break;
  }
};

div.forEach((element) => {
  element.addEventListener("click", callback, capture.checked);
});

capture.addEventListener("change", () => {
  div.forEach((element) => {
    element.removeEventListener("click", callback, !capture.checked);
  });

  div.forEach((element) => {
    element.addEventListener("click", callback, capture.checked);
  });
});
