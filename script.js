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
    <div style="text-align: center; padding: 8px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 22px; color: var(--text-main);">🎉 Petualangan Selesai!</h2>

        <div style="font-family: var(--font-heading); font-size: 56px; font-weight: 800; color: var(--primary-sage); margin: 12px 0; line-height: 1;">
            ${percent}%
        </div>

        <p style="font-size: 15px; color: var(--text-muted); font-weight: 600;">
            ${score} dari ${questions.length} jawaban benar
        </p>

        <div style="margin-top: 18px; display: inline-block; background: var(--sage-light); padding: 8px 18px; border-radius: 99px; color: var(--primary-sage); font-family: var(--font-heading); font-weight: 700; font-size: 17px;">
            ${badge}
        </div>

        <p style="margin-top: 16px; font-size: 15px; line-height: 1.6; color: var(--text-main);">
            ${message}
        </p>
    </div>
    `;

    answersEl.innerHTML = "";

    questions.forEach((q, index) => {

        const review = document.createElement("div");

        review.style.marginTop = "12px";
        review.style.padding = "16px";
        review.style.borderRadius = "14px";
        review.style.background = "#FFFFFF";
        review.style.border = "1px solid var(--border-color)";
        review.style.textAlign = "left";

        let userAnswer =
            userAnswers[index] == -1
            ? "⏰ Tidak Dijawab"
            : q.answers[userAnswers[index]];

        let correctAnswer = q.answers[q.correct];

        if(userAnswers[index] == q.correct){

            review.innerHTML = `
            <h3 style="font-size: 15px; color: var(--color-correct); font-weight: 700; margin-bottom: 6px;">✅ Soal ${index+1}</h3>
            <p style="font-size: 14px; color: var(--text-main);"><b>Jawabanmu:</b> ${userAnswer}</p>
            `;

        }else{

            review.innerHTML = `
            <h3 style="font-size: 15px; color: var(--color-wrong); font-weight: 700; margin-bottom: 6px;">❌ Soal ${index+1}</h3>
            <p style="font-size: 14px; color: var(--text-main); margin-bottom: 4px;"><b>Jawabanmu:</b> ${userAnswer}</p>
            <p style="font-size: 14px; color: var(--color-correct);"><b>Jawaban Benar:</b> ${correctAnswer}</p>
            `;

        }

        answersEl.appendChild(review);

    });

    nextBtn.style.display = "none";

}

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
    <div style="text-align: center; padding: 8px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 22px; color: var(--text-main);">🎉 Petualangan Selesai!</h2>

        <div style="font-family: var(--font-heading); font-size: 56px; font-weight: 800; color: var(--primary-sage); margin: 12px 0; line-height: 1;">
            ${percent}%
        </div>

        <p style="font-size: 15px; color: var(--text-muted); font-weight: 600;">
            ${score} dari ${questions.length} jawaban benar
        </p>

        <div style="margin-top: 18px; display: inline-block; background: var(--sage-light); padding: 8px 18px; border-radius: 99px; color: var(--primary-sage); font-family: var(--font-heading); font-weight: 700; font-size: 17px;">
            ${badge}
        </div>

        <p style="margin-top: 16px; font-size: 15px; line-height: 1.6; color: var(--text-main);">
            ${message}
        </p>
    </div>
    `;

    answersEl.innerHTML = "";

    questions.forEach((q, index) => {

        const review = document.createElement("div");

        review.style.marginTop = "12px";
        review.style.padding = "16px";
        review.style.borderRadius = "14px";
        review.style.background = "#FFFFFF";
        review.style.border = "1px solid var(--border-color)";
        review.style.textAlign = "left";

        let userAnswer =
            userAnswers[index] == -1
            ? "⏰ Tidak Dijawab"
            : q.answers[userAnswers[index]];

        let correctAnswer = q.answers[q.correct];

        if(userAnswers[index] == q.correct){

            review.innerHTML = `
            <h3 style="font-size: 15px; color: var(--color-correct); font-weight: 700; margin-bottom: 6px;">✅ Soal ${index+1}</h3>
            <p style="font-size: 14px; color: var(--text-main);"><b>Jawabanmu:</b> ${userAnswer}</p>
            `;

        }else{

            review.innerHTML = `
            <h3 style="font-size: 15px; color: var(--color-wrong); font-weight: 700; margin-bottom: 6px;">❌ Soal ${index+1}</h3>
            <p style="font-size: 14px; color: var(--text-main); margin-bottom: 4px;"><b>Jawabanmu:</b> ${userAnswer}</p>
            <p style="font-size: 14px; color: var(--color-correct);"><b>Jawaban Benar:</b> ${correctAnswer}</p>
            `;

        }

        answersEl.appendChild(review);

    });

    nextBtn.style.display = "none";

}

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
