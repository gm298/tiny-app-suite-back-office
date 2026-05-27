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
      desc: "Sectioned POs with budget caps and barcode scanning so ordering and receiving feel effortless.",
      image: "images/module-1.png",
      sub: ["Purchase Orders", "Barcode scanning", "Budgets & limits"],
    },
    2: {
      name: "Production (Plan → Produce)",
      desc: "Plan what you want to make, and the app calculates ingredient quantities from your BOM—consistent results, less waste.",
      image: "images/module-2.png",
      sub: ["Production planning", "BOM-based qty", "Ingredient depletion"],
    },
    3: {
      name: "Sales & COGS Hub",
      desc: "Sync daily sales and get instant Food & Beverage profit-margin insights tied to ingredient usage.",
      image: "images/module-3.png",
      sub: ["POS sync", "COGS & margins", "Sales performance"],
    },
    4: {
      name: "Rapid Stock Opname",
      desc: "Fast physical counts per section with an approve/reject flow—no more messy paper stocktakes.",
      image: "images/module-4.png",
      sub: ["Stock counts", "Approve/reject", "Stock on hand"],
    },
    5: {
      name: "Waste & Loss Logging",
      desc: "Log waste and losses quickly with reasons so costs stay visible and controllable.",
      image: "images/module-5.png",
      sub: ["Waste logging", "Daily waste view", "Warning log impact"],
    },
    6: {
      name: "Master Data & Settings",
      desc: "Keep items, BOM, and shelf-life rules clean—plus role-based access and offline-first sync.",
      image: "images/module-6.png",
      sub: ["Items & BOM", "Shelf-life rules", "Roles & sync"],
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
