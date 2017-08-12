const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// Captures minutes, seconds, hundredths, and thousandths of seconds independantly of eachother
var timer = [0,0,0,0];

// Add leading zero to numbers 9 or below (purely for aesthetics):
// This is a helper function:
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;
  // Define minutes: timer[3] is the thousandths of seconds
  timer[0] = Math.floor((timer[3]/100)/60);
  // Define seconds so everytime the timer reaches 60, it'll reset to 0
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  // Define hundredths of seconds: (timer[3] - (timer[1] * 100) resets every 100 100th of a seconds
  // (timer[0] * 6000) every time minutes reaches 100 so we don't start counting from there.
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  // Substring is a method that treats strings as arrays
  // It lets you specify which part of the string you want to treat as a Substring
  // Two arguments: where you want to start and how long you want the string to be
  let originTextMatch = originText.substring(0, textEntered.length)
  if (textEntered == originText) {
    testWrapper.style.borderColor = "#429890";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCf3";
    } else {
      testWrapper.style.borderColor = "#E95D0F";
    }
  }
}
// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0) {
    setInterval(runTimer, 10);
  }
  console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    console.log("reset button has been pressed!");
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
