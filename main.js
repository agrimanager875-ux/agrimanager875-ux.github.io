const dropdown = document.querySelector(".dropdown");
const dropdownButton = document.querySelector(".dropdown-button");

if (dropdown && dropdownButton) {
  dropdownButton.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    dropdownButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      dropdownButton.setAttribute("aria-expanded", "false");
    }
  });
}

const sectionLinks = Array.from(document.querySelectorAll(".sidebar a[href^='#'], .toc a[href^='#']"));
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLinks = () => {
  let activeId = sections[0]?.id;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140) activeId = section.id;
  }

  sectionLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
};

window.addEventListener("scroll", setActiveLinks, { passive: true });
setActiveLinks();

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = original;
      }, 1600);
    } catch {
      button.textContent = "Copy failed";
    }
  });
});
