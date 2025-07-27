let currentStep = 1;
let userName = "";
let answers = {};

const answerTexts = {
  sunset: "life's quiet, beautiful moments",
  laughter: "authentic joy and connection",
  music: "the magic of melodies and rhythm",
  adventure: "new experiences and discoveries",
  time: "making precious moments eternal",
  hearts: "understanding the depths of emotion",
  teleport: "spontaneous adventures and freedom",
  heal: "bringing healing and happiness to others",
  stars: "intimate conversations under starlight",
  cozy: "comfortable togetherness and warmth",
  walk: "meaningful connections through shared journeys",
  create: "building something beautiful with others",
};

// Name input validation
document.getElementById("nameInput").addEventListener("input", function (e) {
  const name = e.target.value.trim();
  const startBtn = document.getElementById("startBtn");

  if (name.length >= 2) {
    startBtn.disabled = false;
    userName = name;
  } else {
    startBtn.disabled = true;
  }
});

function selectOption(element, value) {
  // Remove previous selections
  const options = element.parentNode.querySelectorAll(".option");
  options.forEach((opt) => opt.classList.remove("selected"));

  // Select current option
  element.classList.add("selected");

  // Store answer
  answers[`q${currentStep - 1}`] = value;

  // Enable next button
  const nextBtn = document.getElementById(`q${currentStep - 1}NextBtn`);
  if (nextBtn) nextBtn.disabled = false;

  // Create heart animation
  createHearts(element);
}

function nextStep() {
  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove("active");

  // Update progress
  currentStep++;
  updateProgress();

  // Show next step with delay for smooth transition
  setTimeout(() => {
    document.getElementById(`step${currentStep}`).classList.add("active");

    // Update name displays
    if (currentStep >= 2) {
      document.getElementById(`displayName${currentStep - 1}`).textContent =
        userName;
    }
  }, 300);
}

function revealMessage() {
  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove("active");

  // Update progress to 100%
  document.getElementById("progressFill").style.width = "100%";

  // Show final message with delay
  setTimeout(() => {
    document.getElementById("step5").classList.add("active");

    // Populate final message
    document.getElementById("finalName").textContent = userName;
    document.getElementById("finalName2").textContent = userName;
    document.getElementById("answer1").textContent = answerTexts[answers.q1];
    document.getElementById("answer2").textContent = answerTexts[answers.q2];
    document.getElementById("answer3").textContent = answerTexts[answers.q3];

    // Start automatic heart rain
    setTimeout(startHeartRain, 1000);
  }, 500);
}

function updateProgress() {
  const progress = ((currentStep - 1) / 4) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

function createHearts(element) {
  const rect = element.getBoundingClientRect();
  const heartsContainer = document.querySelector(".hearts");

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = rect.left + Math.random() * rect.width + "px";
    heart.style.top = rect.top + Math.random() * rect.height + "px";
    heart.style.animationDelay = Math.random() * 0.5 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
  }
}

function startHeartRain() {
  const heartsContainer = document.querySelector(".hearts");

  function dropHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["💖", "💕", "💝", "❤️", "🌹"][
      Math.floor(Math.random() * 5)
    ];
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = "-50px";
    heart.style.fontSize = 15 + Math.random() * 15 + "px";
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
  }

  // Create hearts continuously
  const heartInterval = setInterval(dropHeart, 300);

  // Stop after 10 seconds
  setTimeout(() => clearInterval(heartInterval), 10000);
}

function createFireworks() {
  const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const firework = document.createElement("div");
      firework.className = "firework";
      firework.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      firework.style.left = "50%";
      firework.style.top = "50%";

      const angle = Math.random() * 360 * (Math.PI / 180);
      const distance = 100 + Math.random() * 200;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      firework.style.setProperty("--dx", dx + "px");
      firework.style.setProperty("--dy", dy + "px");
      firework.style.animation = "fireworkExplode 1.5s ease-out forwards";

      document.body.appendChild(firework);

      setTimeout(() => firework.remove(), 1500);
    }, i * 30);
  }

  // More heart rain after fireworks
  setTimeout(startHeartRain, 1000);
}

// Keyboard navigation
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (currentStep === 1 && !document.getElementById("startBtn").disabled) {
      nextStep();
    }
  }
});

// Initialize progress
updateProgress();
