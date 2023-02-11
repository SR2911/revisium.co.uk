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
        question: 'Which one of these cities is situated on a major river?',
        choice1: 'Cardiff',
        choice2: 'Colchester',
        choice3: 'Manchester',
        choice4: 'London',
        answer: 4,
    },
    {
        question: 'What is erosion?',
        choice1: 'Wearing away and removal of material by a moving force such as a wave',
        choice2: 'Breakdown of material',
        choice3: 'Build up of sand and water',
        choice4: 'When sand is moving in the water',
        answer: 1,
    },
    {
        question: 'Which one of these is a type of erosion?',
        choice1: 'Hydrolysis',
        choice2: 'Saltation',
        choice3: 'Abrasion',
        choice4: 'Friction',
        answer: 3,
    },
    {
        question: 'What is Hard Engineering?',
        choice1: 'Difficult effort put into engineering',
        choice2: 'Building man-made structures to control the flow of rivers and reduce flooding',
        choice3: 'Where the products made in hard engineering do not break',
        choice4: 'The use of hard water and engineering',
        answer: 2,
    },
    {
        question: 'Name the type of transportation when glaciers push loose material ahead of them?',
        choice1: 'Big Push',
        choice2: 'Pushing',
        choice3: 'Extending',
        choice4: 'Bulldozing',
        answer: 4,
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

        return window.location.assign('/GeoQuizzes/Landscapes/landend.html')
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