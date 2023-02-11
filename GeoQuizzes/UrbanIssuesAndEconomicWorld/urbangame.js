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
        question: 'What is Urbanisation?',
        choice1: 'The change of a rural city becoming urban',
        choice2: 'People becoming more urban',
        choice3: 'The growth in the proportion of a country\'s population in urban areas',
        choice4: 'Rural areas becoming cities',
        answer: 3,
    },
    {
        question: 'What is the difference between brownfield sites and greenfield sites',
        choice1: 'Brownfield sites have been previously developed whereas greenfield sites haven\'t',
        choice2: 'Brownfield sites are brown greenfield sites are green',
        choice3: 'Brownfield sites are filled with waste, and greenfield sites are more sustainable',
        choice4: 'Brownfield sites are cities, greenfield sites are parks',
        answer: 1,
    },
    {
        question: 'What does GNI stand for?',
        choice1: 'German Number Index',
        choice2: 'Gang National Index',
        choice3: 'Growth National Index',
        choice4: 'Gross National Income',
        answer: 4,
    },
    {
        question: 'What does NEE stand for?',
        choice1: 'Newly Established Estate',
        choice2: 'Newly Emerging Economy',
        choice3: 'Newly Established Economy',
        choice4: 'Never Ending Economy',
        answer: 2,
    },
    {
        question: 'What is meant by sustainable living',
        choice1: 'Living in a way that means your building won\'t break down and can survive the worst hazards',
        choice2: 'Living healthy',
        choice3: 'Living in a way that lets people meet their needs now without reducing the ability of people to meet their needs in the future',
        choice4: 'Living efficiently',
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

        return window.location.assign('/GeoQuizzes/UrbanIssuesandEconomicWorld/urbanend.html')
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