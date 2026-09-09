const header = document.querySelector("[data-header]");
const progress = document.querySelector(".page-progress span");
const revealItems = document.querySelectorAll("[data-reveal]");
const contactEmail = "kal@faithcraft.agency";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const currentSection = currentPath === "/" ? "/" : currentPath;

const syncNavigationMode = () => {
  const useMobileNav = window.innerWidth <= 980;

  document.querySelectorAll(".mobile-nav").forEach((menu) => {
    menu.style.setProperty("display", useMobileNav ? "block" : "none", "important");
    if (useMobileNav) {
      menu.style.setProperty("visibility", "visible", "important");
      menu.style.setProperty("opacity", "1", "important");
      const summary = menu.querySelector("summary");
      summary?.style.setProperty("display", "block", "important");
      summary?.style.setProperty("visibility", "visible", "important");
      summary?.style.setProperty("opacity", "1", "important");
    } else {
      menu.removeAttribute("open");
    }
  });

  document.querySelectorAll(".desktop-nav").forEach((nav) => {
    nav.style.setProperty("display", useMobileNav ? "none" : "flex", "important");
  });
};

syncNavigationMode();
window.addEventListener("resize", syncNavigationMode, { passive: true });
window.addEventListener("orientationchange", syncNavigationMode, { passive: true });

document.querySelectorAll(".desktop-nav a, .mobile-nav nav a, .footer-nav a").forEach((link) => {
  link.removeAttribute("aria-current");
  const href = link.getAttribute("href") || "";
  const hrefPath = href.startsWith("/") ? href.split("#")[0].replace(/\/+$/, "") || "/" : "";
  if (hrefPath && hrefPath === currentSection) link.setAttribute("aria-current", "page");
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  const rawHref = link.getAttribute("href") || "";
  const queryIndex = rawHref.indexOf("?");
  const query = queryIndex >= 0 ? rawHref.slice(queryIndex) : "";
  link.setAttribute("href", `mailto:${contactEmail}${query}`);
  if (link.textContent?.includes("@")) link.textContent = contactEmail;
});

document.querySelectorAll('form[action^="mailto:"]').forEach((form) => {
  form.setAttribute("action", `mailto:${contactEmail}`);
});

const updateScroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
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
    const destination = contactEmail;
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