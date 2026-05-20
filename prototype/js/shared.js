/* ══════════════════════════════════════════════════════
   PKSF · ANTARIOUS AI — Shared JavaScript
   ══════════════════════════════════════════════════════ */

/* ── THEME ── */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('pksf-theme', isDark ? 'light' : 'dark');
  const btn = document.getElementById('theme-btn');
  if (btn) btn.innerHTML = isDark ? svgIcon('moon') : svgIcon('sun');
  toast('Switched to ' + (isDark ? 'Light' : 'Dark') + ' Mode', '', 'a');
}

/* ── ROLES ── */
const PKSF_ROLES = {
  director: {
    initials: 'AH', name: 'Dr. Anisul Haque', role: 'Managing Director',
    grad: 'linear-gradient(135deg,#005C2B,#00A651)',
    greeting: 'Good morning, Dr. Haque 👋',
    intro: 'Freya has analysed your morning data. There are <strong>3 partner alerts</strong>, <strong>2 reports</strong> ready for your review, and <strong>1 approval</strong> needed before end of day. Your portfolio PAR30 improved by 0.6% this quarter.',
    asks: [
      { label: '📋 What needs my attention?',     q: 'What needs my attention today?' },
      { label: '📊 Portfolio summary',            q: "Summarise this week's portfolio performance" },
      { label: '📄 Upcoming deadlines',           q: 'Which reports are due soon?' },
      { label: '✍️ Morning brief',                q: 'Draft my morning brief' }
    ]
  },
  programme: {
    initials: 'RB', name: 'Rowshan Begum', role: 'Programme Officer · USSP',
    grad: 'linear-gradient(135deg,#2563eb,#60a5fa)',
    greeting: 'Good morning, Ms. Begum 👋',
    intro: 'Freya has updated programme data overnight. <strong>USSP enrolment is at 82%</strong> of its Q3 target with <strong>2,04,832 households</strong> reached. <strong>Rajshahi division is lagging</strong> at 71% food security milestone — recommended field visit within 14 days.',
    asks: [
      { label: '🌾 USSP progress',                q: 'Give me a status update on USSP enrolment' },
      { label: '👨‍👩‍👧 Beneficiary milestones',     q: 'Which beneficiary milestones have we hit this quarter?' },
      { label: '📍 Field visit plan',             q: 'Plan a field visit to Rajshahi for next week' },
      { label: '📋 Donor narrative',              q: 'Draft the IFAD PACE-II narrative section for Component 2' }
    ]
  },
  finance: {
    initials: 'MR', name: 'Mohammad Rashid', role: 'Finance Officer',
    grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
    greeting: 'Good morning, Mr. Rashid 👋',
    intro: 'Freya has reconciled overnight transactions. <strong>May payroll (৳8.42 Cr)</strong> awaits MD sign-off, <strong>KfW Tranche 3 (৳29.75 Cr)</strong> is credited, and <strong>budget utilisation is at 74%</strong>. The Bangladesh Bank quarterly return is auto-filled — 4 fields need verification.',
    asks: [
      { label: '💰 Budget utilisation',           q: 'Show me current budget utilisation by programme' },
      { label: '🧾 Payroll status',               q: 'What is the status of the May payroll approval?' },
      { label: '🏦 Donor disbursements',          q: 'Which donor disbursements are pending?' },
      { label: '📋 MRA return',                   q: 'Help me complete the Bangladesh Bank MRA return' }
    ]
  }
};

/* Sidebar permissions per role — list of allowed page hrefs.
   null = full access (sees everything). */
const PKSF_ROLE_PERMS = {
  director:  null,
  programme: ['dashboard.html', 'partners.html', 'portfolio.html', 'programs.html', 'beneficiaries.html', 'reports.html', 'agents.html', 'notifications.html', 'index.html'],
  finance:   ['dashboard.html', 'partners.html', 'portfolio.html', 'reports.html', 'finance.html', 'notifications.html', 'index.html']
};

function getCurrentRole() {
  return localStorage.getItem('pksf-role') || 'director';
}

function applyRoleToTopbar() {
  const current = getCurrentRole();
  const r = PKSF_ROLES[current];
  if (!r) return;
  document.querySelectorAll('.tb-user').forEach(el => {
    const av = el.querySelector('.tb-av');
    const uname = el.querySelector('.tb-uname');
    const urole = el.querySelector('.tb-urole');
    if (av) { av.textContent = r.initials; av.style.background = r.grad; }
    if (uname) uname.textContent = r.name;
    if (urole) urole.textContent = r.role;
  });
  document.querySelectorAll('#role-menu .role-menu-item[data-role]').forEach(item => {
    const check = item.querySelector('.role-check');
    if (check) check.classList.toggle('on', item.dataset.role === current);
  });
}

/* Update the welcome banner content per current role (dashboard only) */
function applyRoleToWelcome() {
  const r = PKSF_ROLES[getCurrentRole()];
  if (!r) return;
  const g = document.getElementById('welcome-greeting');
  if (g && r.greeting) g.innerHTML = r.greeting;
  const t = document.getElementById('welcome-text');
  if (t && r.intro) t.innerHTML = r.intro;
  const asks = document.getElementById('welcome-asks');
  if (asks && r.asks) {
    asks.innerHTML = r.asks.map(a =>
      `<button class="wb-ask-btn" onclick="fpQuick('${(a.q || '').replace(/'/g, "\\'")}')">${a.label}</button>`
    ).join('');
  }
}

/* Hide sidebar nav items based on role permissions, and hide empty section labels */
function applyRoleSidebar() {
  const perms = PKSF_ROLE_PERMS[getCurrentRole()];
  const navLinks = document.querySelectorAll('#sidebar .sb-inner > a');
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    const allowed = !perms || perms.includes(href);
    a.style.display = allowed ? '' : 'none';
  });
  // Hide section labels with no visible items below
  const kids = [...document.querySelectorAll('#sidebar .sb-inner > *')];
  for (let i = 0; i < kids.length; i++) {
    const el = kids[i];
    if (!el.classList.contains('sb-section-label')) continue;
    let hasVisible = false;
    for (let j = i + 1; j < kids.length; j++) {
      const next = kids[j];
      if (next.classList.contains('sb-section-label')) break;
      if (next.tagName === 'A' && next.style.display !== 'none') { hasVisible = true; break; }
    }
    el.style.display = hasVisible ? '' : 'none';
  }
}

/* Hide page sections marked with data-roles that exclude the current role */
function applyRoleDashboard() {
  const role = getCurrentRole();
  document.querySelectorAll('[data-roles]').forEach(el => {
    const allowed = el.dataset.roles.split(/\s+/).filter(Boolean);
    el.style.display = allowed.includes(role) ? '' : 'none';
  });
}

/* Single entry point — apply every role-driven change */
function applyRole() {
  applyRoleToTopbar();
  applyRoleToWelcome();
  applyRoleSidebar();
  applyRoleDashboard();
}

function switchRole(roleKey) {
  if (!PKSF_ROLES[roleKey]) return;
  localStorage.setItem('pksf-role', roleKey);
  applyRole();
  if (typeof getLang === 'function' && getLang() === 'bn') {
    translateElement(document.body, 'bn');
  }
  closeRoleMenu();
  const r = PKSF_ROLES[roleKey];
  toast(`Switched to ${r.name}`, '', 'g');
}

function toggleRoleMenu(evt) {
  if (evt) evt.stopPropagation();
  const menu = document.getElementById('role-menu');
  if (!menu) return;
  menu.classList.toggle('open');
}

function closeRoleMenu() {
  const menu = document.getElementById('role-menu');
  if (menu) menu.classList.remove('open');
}

/* ── Inject language toggle button + role dropdown into existing topbar ── */
function injectTopbarWidgets() {
  const controls = document.querySelector('.tb-controls');
  if (!controls) return;

  // Language toggle button
  if (!document.getElementById('lang-btn')) {
    const langBtn = document.createElement('div');
    langBtn.id = 'lang-btn';
    langBtn.className = 'tb-icon-btn lang-btn';
    langBtn.title = 'Switch Language';
    langBtn.setAttribute('onclick', 'toggleLang()');
    const initialLang = (typeof getLang === 'function') ? getLang() : 'en';
    langBtn.innerHTML = svgIcon('languages') + `<span class="lang-btn-text">${initialLang === 'bn' ? 'বাং' : 'EN'}</span>`;
    // Insert before theme button
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) controls.insertBefore(langBtn, themeBtn);
    else controls.appendChild(langBtn);
  }

  // Convert .tb-user to a clickable wrapper with dropdown
  const userEl = controls.querySelector('.tb-user');
  if (userEl && !userEl.dataset.roleWired) {
    userEl.dataset.roleWired = '1';
    userEl.style.position = 'relative';
    userEl.setAttribute('onclick', 'toggleRoleMenu(event)');

    // Add chevron
    if (!userEl.querySelector('.tb-user-chev')) {
      const chev = document.createElement('span');
      chev.className = 'tb-user-chev';
      chev.innerHTML = svgIcon('chevron-down');
      userEl.appendChild(chev);
    }

    // Add dropdown menu
    if (!document.getElementById('role-menu')) {
      const menu = document.createElement('div');
      menu.id = 'role-menu';
      menu.className = 'role-menu';
      menu.innerHTML = `
        <div class="role-menu-label">Switch Role</div>
        ${Object.entries(PKSF_ROLES).map(([k, r]) => `
          <div class="role-menu-item" data-role="${k}" onclick="event.stopPropagation();switchRole('${k}')">
            <div class="role-av" style="background:${r.grad}">${r.initials}</div>
            <div class="role-info">
              <div class="role-name">${r.name}</div>
              <div class="role-sub">${r.role}</div>
            </div>
            <span class="role-check ${getCurrentRole() === k ? 'on' : ''}">${svgIcon('check')}</span>
          </div>
        `).join('')}
        <div class="role-menu-divider"></div>
        <a href="index.html" class="role-menu-item role-menu-signout">
          <span class="role-menu-ic">${svgIcon('log-out')}</span>
          <span>Sign Out</span>
        </a>
      `;
      userEl.appendChild(menu);
    }
  }

  applyRole();

  // ── Notification dropdown ──
  // Find the bell icon button (the .tb-icon-btn that contains .tb-ndot)
  const notifDot = controls.querySelector('.tb-icon-btn .tb-ndot');
  const notifBtn = notifDot ? notifDot.parentElement : null;
  if (notifBtn && !notifBtn.dataset.notifWired) {
    notifBtn.dataset.notifWired = '1';
    notifBtn.id = notifBtn.id || 'notif-btn';
    notifBtn.style.position = 'relative';
    notifBtn.removeAttribute('onclick');
    notifBtn.setAttribute('onclick', 'toggleNotifMenu(event)');
    notifBtn.setAttribute('title', 'Notifications');

    if (!document.getElementById('notif-menu')) {
      const items = PKSF_NOTIFICATIONS.map(n => `
        <a class="notif-menu-item ${n.unread ? 'unread' : ''}" href="${n.href}" onclick="event.stopPropagation()">
          <div class="notif-menu-ic notif-menu-ic-${n.tone}">${svgIcon(n.icon)}</div>
          <div class="notif-menu-body">
            <div class="notif-menu-title">${n.title}</div>
            <div class="notif-menu-desc">${n.desc}</div>
            <div class="notif-menu-time">${n.time}</div>
          </div>
        </a>`).join('');
      const menu = document.createElement('div');
      menu.id = 'notif-menu';
      menu.className = 'notif-menu';
      menu.innerHTML = `
        <div class="notif-menu-header">
          <div class="notif-menu-label">Notifications</div>
          <span class="notif-menu-count">${PKSF_NOTIFICATIONS.filter(n => n.unread).length} unread</span>
        </div>
        <div class="notif-menu-list">${items}</div>
        <a href="notifications.html" class="notif-menu-footer">View all notifications →</a>
      `;
      notifBtn.appendChild(menu);
    }
  }

  // Close dropdowns on outside click
  if (!window.__pksfRoleMenuWired) {
    window.__pksfRoleMenuWired = true;
    document.addEventListener('click', e => {
      const roleMenu = document.getElementById('role-menu');
      if (roleMenu && roleMenu.classList.contains('open') && !e.target.closest('.tb-user')) {
        closeRoleMenu();
      }
      const notifMenu = document.getElementById('notif-menu');
      if (notifMenu && notifMenu.classList.contains('open') && !e.target.closest('#notif-btn,[data-notif-wired]')) {
        notifMenu.classList.remove('open');
      }
    });
  }
}

/* ── NOTIFICATION DROPDOWN ── */
const PKSF_NOTIFICATIONS = [
  { tone:'warn',   icon:'alert-triangle', title:'Critical PAR90 Breach — BURO Bangladesh', desc:'PAR90 at 8.7%, exceeds 7% threshold. Action required.', time:'08:42 AM', unread:true,  href:'partners.html' },
  { tone:'action', icon:'clipboard-list', title:'IFAD PACE-II Report Due in 3 Days',       desc:'Quarterly report 52% complete. Components 2 & 3 pending.', time:'07:15 AM', unread:true, href:'reports.html' },
  { tone:'alert',  icon:'wallet',         title:'May Payroll Ready for Approval',          desc:'৳8.42 Cr · 612 staff · MD approval needed before May 25.',  time:'06:00 AM', unread:true,  href:'finance.html' },
  { tone:'info',   icon:'bot',            title:'Portfolio Health Report Generated',       desc:'Q1 FY2026 · PAR30 improved 0.3% QoQ across 276 POs.',     time:'05:30 AM', unread:true,  href:'reports.html' },
  { tone:'alert',  icon:'building',       title:'12 POs Above PAR30 Threshold',            desc:'Weekly scan flagged 12 partner orgs · 3 critical.',       time:'12:00 AM', unread:true,  href:'partners.html' }
];

function toggleNotifMenu(evt) {
  if (evt) evt.stopPropagation();
  const menu = document.getElementById('notif-menu');
  if (!menu) return;
  closeRoleMenu();
  menu.classList.toggle('open');
}

/* ── Persist theme across pages ── */
function applyStoredTheme() {
  const t = localStorage.getItem('pksf-theme');
  if (t === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.innerHTML = svgIcon('sun');
  }
}

/* ── OPERATION MODE ── */
function setMode(m) {
  const btns = document.querySelectorAll('.mode-btn');
  btns.forEach(b => b.classList.remove('on'));
  const target = document.querySelector(`.mode-btn[data-mode="${m}"]`);
  if (target) target.classList.add('on');
  const statusText = document.getElementById('freya-status-text');
  if (statusText) {
    if (m === 'full')   statusText.innerHTML = '<strong>Freya</strong> is running Full Auto — executing 6 tasks autonomously';
    if (m === 'semi')   statusText.innerHTML = '<strong>Freya</strong> is analysing Q3 portfolio data — report 78% complete';
    if (m === 'manual') statusText.innerHTML = '<strong>Freya</strong> is on standby — Manual Mode active. Click to ask for help.';
  }
  const labels = {
    full:   'Full Auto — Freya executes all approved tasks automatically',
    semi:   'Semi-Auto — Freya proposes actions, you approve before execution',
    manual: 'Manual Mode — You control everything. Freya is on standby.'
  };
  toast(labels[m], '⚡', 'g');
}

/* ── TOAST ── */
function toast(msg, ic = '', type = 'g') {
  let c = document.getElementById('toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  // Map type to default icon if no icon char provided
  const defaultByType = { g: 'check-circle', a: 'alert-triangle', r: 'x-circle' };
  let icHtml;
  if (ic && typeof svgIcon === 'function') {
    icHtml = ic;  // pass-through; emoji walker will convert
  } else {
    icHtml = (typeof svgIcon === 'function') ? svgIcon(defaultByType[type] || 'check-circle') : '';
  }
  t.innerHTML = `<span class="toast-ic">${icHtml}</span><div>${msg}</div>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(20px)';
    t.style.transition = 'all .3s';
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

/* ── FREYA CHAT PANEL ── */
const PKSF_FREYA_REPLIES = [
  "Based on my analysis of this morning's data, <strong>12 Partner Organizations have PAR30 above the 5% threshold</strong>. Highest risk: Shapla Credit Society (Jessore) at 11.2% PAR30. I've prepared a field verification report — want me to add it to your review queue?",
  "The USSP programme is currently at <strong>78% of its quarterly target</strong> with 41 days remaining. Mymensingh and Sylhet divisions are on track; Rajshahi is lagging at 61%. I recommend scheduling a corrective action call with the Rajshahi regional team.",
  "Your IFAD PACE-II progress report is <strong>due in 14 days</strong>. I've already populated the indicator tables and financial utilisation summary from live data. I need your input on the narrative sections before I can finalise the draft. Shall I open the draft now?",
  "I've identified a <strong>BDT 2.3 crore procurement saving opportunity</strong>: 3 of your active vendors submitted overlapping quotes for office equipment. I can run a comparison analysis and recommend consolidation to the lowest-cost qualified supplier.",
  "Looking at this quarter's loan portfolio, <strong>portfolio quality has improved</strong> — PAR30 down from 4.8% to 4.2% overall. The improvement is driven by strong performance in Khulna and Chittagong divisions. Rangpur remains a watch area at 6.1% PAR30.",
  "Your April payroll for <strong>612 PKSF staff members</strong> is ready for approval. I've cross-checked attendance records — there are 3 anomalies (2 leave discrepancies, 1 overtime query) that need your review before I generate the payment files.",
  "I've completed the <strong>ENRICH programme quarterly synthesis</strong> across 120 pilot unions. Key finding: 89% of ultra-poor households have achieved 'Food Security' milestone. 23 unions need immediate attention for livelihood diversification support.",
  "Based on Bangladesh Bank MRA reporting requirements, I've pre-filled <strong>14 of the 18 data fields</strong> for the Q3 regulatory submission. The remaining 4 fields require manual verification from partner POs. Deadline: 15 working days."
];

let freya_reply_idx = 0;
let freya_open = false;

function openFreya() {
  freya_open = true;
  const panel = document.getElementById('freya-panel');
  if (panel) panel.classList.add('open');
  const msgs = document.getElementById('fp-msgs');
  if (msgs && msgs.children.length === 0) {
    addFreyaMsg('system', 'আস্সালামুয়ালাইকুম! I\'m ready to help. I\'m currently managing <strong>8 active tasks</strong> across PKSF\'s programmes and partner network. What would you like to know?');
  }
  const input = document.getElementById('fp-input');
  if (input) input.focus();
}

function closeFreya() {
  freya_open = false;
  const panel = document.getElementById('freya-panel');
  if (panel) panel.classList.remove('open');
}

function addFreyaMsg(role, text) {
  const c = document.getElementById('fp-msgs');
  if (!c) return;
  const div = document.createElement('div');
  if (role === 'system') {
    div.innerHTML = `
      <div style="margin-bottom:4px">
        <span style="font-family:var(--mono);font-size:8px;font-weight:700;color:var(--pri)">FREYA · AI ASSISTANT</span>
      </div>
      <div style="background:var(--card2);border:1px solid var(--border);border-radius:10px 10px 10px 2px;padding:10px 12px;font-size:12px;color:var(--tx2);line-height:1.65">${text}</div>`;
  } else {
    div.innerHTML = `
      <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
        <span style="font-family:var(--mono);font-size:8px;font-weight:700;color:var(--tx3)">YOU</span>
      </div>
      <div style="background:rgba(0,92,43,.08);border:1px solid rgba(0,92,43,.2);border-radius:10px 10px 2px 10px;padding:10px 12px;font-size:12px;color:var(--tx);line-height:1.65;text-align:right">${text}</div>`;
  }
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

function fpSend() {
  const inp = document.getElementById('fp-input');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  addFreyaMsg('user', msg);
  inp.value = '';
  setTimeout(() => {
    addFreyaMsg('system', PKSF_FREYA_REPLIES[freya_reply_idx++ % PKSF_FREYA_REPLIES.length]);
  }, 750);
}

function fpQuick(q) {
  if (!freya_open) openFreya();
  setTimeout(() => {
    addFreyaMsg('user', q);
    setTimeout(() => addFreyaMsg('system', PKSF_FREYA_REPLIES[freya_reply_idx++ % PKSF_FREYA_REPLIES.length]), 700);
  }, 200);
}

/* ── OUTPUT MODAL ── */
const OUTPUT_DATA = {
  'portfolio-health': {
    agent: 'LOAN & PORTFOLIO MONITOR · FINANCE INTELLIGENCE',
    title: 'Portfolio Health Report — Q3 FY 2025-26',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৳28,450 Cr</div><div class="out-stat-lbl">Total Active Portfolio</div><div class="out-stat-sub">276 Partner Orgs</div></div>
        <div class="out-stat"><div class="out-stat-val am">4.2%</div><div class="out-stat-lbl">PAR30 (Portfolio)</div><div class="out-stat-sub">Target: &lt;5% ✓</div></div>
        <div class="out-stat"><div class="out-stat-val">1.8%</div><div class="out-stat-lbl">PAR90</div><div class="out-stat-sub">Within tolerance</div></div>
      </div>
      <div class="freya-box" style="margin-bottom:14px">
        <div class="freya-box-ic">🤖</div>
        <div>
          <div class="freya-box-label">Freya Analysis</div>
          <div class="freya-box-text">Overall portfolio quality has <strong>improved by 0.6 percentage points</strong> vs Q2. Khulna and Chittagong divisions lead with PAR30 below 3%. Rangpur Division requires monitoring — PAR30 at 6.1% driven by post-flood income disruption in 3 POs. Recommend activating humanitarian reclassification protocol for affected borrowers.</div>
        </div>
      </div>
      <div class="sheet-view">
        <table class="sheet">
          <tr><th>Division</th><th>Active POs</th><th>Borrowers</th><th>Portfolio (BDT Cr)</th><th>PAR30</th><th>PAR90</th><th>Status</th></tr>
          <tr><td>Dhaka</td><td>52</td><td>18.2 lac</td><td>৳5,840 Cr</td><td style="color:var(--pri)">3.8%</td><td>1.6%</td><td><span class="badge badge-g">Healthy</span></td></tr>
          <tr><td>Chittagong</td><td>38</td><td>14.1 lac</td><td>৳4,520 Cr</td><td style="color:var(--pri)">2.9%</td><td>1.1%</td><td><span class="badge badge-g">Healthy</span></td></tr>
          <tr><td>Rajshahi</td><td>41</td><td>12.8 lac</td><td>৳4,110 Cr</td><td style="color:var(--am)">4.7%</td><td>2.0%</td><td><span class="badge badge-a">Monitor</span></td></tr>
          <tr><td>Khulna</td><td>35</td><td>11.4 lac</td><td>৳3,650 Cr</td><td style="color:var(--pri)">2.6%</td><td>0.9%</td><td><span class="badge badge-g">Healthy</span></td></tr>
          <tr><td>Sylhet</td><td>28</td><td>8.9 lac</td><td>৳2,850 Cr</td><td style="color:var(--am)">4.4%</td><td>1.8%</td><td><span class="badge badge-a">Monitor</span></td></tr>
          <tr><td>Barisal</td><td>26</td><td>7.6 lac</td><td>৳2,440 Cr</td><td style="color:var(--pri)">3.2%</td><td>1.4%</td><td><span class="badge badge-g">Healthy</span></td></tr>
          <tr><td>Rangpur</td><td>32</td><td>10.2 lac</td><td>৳3,270 Cr</td><td style="color:var(--rd)">6.1%</td><td>2.8%</td><td><span class="badge badge-r">⚠ At Risk</span></td></tr>
          <tr><td>Mymensingh</td><td>24</td><td>7.0 lac</td><td>৳1,770 Cr</td><td style="color:var(--pri)">3.4%</td><td>1.5%</td><td><span class="badge badge-g">Healthy</span></td></tr>
          <tr class="total"><td><strong>TOTAL</strong></td><td><strong>276</strong></td><td><strong>90.2 lac</strong></td><td><strong>৳28,450 Cr</strong></td><td><strong>4.2%</strong></td><td><strong>1.8%</strong></td><td></td></tr>
        </table>
      </div>`
  },
  'ussp-report': {
    agent: 'PROGRAMME INTELLIGENCE · M&E REPORT GENERATOR',
    title: 'USSP Programme — Q3 Progress Report FY 2025-26',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">2,04,832</div><div class="out-stat-lbl">HHs Enrolled</div><div class="out-stat-sub">Target: 2,50,000</div></div>
        <div class="out-stat"><div class="out-stat-val am">82%</div><div class="out-stat-lbl">Target Achievement</div><div class="out-stat-sub">Q3 FY 2025-26</div></div>
        <div class="out-stat"><div class="out-stat-val">89%</div><div class="out-stat-lbl">Food Security Rate</div><div class="out-stat-sub">↑ 4% from Q2</div></div>
      </div>
      <div class="out-finding">
        <div class="out-finding-header">🤖 <strong>Freya Programme Intelligence — Key Findings</strong></div>
        <div class="out-quote">Mymensingh Division leads ultra-poor graduation outcomes with 94% food security milestone achievement. The programme is on track to meet the annual target. Rajshahi remains below trajectory — recommend additional field officer deployment and livelihood package diversification for the January-March quarter.</div>
      </div>
      <div class="out-item"><span style="font-size:13px">📍</span><div><strong>Milestone: Food Security Achieved</strong> — 1,82,301 households (89%)</div></div>
      <div class="out-item"><span style="font-size:13px">📍</span><div><strong>Milestone: Savings Group Member</strong> — 1,94,590 households (95%)</div></div>
      <div class="out-item"><span style="font-size:13px">📍</span><div><strong>Milestone: Livelihood Asset Received</strong> — 2,04,832 households (100%)</div></div>
      <div class="out-item"><span style="font-size:13px">⚠️</span><div><strong>At Risk — Rajshahi Division:</strong> Only 71% food security achievement. Recommend field visit within 14 days.</div></div>`,
    fullDoc: `<div class="doc-view">
      <div class="doc-header">
        <div class="doc-org">Palli Karma-Sahayak Foundation (PKSF) · Programme Intelligence System</div>
        <div class="doc-title">USSP Programme — Quarterly Progress Report · Q3 FY 2025-26</div>
        <div class="doc-meta"><span>Prepared by: <b>Freya M&E Report Generator</b></span><span>Report Ref: PKSF/USSP/Q3/2025-26</span><span>Generated: 20 May 2026</span><span>Classification: Internal Use Only</span></div>
      </div>
      <div class="doc-warning">INTERNAL DOCUMENT — PKSF PROGRAMME MANAGEMENT · ANTARIOUS AI INTELLIGENCE SYSTEM</div>
      <div class="doc-section"><h2>1. Executive Summary</h2><p>The Ultra-Sohayota Programme (USSP) has enrolled 2,04,832 ultra-poor households against a Q3 target of 2,50,000, representing 82% achievement. While overall progress is satisfactory, Rajshahi Division is lagging at 71% food security milestone achievement, requiring immediate corrective action.</p></div>
      <div class="doc-section"><h2>2. Programme Performance by Division</h2><p>Mymensingh leads with 94% food security achievement, followed by Khulna at 92% and Chittagong at 91%. The programme's livelihood asset transfer component has achieved 100% target delivery. Savings group formation has reached 95% of enrolled households.</p></div>
      <div class="doc-section"><h2>3. Recommendations</h2><ul><li>Deploy 12 additional field officers to Rajshahi Division for Q4</li><li>Diversify livelihood packages in flood-prone chars to include non-farm options</li><li>Schedule mid-term evaluation for Mymensingh model replication study</li><li>Increase savings group formation support in Rangpur Division</li></ul></div>
    </div>`
  },
  'partner-analysis': {
    agent: 'PARTNER PERFORMANCE MONITOR · FIELD INTELLIGENCE',
    title: 'Partner Performance Analysis — High Attention POs',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">12</div><div class="out-stat-lbl">POs Need Attention</div><div class="out-stat-sub">PAR30 above 5%</div></div>
        <div class="out-stat"><div class="out-stat-val am">3</div><div class="out-stat-lbl">Critical Risk</div><div class="out-stat-sub">PAR30 above 8%</div></div>
        <div class="out-stat"><div class="out-stat-val red">৳340 Cr</div><div class="out-stat-lbl">At-Risk Portfolio</div><div class="out-stat-sub">Requires intervention</div></div>
      </div>
      <div class="freya-box">
        <div class="freya-box-ic">🤖</div>
        <div>
          <div class="freya-box-label">Root Cause Analysis</div>
          <div class="freya-box-text">Of the 12 POs with elevated PAR30: <strong>7 are post-flood affected</strong> (humanitarian reclassification recommended), <strong>3 show governance concerns</strong> (compliance review initiated), and <strong>2 are new POs</strong> in growth phase (expected normalisation in Q4).</div>
        </div>
      </div>
      <div class="sheet-view">
        <table class="sheet">
          <tr><th>Partner Organization</th><th>Division</th><th>PAR30</th><th>Portfolio (Cr)</th><th>Root Cause</th><th>Action</th></tr>
          <tr class="warn"><td>Shapla Credit Society</td><td>Jessore</td><td style="color:var(--rd);font-weight:700">11.2%</td><td>৳28 Cr</td><td><span class="badge badge-r">Governance</span></td><td><span class="badge badge-r">Audit Ordered</span></td></tr>
          <tr class="warn"><td>Meghna MFI</td><td>Rangpur</td><td style="color:var(--rd);font-weight:700">9.8%</td><td>৳35 Cr</td><td><span class="badge badge-a">Post-Flood</span></td><td><span class="badge badge-a">Grace Period</span></td></tr>
          <tr class="warn"><td>Tista Unnayan Samiti</td><td>Rangpur</td><td style="color:var(--rd);font-weight:700">8.4%</td><td>৳19 Cr</td><td><span class="badge badge-a">Post-Flood</span></td><td><span class="badge badge-a">Grace Period</span></td></tr>
          <tr><td>Rajshahi Nari Sangstha</td><td>Rajshahi</td><td style="color:var(--am);font-weight:700">7.1%</td><td>৳22 Cr</td><td><span class="badge badge-a">Portfolio Growth</span></td><td><span class="badge">Monitor</span></td></tr>
          <tr><td>Sundarban Unnayan</td><td>Khulna</td><td style="color:var(--am);font-weight:700">6.8%</td><td>৳31 Cr</td><td><span class="badge badge-a">Seasonal</span></td><td><span class="badge">Monitor</span></td></tr>
        </table>
      </div>`
  },
  'budget-analysis': {
    agent: 'FINANCE INTELLIGENCE AGENT · BUDGET ANALYSIS',
    title: 'Q3 FY 2025-26 Budget Utilisation — PKSF Programmes',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৳842 Cr</div><div class="out-stat-lbl">Total Programme Budget</div><div class="out-stat-sub">FY 2025-26</div></div>
        <div class="out-stat"><div class="out-stat-val">74%</div><div class="out-stat-lbl">Utilised (9 months)</div><div class="out-stat-sub">On track</div></div>
        <div class="out-stat"><div class="out-stat-val am">৳12 Cr</div><div class="out-stat-lbl">Variance</div><div class="out-stat-sub">Within 3% tolerance</div></div>
      </div>
      <div class="sheet-view">
        <table class="sheet">
          <tr><th>Programme</th><th>Approved Budget</th><th>Disbursed</th><th>Utilised</th><th>% Used</th><th>Donor</th></tr>
          <tr><td>USSP (Ultra-Sohayota)</td><td>৳280 Cr</td><td>৳260 Cr</td><td>৳198 Cr</td><td style="color:var(--pri)">76%</td><td>GoB + IFAD</td></tr>
          <tr><td>ENRICH</td><td>৳145 Cr</td><td>৳130 Cr</td><td>৳112 Cr</td><td style="color:var(--pri)">87%</td><td>GoB</td></tr>
          <tr><td>PACE-II</td><td>৳98 Cr</td><td>৳92 Cr</td><td>৳71 Cr</td><td style="color:var(--am)">77%</td><td>IFAD</td></tr>
          <tr><td>SFMF (Agriculture)</td><td>৳87 Cr</td><td>৳80 Cr</td><td>৳58 Cr</td><td style="color:var(--am)">73%</td><td>ADB</td></tr>
          <tr><td>Climate Adaptation</td><td>৳72 Cr</td><td>৳65 Cr</td><td>৳48 Cr</td><td style="color:var(--am)">74%</td><td>KfW / GIZ</td></tr>
          <tr><td>Operations (HQ)</td><td>৳160 Cr</td><td>৳155 Cr</td><td>৳141 Cr</td><td style="color:var(--pri)">91%</td><td>Own Fund</td></tr>
          <tr class="total"><td>TOTAL</td><td>৳842 Cr</td><td>৳782 Cr</td><td>৳628 Cr</td><td>74%</td><td></td></tr>
        </table>
      </div>
      <div class="alert alert-g">✅ <strong>Freya:</strong> Budget utilisation is on track. ENRICH at 87% may require a no-cost extension request — flagged for Programme Director review.</div>`
  }
};

function showOutput(type) {
  const d = OUTPUT_DATA[type];
  if (!d) { toast('Generating report... please wait', '📄', 'g'); return; }
  const modal = document.getElementById('output-modal');
  if (!modal) return;
  document.getElementById('ob-agent').textContent = d.agent;
  document.getElementById('ob-title').textContent = d.title;
  document.getElementById('ob-body').innerHTML = d.body;
  document.getElementById('ob-footer').innerHTML = `
    <button class="btn btn-pri btn-sm" onclick="toast('Opening full document...','📄','g')">📄 Full Report</button>
    ${d.fullDoc ? `<button class="btn btn-sec btn-sm" onclick="showFullDoc('${type}')">📝 Detailed View</button>` : ''}
    <button class="btn btn-sec btn-sm" onclick="showDownloadMenu()">⬇ Download</button>
    <button class="btn btn-sec btn-sm" onclick="toast('Sending to your email...','✉️','g')">✉ Email</button>
    <button class="btn btn-sec btn-sm" onclick="toast('Sharing via WhatsApp...','📱','g')">📱 WhatsApp</button>`;
  modal.classList.add('open');
}

function showFullDoc(type) {
  const d = OUTPUT_DATA[type];
  if (d && d.fullDoc) document.getElementById('ob-body').innerHTML = d.fullDoc;
  else toast('Full document ready for download', '📄', 'g');
}

function showDownloadMenu() {
  const footer = document.getElementById('ob-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div style="width:100%">
      <div class="lbl" style="margin-bottom:8px">Choose Download Format</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-sec btn-sm" onclick="toast('Downloading as Word...','📝','g');closeOutput()">📝 Word (.docx)</button>
        <button class="btn btn-sec btn-sm" onclick="toast('Generating PDF...','📕','g');closeOutput()">📕 PDF</button>
        <button class="btn btn-sec btn-sm" onclick="toast('Exporting Excel...','📊','g');closeOutput()">📊 Excel (.xlsx)</button>
        <button class="btn btn-sec btn-sm" onclick="toast('Exporting CSV...','📋','g');closeOutput()">📋 CSV</button>
      </div>
    </div>`;
}

function closeOutput() {
  const modal = document.getElementById('output-modal');
  if (modal) modal.classList.remove('open');
}

/* ── CONFIRM MODAL ── */
function showConfirm(title, body, onConfirm, confirmLabel = 'Confirm', confirmClass = 'btn-pri') {
  const modal = document.getElementById('confirm-modal');
  if (!modal) return;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-body').textContent = body;
  const btn = document.getElementById('confirm-ok');
  btn.className = `btn ${confirmClass} btn-sm`;
  btn.textContent = confirmLabel;
  btn.onclick = () => { closeConfirm(); onConfirm(); };
  modal.classList.add('open');
}
function closeConfirm() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.remove('open');
}

/* ── SIMULATE FREYA WORKING ── */
function simulateFreyaTask(taskName, duration = 2500) {
  const bar = document.getElementById('freya-progress-bar');
  const label = document.getElementById('freya-progress-label');
  if (!bar || !label) return;
  label.textContent = `Freya is working: ${taskName}`;
  bar.style.display = 'block';
  let pct = 0;
  const fill = bar.querySelector('.prog-fill');
  const interval = setInterval(() => {
    pct += Math.random() * 12 + 5;
    if (pct >= 100) { pct = 100; clearInterval(interval); }
    fill.style.width = pct + '%';
    if (pct === 100) {
      setTimeout(() => {
        bar.style.display = 'none';
        label.textContent = '';
        toast(`${taskName} complete!`, '✅', 'g');
      }, 400);
    }
  }, duration / 12);
}

/* ── PAGE INIT HELPERS ── */
function highlightNav(id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('ni-' + id);
  if (el) el.classList.add('active');
}

function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeOutput();
      closeFreya();
      closeConfirm();
    }
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initKeyboard();
  applyStoredTheme();
  injectTopbarWidgets();

  // Freya input enter key
  const fpInput = document.getElementById('fp-input');
  if (fpInput) fpInput.addEventListener('keydown', e => { if (e.key === 'Enter') fpSend(); });
});
