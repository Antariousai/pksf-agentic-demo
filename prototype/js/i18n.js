/* ══════════════════════════════════════════════════════
   PKSF · ANTARIOUS AI — Bangla / English Translation
   Phrase-dictionary walker. Translates text nodes + selected
   attributes on toggle. Persists choice in localStorage.
   ══════════════════════════════════════════════════════ */

/* English → Bangla dictionary. Keys are normalised (trimmed, single-space). */
const BN = {
  // ── Top bar / chrome ──
  "PKSF · Antarious AI": "পিকেএসএফ · আন্তরিয়াস এআই",
  "Intelligence Platform": "ইন্টেলিজেন্স প্ল্যাটফর্ম",
  "Manual": "ম্যানুয়াল",
  "Semi-Auto": "সেমি-অটো",
  "Full Auto": "ফুল অটো",
  "EN": "EN",
  "BN": "BN",
  "Toggle Theme": "থিম পরিবর্তন",
  "Notifications": "নোটিফিকেশন",
  "Switch Language": "ভাষা পরিবর্তন",
  "Switch Role": "ভূমিকা পরিবর্তন",
  "Sign Out": "সাইন আউট",

  // ── Users / roles ──
  "Dr. Anisul Haque": "ড. আনিসুল হক",
  "Rowshan Begum": "রওশন বেগম",
  "Mohammad Rashid": "মোহাম্মদ রশিদ",
  "Managing Director": "ব্যবস্থাপনা পরিচালক",
  "Programme Officer": "প্রোগ্রাম অফিসার",
  "Finance Officer": "ফিন্যান্স অফিসার",
  "Full Access": "পূর্ণ এক্সেস",
  "USSP Division": "ইউএসএসপি বিভাগ",
  "Accounts Department": "হিসাব বিভাগ",
  "PKSF": "পিকেএসএফ",
  "Apex MFI · Dhaka, Bangladesh": "অ্যাপেক্স এমএফআই · ঢাকা, বাংলাদেশ",

  // ── Sidebar sections ──
  "Overview": "ওভারভিউ",
  "Partner Network": "অংশীদার নেটওয়ার্ক",
  "Programmes": "প্রোগ্রাম",
  "Intelligence": "ইন্টেলিজেন্স",
  "Operations": "অপারেশনস",
  "Account": "অ্যাকাউন্ট",

  // ── Sidebar nav items ──
  "Home Dashboard": "হোম ড্যাশবোর্ড",
  "Partner Orgs": "অংশীদার সংস্থা",
  "Loan Portfolio": "ঋণ পোর্টফোলিও",
  "Active Programmes": "চলমান প্রোগ্রাম",
  "Beneficiaries": "সুবিধাভোগী",
  "Reports": "রিপোর্ট",
  "AI Agents": "এআই এজেন্ট",
  "Finance & Grants": "ফিন্যান্স ও গ্রান্ট",
  "HR & People": "এইচআর ও জনবল",

  // ── Login page ──
  "Welcome Back": "স্বাগতম",
  "Sign in to PKSF AI": "পিকেএসএফ এআই-তে সাইন ইন করুন",
  "Access your programmes, reports, and AI assistant": "আপনার প্রোগ্রাম, রিপোর্ট এবং এআই অ্যাসিস্ট্যান্ট অ্যাক্সেস করুন",
  "Employee ID / Email": "কর্মচারী আইডি / ইমেইল",
  "Password": "পাসওয়ার্ড",
  "Keep me signed in": "আমাকে সাইন ইন রাখুন",
  "Forgot password?": "পাসওয়ার্ড ভুলে গেছেন?",
  "Sign In to PKSF AI": "পিকেএসএফ এআই-তে সাইন ইন করুন",
  "or sign in as a demo user": "অথবা ডেমো ইউজার হিসেবে সাইন ইন করুন",
  "Antarious AI": "আন্তরিয়াস এআই",
  "AI-Powered Operations Platform": "এআই-চালিত অপারেশন প্ল্যাটফর্ম",
  "for PKSF & Partner Organizations": "পিকেএসএফ ও অংশীদার সংস্থাগুলির জন্য",
  "Palli Karma-Sahayak Foundation · Bangladesh": "পল্লী কর্ম-সহায়ক ফাউন্ডেশন · বাংলাদেশ",
  "Freya AI Assistant": "ফ্রেয়া এআই অ্যাসিস্ট্যান্ট",
  "Ask anything — reports, analytics, drafts, alerts": "যেকোনো কিছু জিজ্ঞাসা করুন — রিপোর্ট, অ্যানালিটিক্স, খসড়া, সতর্কতা",
  "Live Portfolio Monitoring": "লাইভ পোর্টফোলিও মনিটরিং",
  "276 Partner Orgs · Real-time PAR alerts": "২৭৬ অংশীদার সংস্থা · রিয়েল-টাইম PAR সতর্কতা",
  "Automated Reporting": "স্বয়ংক্রিয় রিপোর্টিং",
  "IFAD, World Bank, ADB reports in minutes": "আইএফএডি, বিশ্ব ব্যাংক, এডিবি রিপোর্ট মিনিটে",
  "Programme Intelligence": "প্রোগ্রাম ইন্টেলিজেন্স",
  "USSP, ENRICH, PACE — live tracking": "ইউএসএসপি, এনরিচ, পেস — লাইভ ট্র্যাকিং",
  "Partner Orgs": "অংশীদার সংস্থা",
  "Borrowers": "ঋণগ্রহীতা",
  "Portfolio": "পোর্টফোলিও",
  "Confidential — Authorised PKSF Personnel Only · v1.0 May 2026": "গোপনীয় — অনুমোদিত পিকেএসএফ কর্মীদের জন্য · v1.0 মে 2026",

  // ── Dashboard page ──
  "Good morning, Dr. Haque": "সুপ্রভাত, ড. হক",
  "What needs my attention?": "কিসে আমার মনোযোগ প্রয়োজন?",
  "Portfolio summary": "পোর্টফোলিও সারাংশ",
  "Upcoming deadlines": "আসন্ন ডেডলাইন",
  "Morning brief": "সকালের ব্রিফ",
  "Freya is working on": "ফ্রেয়া কাজ করছে",
  "View All Tasks": "সব টাস্ক দেখুন",
  "Recent Activity": "সাম্প্রতিক কার্যকলাপ",
  "Upcoming Deadlines": "আসন্ন ডেডলাইন",
  "Quick Actions": "দ্রুত পদক্ষেপ",

  // ── Common KPI / stat labels ──
  "Total Active POs": "মোট সক্রিয় অংশীদার সংস্থা",
  "Performing Well (PAR30 <5%)": "ভালো পারফর্ম করছে (PAR30 <৫%)",
  "Need Attention": "মনোযোগ প্রয়োজন",
  "Critical Risk": "জরুরি ঝুঁকি",
  "Total Portfolio": "মোট পোর্টফোলিও",
  "Total Active Portfolio": "মোট সক্রিয় পোর্টফোলিও",
  "Active Programmes": "চলমান প্রোগ্রাম",
  "Total Beneficiaries": "মোট সুবিধাভোগী",
  "Pending Approvals": "অপেক্ষমাণ অনুমোদন",
  "Field Officers": "ফিল্ড অফিসার",
  "Active Loans": "সক্রিয় ঋণ",
  "Total Borrowers": "মোট ঋণগ্রহীতা",
  "Budget Utilised": "বাজেট ব্যবহৃত",
  "Total Programme Budget": "মোট প্রোগ্রাম বাজেট",

  // ── Status badges / tags ──
  "Healthy": "সুস্থ",
  "Monitor": "নজরদারি",
  "At Risk": "ঝুঁকিতে",
  "⚠ At Risk": "⚠ ঝুঁকিতে",
  "Critical": "জরুরি",
  "On Track": "ঠিকপথে",
  "Approved": "অনুমোদিত",
  "Pending": "অপেক্ষমাণ",
  "Draft": "খসড়া",
  "In Progress": "চলমান",
  "Completed": "সম্পন্ন",
  "New": "নতুন",
  "Urgent": "জরুরি",
  "Active": "সক্রিয়",
  "Inactive": "নিষ্ক্রিয়",

  // ── Buttons / actions ──
  "Freya Analysis": "ফ্রেয়া বিশ্লেষণ",
  "View Analysis": "বিশ্লেষণ দেখুন",
  "Draft Plan": "পরিকল্পনার খসড়া",
  "Full Report": "সম্পূর্ণ রিপোর্ট",
  "Detailed View": "বিস্তারিত দেখুন",
  "Download": "ডাউনলোড",
  "Email": "ইমেইল",
  "WhatsApp": "হোয়াটসঅ্যাপ",
  "Approve": "অনুমোদন",
  "Reject": "প্রত্যাখ্যান",
  "Review": "পর্যালোচনা",
  "View Details": "বিস্তারিত দেখুন",
  "Generate Report": "রিপোর্ট তৈরি",
  "Send to Review": "পর্যালোচনার জন্য পাঠান",
  "Export": "এক্সপোর্ট",
  "Filter": "ফিল্টার",
  "Search": "অনুসন্ধান",
  "Add": "যোগ করুন",
  "Cancel": "বাতিল",
  "Confirm": "নিশ্চিত করুন",
  "Save": "সংরক্ষণ",
  "Edit": "সম্পাদনা",
  "Delete": "মুছুন",
  "Close": "বন্ধ",
  "Refresh": "রিফ্রেশ",
  "Open": "খুলুন",
  "View All": "সব দেখুন",
  "View More": "আরও দেখুন",
  "Show All": "সব দেখান",
  "+ Add Partner Org": "+ অংশীদার সংস্থা যোগ",

  // ── Partners page ──
  "Partner Organisations": "অংশীদার সংস্থাসমূহ",
  "Partner Performance Monitor": "অংশীদার পারফরম্যান্স মনিটর",

  // ── Portfolio page ──
  "Portfolio Health Report": "পোর্টফোলিও স্বাস্থ্য রিপোর্ট",
  "Loan Portfolio Monitoring": "ঋণ পোর্টফোলিও মনিটরিং",
  "Portfolio Quality": "পোর্টফোলিও মান",
  "Portfolio Overview": "পোর্টফোলিও ওভারভিউ",
  "Division-wise Performance": "বিভাগওয়ারী পারফরম্যান্স",

  // ── Programs page ──
  "Programme Performance": "প্রোগ্রাম পারফরম্যান্স",
  "Quarterly Progress": "ত্রৈমাসিক অগ্রগতি",
  "Programme Intelligence · M&E Report Generator": "প্রোগ্রাম ইন্টেলিজেন্স · এম অ্যান্ড ই রিপোর্ট জেনারেটর",

  // ── Beneficiaries page ──
  "Total Households": "মোট পরিবার",
  "Ultra-Poor Households": "অতি-দরিদ্র পরিবার",
  "Graduated Above Poverty": "দারিদ্র্য থেকে উত্তীর্ণ",
  "Food Security Achieved": "খাদ্য নিরাপত্তা অর্জিত",

  // ── Reports page ──
  "Generated Reports": "তৈরি করা রিপোর্ট",
  "Report Templates": "রিপোর্ট টেমপ্লেট",
  "Quarterly Report": "ত্রৈমাসিক রিপোর্ট",
  "Annual Report": "বার্ষিক রিপোর্ট",
  "Donor Report": "দাতা রিপোর্ট",
  "Compliance Report": "কমপ্লায়েন্স রিপোর্ট",

  // ── Agents page ──
  "AI Agent Network": "এআই এজেন্ট নেটওয়ার্ক",
  "Active Agents": "সক্রিয় এজেন্ট",
  "Agent Performance": "এজেন্ট পারফরম্যান্স",

  // ── Finance page ──
  "Finance & Grants Management": "ফিন্যান্স ও গ্রান্ট ব্যবস্থাপনা",
  "Budget Utilisation": "বাজেট ব্যবহার",
  "Donor Funds": "দাতা তহবিল",
  "Disbursements": "ঋণ বিতরণ",
  "Recoveries": "আদায়",
  "Approved Budget": "অনুমোদিত বাজেট",
  "Disbursed": "বিতরণ",
  "Utilised": "ব্যবহৃত",
  "% Used": "% ব্যবহৃত",
  "Donor": "দাতা",
  "Programme": "প্রোগ্রাম",

  // ── HR page ──
  "HR Dashboard": "এইচআর ড্যাশবোর্ড",
  "Total Staff": "মোট কর্মী",
  "Open Positions": "খালি পদ",
  "New Joiners": "নতুন যোগদানকারী",
  "Pending Approvals": "অপেক্ষমাণ অনুমোদন",
  "Attendance": "উপস্থিতি",
  "Leave Requests": "ছুটির আবেদন",
  "Recruitment": "নিয়োগ",
  "Payroll": "পেরোল",

  // ── Notifications page ──
  "All Notifications": "সব নোটিফিকেশন",
  "Mark all as read": "সব পঠিত হিসেবে চিহ্নিত করুন",
  "Unread": "অপঠিত",
  "Today": "আজ",
  "Yesterday": "গতকাল",
  "This Week": "এই সপ্তাহ",
  "Earlier": "আগে",

  // ── Divisions (Bangladesh) ──
  "Dhaka": "ঢাকা",
  "Chittagong": "চট্টগ্রাম",
  "Rajshahi": "রাজশাহী",
  "Khulna": "খুলনা",
  "Sylhet": "সিলেট",
  "Barisal": "বরিশাল",
  "Rangpur": "রংপুর",
  "Mymensingh": "ময়মনসিংহ",
  "Jessore": "যশোর",

  // ── Common phrasing ──
  "Division": "বিভাগ",
  "District": "জেলা",
  "Status": "স্থিতি",
  "Action": "পদক্ষেপ",
  "Actions": "পদক্ষেপ",
  "Total": "মোট",
  "TOTAL": "মোট",
  "Date": "তারিখ",
  "Amount": "পরিমাণ",
  "Type": "ধরন",
  "Category": "বিভাগ",
  "Name": "নাম",
  "Phone": "ফোন",
  "Address": "ঠিকানা",
  "Description": "বিবরণ",
  "Created": "তৈরি",
  "Updated": "আপডেট",
  "Last Synced": "সর্বশেষ সিঙ্ক",
  "Last synced": "সর্বশেষ সিঙ্ক",

  // ── Time / dates ──
  "min ago": "মিনিট আগে",
  "hours ago": "ঘন্টা আগে",
  "days ago": "দিন আগে",
  "Now": "এখন",
  "Tomorrow": "আগামীকাল",

  // ── Toasts / Freya ──
  "Switched to Light Mode": "লাইট মোডে পরিবর্তন",
  "Switched to Dark Mode": "ডার্ক মোডে পরিবর্তন",
  "Switched to English": "ইংরেজিতে পরিবর্তন",
  "Switched to বাংলা": "বাংলায় পরিবর্তন",
  "Signing you in...": "সাইন ইন করা হচ্ছে...",
  "Please enter your Employee ID or email": "কর্মচারী আইডি বা ইমেইল লিখুন",
  "Please wait": "অপেক্ষা করুন",

  // ── Freya status messages ──
  "Freya is on standby — Manual Mode active. Click to ask for help.": "ফ্রেয়া স্ট্যান্ডবাইতে — ম্যানুয়াল মোড সক্রিয়। সাহায্যের জন্য ক্লিক করুন।",
  "Manual Mode — You control everything. Freya is on standby.": "ম্যানুয়াল মোড — সবকিছু আপনার নিয়ন্ত্রণে। ফ্রেয়া স্ট্যান্ডবাইতে।",
  "Semi-Auto — Freya proposes actions, you approve before execution": "সেমি-অটো — ফ্রেয়া পদক্ষেপ প্রস্তাব করে, কার্যকর হবার আগে আপনি অনুমোদন দেন",
  "Full Auto — Freya executes all approved tasks automatically": "ফুল অটো — ফ্রেয়া সব অনুমোদিত টাস্ক স্বয়ংক্রিয়ভাবে কার্যকর করে",
  "Freya is ready to help": "ফ্রেয়া সাহায্য করতে প্রস্তুত",
  "What would you like to know?": "আপনি কী জানতে চান?",
  "Send": "পাঠান",
  "Type a message...": "একটি বার্তা লিখুন...",
  "Ask Freya...": "ফ্রেয়াকে জিজ্ঞাসা করুন...",
  "FREYA · AI ASSISTANT": "ফ্রেয়া · এআই অ্যাসিস্ট্যান্ট",
  "YOU": "আপনি"
};

const I18N_KEY = 'pksf-lang';

/* Normalise text for lookup */
function normaliseText(t) {
  return t.replace(/\s+/g, ' ').trim();
}

/* Walk text nodes and translate */
function translateElement(root, lang) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentNode;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(node => {
    // Cache original
    if (!node.__pksfOrig) node.__pksfOrig = node.nodeValue;
    const orig = node.__pksfOrig;
    if (lang === 'en') {
      node.nodeValue = orig;
      return;
    }
    // Try full match first
    const trimmed = normaliseText(orig);
    if (BN[trimmed]) {
      // Preserve leading/trailing whitespace
      const lead = orig.match(/^\s*/)[0];
      const trail = orig.match(/\s*$/)[0];
      node.nodeValue = lead + BN[trimmed] + trail;
    } else {
      node.nodeValue = orig;
    }
  });

  // Translate placeholder, title, value attributes on inputs/buttons
  const attrTargets = root.querySelectorAll ? root.querySelectorAll('[placeholder], [title], input[type="submit"], input[type="button"]') : [];
  attrTargets.forEach(el => {
    ['placeholder', 'title'].forEach(attr => {
      if (el.hasAttribute(attr)) {
        const cacheKey = '__pksfOrig_' + attr;
        if (!el[cacheKey]) el[cacheKey] = el.getAttribute(attr);
        const o = el[cacheKey];
        if (lang === 'en') { el.setAttribute(attr, o); return; }
        const t = normaliseText(o);
        if (BN[t]) el.setAttribute(attr, BN[t]);
        else el.setAttribute(attr, o);
      }
    });
    if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button') && el.value) {
      if (!el.__pksfOrigVal) el.__pksfOrigVal = el.value;
      const o = el.__pksfOrigVal;
      if (lang === 'en') { el.value = o; }
      else {
        const t = normaliseText(o);
        el.value = BN[t] || o;
      }
    }
  });
}

function getLang() {
  return localStorage.getItem(I18N_KEY) || 'en';
}

function setLang(lang) {
  localStorage.setItem(I18N_KEY, lang);
  document.documentElement.setAttribute('lang', lang === 'bn' ? 'bn' : 'en');
  document.documentElement.setAttribute('data-lang', lang);
  translateElement(document.body, lang);
  // Update toggle button label
  const btn = document.getElementById('lang-btn');
  if (btn) btn.querySelector('.lang-btn-text').textContent = lang === 'bn' ? 'বাং' : 'EN';
  if (typeof toast === 'function') {
    toast(lang === 'bn' ? 'বাংলায় পরিবর্তন' : 'Switched to English', '', 'g');
  }
}

function toggleLang() {
  setLang(getLang() === 'bn' ? 'en' : 'bn');
}

/* Watch for new DOM and translate it */
function startI18nObserver() {
  const obs = new MutationObserver(muts => {
    const lang = getLang();
    if (lang === 'en') return;
    muts.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) translateElement(node, lang);
        else if (node.nodeType === 3 && node.parentNode) {
          // single text node
          if (!node.__pksfOrig) node.__pksfOrig = node.nodeValue;
          const t = normaliseText(node.__pksfOrig);
          if (BN[t]) node.nodeValue = BN[t];
        }
      });
    });
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'bn' ? 'bn' : 'en');
  // Slight delay so other DOMContentLoaded handlers (icon walker) finish first.
  setTimeout(() => {
    if (lang === 'bn') translateElement(document.body, 'bn');
    startI18nObserver();
  }, 0);
});
