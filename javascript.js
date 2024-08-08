var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var selectedOperation;

// get modal and buttons
var modal = document.getElementById("operationModal");
var startGameModal = document.getElementById("startGameModal");
var closeStartGameModal = document.getElementById("closeStartGameModal");
var operationButtons = document.getElementsByClassName("operation-btn");

// when we click on the start/reset
document.getElementById("startReset").onclick = function () {
  // if we are playing
  if (playing == true) {
    location.reload(); // reload page
  } else {
    // if we are not playing
    // display the modal
    modal.style.display = "block";

    // check which one we are playing
    for (var i = 0; i < operationButtons.length; i++) {
      operationButtons[i].onclick = function () {
        selectedOperation = this.getAttribute("data-operation");

        // hide the modal
        modal.style.display = "none";

        // change mode to playing
        playing = true;

        // set score to 0
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

        // show countdown box
        show("timeRemaining");
        timeremaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeremaining;

        // hide game over box
        hide("gameOver");

        // change button to reset
        document.getElementById("startReset").innerHTML = "Restart";

        // start countdown
        startCountdown();

        // generate a new Q&A
        generateQA();
      };
    }
  }
};

// Clicking on an answer box
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    // check if we are playing
    if (playing == true) {
      // yes
      if (this.innerHTML == correctAnswer) {
        // correct answer
        // increase score by 1
        score++;
        document.getElementById("scoreValue").innerHTML = score;
        // hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        // Generate new Q&A
        generateQA();
      } else {
        // wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    } else {
      // not playing
      startGameModal.style.display = "block";
    }
  };
}

// Close the start game modal
closeStartGameModal.onclick = function () {
  startGameModal.style.display = "none";
};

// start counter
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeRemainingValue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      // game over
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("time-remaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startReset").innerHTML = "Start Game";
    }
  }, 1000);
}

// stop counter
function stopCountdown() {
  clearInterval(action);
}

// hide an element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

// show an element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

// generate question and multiple answers
function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  var question;
  switch (selectedOperation) {
    case "add":
      correctAnswer = x + y;
      question = x + " + " + y;
      break;
    case "subtract":
      correctAnswer = x - y;
      question = x + " - " + y;
      break;
    case "multiply":
      correctAnswer = x * y;
      question = x + " x " + y;
      break;
    case "divide":
      correctAnswer = (x / y).toFixed(1);
      question = x + " / " + y;
      break;
  }
  document.getElementById("question").innerHTML = question;

  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill one box with the correct answer

  // fill other boxes with wrong answers
  var answers = [correctAnswer];
  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        switch (selectedOperation) {
          case "add":
            wrongAnswer =
              1 +
              Math.round(9 * Math.random()) +
              (1 + Math.round(9 * Math.random()));
            break;
          case "subtract":
            wrongAnswer =
              1 +
              Math.round(9 * Math.random()) -
              (1 + Math.round(9 * Math.random()));
            break;
          case "multiply":
            wrongAnswer =
              (1 + Math.round(9 * Math.random())) *
              (1 + Math.round(9 * Math.random()));
            break;
          case "divide":
            wrongAnswer = (
              (1 + Math.round(9 * Math.random())) /
              (1 + Math.round(9 * Math.random()))
            ).toFixed(1);
            break;
        }
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
