/* ═══════════════════════════════════════════════════════
   PKSF · ANTARIOUS AI — Mock Data
   ═══════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: 'home',    ic: 'home', labelKey: 'nav.home', badge: 4, badgeClass: 'nav-badge' },
  { id: 'tasks',   ic: 'check-circle', labelKey: 'nav.tasks', badge: 4, badgeClass: 'nav-badge' },
  { id: 'programs',ic: 'clipboard', labelKey: 'nav.programs', badge: null },
  { id: 'credit',  ic: 'bank', labelKey: 'nav.credit', badge: 2, badgeClass: 'nav-badge-a' },
  { id: 'partners',ic: 'handshake', labelKey: 'nav.partners', badge: null },
  { id: 'reports', ic: 'file-text', labelKey: 'nav.reports', badge: 1, badgeClass: 'nav-badge-a' },
  { id: 'agents',  ic: 'bot', labelKey: 'nav.agents', badge: null },
  { id: 'help',    ic: 'help', labelKey: 'nav.help', badge: null },
];

const ROLES = {
  programme: {
    id: 'programme',
    name: 'রহিমা বেগম',
    nameEn: 'Rahima Begum',
    initials: 'রহ',
    role: 'প্রোগ্রাম ম্যানেজার',
    roleEn: 'Programme Manager',
    dept: 'Microcredit Division',
    nav: ['home', 'tasks', 'programs', 'credit', 'partners', 'reports', 'agents', 'help'],
    defaultScreen: 'home',
    agentIds: null,
    homeStats: [
      { ic: 'clipboard', val: '৬', labelKey: 'home.stat.programs', changeKey: 'home.stat.healthy', changeIcon: 'trend-up', changeClass: 'chg-up', nav: 'programs' },
      { ic: 'bank', val: '১.২৪L', labelKey: 'home.stat.loans', change: 'PAR30: 5.8%', changeClass: 'chg-nt', nav: 'credit' },
      { ic: 'handshake', val: '৮৭', labelKey: 'home.stat.partners', changeKey: 'home.stat.atRisk', changeClass: 'chg-nt', nav: 'partners' },
      { ic: 'check-circle', val: null, labelKey: 'home.stat.pending', changeKey: 'home.stat.urgentToday', changeClass: 'chg-dn', nav: 'tasks', dynamic: true },
    ],
    quickActions: [
      ['check-circle', 'qa.approve', 'qa.approveDesc', 'tasks'],
      ['chart', 'qa.reports', 'qa.reportsDesc', 'reports'],
      ['bank', 'qa.credit', 'qa.creditDesc', 'credit'],
      ['bot', 'qa.ai', 'qa.aiDesc', 'agents'],
      ['handshake', 'qa.po', 'qa.poDesc', 'partners'],
      ['help', 'qa.help', 'qa.helpDesc', 'help'],
    ],
  },
  credit: {
    id: 'credit',
    name: 'করিমুল হক',
    nameEn: 'Karimul Haque',
    initials: 'কহ',
    role: 'ঋণ বিভাগীয় কর্মকর্তা',
    roleEn: 'Credit Officer',
    dept: 'Credit & Portfolio Division',
    nav: ['home', 'tasks', 'credit', 'partners', 'reports', 'agents', 'help'],
    defaultScreen: 'home',
    agentIds: ['field', 'loan', 'psy', 'comp'],
    homeStats: [
      { ic: 'bank', val: '১.২৪L', labelKey: 'home.stat.loans', change: 'PAR30: 5.8%', changeClass: 'chg-nt', nav: 'credit' },
      { ic: 'alert-triangle', val: '২', labelKey: 'role.credit.statAtRisk', changeKey: 'role.credit.statAtRiskSub', changeClass: 'chg-dn', nav: 'partners' },
      { ic: 'scale', val: '১', labelKey: 'role.credit.statAssessments', changeKey: 'role.credit.statAssessmentsSub', changeClass: 'chg-nt', nav: 'tasks' },
      { ic: 'check-circle', val: null, labelKey: 'home.stat.pending', changeKey: 'home.stat.urgentToday', changeClass: 'chg-dn', nav: 'tasks', dynamic: true },
    ],
    quickActions: [
      ['check-circle', 'qa.approve', 'qa.approveDesc', 'tasks'],
      ['bank', 'qa.credit', 'qa.creditDesc', 'credit'],
      ['handshake', 'qa.po', 'qa.poDesc', 'partners'],
      ['scale', 'role.credit.qaAssess', 'role.credit.qaAssessDesc', 'agents'],
      ['chart', 'qa.reports', 'qa.reportsDesc', 'reports'],
      ['help', 'qa.help', 'qa.helpDesc', 'help'],
    ],
  },
  hr: {
    id: 'hr',
    name: 'ফাতেমা আক্তার',
    nameEn: 'Fatema Akter',
    initials: 'ফা',
    role: 'HR কর্মকর্তা',
    roleEn: 'HR Officer',
    dept: 'Human Resources',
    nav: ['home', 'tasks', 'reports', 'agents', 'help'],
    defaultScreen: 'home',
    agentIds: ['payroll'],
    homeStats: [
      { ic: 'users', val: '৪৭', labelKey: 'role.hr.statStaff', changeKey: 'role.hr.statStaffSub', changeClass: 'chg-up', nav: 'tasks' },
      { ic: 'warning', val: '২', labelKey: 'role.hr.statAnomalies', changeKey: 'role.hr.statAnomaliesSub', changeClass: 'chg-dn', nav: 'tasks' },
      { ic: 'money', val: '৳৮৪L', labelKey: 'role.hr.statPayroll', change: 'April 2026', changeClass: 'chg-nt', nav: 'reports' },
      { ic: 'check-circle', val: null, labelKey: 'home.stat.pending', changeKey: 'role.hr.statPendingSub', changeClass: 'chg-dn', nav: 'tasks', dynamic: true },
    ],
    quickActions: [
      ['check-circle', 'qa.approve', 'qa.approveDesc', 'tasks'],
      ['money', 'role.hr.qaPayroll', 'role.hr.qaPayrollDesc', 'reports'],
      ['users', 'role.hr.qaStaff', 'role.hr.qaStaffDesc', 'tasks'],
      ['bot', 'qa.ai', 'qa.aiDesc', 'agents'],
      ['help', 'qa.help', 'qa.helpDesc', 'help'],
    ],
  },
  director: {
    id: 'director',
    name: 'ড. আনিসুল হক',
    nameEn: 'Dr. Anisul Haque',
    initials: 'আহ',
    role: 'মহাবিষয়ক পরিচালক',
    roleEn: 'Managing Director',
    dept: 'Executive Office',
    nav: ['home', 'tasks', 'programs', 'credit', 'partners', 'reports', 'agents', 'help'],
    defaultScreen: 'home',
    agentIds: null,
    homeStats: [
      { ic: 'money', val: '৳১৬০Cr', labelKey: 'role.director.statPortfolio', changeKey: 'role.director.statPortfolioSub', changeClass: 'chg-up', nav: 'credit' },
      { ic: 'clipboard', val: '৬', labelKey: 'home.stat.programs', changeKey: 'home.stat.healthy', changeIcon: 'trend-up', changeClass: 'chg-up', nav: 'programs' },
      { ic: 'handshake', val: '৮৭', labelKey: 'home.stat.partners', changeKey: 'home.stat.atRisk', changeClass: 'chg-nt', nav: 'partners' },
      { ic: 'check-circle', val: null, labelKey: 'home.stat.pending', changeKey: 'home.stat.urgentToday', changeClass: 'chg-dn', nav: 'tasks', dynamic: true },
    ],
    quickActions: [
      ['check-circle', 'qa.approve', 'qa.approveDesc', 'tasks'],
      ['chart', 'role.director.qaBoard', 'role.director.qaBoardDesc', 'reports'],
      ['clipboard', 'qa.reports', 'qa.reportsDesc', 'programs'],
      ['bank', 'qa.credit', 'qa.creditDesc', 'credit'],
      ['bot', 'qa.ai', 'qa.aiDesc', 'agents'],
      ['help', 'qa.help', 'qa.helpDesc', 'help'],
    ],
  },
};

const USER = ROLES.programme;

const DEMO_LOGIN_ACCOUNTS = [
  { roleId: 'director', email: 'director@pksf.org.bd', gradient: 'linear-gradient(135deg,#b45309,#f59e0b)' },
  { roleId: 'programme', email: 'rahima.begum@pksf.org.bd', gradient: 'linear-gradient(135deg,#2563eb,#60a5fa)' },
  { roleId: 'credit', email: 'karimul.haque@pksf.org.bd', gradient: 'linear-gradient(135deg,#005C2B,#00A651)' },
  { roleId: 'hr', email: 'fatema.akter@pksf.org.bd', gradient: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
];

const AUTH_DEMO_PASSWORD = 'demo123';

const TASKS = [
  {
    id: 't1',
    ic: 'chart',
    title: 'World Bank Q3 প্রতিবেদন — খসড়া পর্যালোচনা',
    titleEn: 'World Bank Q3 Report — Review Draft',
    desc: 'Freya ৭৮% সম্পন্ন খসড়া তৈরি করেছে। DLI টেবিল স্বয়ংক্রিয়ভাবে পূরণ হয়েছে। আপনার শুধু ২টি অংশ দেখতে হবে।',
    descEn: 'Freya has prepared a 78% complete draft. DLI tables are auto-filled. You only need to review 2 sections.',
    urgency: 'urgent',
    due: '১৪ দিন বাকি',
    dueEn: '14 days left',
    agent: 'M&E Report Generator',
    outputKey: 'donor-report',
    status: 'pending',
    roles: ['programme', 'director'],
  },
  {
    id: 't2',
    ic: 'wave',
    title: 'খুলনা PO-KHL-04 — বন্যা ক্ষতির গ্রেস পিরিয়ড',
    titleEn: 'Khulna PO-KHL-04 — Flood Grace Period',
    desc: '৩টি ইউনিয়নে বন্যার কারণে ৩৪০ ঋণগ্রহীতা আয়-ক্ষতিগ্রস্ত। Freya ৮ সপ্তাহের গ্রেস পিরিয়ড প্রস্তাব করেছে।',
    descEn: '340 borrowers income-shocked due to flooding in 3 unions. Freya proposes an 8-week grace period.',
    urgency: 'urgent',
    due: 'আজ',
    dueEn: 'Today',
    agent: 'Field Data Analyst',
    outputKey: 'field-synthesis',
    status: 'pending',
    roles: ['programme', 'credit', 'director'],
  },
  {
    id: 't3',
    ic: 'money',
    title: 'এপ্রিল বেতন — ২টি ত্রুটি পর্যালোচনা',
    titleEn: 'April Payroll — 2 Anomalies',
    desc: '৪৭ জন কর্মীর বেতন প্রস্তুত। John Okoro (ছুটি) ও Maria Santos (ওভারটাইম) — দুটি বিষয়ে Freya আপনার সিদ্ধান্ত চায়।',
    descEn: 'Payroll for 47 staff ready. Freya needs your decision on John Okoro (leave) and Maria Santos (overtime).',
    urgency: '',
    due: '৩ দিন বাকি',
    dueEn: '3 days left',
    agent: 'HR Payroll Agent',
    outputKey: 'salary-report',
    status: 'pending',
    roles: ['hr', 'director'],
  },
  {
    id: 't4',
    ic: 'scale',
    title: 'ঋণ আবেদন #২৮৯১ — Psychometric মূল্যায়ন',
    titleEn: 'Loan Application #2891 — Psychometric Score',
    desc: 'নতুন ঋণগ্রহীতার ৭-মাত্রিক মূল্যায়ন সম্পন্ন। স্কোর ৭৯/১০০ — staged disbursement প্রস্তাবিত।',
    descEn: '7-dimension assessment complete for new borrower. Score 79/100 — staged disbursement recommended.',
    urgency: '',
    due: 'আগামীকাল',
    dueEn: 'Tomorrow',
    agent: 'Repayment Behaviour Indicator',
    outputKey: 'psychometric',
    status: 'pending',
    roles: ['credit', 'director'],
  },
];

const PROGRAMS = [
  { name: 'Microcredit — Khulna Division', status: 'ACTIVE', badge: 'g', budget: '৳৪২ কোটি', po: 28, ben: '১.২৪ লাখ', par: '5.8%', goal: 82, agent: 'Loan Portfolio Monitor' },
  { name: 'Microcredit — Rajshahi Division', status: 'ACTIVE', badge: 'g', budget: '৳৩৮ কোটি', po: 24, ben: '১.০৮ লাখ', par: '3.2%', goal: 91, agent: 'Field Data Analyst' },
  { name: 'Ultra-Poor Graduation — Barishal', status: 'ACTIVE', badge: 'g', budget: '৳১৮ কোটি', po: 12, ben: '৪২,০০০', par: '—', goal: 76, agent: 'Beneficiary Analytics' },
  { name: 'SME Credit — Dhaka Metro', status: 'WARNING', badge: 'a', budget: '৳২৫ কোটি', po: 8, ben: '১৮,৫০০', par: '7.1%', goal: 58, agent: 'Compliance Sentinel' },
  { name: 'Agri-Livelihood — Sylhet', status: 'ACTIVE', badge: 'g', budget: '৳২২ কোটি', po: 15, ben: '৫৬,০০০', par: '4.1%', goal: 85, agent: 'M&E Report Generator' },
  { name: 'Youth Entrepreneurship — Ctg', status: 'ACTIVE', badge: 'g', budget: '৳১৫ কোটি', po: 10, ben: '৩২,০০০', par: '3.8%', goal: 79, agent: 'Programme Intelligence' },
];

const PARTNERS = [
  { code: 'PO-KHL-04', name: 'নারikel MFI', region: 'Khulna', loans: 284, par30: '12.4%', status: 'At Risk', badge: 'r' },
  { code: 'PO-KHL-09', name: 'Shapla Credit', region: 'Khulna', loans: 196, par30: '9.8%', status: 'Monitor', badge: 'a' },
  { code: 'PO-KHL-02', name: 'Delta MFI', region: 'Khulna', loans: 312, par30: '2.1%', status: 'Healthy', badge: 'g' },
  { code: 'PO-RAJ-01', name: 'পদ্মা Credit', region: 'Rajshahi', loans: 420, par30: '2.8%', status: 'Healthy', badge: 'g' },
  { code: 'PO-RAJ-05', name: 'Sonali MFI', region: 'Rajshahi', loans: 380, par30: '3.5%', status: 'Healthy', badge: 'g' },
  { code: 'PO-DHK-03', name: 'Urban SME Co-op', region: 'Dhaka', loans: 145, par30: '8.2%', status: 'Monitor', badge: 'a' },
];

const AGENTS = [
  { id: 'field', ic: 'folder', name: 'Field Data Analyst', nameBn: 'মাঠ তথ্য বিশ্লেষক', desc: 'মাঠ প্রতিবেদন একত্র ও যাচাই', descEn: 'Collect and validate field reports', outputKey: 'field-synthesis', pipeline: 'field-review' },
  { id: 'me', ic: 'chart', name: 'M&E Report Generator', nameBn: 'M&E প্রতিবেদন', desc: 'ডোনার প্রতিবেদন স্বয়ংক্রিয় তৈরি', descEn: 'Auto-generate donor reports', outputKey: 'donor-report', pipeline: 'donor-report' },
  { id: 'loan', ic: 'money', name: 'Loan Portfolio Monitor', nameBn: 'ঋণ পোর্টফোলিও', desc: 'PAR30/90 পর্যবেক্ষণ', descEn: 'Monitor PAR30/90 metrics', outputKey: 'loan-portfolio', pipeline: 'portfolio-review' },
  { id: 'psy', ic: 'scale', name: 'Psychometric Assessor', nameBn: 'ঋণ মূল্যায়ন', desc: '৭-মাত্রিক ঋণগ্রহীতা স্কোর', descEn: '7-dimension borrower scoring', outputKey: 'psychometric', pipeline: 'credit-assessment' },
  { id: 'payroll', ic: 'users', name: 'HR Payroll Agent', nameBn: 'বেতন প্রক্রিয়াকরণ', desc: 'মাসিক বেতন ও ত্রুটি যাচাই', descEn: 'Monthly payroll and anomaly checks', outputKey: 'salary-report', pipeline: null },
  { id: 'proc', ic: 'truck', name: 'Procurement Agent', nameBn: 'ক্রয় বিশ্লেষণ', desc: 'সরবরাহকারী তুলনা ও সুপারিশ', descEn: 'Vendor comparison and recommendations', outputKey: 'procurement-analysis', pipeline: null },
  { id: 'comp', ic: 'shield', name: 'Compliance Sentinel', nameBn: 'সম্মতি পর্যবেক্ষক', desc: 'ডোনার শর্ত পূরণ যাচাই', descEn: 'Verify donor compliance obligations', outputKey: 'compliance-audit', pipeline: null },
  { id: 'freya', ic: 'brain', name: 'Freya (Programme Intelligence)', nameBn: 'Freya — মূল AI', desc: 'সব AI-কে সমন্বয় করে', descEn: 'Orchestrates all AI agents', outputKey: 'donor-report', pipeline: 'donor-report' },
];

const FREYA_QUICK_BN = [
  'আজ আমার কী কাজ?',
  'অনুমোদনের তালিকা দেখান',
  'খুলনা PO পরিস্থিতি',
  'Q3 প্রতিবেদনের অবস্থা',
  'PAR30 কত?',
];

const FREYA_QUICK_EN = [
  'What are my tasks today?',
  'Show approval queue',
  'Khulna PO situation',
  'Q3 report status',
  'What is PAR30?',
];

const FREYA_QUICK_BY_ROLE = {
  programme: { bn: FREYA_QUICK_BN, en: FREYA_QUICK_EN },
  credit: {
    bn: ['আজ কোন PO ঝুঁকিতে?', 'PAR30 বিশ্লেষণ', 'ঋণ মূল্যায়ন #২৮৯১', 'বন্যা গ্রেস পিরিয়ড'],
    en: ['Which POs are at risk?', 'PAR30 analysis', 'Loan assessment #2891', 'Flood grace period'],
  },
  hr: {
    bn: ['এপ্রিল বেতনের অবস্থা', 'ত্রুটি তালিকা', 'কর্মী ছুটি যাচাই', 'বেতন অনুমোদন'],
    en: ['April payroll status', 'Anomaly list', 'Leave verification', 'Approve payroll'],
  },
  director: {
    bn: ['সংক্ষিপ্ত Executive Summary', 'কোন প্রোগ্রাম পিছিয়ে?', 'PAR30 সারাংশ', 'অনুমোদনের তালিকা'],
    en: ['Executive summary', 'Which programmes lag?', 'PAR30 overview', 'Approval queue'],
  },
};

function getFreyaQuickForRole(roleId) {
  var pack = FREYA_QUICK_BY_ROLE[roleId] || FREYA_QUICK_BY_ROLE.programme;
  return I18n.lang === 'en' ? pack.en : pack.bn;
}

const FREYA_REPLIES_BN = [
  'আপনার <strong>৪টি কাজ</strong> অনুমোদনের অপেক্ষায় আছে। সবচেয়ে জরুরি: <strong>খুলনা PO-KHL-04</strong> বন্যা গ্রেস পিরিয়ড (আজ) এবং <strong>World Bank Q3</strong> প্রতিবেদন (১৪ দিন)। "অনুমোদন" মেনুতে গিয়ে এক ক্লিকে অনুমোদন দিতে পারবেন।',
  'World Bank Q3 প্রতিবেদন <strong>৭৮% সম্পন্ন</strong>। DLI টেবিল স্বয়ংক্রিয়ভাবে পূরণ হয়েছে। আপনার শুধু Section 4.2 ও 5.1-এর narrative দেখতে হবে। "প্রতিবেদন" মেনু থেকে খসড়া দেখুন।',
  'খুলনা বিভাগে <strong>PO-KHL-04 (নারikel MFI)</strong> PAR30 = 12.4% — বন্যার কারণে ৩৪০ ঋণগ্রহীতা আয়-ক্ষতিগ্রস্ত। আমি ৮ সপ্তাহ গ্রেস পিরিয়ড প্রস্তাব করেছি। অনুমোদন দিলে স্বয়ংক্রিয়ভাবে PO-কে জানানো হবে।',
  'সামগ্রিক PAR30 = <strong>5.8%</strong> (লক্ষ্য: <5%)। PO-KHL-04 ও PO-KHL-09 উদ্বেগজনক। PO-KHL-02, Sundarban Credit সুস্থ। "ঋণ ও পোর্টফোলিও" মেনুতে বিস্তারিত দেখুন।',
  'আমি এখন <strong>Semi-Auto</strong> মোডে আছি — কাজ প্রস্তুত করি, আপনি অনুমোদন দেন। উপরে "AI প্রস্তাব" বাটনে ক্লিক করে মোড পরিবর্তন করতে পারেন। "AI স্বয়ং" মোডে সব স্বয়ংক্রিয় হবে (সতর্ক থাকুন!)।',
  'এপ্রিল বেতন <strong>৪৭ জন</strong> কর্মীর জন্য প্রস্তুত। মোট নেট: ৳৮৪,২০,০০০। ২টি ত্রুটি: John Okoro (ছুটি) ও Maria Santos (ওভারটাইম) — অনুমোদন মেনুতে দেখুন।',
  'আমি <strong>৬টি AI সহায়ক</strong> একসাথে চালাচ্ছি। "AI সহায়ক" মেনু থেকে যেকোনো একটিতে ক্লিক করে "চালান" বাটনে চাপ দিন — ফলাফল ১০-২০ সেকেন্ডে প্রস্তুত হবে।',
];

const FREYA_REPLIES_EN = [
  'You have <strong>4 tasks</strong> awaiting approval. Most urgent: <strong>Khulna PO-KHL-04</strong> flood grace period (today) and <strong>World Bank Q3</strong> report (14 days). Go to Approvals to approve with one click.',
  'World Bank Q3 report is <strong>78% complete</strong>. DLI tables are auto-filled. You only need to review sections 4.2 and 5.1. View the draft from the Reports menu.',
  'In Khulna, <strong>PO-KHL-04 (Narikel MFI)</strong> PAR30 = 12.4% — 340 borrowers income-shocked due to flooding. I propose an 8-week grace period. Approval will auto-notify the PO.',
  'Overall PAR30 = <strong>5.8%</strong> (target: <5%). PO-KHL-04 and PO-KHL-09 are concerning. See Credit & Portfolio menu for details.',
  'I\'m in <strong>Semi-Auto</strong> mode — I prepare work, you approve. Switch modes using the buttons in the top bar.',
  'April payroll for <strong>47 staff</strong> is ready. Total net: ৳84,20,000. 2 anomalies: John Okoro (leave) and Maria Santos (overtime) — see Approvals menu.',
  'I\'m running <strong>6 AI helpers</strong>. Go to AI Helpers, click any one, then Run — results ready in 10–20 seconds.',
];

const WORKFLOW_PIPELINES = {
  'field-review': {
    name: 'মাঠ তথ্য 검토 — Field Review',
    desc: 'মাঠ প্রতিবেদন সংগ্রহ · যাচাই · সিদ্ধান্ত',
    agents: [
      { ic: 'folder', cat: 'Step 1', n: 'Field Data Analyst', sub: 'প্রতিবেদন একত্র', out: 'Field Synthesis — PO-KHL-04', outKey: 'field-synthesis' },
      { ic: 'brain', cat: 'Step 2', n: 'Freya', sub: 'প্রসঙ্গ বিশ্লেষণ', out: 'Root Cause Classification', outKey: 'field-synthesis' },
      { ic: 'file-text', cat: 'Step 3', n: 'Document Drafting', sub: 'সুপারিশপত্র', out: 'Grace Period Recommendation', outKey: 'field-synthesis' },
    ],
  },
  'donor-report': {
    name: 'ডোনার প্রতিবেদন — Donor Report Pipeline',
    desc: 'তথ্য সংগ্রহ · খসড়া · সম্মতি যাচাই',
    agents: [
      { ic: 'chart', cat: 'Step 1', n: 'M&E Report Generator', sub: 'DLI টেবিল পূরণ', out: 'Q3 Performance Data', outKey: 'donor-report' },
      { ic: 'file-text', cat: 'Step 2', n: 'Document Drafting', sub: 'Narrative লেখা', out: 'Executive Summary Draft', outKey: 'donor-report' },
      { ic: 'shield', cat: 'Step 3', n: 'Compliance Sentinel', sub: 'তথ্য যাচাই', out: 'Compliance Check — 92%', outKey: 'compliance-audit' },
    ],
  },
  'portfolio-review': {
    name: 'পোর্টফোলিও পর্যালোচনা',
    desc: 'PAR বিশ্লেষণ · ঝুঁকি শনাক্ত · সুপারিশ',
    agents: [
      { ic: 'money', cat: 'Step 1', n: 'Loan Portfolio Monitor', sub: 'PAR30/90 গণনা', out: 'Portfolio Health Report', outKey: 'loan-portfolio' },
      { ic: 'folder', cat: 'Step 2', n: 'Field Data Analyst', sub: 'মাঠ কারণ যাচাই', out: 'Field Evidence — Khulna', outKey: 'field-synthesis' },
      { ic: 'shield', cat: 'Step 3', n: 'Compliance Sentinel', sub: 'নীতি যাচাই', out: 'Compliance Assessment', outKey: 'compliance-audit' },
    ],
  },
  'credit-assessment': {
    name: 'ঋণ মূল্যায়ন — Credit Assessment',
    desc: 'Psychometric · Portfolio · সুপারিশ',
    agents: [
      { ic: 'scale', cat: 'Step 1', n: 'Psychometric Assessor', sub: '৭-মাত্রিক স্কোর', out: 'Score Report — #2891', outKey: 'psychometric' },
      { ic: 'money', cat: 'Step 2', n: 'Loan Portfolio Monitor', sub: 'Portfolio context', out: 'Risk Context — Khulna', outKey: 'loan-portfolio' },
      { ic: 'file-text', cat: 'Step 3', n: 'Document Drafting', sub: 'ঋণ সুপারিশপত্র', out: 'Loan Recommendation', outKey: 'psychometric' },
    ],
  },
};

const OUTPUT_DATA = {
  'field-synthesis': {
    agent: 'FIELD DATA ANALYST · মাঠ তথ্য বিশ্লেষক',
    title: 'Field Data Synthesis — PO-KHL-04 & KHL-09',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৮</div><div class="out-stat-lbl">মাঠ প্রতিবেদন পর্যালোচিত</div><div class="out-stat-sub">PO-KHL-04 & KHL-09</div></div>
        <div class="out-stat"><div class="out-stat-val am">৩</div><div class="out-stat-lbl">বন্যা-আক্রান্ত ইউনিয়ন</div><div class="out-stat-sub">Spatial overlap confirmed</div></div>
        <div class="out-stat"><div class="out-stat-val red">-৩৪০</div><div class="out-stat-lbl">আয়-ক্ষতিগ্রস্ত ঋণগ্রহীতা</div><div class="out-stat-sub">Estimated cohort</div></div>
      </div>
      <div class="out-finding">
        <div class="out-finding-header">${Icons.i('info', 14)} <strong>Field Officer Log · PO-KHL-04 · March 2026</strong></div>
        <div class="out-quote">"দুমুরিয়া, বাটিয়াঘাটা ও Dacope উপজেলায় ব্যাপক বন্যা। প্রায় ৩৪০ ঋণগ্রহীতা গবাদি পশু ও ধান ফসলের ক্ষতির কারণে সাময়িক আয়-ব্যাঘাতের সম্মুখীন। ৩ সপ্তাহ গ্রুপ সভা স্থগিত।"</div>
      </div>
      <div class="out-item"><span class="out-item-ic">${Icons.i('info', 16)}</span><div><strong>KHL-04 মূল কারণ:</strong> পরিবেশগত (বন্যা)</div></div>
      <div class="out-item"><span class="out-item-ic">${Icons.i('check-circle', 16)}</span><div><strong>সুপারিশ:</strong> ৮ সপ্তাহ গ্রেস পিরিয়ড</div></div>
      <div class="out-item"><span class="out-item-ic">${Icons.i('alert-triangle', 16)}</span><div><strong>KHL-09:</strong> মিশ্র সংকেত — compliance audit প্রয়োজন</div></div>
    `,
    ref: 'PKSF-KHL-Q1-2026/FLD/004',
    files: { pdf: 'Field_Synthesis_KHL04_Q1_2026.pdf', docx: 'Field_Synthesis_KHL04_Q1_2026.docx', xlsx: 'Field_Data_KHL04_Q1_2026.xlsx' },
    sources: [
      { name: 'Field Officer Log — PO-KHL-04', type: 'Field Report', date: '12 Mar 2026', ref: 'FO-KHL-04-0312' },
      { name: 'KoBoToolbox Submission Batch', type: 'Survey Data', date: '10 Mar 2026', ref: 'KBT-KHL-280' },
      { name: 'Flood Impact Assessment — BMD', type: 'External Data', date: '08 Mar 2026', ref: 'BMD-FLD-2026-03' },
      { name: 'Partner Monthly Report — Narikel MFI', type: 'PO Report', date: '05 Mar 2026', ref: 'PO-KHL-04-MR-03' },
    ],
    email: {
      to: 'programme.director@pksf.org.bd',
      cc: 'field.ops@pksf.org.bd, po-khl-04@narikelmfi.org',
      subject: 'Grace Period Recommendation — PO-KHL-04 Flood Impact',
      body: 'Dear Programme Director,\n\nFreya Field Data Analyst has completed the synthesis for PO-KHL-04 and PO-KHL-09. Based on confirmed flooding in 3 unions affecting ~340 borrowers, we recommend an 8-week repayment grace window for KHL-04.\n\nPlease review the attached synthesis report and approve via Antarious.\n\nRegards,\nFreya · PKSF Programme Intelligence',
    },
    fullDoc: function() {
      return DocTemplate.build({
        org: 'PKSF · Palli Karma-Sahayak Foundation',
        title: 'Field Data Synthesis — PO-KHL-04 & KHL-09',
        ref: 'PKSF-KHL-Q1-2026/FLD/004',
        date: '12 May 2026',
        prepared: 'Field Data Analyst · Ground Synthesis',
        sections: [
          { h: '1. Executive Summary', p: 'This report presents findings of the field intelligence investigation for Khulna Division Q1 2026, focusing on PO-KHL-04 (Narikel MFI) and PO-KHL-09 (Shapla Credit). Field evidence confirms repayment declines are primarily attributable to flooding in Dacope and Koyra sub-districts. Approximately 340 borrower households reported partial or full destruction of productive assets.' },
          { h: '2. Background', p: 'Following statistical outlier identification (PAR30 > 12%), protocol required ground-truth verification before any adverse performance determination. Initial portfolio data suggested possible management failure — making field verification essential.' },
          { h: '3. Key Findings', list: ['Flooding confirmed in 3 of 5 unions served by KHL-04 (December 2025)', '~340 borrowers income-shocked; crop and livestock losses documented', 'KHL-09 shows mixed signals — 2 branches flood-affected; 2 require compliance review', 'No evidence of management failure in KHL-04'] },
          { h: '4. Recommendations', list: ['Grant 8-week repayment grace window to KHL-04 borrowers in affected unions', 'Initiate compliance audit for KHL-09 branches 3 and 4', 'Activate humanitarian root-cause classification for KHL-04', 'Schedule follow-up field visit in Week 12'] },
        ],
      });
    },
  },
  'loan-portfolio': {
    agent: 'LOAN PORTFOLIO MONITOR · ঋণ পোর্টফোলিও',
    title: 'Loan Portfolio Health — Q1 2026 (Khulna)',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৳৪২ কোটি</div><div class="out-stat-lbl">Active Portfolio</div><div class="out-stat-sub">১.২৪ লাখ borrowers</div></div>
        <div class="out-stat"><div class="out-stat-val am">5.8%</div><div class="out-stat-lbl">PAR30</div><div class="out-stat-sub">Target: &lt;5%</div></div>
        <div class="out-stat"><div class="out-stat-val">2.1%</div><div class="out-stat-lbl">PAR90</div><div class="out-stat-sub">Within tolerance</div></div>
      </div>
      <div class="sheet-view"><table class="sheet">
        <tr><th>Partner Org</th><th>Loans</th><th>Portfolio</th><th>PAR30</th><th>Status</th></tr>
        <tr><td>Narikel MFI (KHL-04)</td><td>284</td><td>৳৪.২ কোটি</td><td style="color:var(--rd)">12.4%</td><td><span class="badge badge-r badge-with-ic">${Icons.i('alert-triangle', 12)} At Risk</span></td></tr>
        <tr><td>Shapla Credit (KHL-09)</td><td>196</td><td>৳৩.১ কোটি</td><td style="color:var(--rd)">9.8%</td><td><span class="badge badge-a">Monitor</span></td></tr>
        <tr><td>Delta MFI (KHL-02)</td><td>312</td><td>৳৪.৮ কোটি</td><td style="color:var(--pri)">2.1%</td><td><span class="badge badge-g">Healthy</span></td></tr>
        <tr class="total"><td>TOTAL</td><td>792</td><td>৳১২.১ কোটি</td><td>5.8%</td><td></td></tr>
      </table></div>
    `,
    ref: 'PKSF-PORT-KHL-Q1-2026',
    files: { pdf: 'Portfolio_Health_Khulna_Q1_2026.pdf', docx: 'Portfolio_Health_Khulna_Q1_2026.docx', xlsx: 'PAR_Summary_Khulna_Q1_2026.xlsx' },
    sources: [
      { name: 'MIS Loan Ledger — Khulna Division', type: 'System Data', date: '12 May 2026', ref: 'MIS-KHL-LEDGER' },
      { name: 'Partner PAR Reports (All POs)', type: 'PO Report', date: '01 May 2026', ref: 'PO-PAR-BATCH-04' },
    ],
    email: { to: 'credit.monitoring@pksf.org.bd', cc: 'rahima.begum@pksf.org.bd', subject: 'Q1 Portfolio Health — Khulna Division PAR Alert', body: 'PAR30 for Khulna Division stands at 5.8% (target <5%). PO-KHL-04 at 12.4% requires immediate attention. Full portfolio report attached.' },
    fullDoc: function() {
      return DocTemplate.build({ org: 'PKSF · Microcredit Division', title: 'Loan Portfolio Health Report — Khulna Q1 2026', ref: 'PKSF-PORT-KHL-Q1-2026', date: '12 May 2026', prepared: 'Loan Portfolio Monitor', sections: [
        { h: '1. Portfolio Overview', p: 'Total active portfolio: ৳42 crore across 1.24 lakh borrowers in Khulna Division. Overall PAR30: 5.8% (above 5% threshold). PAR90: 2.1% (within tolerance).' },
        { h: '2. At-Risk Partners', p: 'PO-KHL-04 (Narikel MFI) PAR30 12.4% — environmental root cause confirmed. PO-KHL-09 (Shapla Credit) PAR30 9.8% — mixed signals, compliance review initiated.' },
        { h: '3. Recommended Actions', list: ['Grace period for KHL-04 flood-affected borrowers', 'Enhanced monitoring for KHL-09', 'Maintain current support for healthy POs (KHL-02)'] },
      ]});
    },
  },
  'psychometric': {
    agent: 'REPAYMENT BEHAVIOUR INDICATOR · ঋণ মূল্যায়ন',
    title: 'Psychometric Assessment — Applicant #2891',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৭৯/১০০</div><div class="out-stat-lbl">Assessment Score</div><div class="out-stat-sub">Review recommended</div></div>
        <div class="out-stat"><div class="out-stat-val">১৪ মাস</div><div class="out-stat-lbl">Suggested Tenure</div></div>
        <div class="out-stat"><div class="out-stat-val am">৳৮০,০০০</div><div class="out-stat-lbl">Suggested Amount</div><div class="out-stat-sub">Staged disbursement</div></div>
      </div>
      <div class="out-finding">
        <div class="out-finding-header">${Icons.i('brain', 14)} <strong>Freya Analysis</strong></div>
        <div class="out-quote">উদ্যোক্তা বুদ্ধিমত্তা শক্তিশালী (৮৪/১০০) কিন্তু আর্থিক আচরণ মাঝারি (৬৭/১০০) — সম্ভবত প্রথমবার ঋণগ্রহীতা। সামাজিক মূলধন উচ্চ (৮৮/১০০) — পুনঃপরিশোধের সাথে স correlate করে।</div>
      </div>
      <div style="margin-bottom:12px"><div class="lbl">৭-মাত্রিক BREAKDOWN</div>
        ${[['Entrepreneurial Intelligence','84'],['Financial Behaviour','67'],['Business Viability','76'],['Risk Appetite','71'],['Social Capital','88'],['Resilience','79'],['Motivation','82']].map(([l,v])=>`
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;font-size:11px">
          <div style="width:160px;color:var(--tx2)">${l}</div>
          <div class="prog-bar" style="flex:1"><div class="prog-fill" style="width:${v}%"></div></div>
          <div style="font-family:var(--mono);font-size:10px;font-weight:700;color:var(--pri);width:30px;text-align:right">${v}</div>
        </div>`).join('')}
      </div>
      <div class="alert alert-g">${Icons.i('check-circle', 16)} <div><strong>সুপারিশ:</strong> Staged disbursement — ৳৪০,০০০ স্বাক্ষরে, ৳৪০,০০০ ৬ম মাসে (satisfactory repayment-এ)</div></div>
    `,
    ref: 'PKSF-PSY-2891-2026',
    files: { pdf: 'Psychometric_Assessment_2891.pdf', docx: 'Psychometric_Assessment_2891.docx' },
    sources: [{ name: 'Psychometric Questionnaire Responses', type: 'Assessment', date: '11 May 2026', ref: 'PSY-2891-RAW' }],
    email: { to: 'loan.officer@pksf.org.bd', cc: 'credit.committee@pksf.org.bd', subject: 'Loan Assessment #2891 — Review Required (Score 79/100)', body: 'Psychometric assessment complete for Applicant #2891. Score: 79/100. Recommendation: Approve with staged disbursement (৳40,000 + ৳40,000). Please review attached report.' },
    fullDoc: function() {
      return DocTemplate.build({ org: 'PKSF · Credit Assessment Unit', title: 'Psychometric Credit Assessment — Applicant #2891', ref: 'PKSF-PSY-2891-2026', date: '11 May 2026', prepared: 'Repayment Behaviour Indicator', sections: [
        { h: '1. Assessment Summary', p: 'Composite score: 79/100. Entrepreneurial Intelligence strong (84). Financial Behaviour moderate (67). Social Capital high (88). First-time borrower profile.' },
        { h: '2. Recommendation', p: 'Approve with staged disbursement: ৳40,000 at signing, ৳40,000 at Month 6 conditional on satisfactory repayment. Tenure: 14 months.' },
      ]});
    },
  },
  'salary-report': {
    agent: 'HR PAYROLL AGENT · বেতন প্রক্রিয়াকরণ',
    title: 'April 2026 Salary Processing',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৪৭</div><div class="out-stat-lbl">Staff Members</div></div>
        <div class="out-stat"><div class="out-stat-val">৳৮৪.২L</div><div class="out-stat-lbl">Total Net Payroll</div></div>
        <div class="out-stat"><div class="out-stat-val am">২</div><div class="out-stat-lbl">Anomalies</div></div>
      </div>
      <div class="sheet-view"><table class="sheet">
        <tr><th>Employee</th><th>Dept</th><th>Net Pay</th><th>Status</th></tr>
        <tr><td>রহিমা বেগম</td><td>Management</td><td>৳২,৭২০</td><td><span class="badge badge-g">Ready</span></td></tr>
        <tr><td>John Okoro</td><td>M&E</td><td>৳১,৬৫৭</td><td><span class="badge badge-a badge-with-ic">${Icons.i('alert-triangle', 12)} Leave Query</span></td></tr>
        <tr><td>Maria Santos</td><td>Logistics</td><td>৳১,৩৬০</td><td><span class="badge badge-a badge-with-ic">${Icons.i('alert-triangle', 12)} OT Pending</span></td></tr>
        <tr class="total"><td colspan="2">TOTAL (47 staff)</td><td>৳৮৪,২০,০০০</td><td></td></tr>
      </table></div>
    `,
    ref: 'PKSF-PAY-APR-2026',
    files: { pdf: 'Payroll_April_2026.pdf', xlsx: 'Payroll_Register_April_2026.xlsx' },
    sources: [{ name: 'Attendance Records — April 2026', type: 'HR Data', date: '30 Apr 2026', ref: 'ATT-APR-2026' }],
    email: { to: 'finance@pksf.org.bd', cc: 'hr@pksf.org.bd', subject: 'April 2026 Payroll — 2 Anomalies Require Review', body: 'Payroll for 47 staff ready. Total net: ৳84,20,000. Anomalies: John Okoro (leave query), Maria Santos (OT pending). Please review before disbursement.' },
    fullDoc: function() {
      return DocTemplate.build({ org: 'PKSF · Human Resources', title: 'April 2026 Salary Processing Report', ref: 'PKSF-PAY-APR-2026', date: '12 May 2026', prepared: 'HR Payroll Agent', sections: [
        { h: '1. Summary', p: '47 staff processed. Total net payroll: ৳84,20,000. 45 ready for disbursement. 2 anomalies flagged.' },
        { h: '2. Anomalies', list: ['John Okoro (M&E): Leave balance discrepancy — 1 day unpaid leave unrecorded', 'Maria Santos (Logistics): Overtime claim pending supervisor approval — ৳320'] },
      ]});
    },
  },
  'procurement-analysis': {
    agent: 'PROCUREMENT AGENT · ক্রয় বিশ্লেষণ',
    title: 'Vehicle Maintenance — Vendor Comparison',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৪</div><div class="out-stat-lbl">Quotes Received</div></div>
        <div class="out-stat"><div class="out-stat-val">৳১২.৪L</div><div class="out-stat-lbl">Lowest Quote</div></div>
        <div class="out-stat"><div class="out-stat-val am">৳৪.২L</div><div class="out-stat-lbl">Potential Saving</div></div>
      </div>
      <div class="alert alert-g">${Icons.i('check-circle', 16)} <strong>Freya সুপারিশ:</strong> Rahim Auto Services — গুণমান acceptable, significant cost saving।</div>
    `,
    ref: 'PKSF-PROC-VEH-2026-04',
    files: { pdf: 'Vendor_Comparison_Vehicle_Maint.pdf', xlsx: 'Vendor_Quotes_Comparison.xlsx' },
    sources: [{ name: 'Vendor Quote — Rahim Auto', type: 'Quotation', date: '08 May 2026', ref: 'Q-RAS-2026-04' }],
    email: { to: 'procurement@pksf.org.bd', subject: 'Vendor Recommendation — Vehicle Maintenance', body: 'Comparative analysis of 4 vendor quotes complete. Recommended: Rahim Auto Services (৳12.4L). Potential saving: ৳4.2L vs current supplier.' },
    fullDoc: function() {
      return DocTemplate.build({ org: 'PKSF · Procurement Division', title: 'Vehicle Maintenance — Vendor Comparative Analysis', ref: 'PKSF-PROC-VEH-2026-04', date: '10 May 2026', prepared: 'Procurement Agent', sections: [
        { h: '1. Summary', p: '4 quotes received. Lowest: Rahim Auto Services at ৳12.4L. Potential saving vs current supplier (Apex): ৳4.2L.' },
        { h: '2. Recommendation', p: 'Award to Rahim Auto Services. Quality acceptable, delivery 3 days, 6-month warranty.' },
      ]});
    },
  },
  'donor-report': {
    agent: 'M&E REPORT GENERATOR · প্রতিবেদন',
    title: 'Q3 Programme Performance — World Bank',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">১.২৪L</div><div class="out-stat-lbl">Beneficiaries</div><div class="out-stat-sub">94% of Q3 target</div></div>
        <div class="out-stat"><div class="out-stat-val">১১/১২</div><div class="out-stat-lbl">DLI Indicators Met</div></div>
        <div class="out-stat"><div class="out-stat-val am">১৪ দিন</div><div class="out-stat-lbl">Deadline</div><div class="out-stat-sub">Draft 78% complete</div></div>
      </div>
      <div class="out-finding">
        <div class="out-finding-header">${Icons.i('chart', 14)} <strong>Freya Draft Narrative</strong></div>
        <div class="out-quote">"এ quarter-এ microcredit programme ১.২৪ লাখ ঋণগ্রহীতাকে সেবা দিয়েছে, Q3 DLI target-এর ৯৪%। Khulna ও Rajshahi target অতিক্রম করেছে, Dhaka SME-তে corrective intervention চলছে..."</div>
      </div>
    `,
    ref: 'PKSF-WB-Q3-2026',
    files: { pdf: 'World_Bank_Q3_Performance_2026.pdf', docx: 'World_Bank_Q3_Performance_2026.docx', xlsx: 'DLI_Achievement_Q3_2026.xlsx' },
    sources: [
      { name: 'MIS Beneficiary Data — Q3', type: 'System Data', date: '12 May 2026', ref: 'MIS-BEN-Q3' },
      { name: 'Financial Utilisation Report', type: 'Finance', date: '10 May 2026', ref: 'FIN-UTIL-Q3' },
      { name: 'DLI Indicator Tracker', type: 'M&E', date: '12 May 2026', ref: 'DLI-TRACK-Q3' },
    ],
    email: { to: 'task.manager@worldbank.org', cc: 'rahima.begum@pksf.org.bd, compliance@pksf.org.bd', subject: 'PKSF Q3 2026 Programme Performance Report — Draft for Review', body: 'Dear Task Manager,\n\nPlease find attached the Q3 2026 Programme Performance Report for the PKSF Microcredit Programme. Key highlights: 1.24L beneficiaries (94% of target), 11/12 DLI indicators met.\n\nDraft is 78% complete. Sections 4.2 and 5.1 require final narrative input.\n\nBest regards,\nRahima Begum · Programme Manager, PKSF' },
    fullDoc: function() {
      return DocTemplate.build({ org: 'PKSF · World Bank Programme', title: 'Q3 Programme Performance Report — World Bank', ref: 'PKSF-WB-Q3-2026', date: '12 May 2026', prepared: 'M&E Report Generator · Freya', sections: [
        { h: '1. Executive Summary', p: 'This quarter, the microcredit programme reached 1.24 lakh beneficiaries across 6 divisions, representing 94% of the Q3 DLI target. Khulna and Rajshahi exceeded targets; Dhaka SME requires corrective intervention.' },
        { h: '2. DLI Achievement', list: ['DLI-01 Beneficiary Reach: 94% (18,420/19,600)', 'DLI-04 Health Outcomes: 110%', 'DLI-07 Gender Parity: 105%', 'DLI-09 Partner Compliance: 82% — partial, corrective action underway'] },
        { h: '3. Financial Utilisation', p: 'Budget deployed: ৳160 crore (78% utilisation). Within approved tolerance. Field staff costs at 95% — on track.' },
        { h: '4. Challenges & Mitigations', p: 'PO-KHL-04 flood impact affecting PAR30. Grace period recommended. SME Credit Dhaka PAR30 at 7.1% — corrective memo drafted and under review.' },
      ]});
    },
  },
  'compliance-audit': {
    agent: 'COMPLIANCE SENTINEL · সম্মতি',
    title: 'USAID Annual Compliance Portfolio',
    body: `
      <div class="out-stats">
        <div class="out-stat"><div class="out-stat-val">৮৬</div><div class="out-stat-lbl">Evidence Items</div></div>
        <div class="out-stat"><div class="out-stat-val">৯২%</div><div class="out-stat-lbl">Compliance Score</div></div>
        <div class="out-stat"><div class="out-stat-val am">২৮ দিন</div><div class="out-stat-lbl">Review Date</div></div>
      </div>
      ${[{ ic:'check-circle', t:'ESS Documentation', d:'42 items indexed, all current'},{ ic:'check-circle', t:'Grievance Register', d:'18 cases resolved'},{ ic:'alert-triangle', t:'IND-07 Nutrition', d:'72% vs 85% target'},{ ic:'check-circle', t:'Financial Utilisation', d:'71% disbursed'}].map(function(item) {
        return '<div class="out-item"><span class="out-item-ic">' + Icons.i(item.ic, 16) + '</span><div><strong>' + item.t + '</strong>' + item.d + '</div></div>';
      }).join('')}
    `,
    ref: 'PKSF-USAID-COMP-2026',
    files: { pdf: 'USAID_Compliance_Portfolio_2026.pdf', docx: 'USAID_Compliance_Evidence_2026.docx' },
    sources: [{ name: 'ESS Documentation Archive', type: 'Compliance', date: '01 May 2026', ref: 'ESS-2026' }],
    email: { to: 'compliance.officer@pksf.org.bd', cc: 'director@pksf.org.bd', subject: 'USAID Annual Compliance — 92% Score, 1 Gap Identified', body: 'Annual compliance evidence portfolio ready. 86 items indexed. Score: 92%. Gap: IND-07 Nutrition at 72% vs 85% target. Corrective memo attached.' },
    fullDoc: function() {
      return DocTemplate.build({ org: 'PKSF · Compliance Office', title: 'USAID Annual Compliance Evidence Portfolio', ref: 'PKSF-USAID-COMP-2026', date: '12 May 2026', prepared: 'Compliance Sentinel', sections: [
        { h: '1. Compliance Score', p: 'Overall: 92%. 86 evidence items indexed and tagged. 1 gap identified (IND-07).' },
        { h: '2. Evidence Status', list: ['ESS Documentation: 42 items — complete', 'Grievance Register: 18 cases resolved', 'Safeguarding: 97% staff certified', 'IND-07 Nutrition: 72% vs 85% — corrective memo drafted', 'Financial Utilisation: 71% — within tolerance'] },
      ]});
    },
  },
};

const DocTemplate = {
  build(opts) {
    var sections = (opts.sections || []).map(function(s) {
      var body = s.p ? '<p>' + s.p + '</p>' : '';
      if (s.list) body += '<ol>' + s.list.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ol>';
      return '<div class="doc-section"><h2>' + s.h + '</h2>' + body + '</div>';
    }).join('');
    return '<div class="doc-view">' +
      '<div class="doc-header"><div class="doc-org">' + opts.org + '</div>' +
      '<div class="doc-title">' + opts.title + '</div>' +
      '<div class="doc-meta"><span>Prepared by: <b>' + opts.prepared + '</b></span><span>Date: ' + opts.date + '</span><span>Ref: ' + opts.ref + '</span></div></div>' +
      '<div class="doc-warning">INTERNAL — PKSF USE ONLY · ANTARIOUS AI · PROGRAMME INTELLIGENCE SYSTEM</div>' +
      sections + '</div>';
  },
};
