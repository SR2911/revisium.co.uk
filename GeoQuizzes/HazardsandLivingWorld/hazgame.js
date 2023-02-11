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
        question: 'Country X is on a plate margin that has earthquakes but no volcanoes, what type of plate margin is Country X on?',
        choice1: 'Tectonic Margin',
        choice2: 'Conservative Margin',
        choice3: 'Destructive Margin',
        choice4: 'Constructive Margin',
        answer: 2,
    },
    {
        question: 'What is a drought?',
        choice1: 'A long period of time without precipitation',
        choice2: 'No rain',
        choice3: 'A period of time with excessive rainfall',
        choice4: 'Excessive snow',
        answer: 1,
    },
    {
        question: 'What is the greenhouse effect?',
        choice1: 'When the earth turns into a greenhouse effect',
        choice2: 'Building a greenhouse',
        choice3: 'Where the earth gets way too hot',
        choice4: 'Where greenhouse gases absorb outgoing heat',
        answer: 4,
    },
    {
        question: 'What is biodiversity?',
        choice1: 'An equal number of organisms',
        choice2: 'The spread of soil',
        choice3: 'The variety of organisms living in a particular area',
        choice4: 'The university for biology',
        answer: 3,
    },
    {
        question: 'Which one of these is a hot desert?',
        choice1: 'The Sahara',
        choice2: 'Antarctica',
        choice3: 'Hawaii',
        choice4: 'Spain',
        answer: 1,
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

        return window.location.assign('/GeoQuizzes/HazardsandLivingWorld/hazend.html')
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