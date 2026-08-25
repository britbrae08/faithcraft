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

document.querySelectorAll(".mobile-nav").forEach((menu) => {
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.removeAttribute("open"));
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.removeAttribute("open");
      menu.querySelector("summary")?.focus();
    }
  });
});

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

document.querySelectorAll("[data-email-form]").forEach((emailForm) => {
  const emailStatus = emailForm.querySelector("[data-email-status]");
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(emailForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const promotion = String(formData.get("promotion") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const destination = "kalmanroller@gmail.com";
    const isLeadgen = emailForm.dataset.formType === "leadgen";
    const subjectPrefix = emailForm.dataset.subject || "FaithCraft inquiry";
    const subject = `${subjectPrefix} from ${name}`;
    const body = isLeadgen
      ? [
          `Name: ${name}`,
          `Church / Ministry: ${organization}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `What are you promoting?: ${promotion}`,
          "",
          "Outreach goal:",
          message,
        ].join("\n")
      : [
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
      if (emailStatus) emailStatus.textContent = "Gmail is opening with your message ready to review and send.";
      return;
    }

    window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (emailStatus) emailStatus.textContent = "Your email app is opening with your message ready to review and send.";
  });
});

