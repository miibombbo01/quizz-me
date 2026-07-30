const questions = [
{
    question: "Dalam perjalananmu ke sebuah rumah adat Banjar, pemandu menjelaskan bahwa nama rumah ini berasal dari bentuk atapnya yang menjulang tinggi. Rumah adat yang dimaksud adalah…",
    answers: [
        "Rumah Balai Bini",
        "Rumah Palimasan",
        "Rumah Bubungan Tinggi",
        "Rumah Gajah Baliku"
    ],
    correct: 2
},
{
    question: "Saat memasuki rumah tersebut, kamu mengetahui bahwa pada masa lalu tidak semua orang boleh memilikinya. Rumah Bubungan Tinggi dulunya merupakan tempat tinggal bagi…",
    answers: [
        "Pedagang di pasar",
        "Tokoh agama",
        "Sultan atau kalangan bangsawan Banjar",
        "Para nelayan"
    ],
    correct: 2
},
{
    question: "Ketika mengamati bentuk bangunannya, kamu melihat bagian atap yang sangat tinggi dan curam. Bentuk atap ini menjadi ciri khas Rumah Bubungan Tinggi karena…",
    answers: [
        "Memudahkan pemasangan hiasan",
        "Sebagai tempat menyimpan hasil panen",
        "Menjadi identitas utama arsitektur rumah adat Banjar",
        "Digunakan sebagai menara pengawas"
    ],
    correct: 2
},
{
    question: "Di dalam rumah, pemandu menjelaskan bahwa setiap ruangan memiliki fungsi yang berbeda sesuai adat Banjar. Bagian rumah yang biasanya digunakan untuk menerima tamu disebut…",
    answers: [
        "Panampik Kacil",
        "Palatar",
        "Panampik Basar",
        "Padapuran"
    ],
    correct: 2
},
{
    question: "Menjelang akhir kunjungan, kamu mengetahui bahwa Rumah Bubungan Tinggi bukan sekadar tempat tinggal, tetapi juga melambangkan kedudukan pemiliknya di masyarakat. Filosofi tersebut menunjukkan bahwa rumah ini merupakan simbol…",
    answers: [
        "Kehidupan nelayan",
        "Perdagangan antarpulau",
        "Martabat, kehormatan, dan status sosial",
        "Mata pencaharian bertani"
    ],
    correct: 2
}
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

let timeLeft = 15;
let timer = null;

const correctSound = new Audio("mixkit-correct-answer-tone-2870.wav");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");

const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");

loadQuestion();

function loadQuestion(){

    clearInterval(timer);

    nextBtn.style.display = "none";

    const q = questions[currentQuestion];

    questionNumber.textContent = currentQuestion + 1;

    progressBar.style.width =
        (currentQuestion / questions.length) * 100 + "%";

    questionEl.classList.remove("question-animate");
    void questionEl.offsetWidth;

    questionEl.textContent = q.question;
    questionEl.classList.add("question-animate");

    answersEl.innerHTML = "";

    q.answers.forEach((answer,index)=>{

        const btn = document.createElement("button");

        btn.className = "answer-btn";

        btn.textContent = answer;

        btn.onclick = ()=>selectAnswer(btn,index);

        answersEl.appendChild(btn);

    });

    startTimer();

}

function selectAnswer(button,index){

    clearInterval(timer);

    userAnswers[currentQuestion] = index;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn=>btn.disabled=true);

    if(index === questions[currentQuestion].correct){

        score++;

        button.classList.add("correct");

        correctSound.currentTime = 0;
        correctSound.play();

        confetti({
            particleCount:80,
            spread:70,
            origin:{y:0.6}
        });

    }else{

        button.classList.add("wrong");

        if(navigator.vibrate){
            navigator.vibrate(300);
        }

        buttons[
            questions[currentQuestion].correct
        ].classList.add("correct");

    }

    setTimeout(nextQuestion,1500);

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }else{

        showResult();

    }

}

function startTimer(){

    timeLeft = 15;

    timerEl.textContent = timeLeft;

    timer = setInterval(()=>{

        timeLeft--;

        timerEl.textContent = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            userAnswers[currentQuestion] = -1;

            nextQuestion();

        }

    },1000);

}

nextBtn.onclick = nextQuestion;

function showResult(){

    clearInterval(timer);

    progressBar.style.width = "100%";

    const percent = Math.round(
        (score / questions.length) * 100
    );

    let badge = "";
    let message = "";

    if(percent === 100){

        badge = "🥇 Budayawan HSS";
        message =
        "Luar biasa! Kamu mengenal budaya HSS dengan sangat baik.";

    }else if(percent >= 80){

        badge = "🥈 Penjelajah Budaya";
        message =
        "Hebat! Sedikit lagi menjadi Budayawan HSS.";

    }else{

        badge = "🥉 Masih Belajar";
        message =
        "Terus semangat! Budaya HSS masih menunggumu untuk dijelajahi.";

    }

    questionEl.innerHTML = `
    <div style="text-align:center">

        <h2 class="result-title">
            🎉 Petualangan Selesai!
        </h2>

        <div class="result-score">
            ${percent}%
        </div>

        <p style="font-weight:600">
            ${score} dari ${questions.length} jawaban benar
        </p>

        <div class="result-badge">
            ${badge}
        </div>

        <p class="result-message">
            ${message}
        </p>

    </div>
    `;

    answersEl.innerHTML = "";

    questions.forEach((q,index)=>{
