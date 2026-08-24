const header = document.querySelector("[data-header]");
const progress = document.querySelector(".page-progress span");
const revealItems = document.querySelectorAll("[data-reveal]");

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const updateScroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateScroll();
window.addEventListener("scroll", updateScroll, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const emailForm = document.querySelector("[data-email-form]");
const emailStatus = document.querySelector("[data-email-status]");

if (emailForm) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(emailForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const destination = "kalmanroller@gmail.com";
    const subject = `FaithCraft inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : null,
      "",
      "How FaithCraft can help:",
      message,
    ].filter((line) => line !== null).join("\n");

    if (event.submitter?.value === "gmail") {
      const gmailUrl = new URL("https://mail.google.com/mail/");
      gmailUrl.search = new URLSearchParams({ view: "cm", fs: "1", to: destination, su: subject, body }).toString();
      const gmailWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
      if (!gmailWindow) window.location.href = gmailUrl;
      emailStatus.textContent = "Gmail is opening with your message ready to review and send.";
      return;
    }

    window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    emailStatus.textContent = "Your email app is opening with your message ready to review and send.";
  });
}

