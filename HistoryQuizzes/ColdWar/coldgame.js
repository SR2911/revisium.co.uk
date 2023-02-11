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
        question: 'When did the Cold War start',
        choice1: '1945',
        choice2: '1946',
        choice3: '1941',
        choice4: '1985',
        answer: 1,
    },
    {
        question: 'What two cities got affected by USA atomic bombs?',
        choice1: 'Kyoto and Nagoya',
        choice2: 'Matsue and Tottori',
        choice3: 'Okayama and Fukuyama',
        choice4: 'Hiroshima and Nagasaki',
        answer: 4,
    },
    {
        question: 'What does NATO stand for?',
        choice1: 'North American Transatlantic Organisation',
        choice2: 'North Atlantic Treaty Organisation',
        choice3: 'National Administrative Treaty Organisation',
        choice4: 'North Asian Treaty Organisation',
        answer: 2,
    },
    {
        question: 'Which leader wanted to use nuclear weapons in the Korean  War?',
        choice1: 'Mao Zedong',
        choice2: 'Joseph Stalin',
        choice3: 'General  MacArthur',
        choice4: 'President  Truman',
        answer: 3,
    },
    {
        question: 'Which country launched the first successful telecommunications satellite in 1957?',
        choice1: 'USSR',
        choice2: 'China',
        choice3: 'USA',
        choice4: 'Britain',
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

        return window.location.assign('/HistoryQuizzes/ColdWar/coldend.html')
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