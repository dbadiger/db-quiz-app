const questions = [
  {
    question: "What is the Cultural Capital of Karnataka?",
    answers: [
      { text: "Bengaluru", correct: false },
      { text: "Dharawad", correct: false },
      { text: "Mysuru", correct: true },
      { text: "Belagavi", correct: false },
    ],
  },
  {
    question: "Who is The Current Prime Minister of Bharat?",
    answers: [
      { text: "Narendra Modi", correct: true },
      { text: "Indira Gandi", correct: false },
      { text: "Manmohan Singh", correct: false },
      { text: "Amit Shaha", correct: false },
    ],
  },
  {
    question: "What is the Capital of Karnataka?",
    answers: [
      { text: "Bengaluru", correct: true },
      { text: "Dharawad", correct: false },
      { text: "Mysuru", correct: false },
      { text: "Belagavi", correct: false },
    ],
  },
  {
    question: "In Which DIstrict Jog Falls Located?",
    answers: [
      { text: "Dharawad", correct: false },
      { text: "Shivamogga", correct: true },
      { text: "Mysuru", correct: false },
      { text: "Belagavi", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nxtBtn = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nxtBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nxtBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nxtBtn.style.display = "block";
}

nxtBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
  nxtBtn.innerHTML = "Play Again";
  nxtBtn.style.display = "block";
}
startQuiz();
