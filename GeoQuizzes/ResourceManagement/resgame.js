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
        question: 'What are food miles?',
        choice1: 'How far food is transported from where it is grown to where it is sold',
        choice2: 'How many miles you can travel after you have eaten food',
        choice3: 'How far food waste travels',
        choice4: 'How many miles a food can travel once you have thrown it',
        answer: 1,
    },
    {
        question: 'What is a water deficit?',
        choice1: 'When it is so dry that there is no water available',
        choice2: 'When there is no water',
        choice3: 'When there is a long period of time without water',
        choice4: 'When the demand for water is greater than the supply',
        answer: 4,
    },
    {
        question: 'What does energy security mean?',
        choice1: 'Changing your passwords for you energy bill account each month',
        choice2: 'Protection over your energy',
        choice3: 'Having a reliable, uninterrupted and affordable supply of energy',
        choice4: 'When you have guards outside your house looking after your generator',
        answer: 3,
    },
    {
        question: 'What is water security?',
        choice1: 'Having a security lock on all taps in your house',
        choice2: 'Having a sustainable source of enough good quality water to meet all needs',
        choice3: 'Having a certain limit on the water usage',
        choice4: 'Changing the type of water that enters your house each month',
        answer: 2,
    },
    {
        question: 'What effect is population growth having on global food consumption?',
        choice1: 'It varies',
        choice2: 'No effect',
        choice3: 'It is increasing',
        choice4: 'It is decreasing',
        answer: 3,
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

        return window.location.assign('/GeoQuizzes/ResourceManagement/resend.html')
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