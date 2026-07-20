const questions = [
{
    question: "Perjalananmu dimulai di sebuah galeri budaya HSS. Di antara berbagai motif sasirangan, kamu menemukan satu motif yang terinspirasi dari ikan yang sangat dekat dengan kehidupan masyarakat Banjar. Motif apakah yang kamu temukan?",
    answers: [
        "Kambang Raja",
        "Gigi Haruan",
        "Kulat Kurikit",
        "Naga Balimbur"
    ],
    correct: 1
},
{
    question: "Setelah menjelajahi budaya, kini kamu menuju kawasan Pegunungan Meratus. Di tempat ini, pengunjung dapat menyusuri sungai menggunakan rakit bambu sambil menikmati keindahan alam. Di manakah kamu berada?",
    answers: [
        "Kandangan",
        "Daha Selatan",
        "Loksado",
        "Sungai Raya"
    ],
    correct: 2
},
{
    question: "Dalam perjalananmu, kamu menemukan sebuah bangunan tradisional yang menjadi identitas masyarakat Banjar. Rumah ini dikenal dengan arsitekturnya yang khas. Rumah adat tersebut adalah...",
    answers: [
        "Rumah Gadang",
        "Rumah Joglo",
        "Rumah Bubungan Tinggi",
        "Rumah Limas"
    ],
    correct: 2
},
{
    question: "Saat beristirahat di sebuah warung, kamu melihat masyarakat berkumpul sambil berbincang dan bertukar cerita. Tradisi ini dikenal dengan budaya...",
    answers: [
        "Bapantun",
        "Mawarung",
        "Baayun",
        "Batapung Tawar"
    ],
    correct: 1
},
{
    question: "Selamat! Kamu hampir menyelesaikan petualangan budaya HSS. Apa tujuan utama melestarikan budaya daerah?",
    answers: [
        "Supaya cepat dilupakan",
        "Sebagai identitas dan warisan generasi",
        "Hanya untuk wisatawan",
        "Agar terlihat modern"
    ],
    correct: 1
}
];

let currentQuestion = 0;
let score = 0;

let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");

const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");

loadQuestion();

function loadQuestion(){

    nextBtn.style.display = "none";

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach((answer,index)=>{

        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.className = "answer-btn";

        btn.onclick = ()=>selectAnswer(btn,index);

        answersEl.appendChild(btn);

    });

}

function selectAnswer(button,index){

    const buttons=document.querySelectorAll(".answer-btn");

    buttons.forEach(btn=>btn.disabled=true);

    if(index===questions[currentQuestion].correct){

        button.classList.add("correct");
        score++;

    }else{

        button.classList.add("wrong");

        buttons[questions[currentQuestion].correct].classList.add("correct");

    }

    nextBtn.style.display="block";

}

nextBtn.onclick=function(){

    currentQuestion++;

    if(currentQuestion<questions.length){

        loadQuestion();

    }else{

        showResult();

    }

}

function showResult(){

    questionEl.innerHTML=`🎉 Skor kamu <br><h2>${score}/${questions.length}</h2>`;

    answersEl.innerHTML="";

    nextBtn.style.display="none";

}
