const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who is the oldest living president?',
    answers: [
      { text: 'Jimmy Carter', correct: true },
      { text: 'Abe Lincoln', correct: false },
      { text: 'Franklin D. Roosevelt', correct: false },
      { text: 'Thomas Jefferson', correct: false }
    ]
  },
  {
    question: 'Which President was unanimously elected from 1732- 1799?',
    answers: [
      { text: 'Grover Cleveland', correct: false },
      { text: 'George Washington', correct: true },
      { text: 'Andrew Johnson', correct: false },
      { text: 'Thomas Jefferson', correct: false }
    ]
  },
  {
    question: 'Who was the only President to serve in both WWI and WWII?',
    answers: [
      { text: 'Martin Van Buren', correct: false },
      { text: 'John F. Kennedy', correct: false },
      { text: 'Dwight David Einsenhower', correct: true },
      { text: 'Franklin Pierce', correct: false }
    ]
  },
  {
    question: ' Who was the only President to resign?',
    answers: [
      { text: 'James Madison', correct: false },
      { text: 'James Monroe', correct: false },
      { text: 'Bill Clinton', correct: false },
      { text: 'Richard Nixon', correct: true }
    ]
  },
  {
    question: 'Who was the only President in US history to hold the job of a hangman?',
    answers: [
      { text: 'Glover Cleveland', correct: true },
      { text: 'James Monroe', correct: false },
      { text: 'Bill Clinton', correct: false },
      { text: 'Richard Nixon', correct: false }
    ]
  }
]
