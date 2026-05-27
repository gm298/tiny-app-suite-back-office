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
      name: "Dashboard",
      desc: "A single manager view of costs, inventory, and performance—so you spot issues before they become waste.",
      image: "images/module-dashboard.png",
      sub: ["Inventory snapshot", "Cost signals", "Quick navigation"],
    },
    2: {
      name: "Reports",
      desc: "Export-ready reporting that turns daily operations into clear numbers for owners and managers.",
      image: "images/module-reports.png",
      sub: ["Date filters", "Export", "Daily/weekly insights"],
    },
    3: {
      name: "COGS",
      desc: "Know your true Food & Beverage costs. Tiny connects purchasing, production, and sales into margin clarity.",
      image: "images/module-cogs.png",
      sub: ["COGS tables", "Profit margins", "Cost breakdown"],
    },
    4: {
      name: "Purchase Orders",
      desc: "Sectioned purchase orders with budget caps—built for speed so the floor team doesn’t get stuck on admin.",
      image: "images/module-po.png",
      sub: ["Sectioned POs", "Budget limits", "Supplier ordering"],
    },
    5: {
      name: "PO Receiving",
      desc: "Receive stock fast and accurately. Reduce errors and stop “missing stock” from day one.",
      image: "images/module-po-receiving.png",
      sub: ["PO receive", "Quantity checks", "Barcode-ready flow"],
    },
    6: {
      name: "Expenses",
      desc: "Capture day-to-day expenses in the same system as inventory so costs don’t disappear off-book.",
      image: "images/module-expenses.png",
      sub: ["Expense entries", "Staged review", "Audit trail"],
    },
    7: {
      name: "Production",
      desc: "Choose how much to produce and Tiny calculates the ingredient quantities from your BOM—consistent taste, less waste, no paper.",
      image: "images/module-production.png",
      sub: ["Production log", "Ingredient quantities", "Auto-depletion"],
    },
    8: {
      name: "Sales Inventory",
      desc: "Sync sales and keep stock accurate automatically—so you stop over-ordering and over-prepping.",
      image: "images/module-sales-inventory.png",
      sub: ["Sales sync", "Inventory impact", "COGS connection"],
    },
    9: {
      name: "Stock Opname",
      desc: "Run fast physical counts per section with an approval flow—paper-free stocktakes that managers trust.",
      image: "images/module-stock-opname.png",
      sub: ["Section counts", "Approve/reject", "Zero data errors"],
    },
    10: {
      name: "Stock on Hand",
      desc: "Instantly see what’s in stock—by section—so ordering and prep decisions are based on reality.",
      image: "images/module-stock-on-hand.png",
      sub: ["Current stock", "Section view", "Confidence in numbers"],
    },
    11: {
      name: "Stock Movement",
      desc: "Track inventory movements clearly so discrepancies don’t turn into silent margin leaks.",
      image: "images/module-stock-movement.png",
      sub: ["Movement history", "Adjustments", "Traceability"],
    },
    12: {
      name: "Waste Reporting",
      desc: "Log waste quickly with reasons and see the real impact—then fix the root causes.",
      image: "images/module-waste.png",
      sub: ["Waste count", "Daily waste view", "Reasons & insights"],
    },
    13: {
      name: "Master Data",
      desc: "Keep items, BOM, and shelf-life rules clean and consistent—so the system stays accurate as you scale.",
      image: "images/module-master-data.png",
      sub: ["Items", "BOM", "Shelf-life rules"],
    },
    14: {
      name: "Admin Panel",
      desc: "Role-based control for staff, managers, and admins—secure operations with clean permissions.",
      image: "images/module-admin-panel.png",
      sub: ["User management", "Invites", "Roles & access"],
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
