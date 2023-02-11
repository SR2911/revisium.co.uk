const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Where did the Industrial Revolution begin',
        choice1: 'England',
        choice2: 'France',
        choice3: 'Ireland',
        choice4: 'Germany',
        answer: 1,
    },
    {
        question: 'During the 1800s people moved from rural areas to urban areas because of?',
        choice1: 'Better educational oppurtunities',
        choice2: 'Due to income rises',
        choice3: 'Availability of affordable public housing',
        choice4: 'An increasing number of factory jobs',
        answer: 4,
    },
    {
        question: 'What two natural resources were used the most during the Industrial Revolution?',
        choice1: 'Coal and Iron',
        choice2: 'Steel and Steam',
        choice3: 'Wood and Water',
        choice4: 'Magnesium and Aluminium',
        answer: 1,
    },
    {
        question: 'The steam engine helped power which of the following things?',
        choice1: 'Carriage',
        choice2: 'Motorcycle',
        choice3: 'The steamship',
        choice4: 'Model T',
        answer: 3,
    },
    {
        question: 'What did Eli Whitney invent',
        choice1: 'Spinning Jenny',
        choice2: 'Cotton Gin',
        choice3: 'Water Frame',
        choice4: 'Flying Shuttle',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/HistoryQuizzes/IndustrialRev/revend.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()


        },1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()