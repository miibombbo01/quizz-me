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
let userAnswers = [];

const correctSound = new Audio("mixkit-correct-answer-tone-2870.wav");

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

    questionNumber.textContent = currentQuestion + 1;

    progressBar.style.width =
((currentQuestion) / questions.length) * 100 + "%";

startTimer();

    questionEl.classList.remove("question-animate");

void questionEl.offsetWidth;

questionEl.textContent = q.question;

questionEl.classList.add("question-animate");
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

    clearInterval(timer);

    userAnswers[currentQuestion] = index;
    
    const buttons=document.querySelectorAll(".answer-btn");

    buttons.forEach(btn=>btn.disabled=true);

    if(index===questions[currentQuestion].correct){

    button.classList.add("correct");

correctSound.currentTime = 0;
correctSound.play();

confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
});

score++;

}else{

    button.classList.add("wrong");

    // Getar HP
    if(navigator.vibrate){
        navigator.vibrate(300);
    }

    buttons[questions[currentQuestion].correct].classList.add("correct");

    }

    setTimeout(() => {

    nextQuestion();

},1500);

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion<questions.length){

        loadQuestion();

    }else{

        showResult();

    }

}

nextBtn.onclick = nextQuestion;

function startTimer(){

    clearInterval(timer);

    timeLeft = 15;
    timerEl.textContent = timeLeft;

    timer = setInterval(()=>{

        timeLeft--;

        timerEl.textContent = timeLeft;

        if(timeLeft<=0){

    clearInterval(timer);

    userAnswers[currentQuestion] = -1;

    nextQuestion();

}

    },1000);

}

function showResult(){

    progressBar.style.width = "100%";

    let percent = Math.round((score / questions.length) * 100);

    let badge = "";
let message = "";

if(percent == 100){

    badge = "🥇 Budayawan HSS";
    message = "Luar biasa! Kamu mengenal budaya HSS dengan sangat baik.";

}else if(percent >= 80){

    badge = "🥈 Penjelajah Budaya";
    message = "Hebat! Sedikit lagi menjadi Budayawan HSS.";

}else{

    badge = "🥉 Masih Belajar";
    message = "Terus semangat! Budaya HSS masih menunggumu untuk dijelajahi.";

}

    questionEl.innerHTML = `
<h2>🎉 Petualangan Selesai!</h2>

<h1 style="font-size:60px;margin:20px 0;">
${percent}%
</h1>

<h3>${score} dari ${questions.length} jawaban benar</h3>

<h2 style="margin-top:30px;color:#2ecc71;">
${badge}
</h2>

<p style="margin-top:15px;font-size:18px;line-height:1.6;">
${message}
</p>
`;
    answersEl.innerHTML = "";

questions.forEach((q, index) => {

    const review = document.createElement("div");

    review.style.marginTop = "20px";
    review.style.padding = "15px";
    review.style.borderRadius = "12px";
    review.style.background = "#f8f8f8";

    let userAnswer =
        userAnswers[index] == -1
        ? "⏰ Tidak Dijawab"
        : q.answers[userAnswers[index]];

    let correctAnswer = q.answers[q.correct];

    if(userAnswers[index] == q.correct){

        review.innerHTML = `
        <h3>✅ Soal ${index+1}</h3>
        <p><b>Jawabanmu:</b> ${userAnswer}</p>
        `;

    }else{

        review.innerHTML = `
        <h3>❌ Soal ${index+1}</h3>
        <p><b>Jawabanmu:</b> ${userAnswer}</p>
        <p style="color:green;"><b>Jawaban Benar:</b> ${correctAnswer}</p>
        `;

    }

    answersEl.appendChild(review);

});

nextBtn.style.display = "none";

}
