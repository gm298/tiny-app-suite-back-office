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

// Module gallery (buttons 1–6)
(function () {
  const tabs = Array.from(document.querySelectorAll(".module-tab[data-module]"));
  const imageEl = document.getElementById("module-image");
  const nameEl = document.getElementById("module-name");
  const descEl = document.getElementById("module-desc");
  const sublistEl = document.getElementById("module-sublist");

  if (!tabs.length || !imageEl || !nameEl || !descEl || !sublistEl) return;

  const modules = {
    1: {
      name: "Smart Purchasing",
      desc: "Sectioned purchase orders with monthly budget caps—barcode scanning makes ordering and receiving fast (and paperless).",
      image: "images/module-1.png",
      sub: ["Purchase Orders", "PO receive", "Barcode scanning", "Budgets & limits"],
    },
    2: {
      name: "Production (Plan → Produce)",
      desc: "Choose how much to produce. Tiny calculates ingredient quantities from your BOM so taste stays consistent and waste drops.",
      image: "images/module-2.png",
      sub: ["Production log", "Production ingredients", "BOM-based qty", "Auto-depletion"],
    },
    3: {
      name: "Sales & COGS Hub",
      desc: "Sync daily sales and instantly see Food & Beverage margins, COGS, and exports—so managers run the numbers, fast.",
      image: "images/module-3.png",
      sub: ["Sales sync", "COGS calculator", "Reports", "Profit margins"],
    },
    4: {
      name: "Rapid Stock Opname",
      desc: "Run physical counts per section, submit for approval, and keep stock on hand accurate—no more messy paper stocktakes.",
      image: "images/module-4.png",
      sub: ["Stock opname", "Approve/reject flow", "Stock on hand", "Stock movement"],
    },
    5: {
      name: "Waste & Loss Logging",
      desc: "Log waste and losses quickly with reasons—keep costs visible, track improvements, and reduce unnecessary prep.",
      image: "images/module-5.png",
      sub: ["Waste count", "Daily waste view", "Warning log", "Expenses & adjustments"],
    },
    6: {
      name: "Master Data & Settings",
      desc: "Keep items and BOM clean, manage shelf-life rules, and control roles—offline-first sync keeps everything moving.",
      image: "images/module-6.png",
      sub: ["Items & BOM", "Shelf-life rules", "User roles", "Admin invites", "App settings"],
    },
  };

  function render(moduleNum) {
    const m = modules[moduleNum];
    if (!m) return;

    imageEl.src = m.image;
    imageEl.alt = m.name + " module screenshot";
    nameEl.textContent = m.name;
    descEl.textContent = m.desc;

    sublistEl.innerHTML = "";
    m.sub.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      sublistEl.appendChild(li);
    });

    tabs.forEach((btn) => {
      const isActive = Number(btn.getAttribute("data-module")) === Number(moduleNum);
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      render(btn.getAttribute("data-module"));
    });
  });

  // Initial render
  const initial = tabs[0]?.getAttribute("data-module") || 1;
  render(initial);
})();
