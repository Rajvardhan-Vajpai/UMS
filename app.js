const TASKS = {
  attendance: {
    id: "attendance",
    category: "Attendance",
    icon: "📊",
    name: "Check Attendance",
    desc: "View your attendance percentage, course-wise logs, and safe-margin calculator.",
    portal: "Academic Portal",
    portalUrl: "academics.ums.edu/student/attendance",
    estTime: "~1 min",
    needs: ["University Student ID", "Active semester enrollment", "Course code (optional)"],
    steps: [
      "Open the Academic Portal from the UMS gateway.",
      "Sign in using your single-sign-on university credentials.",
      "Open the Academics menu, then select Attendance.",
      "Choose a course to view lecture-by-lecture attendance details."
    ],
    portalMenu: [
      { id: "overview", label: "Academic Overview", desc: "Semester GPA & registration status", target: false },
      { id: "timetable", label: "Weekly Timetable", desc: "Classroom & faculty schedule", target: false },
      { id: "attendance", label: "Attendance Tracker", desc: "Course-wise % and class logs", target: true },
      { id: "exams", label: "Exam Schedule", desc: "Mid-term & end-term seating", target: false }
    ],
    outcomeTitle: "Attendance Overview"
  },
  fine: {
    id: "fine",
    category: "Fine Payment",
    icon: "💳",
    name: "Pay a Fine",
    desc: "Review pending library, lab, or late-fee fines and complete payment.",
    portal: "Student Accounts Portal",
    portalUrl: "accounts.ums.edu/dues/fines",
    estTime: "~2 mins",
    needs: ["University Student ID", "UPI / Debit Card / NetBanking", "Fee challan or fine reference"],
    steps: [
      "Open the Student Accounts Portal.",
      "Sign in using your university credentials.",
      "Navigate to Fee / Dues Details in the left menu.",
      "Select pending fines and proceed to the payment gateway."
    ],
    portalMenu: [
      { id: "ledger", label: "Semester Tuition Ledger", desc: "Paid & upcoming term invoices", target: false },
      { id: "fines", label: "Fee / Dues Details (Fines)", desc: "Pending library, lab & hostel dues", target: true },
      { id: "scholarships", label: "Scholarships & Aid", desc: "Disbursement & waiver status", target: false },
      { id: "receipts", label: "Download Receipts", desc: "Past tax & fee receipts", target: false }
    ],
    outcomeTitle: "Pending Dues & Payment"
  },
  slot: {
    id: "slot",
    category: "Slot Booking",
    icon: "📅",
    name: "Book a Slot",
    desc: "Reserve a time slot for study pods, labs, advising, or campus facilities.",
    portal: "Booking Portal",
    portalUrl: "bookings.ums.edu/campus/slots",
    estTime: "~2 mins",
    needs: ["University Student ID", "Preferred date & time window", "Facility / service name"],
    steps: [
      "Open the Booking Portal.",
      "Sign in using your university credentials.",
      "Choose the campus facility or service you need.",
      "Pick an available date and time slot, then confirm."
    ],
    portalMenu: [
      { id: "mybookings", label: "My Upcoming Bookings", desc: "View or cancel active passes", target: false },
      { id: "facilities", label: "Campus Facility & Slot Booking", desc: "Library pods, labs, sports & advising", target: true },
      { id: "events", label: "Auditorium & Club Requests", desc: "Student organization bookings", target: false }
    ],
    outcomeTitle: "Slot Booking Confirmed"
  }
};

const SEVEN_PORTALS = [
  { name: "1. Academic Portal", domain: "academics.ums.edu", purpose: "Attendance, courses, grades, and transcripts." },
  { name: "2. Student Accounts Portal", domain: "accounts.ums.edu", purpose: "Tuition, pending fines, receipts, and scholarships." },
  { name: "3. Booking Portal", domain: "bookings.ums.edu", purpose: "Library pods, labs, advising, and sports slots." },
  { name: "4. Examination Portal", domain: "exams.ums.edu", purpose: "Hall tickets, revaluation, and exam schedules." },
  { name: "5. Hostel & Mess Portal", domain: "hostel.ums.edu", purpose: "Room allotment, outpass, and meal plans." },
  { name: "6. Library Portal", domain: "library.ums.edu", purpose: "Catalog search, book renewals, and e-journals." },
  { name: "7. Career & Placement Portal", domain: "careers.ums.edu", purpose: "Internships, resume review, and placement drives." }
];

const FAQS = [
  { q: "Why are there seven separate portals?", a: "Each university department runs its own legacy system. UMS guides you straight to the exact portal and menu item so you don't get lost." },
  { q: "Do my credentials work across all portals?", a: "Yes. Use your central Student ID and SSO password across all seven portals." },
  { q: "What is the minimum attendance requirement?", a: "Most courses require 75% attendance. Use the Check Attendance screen to calculate how many classes you can miss or need to attend." },
  { q: "How fast do fine payments reflect?", a: "Payments made via UPI or NetBanking clear immediately and generate a downloadable receipt reference." }
];

const COURSES_DATA = [
  { code: "CS301", name: "Data Structures & Algorithms", attended: 35, total: 38, faculty: "Dr. R. Iyer" },
  { code: "CS304", name: "Operating Systems", attended: 26, total: 31, faculty: "Prof. A. Menon" },
  { code: "CS308", name: "Database Management Systems", attended: 32, total: 36, faculty: "Dr. S. Kulkarni" },
  { code: "CS312", name: "Computer Networks", attended: 24, total: 32, faculty: "Prof. N. Verma" }
];

const FACILITIES_DATA = [
  { id: "pod", name: "Central Library — Quiet Study Pod B4", location: "Library 2nd Floor" },
  { id: "lab", name: "Innovation Maker Lab — 3D Printer", location: "Tech Block Room 108" },
  { id: "advisor", name: "Academic Advising — 1-on-1 Session", location: "Student Center 204" },
  { id: "badminton", name: "Sports Complex — Badminton Court 2", location: "Indoor Arena" }
];

const TIME_SLOTS = [
  { time: "09:30 AM", free: true },
  { time: "11:00 AM", free: false },
  { time: "01:30 PM", free: true },
  { time: "03:00 PM", free: true },
  { time: "04:30 PM", free: false },
  { time: "06:00 PM", free: true }
];

const SCREEN_NAMES = [
  "Welcome",
  "Dashboard",
  "Select a Task",
  "Task Details",
  "Step-by-Step Guide",
  "Portal Access",
  "Task Outcome",
  "Feedback"
];

const state = {
  studentName: "Aarav",
  studentId: "UMS24091",
  screen: 0,
  taskId: "attendance",
  serviceFilter: "All",
  searchQuery: "",
  checklist: [true, true, false],
  activeStep: 0,
  portalPhase: "redirect", // 'redirect' -> 'menu' -> 'reached'
  selectedPortalItem: null,
  // Outcome interactive states
  expandedCourse: "CS301",
  fines: [
    { id: "F-1042", title: "Central Library Late Return (4 days)", due: "Due Today", amount: 150, selected: true, paid: false },
    { id: "F-1089", title: "Electronics Lab Kit Late Check-in", due: "Due in 3 days", amount: 250, selected: false, paid: false }
  ],
  paymentMethod: "UPI",
  lastReceipt: null,
  bookingFacility: "pod",
  bookingDate: new Date().toISOString().slice(0, 10),
  bookingSlot: "01:30 PM",
  confirmedBooking: null,
  // Feedback
  rating: 0,
  helpful: "",
  suggestion: "",
  feedbackHistory: loadFeedback(),
  feedbackSubmitted: false,
  visitedScreens: new Set([0])
};

function loadFeedback() {
  try {
    return JSON.parse(localStorage.getItem("ums_feedback_history") || "[]");
  } catch {
    return [];
  }
}

function saveFeedback(entry) {
  state.feedbackHistory.unshift(entry);
  state.feedbackHistory = state.feedbackHistory.slice(0, 5);
  try {
    localStorage.setItem("ums_feedback_history", JSON.stringify(state.feedbackHistory));
  } catch {
    // ignore storage errors
  }
}

const elScreen = document.getElementById("screenRoot");
const elNavTitle = document.getElementById("navTitle");
const elNavBadge = document.getElementById("navBadge");
const elFooterCount = document.getElementById("footerCount");
const elFooterPortal = document.getElementById("footerPortal");
const elProgress = document.getElementById("progressBar");
const elBackBtn = document.getElementById("backBtn");
const elFlowLabel = document.getElementById("flowCurrentLabel");

function go(screenIdx, options = {}) {
  state.screen = Math.max(0, Math.min(7, screenIdx));
  state.visitedScreens.add(state.screen);

  if (options.taskId) {
    state.taskId = options.taskId;
  }
  if (state.screen === 4 && options.resetSteps !== false) {
    state.activeStep = 0;
  }
  if (state.screen === 5) {
    state.portalPhase = options.portalPhase || "redirect";
    state.selectedPortalItem = null;
  }
  if (state.screen === 7 && options.resetFeedback) {
    state.feedbackSubmitted = false;
  }

  render();

  if (state.screen === 5 && state.portalPhase === "redirect") {
    setTimeout(() => {
      if (state.screen === 5 && state.portalPhase === "redirect") {
        state.portalPhase = "menu";
        render();
      }
    }, 650);
  }
}

function render() {
  const task = TASKS[state.taskId];
  elNavTitle.textContent = SCREEN_NAMES[state.screen];
  elNavBadge.textContent = `Step ${state.screen + 1} / 8`;
  elFooterCount.textContent = `Screen ${state.screen + 1} of 8`;
  elFooterPortal.textContent = state.screen >= 3 ? task.portal : "UMS Navigation Hub";
  elProgress.style.width = `${((state.screen + 1) / 8) * 100}%`;
  elBackBtn.classList.toggle("is-hidden", state.screen === 0);

  updateFlowchartHighlight();

  switch (state.screen) {
    case 0: renderWelcome(); break;
    case 1: renderDashboard(); break;
    case 2: renderSelectTask(); break;
    case 3: renderTaskDetails(); break;
    case 4: renderSteps(); break;
    case 5: renderPortalAccess(); break;
    case 6: renderOutcome(); break;
    case 7: renderFeedback(); break;
  }
}

function renderWelcome() {
  elScreen.innerHTML = `
    <div class="hero-card">
      <div class="hero-logo">UMS</div>
      <div class="hero-art">🎓</div>
      <div class="eyebrow">One student, seven portals</div>
      <h1>Navigate. Find. Get it done.</h1>
      <p>Stop hunting across seven separate university portals. Pick what you need and follow a direct, guided route.</p>

      <div class="student-input-box">
        <label for="studentNameInput">Student Profile (Optional)</label>
        <div class="input-row">
          <input id="studentNameInput" class="text-input" type="text" value="${escapeHtml(state.studentName)}" placeholder="Your name" />
          <input id="studentIdInput" class="text-input" type="text" value="${escapeHtml(state.studentId)}" placeholder="ID" />
        </div>
      </div>

      <button class="btn" id="startBtn" type="button">Get Started →</button>
    </div>
  `;

  document.getElementById("studentNameInput").addEventListener("input", (e) => {
    state.studentName = e.target.value.trim() || "Student";
  });
  document.getElementById("studentIdInput").addEventListener("input", (e) => {
    state.studentId = e.target.value.trim() || "UMS0001";
  });
  ["studentNameInput", "studentIdInput"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", (e) => {
      if (e.key === "Enter") go(1);
    });
  });
  document.getElementById("startBtn").addEventListener("click", () => go(1));
}

function renderDashboard() {
  const unpaidTotal = state.fines.filter(f => !f.paid).reduce((s, f) => s + f.amount, 0);
  const overallAtt = calcOverallAttendance();

  elScreen.innerHTML = `
    <div class="eyebrow">Student dashboard</div>
    <h1>Hi, ${escapeHtml(state.studentName)}!</h1>
    <p>Signed in as <b>${escapeHtml(state.studentId)}</b>. What would you like to do today?</p>

    <div class="stat-strip">
      <div class="stat-pill"><b>${overallAtt}%</b><span>Attendance</span></div>
      <div class="stat-pill"><b>₹${unpaidTotal}</b><span>Pending Dues</span></div>
      <div class="stat-pill"><b>${state.confirmedBooking ? "1 Active" : "Open"}</b><span>Slot Booking</span></div>
    </div>

    <div class="tile-grid">
      ${Object.values(TASKS).map(t => `
        <button class="tile" data-pick-task="${t.id}" type="button">
          <span class="tile-ico">${t.icon}</span>
          <span class="tile-title">${t.name}</span>
          <span class="small">${t.portal}</span>
        </button>
      `).join("")}
      <button class="tile" id="dashHelpTile" type="button">
        <span class="tile-ico">🧭</span>
        <span class="tile-title">7 Portals & FAQs</span>
        <span class="small">Directory & quick answers</span>
      </button>
    </div>

    <button class="btn secondary" id="browseTasksBtn" type="button" style="margin-top:14px">
      Browse All Services & Filter →
    </button>
  `;

  elScreen.querySelectorAll("[data-pick-task]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.taskId = btn.dataset.pickTask;
      go(2);
    });
  });
  document.getElementById("dashHelpTile").addEventListener("click", openHelpModal);
  document.getElementById("browseTasksBtn").addEventListener("click", () => go(2));
}

function renderSelectTask() {
  const categories = ["All", "Attendance", "Fine Payment", "Slot Booking"];
  const filtered = Object.values(TASKS).filter(t => {
    const matchCat = state.serviceFilter === "All" || t.category === state.serviceFilter;
    const q = state.searchQuery.toLowerCase();
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.portal.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  elScreen.innerHTML = `
    <div class="eyebrow">Choose service</div>
    <h1>Select a task</h1>
    <p>Filter by service category or pick the task you want to complete.</p>

    <input id="taskSearch" class="text-input" type="text" value="${escapeHtml(state.searchQuery)}" placeholder="Search tasks or portals..." style="margin-bottom:10px" />

    <div class="filter-tabs">
      ${categories.map(cat => `
        <button class="filter-tab ${state.serviceFilter === cat ? "active" : ""}" data-cat="${cat}" type="button">${cat}</button>
      `).join("")}
    </div>

    ${filtered.length ? filtered.map(t => `
      <button class="list-item ${state.taskId === t.id ? "active-portal-item" : ""}" data-select-task="${t.id}" type="button">
        <div class="ico-box">${t.icon}</div>
        <div>
          <b>${t.name}</b>
          <div class="small">${t.category} · ${t.portal}</div>
          <div class="small">${t.desc}</div>
        </div>
        <span class="chev">›</span>
      </button>
    `).join("") : `<div class="panel">No matching services found. Clear your search filter to see all tasks.</div>`}
  `;

  document.getElementById("taskSearch").addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderSelectTask();
    const input = document.getElementById("taskSearch");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });

  elScreen.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.serviceFilter = btn.dataset.cat;
      renderSelectTask();
    });
  });

  elScreen.querySelectorAll("[data-select-task]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.taskId = btn.dataset.selectTask;
      go(3);
    });
  });
}

function renderTaskDetails() {
  const t = TASKS[state.taskId];
  elScreen.innerHTML = `
    <div class="eyebrow">View task details</div>
    <h1>${t.icon} ${t.name}</h1>
    <p>${t.desc}</p>

    <div class="tag-row">
      <span class="badge">${t.category}</span>
      <span class="badge green">Estimated: ${t.estTime}</span>
    </div>

    <div class="panel panel-tint">
      <div class="small" style="font-weight:700;text-transform:uppercase;letter-spacing:.6px">Target Destination</div>
      <h2 style="margin-top:4px">${t.portal}</h2>
      <div class="small">${t.portalUrl}</div>
    </div>

    <div class="panel">
      <b>Quick Readiness Checklist</b>
      <div style="margin-top:6px">
        ${t.needs.map((item, idx) => `
          <label class="checklist-item">
            <input type="checkbox" data-chk="${idx}" ${state.checklist[idx] ? "checked" : ""} />
            <span>${item}</span>
          </label>
        `).join("")}
      </div>
    </div>

    <button class="btn" id="showStepsBtn" type="button">Show Step-by-Step Guidance →</button>
  `;

  elScreen.querySelectorAll("[data-chk]").forEach(chk => {
    chk.addEventListener("change", () => {
      state.checklist[Number(chk.dataset.chk)] = chk.checked;
    });
  });
  document.getElementById("showStepsBtn").addEventListener("click", () => go(4));
}

function renderSteps() {
  const t = TASKS[state.taskId];
  elScreen.innerHTML = `
    <div class="eyebrow">Step-by-step guidance</div>
    <h1>Follow these steps</h1>
    <p>Tap each step as you go, or jump straight to the portal hand-off.</p>

    <div class="steps-list">
      ${t.steps.map((stepText, idx) => {
        const cls = idx < state.activeStep ? "done" : idx === state.activeStep ? "current" : "";
        return `
          <div class="step-node ${cls}" data-n="${idx + 1}" data-step-idx="${idx}">
            <b>${stepText}</b>
            <div class="small">${idx < state.activeStep ? "Completed" : idx === state.activeStep ? "Current step" : "Upcoming"}</div>
          </div>
        `;
      }).join("")}
    </div>

    <div class="panel panel-tint">
      <b>Destination Portal</b>
      <div class="small">${t.portal} (${t.portalUrl})</div>
    </div>

    <div class="btn-row">
      <button class="btn secondary" id="nextStepBtn" type="button">
        ${state.activeStep < t.steps.length - 1 ? "Mark Step Done ✓" : "All Steps Ready ✓"}
      </button>
      <button class="btn" id="redirectPortalBtn" type="button">Redirect to Portal →</button>
    </div>
  `;

  elScreen.querySelectorAll("[data-step-idx]").forEach(node => {
    node.addEventListener("click", () => {
      state.activeStep = Number(node.dataset.stepIdx);
      renderSteps();
    });
  });

  document.getElementById("nextStepBtn").addEventListener("click", () => {
    if (state.activeStep < t.steps.length) {
      state.activeStep++;
      renderSteps();
    }
  });

  document.getElementById("redirectPortalBtn").addEventListener("click", () => {
    go(5, { portalPhase: "redirect" });
  });
}

function renderPortalAccess() {
  const t = TASKS[state.taskId];

  if (state.portalPhase === "redirect") {
    elScreen.innerHTML = `
      <div class="eyebrow">Redirect to relevant portal</div>
      <h1>Connecting to ${t.portal}</h1>
      <div class="portal-chrome">
        <div class="portal-topbar">
          <b>${t.portal}</b>
          <span>SSO · ${escapeHtml(state.studentId)}</span>
        </div>
        <div class="portal-url">https://${t.portalUrl}</div>
        <div class="redirect-box">
          <div class="spinner"></div>
          <b>Handing off your session...</b>
          <p class="small">Authenticating ${escapeHtml(state.studentName)} (${escapeHtml(state.studentId)})</p>
        </div>
      </div>
      <button class="btn secondary" id="skipWaitBtn" type="button">Open Portal Now →</button>
    `;
    document.getElementById("skipWaitBtn").addEventListener("click", () => {
      state.portalPhase = "menu";
      render();
    });
    return;
  }

  const targetItem = t.portalMenu.find(m => m.target);
  const reached = state.portalPhase === "reached";

  elScreen.innerHTML = `
    <div class="eyebrow">${reached ? "Reach intended task page" : "Portal access"}</div>
    <h1>${t.portal}</h1>
    <p>${reached ? `You reached <b>${targetItem.label}</b>. Proceed to complete your task.` : `Select <b>${targetItem.label}</b> from the portal menu below.`}</p>

    <div class="portal-chrome">
      <div class="portal-topbar">
        <b>${t.portal}</b>
        <span>${escapeHtml(state.studentName)} · Signed in</span>
      </div>
      <div class="portal-url">https://${t.portalUrl}${reached ? "/active" : ""}</div>
      <div class="portal-body">
        <div class="portal-crumb">Home › ${t.category} ${reached ? `› ${targetItem.label}` : ""}</div>
        ${t.portalMenu.map(item => `
          <button class="list-item ${state.selectedPortalItem === item.id ? "active-portal-item" : ""}" data-portal-item="${item.id}" type="button">
            <div class="ico-box">${item.target ? "🎯" : "📁"}</div>
            <div>
              <b>${item.label}</b>
              <div class="small">${item.desc}</div>
            </div>
            <span class="chev">${item.target ? "Open ›" : "›"}</span>
          </button>
        `).join("")}
        ${state.selectedPortalItem && !reached ? `
          <div class="panel" style="background:var(--amber-bg);border-color:#f3d28f;margin-top:8px">
            <b>Different section selected</b>
            <div class="small">For <b>${t.name}</b>, select <b>${targetItem.label}</b> (marked 🎯).</div>
          </div>
        ` : ""}
        ${reached ? `
          <div class="outcome-banner" style="margin-top:10px;margin-bottom:0">
            <b>✓ Intended Task Page Loaded</b>
            <div class="small">You are now on the exact page for ${t.name}.</div>
          </div>
        ` : ""}
      </div>
    </div>

    <button class="btn" id="openOutcomeBtn" type="button">
      ${reached ? `Continue to ${t.outcomeTitle} →` : `Jump Directly to ${targetItem.label} →`}
    </button>
  `;

  elScreen.querySelectorAll("[data-portal-item]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.portalItem;
      state.selectedPortalItem = id;
      const item = t.portalMenu.find(m => m.id === id);
      if (item && item.target) {
        state.portalPhase = "reached";
      } else {
        state.portalPhase = "menu";
      }
      render();
    });
  });

  document.getElementById("openOutcomeBtn").addEventListener("click", () => go(6));
}

function renderOutcome() {
  const t = TASKS[state.taskId];
  let bodyHtml = "";

  if (state.taskId === "attendance") {
    const overall = calcOverallAttendance();
    bodyHtml = `
      <div class="outcome-banner">
        <div class="small">Live Course Summary · ${escapeHtml(state.studentId)}</div>
        <div class="metric">${overall}%</div>
        <b>Overall Semester Attendance</b>
        <div class="small">Minimum threshold: 75% · Status: ${overall >= 75 ? "Safe Standing ✓" : "Attention Needed"}</div>
      </div>

      ${COURSES_DATA.map(c => {
        const pct = Math.round((c.attended / c.total) * 100);
        const safeSkips = Math.max(0, Math.floor((c.attended - 0.75 * c.total) / 0.75));
        const isOpen = state.expandedCourse === c.code;
        return `
          <div class="course-card">
            <div class="course-head" data-toggle-course="${c.code}" style="cursor:pointer">
              <div>
                <b>${c.code} · ${c.name}</b>
                <div class="small">${c.faculty} · ${c.attended}/${c.total} classes</div>
              </div>
              <span class="badge ${pct >= 80 ? "green" : "amber"}">${pct}%</span>
            </div>
            <div class="bar-bg"><div class="bar-fg ${pct < 80 ? "warn" : ""}" style="width:${pct}%"></div></div>
            ${isOpen ? `
              <div class="small" style="padding-top:4px;border-top:1px dashed var(--line)">
                Safe margin: You can miss up to <b>${safeSkips}</b> more class${safeSkips === 1 ? "" : "es"} and stay ≥ 75%.
              </div>
            ` : ""}
          </div>
        `;
      }).join("")}
    `;
  } else if (state.taskId === "fine") {
    const unpaid = state.fines.filter(f => !f.paid);
    const selectedTotal = unpaid.filter(f => f.selected).reduce((s, f) => s + f.amount, 0);

    bodyHtml = `
      <div class="outcome-banner info">
        <div class="small">Student Accounts Ledger · ${escapeHtml(state.studentId)}</div>
        <div class="metric navy">₹${unpaid.reduce((s, f) => s + f.amount, 0)}</div>
        <b>${unpaid.length ? `${unpaid.length} Pending Fine(s)` : "All Dues Cleared!"}</b>
        <div class="small">${unpaid.length ? "Select items below to complete a simulated payment." : "No outstanding balance remains on your account."}</div>
      </div>

      ${state.fines.map(f => `
        <div class="fine-card">
          <div class="fine-head">
            <label style="display:flex;align-items:center;gap:9px;cursor:pointer">
              <input type="checkbox" data-fine-id="${f.id}" ${f.selected ? "checked" : ""} ${f.paid ? "disabled" : ""} />
              <div>
                <b>${f.title}</b>
                <div class="small">${f.id} · ${f.paid ? "Paid" : f.due}</div>
              </div>
            </label>
            <span class="badge ${f.paid ? "green" : "red"}">${f.paid ? "PAID" : `₹${f.amount}`}</span>
          </div>
        </div>
      `).join("")}

      ${unpaid.length ? `
        <div class="panel">
          <b>Payment Method</b>
          <div class="choice-row" style="margin-bottom:6px">
            ${["UPI", "Debit Card", "NetBanking"].map(m => `
              <button class="choice-btn ${state.paymentMethod === m ? "selected" : ""}" data-pay-method="${m}" type="button">${m}</button>
            `).join("")}
          </div>
          <button class="btn" id="payNowBtn" type="button" ${selectedTotal === 0 ? "disabled" : ""}>
            Pay ₹${selectedTotal} via ${state.paymentMethod}
          </button>
        </div>
      ` : ""}

      ${state.lastReceipt ? `
        <div class="outcome-banner">
          <b>Payment Receipt Generated ✓</b>
          <div class="small">Ref: <b>${state.lastReceipt.ref}</b> · Paid ₹${state.lastReceipt.amount} via ${state.lastReceipt.method} at ${state.lastReceipt.time}</div>
        </div>
      ` : ""}
    `;
  } else {
    bodyHtml = `
      <div class="outcome-banner info">
        <div class="small">Campus Booking Portal · ${escapeHtml(state.studentId)}</div>
        <div class="metric navy">${state.confirmedBooking ? "Booked ✓" : "Available"}</div>
        <b>${state.confirmedBooking ? state.confirmedBooking.facility : "Choose Facility, Date & Time"}</b>
        <div class="small">${state.confirmedBooking ? `Pass ${state.confirmedBooking.code} · ${state.confirmedBooking.date} at ${state.confirmedBooking.slot}` : "Pick an open slot to reserve instantly."}</div>
      </div>

      <div class="panel">
        <label class="small" for="facilitySelect" style="font-weight:700;display:block;margin-bottom:5px">Facility / Service</label>
        <select id="facilitySelect" class="text-input" style="margin-bottom:10px">
          ${FACILITIES_DATA.map(fac => `
            <option value="${fac.id}" ${state.bookingFacility === fac.id ? "selected" : ""}>${fac.name} (${fac.location})</option>
          `).join("")}
        </select>

        <label class="small" for="bookingDateInput" style="font-weight:700;display:block;margin-bottom:5px">Date</label>
        <input id="bookingDateInput" class="text-input" type="date" value="${state.bookingDate}" style="margin-bottom:10px" />

        <div class="small" style="font-weight:700">Available Time Slots</div>
        <div class="slot-grid">
          ${TIME_SLOTS.map(s => `
            <button class="slot-btn ${state.bookingSlot === s.time ? "selected" : ""}" data-slot-time="${s.time}" ${s.free ? "" : "disabled"} type="button">
              ${s.time}${s.free ? "" : " (Full)"}
            </button>
          `).join("")}
        </div>
        <button class="btn" id="confirmSlotBtn" type="button">Confirm Slot Reservation</button>
      </div>
    `;
  }

  elScreen.innerHTML = `
    <div class="eyebrow">Task outcome</div>
    <h1>${t.outcomeTitle}</h1>
    ${bodyHtml}
    <div class="btn-row">
      <button class="btn secondary" id="tryAnotherBtn" type="button">Try Another Task</button>
      <button class="btn" id="toFeedbackBtn" type="button">Submit Feedback →</button>
    </div>
  `;

  // Wire up interactive outcome listeners
  elScreen.querySelectorAll("[data-toggle-course]").forEach(el => {
    el.addEventListener("click", () => {
      state.expandedCourse = state.expandedCourse === el.dataset.toggleCourse ? null : el.dataset.toggleCourse;
      renderOutcome();
    });
  });

  elScreen.querySelectorAll("[data-fine-id]").forEach(chk => {
    chk.addEventListener("change", () => {
      const fine = state.fines.find(f => f.id === chk.dataset.fineId);
      if (fine) fine.selected = chk.checked;
      renderOutcome();
    });
  });

  elScreen.querySelectorAll("[data-pay-method]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.paymentMethod = btn.dataset.payMethod;
      renderOutcome();
    });
  });

  const payBtn = document.getElementById("payNowBtn");
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      let paidAmt = 0;
      state.fines.forEach(f => {
        if (!f.paid && f.selected) {
          f.paid = true;
          f.selected = false;
          paidAmt += f.amount;
        }
      });
      state.lastReceipt = {
        ref: "TXN-" + Math.floor(100000 + Math.random() * 900000),
        amount: paidAmt,
        method: state.paymentMethod,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      renderOutcome();
    });
  }

  const facSel = document.getElementById("facilitySelect");
  if (facSel) {
    facSel.addEventListener("change", (e) => {
      state.bookingFacility = e.target.value;
    });
  }
  const dateInp = document.getElementById("bookingDateInput");
  if (dateInp) {
    dateInp.addEventListener("change", (e) => {
      state.bookingDate = e.target.value;
    });
  }
  elScreen.querySelectorAll("[data-slot-time]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.bookingSlot = btn.dataset.slotTime;
      renderOutcome();
    });
  });
  const confirmSlotBtn = document.getElementById("confirmSlotBtn");
  if (confirmSlotBtn) {
    confirmSlotBtn.addEventListener("click", () => {
      const fac = FACILITIES_DATA.find(f => f.id === state.bookingFacility);
      state.confirmedBooking = {
        facility: fac ? fac.name : "Campus Facility",
        date: state.bookingDate,
        slot: state.bookingSlot,
        code: "BK-" + Math.floor(1000 + Math.random() * 9000)
      };
      renderOutcome();
    });
  }

  document.getElementById("tryAnotherBtn").addEventListener("click", () => go(2));
  document.getElementById("toFeedbackBtn").addEventListener("click", () => go(7));
}

function renderFeedback() {
  const t = TASKS[state.taskId];
  const ratings = ["Very difficult", "Difficult", "Neutral", "Easy", "Very easy"];

  elScreen.innerHTML = `
    <div class="eyebrow">Submit user feedback</div>
    <h1>Your feedback</h1>
    <p>How easy was it to navigate to <b>${t.name}</b> (${t.portal})?</p>

    <div class="choice-row">
      ${ratings.map((label, idx) => `
        <button class="choice-btn ${state.rating === idx + 1 ? "selected" : ""}" data-rating="${idx + 1}" type="button">${label}</button>
      `).join("")}
    </div>

    <b>Was the step-by-step guidance helpful?</b>
    <div class="choice-row">
      ${["Yes", "No"].map(val => `
        <button class="choice-btn ${state.helpful === val ? "selected" : ""}" data-helpful="${val}" type="button">${val}</button>
      `).join("")}
    </div>

    <label for="suggestionBox" style="display:block;font-weight:700;margin-bottom:6px">What could be improved?</label>
    <textarea id="suggestionBox" placeholder="Write your suggestion...">${escapeHtml(state.suggestion)}</textarea>

    <button class="btn" id="submitFbBtn" type="button">Submit Feedback</button>

    ${state.feedbackSubmitted ? `
      <div class="outcome-banner" style="margin-top:12px">
        <b>Thank you! Journey Complete (End) ✓</b>
        <div class="small">Your feedback for <b>${t.name}</b> has been saved locally.</div>
        <button class="btn secondary" id="finishRestartBtn" type="button" style="margin-top:10px">Back to Dashboard</button>
      </div>
    ` : ""}

    ${state.feedbackHistory.length ? `
      <div class="panel" style="margin-top:12px">
        <b>Recent Saved Feedback (${state.feedbackHistory.length})</b>
        ${state.feedbackHistory.map(item => `
          <div class="small" style="padding-top:6px;border-top:1px dashed var(--line);margin-top:6px">
            <b>${escapeHtml(item.task)}</b> · Rating: ${item.rating || "—"}/5 · Helpful: ${item.helpful || "—"}
            ${item.suggestion ? `<div>“${escapeHtml(item.suggestion)}”</div>` : ""}
          </div>
        `).join("")}
      </div>
    ` : ""}
  `;

  elScreen.querySelectorAll("[data-rating]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.rating = Number(btn.dataset.rating);
      renderFeedback();
    });
  });

  elScreen.querySelectorAll("[data-helpful]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.helpful = btn.dataset.helpful;
      renderFeedback();
    });
  });

  document.getElementById("suggestionBox").addEventListener("input", (e) => {
    state.suggestion = e.target.value;
  });

  document.getElementById("submitFbBtn").addEventListener("click", () => {
    const entry = {
      task: t.name,
      rating: state.rating,
      helpful: state.helpful || "Not specified",
      suggestion: state.suggestion.trim(),
      at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    saveFeedback(entry);
    state.feedbackSubmitted = true;
    state.suggestion = "";
    render();
  });

  const finishBtn = document.getElementById("finishRestartBtn");
  if (finishBtn) {
    finishBtn.addEventListener("click", () => go(1));
  }
}

function updateFlowchartHighlight() {
  const screenToNode = {
    0: "welcome",
    1: "dashboard",
    2: "select",
    3: "details",
    4: "guidance",
    5: state.portalPhase === "reached" ? "intended" : "redirect",
    6: "outcome",
    7: state.feedbackSubmitted ? "end" : "feedback"
  };
  const activeNode = screenToNode[state.screen];

  document.querySelectorAll(".fc-node").forEach(n => {
    n.classList.remove("active", "visited");
    if (n.dataset.node === activeNode) {
      n.classList.add("active");
    }
  });

  document.querySelectorAll(".fc-branch").forEach(b => {
    b.classList.toggle("active-branch", state.screen >= 2 && b.dataset.branch === state.taskId);
  });

  document.querySelectorAll(".branch-btn").forEach(b => {
    b.classList.toggle("active", state.screen === 2 && b.dataset.task === state.taskId);
  });

  const labelMap = {
    welcome: "Welcome Screen",
    dashboard: "Student Dashboard",
    select: "Select a Task",
    details: "View Task Details",
    guidance: "Step-by-Step Guidance",
    redirect: "Redirect to Portal",
    intended: "Intended Task Page",
    outcome: "Task Outcome",
    feedback: "Submit User Feedback",
    end: "Journey Complete"
  };
  elFlowLabel.textContent = labelMap[activeNode] || "UMS Flow";
}

function calcOverallAttendance() {
  const att = COURSES_DATA.reduce((s, c) => s + c.attended, 0);
  const tot = COURSES_DATA.reduce((s, c) => s + c.total, 0);
  return Math.round((att / tot) * 100);
}

function openHelpModal() {
  const modal = document.getElementById("helpModal");
  const body = document.getElementById("helpModalBody");
  body.innerHTML = `
    <div class="eyebrow">All Seven University Portals</div>
    <p class="small">Jump directly to any supported workflow or explore the directory.</p>
    <div style="margin-bottom:14px">
      ${SEVEN_PORTALS.map(p => `
        <div class="panel" style="padding:10px 12px;margin-bottom:8px">
          <b>${p.name}</b> <span class="small">(${p.domain})</span>
          <div class="small">${p.purpose}</div>
        </div>
      `).join("")}
    </div>
    <div class="eyebrow" style="margin-bottom:8px">Frequently Asked Questions</div>
    ${FAQS.map(f => `
      <details class="faq">
        <summary>${f.q}</summary>
        <p class="small" style="margin:6px 0 0">${f.a}</p>
      </details>
    `).join("")}
  `;
  modal.hidden = false;
}

function closeHelpModal() {
  document.getElementById("helpModal").hidden = true;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Global controls
elBackBtn.addEventListener("click", () => go(state.screen - 1));
document.getElementById("helpQuickBtn").addEventListener("click", openHelpModal);
document.getElementById("closeHelpBtn").addEventListener("click", closeHelpModal);
document.getElementById("helpModal").addEventListener("click", (e) => {
  if (e.target.id === "helpModal") closeHelpModal();
});
document.getElementById("resetDemoBtn").addEventListener("click", () => {
  state.feedbackSubmitted = false;
  go(0);
});
document.getElementById("toggleFlowBtn").addEventListener("click", () => {
  document.getElementById("workspaceGrid").classList.toggle("flow-hidden");
});

// Flowchart interactive clicking
document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.go;
    if (target === "5b") {
      go(5, { portalPhase: "reached" });
    } else {
      go(Number(target));
    }
  });
});

document.querySelectorAll("[data-task]").forEach(btn => {
  btn.addEventListener("click", () => {
    go(3, { taskId: btn.dataset.task });
  });
});

// Live status clock
function updateClock() {
  const el = document.getElementById("clockText");
  if (el) {
    el.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
}
updateClock();
setInterval(updateClock, 30000);

render();
