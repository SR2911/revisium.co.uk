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
        question: 'When did WW1 start?',
        choice1: '1914',
        choice2: '1918',
        choice3: '1926',
        choice4: '1945',
        answer: 2,
    },
    {
        question: 'Who got assassinated before the start of WW1?',
        choice1: 'Hans Frank',
        choice2: 'Joseph Dietrich',
        choice3: 'Archduke Franz Ferdinand',
        choice4: 'Joseph Stalin',
        answer: 3,
    },
    {
        question: 'Which countries form the Triple Entente',
        choice1: 'Britain, France, USA',
        choice2: 'Britain, France, Germany',
        choice3: 'Germany, Italy, Austria',
        choice4: 'Britain, France, Russia',
        answer: 4,
    },
    {
        question: 'What battle occurred in 1916',
        choice1: 'The War at Sea',
        choice2: 'Verdun',
        choice3: 'The Somme',
        choice4: 'Passchendaele',
        answer: 3,
    },
    {
        question: 'Which country was the first to design tanks',
        choice1: 'Britain',
        choice2: 'Germany',
        choice3: 'Italy',
        choice4: 'France',
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

        return window.location.assign('/HistoryQuizzes/WW1/world1end.html')
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