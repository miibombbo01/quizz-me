const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmiysegwnrBJ6NfwYYcvrUCDfDlam0OD6y4tHdagFb2DilFCZk6rVYJeiR0Nc__3oGlg/exec";

const quizData = {
  nagara: [
    {
      question: "Kamu mendengar sebuah cerita tentang kerajinan tanah liat yang sudah ada sejak masa Kerajaan Nagara Daha. Kerajinan ini kemudian terus diwariskan oleh masyarakat Nagara Daha hingga sekarang. Kerajinan apakah yang dimaksud?",
      answers: ["Gerabah Nagara", "Anyaman purun", "Sasirangan", "Ukiran kayu"],
      correct: 0
    },
    {
      question: "Kamu melanjutkan perjalanan ke sebuah desa di Kecamatan Daha Selatan. Di sana, kamu melihat para pengrajin masih mempertahankan cara pembuatan gerabah yang diwariskan dari nenek moyang. Desa apakah yang kamu kunjungi?",
      answers: ["Habirau", "Bayanan", "Hamayung", "Tumbukan Banyu"],
      correct: 1
    },
    {
      question: "Setelah sampai di Bayanan, kamu penasaran sejak kapan tradisi Gerabah Nagara mulai berkembang. Tradisi ini ternyata sudah dikenal sejak masa…",
      answers: ["Kesultanan Banjar", "Kerajaan Majapahit", "Kesultanan Demak", "Kerajaan Nagara Daha"],
      correct: 3
    },
    {
      question: "Ratusan tahun berlalu, tetapi tradisi membuat gerabah di Nagara Daha masih terus dilakukan. Keahlian ini tetap bertahan karena…",
      answers: ["Hanya digunakan untuk acara kerajaan", "Menggunakan mesin modern", "Diwariskan dari generasi ke generasi", "Dibawa oleh pengrajin dari luar daerah"],
      correct: 2
    },
    {
      question: "Saat menjelajahi sejarah Nagara Daha, kamu menemukan fakta bahwa tanah liat sudah dimanfaatkan untuk berbagai kebutuhan. Selain gerabah, apa saja yang dibuat dari tanah liat?",
      answers: ["Bata, genteng, kuali, dan wadah penyimpanan air", "Tikar, topi, dan keranjang", "Kain, selendang, dan sarung", "Perahu, rakit, dan jala"],
      correct: 0
    }
  ],
  loksado: [
    {
      question: "🌱 Misi pertamamu dimulai!\nSebelum padi ditanam, masyarakat Dayak Loksado punya ritual khusus sebagai tanda dimulainya proses bertani. Namanya apa?",
      answers: ["Aruh Ganal", "Aruh Bawanang", "Aruh Basambu", "Aruh Malaris"],
      correct: 2
    },
    {
      question: "👀 Kamu melihat padi yang sudah berumur sekitar lima bulan dan mulai mengeluarkan buah. Berarti, sudah masuk waktunya masyarakat melaksanakan aruh yang mana?",
      answers: ["Aruh Basambu", "Aruh Bawanang", "Aruh Ganal", "Aruh Panen"],
      correct: 1
    },
    {
      question: "🌾 Finally, panen selesai!\nMasyarakat kemudian berkumpul untuk mengungkapkan rasa syukur atas hasil panen yang diperoleh. Tradisi yang dilakukan pada tahap ini adalah…",
      answers: ["Aruh Basambu", "Aruh Bawanang", "Aruh Ganal", "Aruh Malaris"],
      correct: 2
    },
    {
      question: "📍 Kamu sampai di salah satu lokasi pelaksanaan Aruh Ganal. Di sana masyarakat Dayak setempat berkumpul untuk menjalankan upacara adat. Kalau kamu mau ikut menyaksikan, kamu harus menuju…",
      answers: ["Balai Malaris, Desa Loklahung", "Balai Haratai, Desa Loklahung", "Balai Malaris, Desa Haratai", "Balai Loksado, Desa Lumpangi"],
      correct: 0
    },
    {
      question: "🧩 Coba susun perjalanan bertaninya!\nKalau kamu harus menyusun tiga aruh berdasarkan urutan proses pertanian, mulai dari menanam sampai selesai panen, urutan yang benar adalah…",
      answers: [
        "Aruh Ganal → Aruh Bawanang → Aruh Basambu",
        "Aruh Bawanang → Aruh Basambu → Aruh Ganal",
        "Aruh Basambu → Aruh Bawanang → Aruh Ganal",
        "Aruh Ganal → Aruh Basambu → Aruh Bawanang"
      ],
      correct: 2
    }
  ]
};

let questions = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let selectedMateri = "";

let timeLeft = 30;
let timer = null;

let userData = { nama: "", alamat: "" };
let startTime = 0;
let totalDurationInSeconds = 0;

const correctSound = new Audio("mixkit-correct-answer-tone-2870.wav");

const welcomeScreen = document.getElementById("welcomeScreen");
const topicScreen = document.getElementById("topicScreen");
const quizScreen = document.getElementById("quizScreen");
const startForm = document.getElementById("startForm");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");

if (startForm) {
  startForm.addEventListener("submit", function(e) {
    e.preventDefault();
    userData.nama = document.getElementById("userName").value.trim();
    userData.alamat = document.getElementById("userAddress").value.trim();

    if (!userData.nama || !userData.alamat) return;

    welcomeScreen.style.display = "none";
    topicScreen.style.display = "block";
  });
}

function selectTopic(materi) {
  selectedMateri = materi;
  questions = quizData[materi];

  topicScreen.style.display = "none";
  quizScreen.style.display = "block";

  startTime = Date.now();
  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];
  questionNumber.textContent = currentQuestion + 1;

  progressBar.style.width = (currentQuestion / questions.length) * 100 + "%";

  questionEl.classList.remove("question-animate");
  void questionEl.offsetWidth;

  questionEl.innerText = q.question;
  questionEl.classList.add("question-animate");
  
  const illustrationArea = document.getElementById("illustrationArea");
  if (illustrationArea) {
    illustrationArea.innerHTML = ""; 
    if (selectedMateri === "nagara" && currentQuestion === 0) {
      illustrationArea.innerHTML = `
        <div class="gift-container" id="giftContainer">
          <img src="box.png" class="gift-box-img" alt="Box Hadiah">
          <img src="gerabah.png" class="gerabah-img" alt="Gerabah Nagara">
        </div>
      `;
    } else if (selectedMateri === "nagara" && currentQuestion === 1) {
      illustrationArea.innerHTML = `
        <div class="map-wrapper" id="mapWrapper">
          <img src="map.jpg" class="map-bg" alt="Peta Daha">
          
          <div class="map-point" style="top: 25%; left: 38%;">?</div>
          <div class="map-point" style="top: 61%; left: 34%;">?</div>
          <div class="map-point" style="top: 76%; left: 37%;">?</div>
          <div class="map-point" style="top: 88%; left: 88%;">?</div>
          
          <div class="pin-icon">📍</div>
        </div>
      `;
    }else if (selectedMateri === "nagara" && currentQuestion === 2) {
      illustrationArea.innerHTML = `
        <div class="scroll-container" id="scrollContainer">
          <img src="scroll-closed.png" class="scroll-closed-img" alt="Gulungan Tertutup">
          <img src="scroll-open.png" class="scroll-open-img" alt="Gulungan Terbuka">
        </div>
      `;
    }else if (selectedMateri === "nagara" && currentQuestion === 3) {
      illustrationArea.innerHTML = `
        <div class="pottery-container" id="potteryContainer">
          <img src="clay-raw.png" class="clay-raw-img" alt="Bongkahan Tanah Liat">
          <img src="pottery-hands.png" class="pottery-hands-img" alt="Membentuk Gerabah Bersama">
        </div>
      `;
    }else if (selectedMateri === "nagara" && currentQuestion === 3) {
      illustrationArea.innerHTML = `
        <div class="pottery-container" id="potteryContainer">
          <img src="clay-raw.png" class="clay-raw-img" alt="Bongkahan Tanah Liat">
          <img src="pottery-hands.png" class="pottery-hands-img" alt="Membentuk Gerabah Bersama">
        </div>
      `;
    }
  }
  
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(btn, index);
    answersEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(button, index) {
  clearInterval(timer);
  userAnswers[currentQuestion] = index;

  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (index === questions[currentQuestion].correct) {
    score++;
    button.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  } else {
    button.classList.add("wrong");
    if (navigator.vibrate) navigator.vibrate(300);
    buttons[questions[currentQuestion].correct].classList.add("correct");
  }

  // Animasi visual tetap muncul saat soal dijawab (baik benar maupun salah)
  const giftContainer = document.getElementById("giftContainer");
  if (giftContainer) {
    giftContainer.classList.add("opened");
  }

  const mapWrapper = document.getElementById("mapWrapper");
  if (mapWrapper) {
    mapWrapper.classList.add("revealed");
  }

  const scrollContainer = document.getElementById("scrollContainer");
    if (scrollContainer) {
      scrollContainer.classList.add("opened");
    }

  const potteryContainer = document.getElementById("potteryContainer");
    if (potteryContainer) {
      potteryContainer.classList.add("opened");

  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      userAnswers[currentQuestion] = -1;
      nextQuestion();
    }
  }, 1000);
}

function resetToTopics() {
  quizScreen.style.display = "none";
  topicScreen.style.display = "block";
  window.scrollTo(0, 0);
}

function showResult() {
  clearInterval(timer);
  const endTime = Date.now();
  totalDurationInSeconds = Math.round((endTime - startTime) / 1000);

  progressBar.style.width = "100%";
  const percent = Math.round((score / questions.length) * 100);

  let badge = percent === 100 ? "🥇 Budayawan HSS" : percent >= 80 ? "🥈 Penjelajah Budaya" : "🥉 Masih Belajar";
  let message = percent === 100 ? "Luar biasa! Kamu mengenal budaya HSS dengan sangat baik." : "Terus semangat menjelajahi budaya HSS!";

  questionEl.innerHTML = `
    <div style="text-align:center">
        <h2 class="result-title">🎉 Petualangan Selesai!</h2>
        <div class="result-score">${percent}%</div>
        <p style="font-weight:600">${score} dari ${questions.length} jawaban benar</p>
        <p style="font-size:13px; color:var(--text-light); margin-top:5px;">Total Waktu: <b>${totalDurationInSeconds} detik</b></p>
        <div class="result-badge">${badge}</div>
        <p class="result-message">${message}</p>
        
        <button onclick="resetToTopics()" class="next-adventure-btn">
          🗺️ Lanjut ke Kuis Lain
        </button>
    </div>
  `;

  answersEl.innerHTML = "";

  questions.forEach((q, index) => {
    const review = document.createElement("div");
    review.className = userAnswers[index] === q.correct ? "review-card correct" : "review-card wrong";
    const userAnswer = userAnswers[index] === -1 ? "⏰ Tidak Dijawab" : q.answers[userAnswers[index]];
    const correctAnswer = q.answers[q.correct];

    review.innerHTML = `
      <h3>${userAnswers[index] === q.correct ? '✅' : '❌'} Soal ${index + 1}</h3>
      <p><b>Jawabanmu:</b> ${userAnswer}</p>
      ${userAnswers[index] !== q.correct ? `<p style="margin-top:6px;color:var(--correct)"><b>Jawaban Benar:</b> ${correctAnswer}</p>` : ''}
    `;
    answersEl.appendChild(review);
  });

  history.pushState({ page: "result" }, "");
  sendDataToGoogleSheet();
}

window.onpopstate = function (event) {
  if (quizScreen.style.display === "block") {
    resetToTopics();
  }
};

function sendDataToGoogleSheet() {
  if (!SCRIPT_URL) return;

  const payload = {
    nama: userData.nama,
    alamat: userData.alamat,
    materi: selectedMateri.toUpperCase(),
    score: score,
    duration: totalDurationInSeconds
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "data=" + encodeURIComponent(JSON.stringify(payload))
  })
  .then(() => console.log("Data berhasil terkirim"))
  .catch(err => alert("❌ Gagal kirim: " + err));
}
