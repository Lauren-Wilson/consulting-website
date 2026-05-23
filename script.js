const chatAnswers = {
  scientist:
    "Lauren is a data scientist who connects technical modeling with practical business decisions. She likes clean systems, useful dashboards, and analysis that reduces uncertainty.",
  projects:
    "Her projects span forecasting, AI automation, inventory tracking, computer vision, A/B testing, and dashboard storytelling.",
  different:
    "Lauren brings a builder's mindset. She does not just analyze data - she turns messy problems into tools, workflows, and stories people can use.",
  tools:
    "Python, SQL, Azure ML, Streamlit, Google Sheets, Power BI, forecasting models, experimentation methods, and emerging AI tools."
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
