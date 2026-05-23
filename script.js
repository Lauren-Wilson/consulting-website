const chatAnswers = {
  scientist:
    "Lauren is a resourceful data scientist who focuses on understanding the fundamentals before chasing trends. She learns quickly, adapts fast, and enjoys turning messy, real-world problems into practical systems people can actually use. Her work blends analytics, experimentation, automation, and storytelling with a strong focus on business impact.",

  different:
    "Lauren stands out because she combines technical depth with builder energy. She does not just create analyses — she creates tools, workflows, dashboards, documentation, and experiences around them. She is comfortable moving from business conversations to modeling, automation, deployment, and communication without losing sight of the actual problem being solved.",

  tools:
    "Lauren works primarily in Python, SQL, Azure ML, Streamlit, R Shiny, Power BI, and Google Cloud/Azure ecosystems. Her experience includes forecasting models, topic modeling, sentiment analysis, computer vision, experimentation frameworks, dashboard design, and AI workflow automation using modern LLM tools.",

  projects:
    "Lauren’s projects span multiple areas of applied data science. She built an R Shiny audit automation app that reduced audit time by over 50%, trained a YOLOv4 computer vision model to detect empty retail shelves, developed forecasting approaches using intervention analysis to mimic real-world events, and explored large-scale call center transcript analysis using topic modeling and sentiment analysis to uncover customer behavior patterns and operational insights."
};

let chatTypingTimer = null;
let chatStartTimer = null;
let activeChatKey = "scientist";

function stopTypingAnimation() {
  if (chatTypingTimer) {
    clearInterval(chatTypingTimer);
    chatTypingTimer = null;
  }

  if (chatStartTimer) {
    clearTimeout(chatStartTimer);
    chatStartTimer = null;
  }
}

function typeAnswerByWord(element, text) {
  if (!element) return;

  stopTypingAnimation();

  const words = text.trim().split(/\s+/);
  let index = 0;
  element.textContent = "";
  element.dataset.typing = "true";
  element.setAttribute("aria-busy", "true");

  chatStartTimer = setTimeout(() => {
    chatTypingTimer = setInterval(() => {
      if (index >= words.length) {
        stopTypingAnimation();
        element.dataset.typing = "false";
        element.setAttribute("aria-busy", "false");
        return;
      }

      element.textContent += `${index ? " " : ""}${words[index]}`;
      index += 1;
    }, 120);
  }, 180);
}

function setupChatbot() {
  const answer = document.getElementById("chat-answer");
  const buttons = document.querySelectorAll("[data-chat]");

  if (!answer || !buttons.length) return;

  buttons.forEach((button) => {
    const isDefault = button.dataset.chat === "scientist";
    button.setAttribute("aria-pressed", isDefault ? "true" : "false");

    button.addEventListener("click", () => {
      const key = button.dataset.chat;
      if (key === activeChatKey) return;

      const nextAnswer = chatAnswers[key];
      if (!nextAnswer) return;

      activeChatKey = key;
      buttons.forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      typeAnswerByWord(answer, nextAnswer);
    });
  });

  typeAnswerByWord(answer, chatAnswers[activeChatKey]);
}

// Smooth scroll animations and page interactions
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
  });

  // Smooth scroll behavior
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
    setupChatbot();
  });
} else {
  setupScrollAnimations();
  setupChatbot();
}
