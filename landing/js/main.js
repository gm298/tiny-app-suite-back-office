(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  reveals.forEach((el) => observer.observe(el));

  document.querySelector(".hero")?.classList.add("is-visible");
})();

// Hero interactive cost vs revenue pie
(function () {
  const pie = document.getElementById("cost-pie");
  const costCenter = document.getElementById("cost-pie-center");
  const costValue = document.getElementById("cost-value");
  const revenueValue = document.getElementById("revenue-value");
  const buttons = document.querySelectorAll(".chart-btn[data-cost]");

  if (!pie || !costCenter || !costValue || !revenueValue || !buttons.length) return;

  function setState(cost) {
    const c = Math.max(0, Math.min(100, Number(cost)));
    const r = 100 - c;

    pie.style.setProperty("--cost", String(c));
    costCenter.textContent = c + "% Cost";
    costValue.textContent = c + "%";
    revenueValue.textContent = r + "%";

    buttons.forEach((btn) => {
      const isActive = Number(btn.getAttribute("data-cost")) === c;
      btn.classList.toggle("is-active", isActive);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setState(btn.getAttribute("data-cost"));
    });
  });

  // Ensure correct initial values (in case CSS is overridden)
  const initial = buttons[0]?.getAttribute("data-cost") || 40;
  setState(initial);
})();
