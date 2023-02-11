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
        question: 'When did WW2 start',
        choice1: '1934',
        choice2: '1923',
        choice3: '1939',
        choice4: '1945',
        answer: 3,
    },
    {
        question: 'What country did Germany invade in 1939',
        choice1: 'Spain',
        choice2: 'France',
        choice3: 'Britain',
        choice4: 'Poland',
        answer: 4,
    },
    {
        question: 'What was the name of Britain\'s new bombing policy in May 1942 that targeted German cities?',
        choice1: 'Precision Bombing',
        choice2: 'Tactical Bombing',
        choice3: 'Area Bombing',
        choice4: 'Local Bombing',
        answer: 1,
    },
    {
        question: 'What was the name of the army officer who planted the bomb that almost killed Hitler in July 1944?',
        choice1: 'Field Marshal Rommel',
        choice2: 'Colonel Tresckow',
        choice3: 'Colonel Stauffenberg',
        choice4: 'Admiral Canaris',
        answer: 3,
    },
    {
        question: 'What was the name of the biggest Nazi death camp?',
        choice1: 'Treblinka',
        choice2: 'Auschwitz-Birkenau',
        choice3: 'Sobibor',
        choice4: 'Einsatzgruppen',
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

        return window.location.assign('/HistoryQuizzes/WW2/world2end.html')
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