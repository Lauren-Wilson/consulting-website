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

function runSelfChecks() {
  const errors = [];
  const projectTiles = document.querySelectorAll("[data-project-tile]");
  const projectStories = document.querySelectorAll("[data-project-story]");
  const chatButtons = document.querySelectorAll("[data-chat]");
  const emailLink = document.querySelector('a[href^="mailto:"]');

  if (projectTiles.length !== 6) errors.push("Expected exactly 6 project tiles.");
  if (projectStories.length !== 6) errors.push("Expected exactly 6 project detail sections.");
  if (chatButtons.length !== 4) errors.push("Expected exactly 4 chatbot buttons.");
  if (!emailLink) errors.push("Email contact link should use a mailto href.");

  Object.keys(chatAnswers).forEach((key) => {
    if (!chatAnswers[key]) errors.push(`Missing chatbot answer for ${key}.`);
  });

  return errors;
}

function setupChatbot() {
  const answer = document.getElementById("chat-answer");
  const buttons = document.querySelectorAll("[data-chat]");

  if (!answer || !buttons.length) return;

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.chat === "scientist" ? "true" : "false");

    button.addEventListener("click", () => {
      const nextAnswer = chatAnswers[button.dataset.chat];
      if (!nextAnswer) return;

      answer.textContent = nextAnswer;
      buttons.forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    });
  });
}

function showSelfChecks() {
  const banner = document.getElementById("mvp-checks");
  if (!banner) return;

  const errors = runSelfChecks();
  if (!errors.length) return;

  banner.textContent = `MVP checks need attention: ${errors.join(" ")}`;
  banner.hidden = false;
}

setupChatbot();
showSelfChecks();
