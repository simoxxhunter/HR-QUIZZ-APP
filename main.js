

const question = document.querySelector('.quiz-area h2');
const answers = document.querySelectorAll('.answer input[type="radio"]');
const submitButton = document.querySelector('.submit-button');
const countdown = document.querySelector('.countdown');
const resultsDiv = document.querySelector('.results');
const questionCountSpan = document.querySelector('.count span');
const categoryType = document.querySelector(".category");

 
    const quizData = [
        {
            question: "Combien de côtés ont un pentagone ?",
            answers: [
                "4",
                "5", // Correct answer
                "6",
                "7"
            ],
            correctAnswerIndex: 2 
        },
        {
            question: "Quel est le résultat de l'opération : 8 + (3 * 2) - 4 ?",
            answers: [
                "10", 
                "12",
                "14",// Correct answer
                "16"
            ],
            correctAnswerIndex: 3
        },
        {
            question: "Si un quart d'heure est égal à 15 minutes, combien de minutes y a-t-il dans trois quarts d'heure ?",
            answers: [
                "30",
                "35",
                "45", // Correct answer
                "60"
            ],
            correctAnswerIndex: 3 
        },

        {
            question: "Quel est le nombre suivant dans cette séquence : 3, 6, 9, 12,?",
            answers: [
                "14",
                "15", // Correct answer
                "16",
                "18"
            ],
            correctAnswerIndex: 2 
        },
        {
            question: "What is the correct order of the words in this sentence: Yesterday, visited, I, museum, the?",
            answers: [
                "Yesterday I visited the museum.", // Correct answer
                " I yesterday visited the museum.",
                " Visited I the museum yesterday.",
                "The museum visited I yesterday."
            ],
            correctAnswerIndex: 1 
        },
        {
            question: "Which of the following words is spelled correctly?",
            answers: [
                "Occurence",
                "Occurrence",// Correct answer
                "Occurance", 
                "Ocurrance"
            ],
            correctAnswerIndex: 2
        },

        {
            question: "Identify the correct form of the verb to fill in the blank: The students _____ already their homework before the teacher assigned more.",
            answers: [
                "had finished", // Correct answer
                "has finished", 
                "have finish",
                "have finished"
            ],
            correctAnswerIndex: 1
        },
        {
            question: "Choose the sentence with the correct use of the semicolon:",
            answers: [
                "She went to the store, but she forgot her wallet.", 
                "The movie was long; it ended after midnight.",
                "They played soccer, they won the game.",
                "He cooked dinner; then he cleaned the kitchen."// Correct answer
                
            ],
            correctAnswerIndex: 4
        },
        {
            question: "Parmi les algorithmes de tri suivants, lequel a la meilleure complexité temporelle dans le pire des cas ?",
            answers: [
                "Tri à bulles (Bubble sort)",
                "Tri rapide (Quick sort)",
                "Tri par insertion (Insertion sort)", 
                "Tri fusion (Merge sort)" // Correct answer
            ],
            correctAnswerIndex: 4
        },

        {
            question: "Que signifie l'acronyme HTML dans le développement web ?",
            answers: [
                " Hyper Text Markup Language", // Correct answer
                " High Tech Markup Language", 
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language"
            ],
            correctAnswerIndex: 1
        },
        {
            question: "En programmation orientée objet, qu'est-ce que l'encapsulation ?",
            answers: [
                "Le processus de diviser un programme en de plus petits sous-programmes", 
                "Le processus de cacher les détails d'implémentation internes d'un objet et de n'exposer que les fonctionnalités nécessaires",// Correct answer
                "Le processus d'organisation des données dans une structure hiérarchique",
                "Le processus de conversion du code source en code machine"
            ],
            correctAnswerIndex: 2
        },
        {
            question: "Qu'est-ce que le protocole HTTP signifie dans le contexte des communications web ?",
            answers: [
                "Hypertext Transfer Protocol", // Correct answer
                "Hyper Text Markup Protocol",
                "High Transmission Markup Protocol",
                "Hyperlink Text Transfer Protocol"
            ],
            correctAnswerIndex: 1
        },

        {
            question: "Quelle est la principale différence entre TCP (Transmission Control Protocol) et UDP (User Datagram Protocol) ?",
            answers: [
                
                "UDP est plus rapide que TCP dans toutes les situations",
                "TCP est utilisé uniquement pour les communications en temps réel",
                "UDP est plus sécurisé que TCP",
                "TCP garantit la livraison des données et l'ordre de réception, tandis que UDP ne le fait pas", // Correct answer
            ],
            correctAnswerIndex: 4
        },
        
        {
            question: "Quelle est la différence entre les langages de programmation interprétés et compilés ?",
            answers: [
                "Les langages compilés nécessitent un interpréteur pour être exécutés",
                "Il n'y a pas de différence entre les deux types de langages de programmation",
                "Les langages interprétés sont traduits ligne par ligne lors de l'exécution, tandis que les langages compilés sont traduits entièrement avant l'exécution", // Correct answer
                "Les langages interprétés produisent un code exécutable plus rapide que les langages compilés"
            ],
            correctAnswerIndex: 3
        },
        {
            question: "Qu'est-ce qu'un algorithme de recherche linéaire ?",
            answers: [
                "Un algorithme qui parcourt séquentiellement chaque élément d'une liste pour trouver une valeur donnée", // Correct answer
                "Un algorithme qui divise récursivement une liste en deux moitiés jusqu'à trouver la valeur donnée",
                "Un algorithme qui trie une liste dans un ordre spécifique avant de rechercher une valeur donnée",
                "Un algorithme qui utilise des techniques de compression pour rechercher une valeur donnée dans une liste"
            ],
            correctAnswerIndex: 1
        },
        
        {
            question: "Qu'est-ce qu'un fichier CSV ?",
            answers: [
                "Un fichier de texte utilisé pour stocker des données tabulaires sous forme de valeurs séparées par des virgules", // Correct answer
                "Un fichier compressé utilisé pour stocker des images et des vidéos",
                "Un fichier binaire utilisé pour stocker des données structurées dans une base de données",
                "Un fichier exécutable utilisé pour installer des applications sur un système d'exploitation"
            ],
            correctAnswerIndex: 1
        },
        
        
    ];

    
    let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = quizData.length;
const initialTime = 15 * 60; // 15 minutes in seconds
let timeRemaining = initialTime;
let timerInterval;

// Function to display question
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    question.textContent = currentQuestion.question;
    answers.forEach((answer, index) => {
        answer.nextElementSibling.textContent = currentQuestion.answers[index];
        answer.checked = false;
    });

    questionCountSpan.textContent = `${currentQuestionIndex + 1}/${totalQuestions}`;
    updateProgressBar();

    if (currentQuestionIndex <= 3) {
        categoryType.textContent = "Test de IQ";
    }  else if (currentQuestionIndex <= 7) {
        categoryType.textContent = "Test d'anglais"; 
    }  else {
        categoryType.textContent = "Test technique "; 
    }
}

// Function to check answer
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="questions"]:checked');
    if (!selectedAnswer) return; // No answer selected

    const selectedIndex = parseInt(selectedAnswer.id.slice(-1)); // Get index from answer id
    if (selectedIndex === quizData[currentQuestionIndex].correctAnswerIndex) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Function to update progress bar
function updateProgressBar() {
    const progress = (currentQuestionIndex + 1) / totalQuestions * 100; // Calculate progress percentage
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progress}%`; 
    progressBar.setAttribute('aria-valuenow', progress); // Update ARIA value
}

// Function to end quiz
function endQuiz() {
    clearInterval(timerInterval);
    resultsDiv.textContent = `Votre score: ${score}/${totalQuestions}`;
    updateProgressBar();
}

// Function to update countdown timer
function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    countdown.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeRemaining === 0) {
        endQuiz();
    }
    timeRemaining--;
}

// Function to initialize the quiz
function initializeQuiz() {
    displayQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

// Call initializeQuiz to start the quiz
initializeQuiz();

// Event listener for submit button
submitButton.addEventListener('click', function() {
    checkAnswer();
});
