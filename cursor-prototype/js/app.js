/* ═══════════════════════════════════════════════════════
   PKSF · ANTARIOUS AI — Application Logic
   ═══════════════════════════════════════════════════════ */

const App = {
  screen: 'home',
  role: localStorage.getItem('pksf-role') || 'programme',
  mode: 'semi',
  theme: 'light',
  freyaIdx: 0,
  roleMenuOpen: false,
  currentOutputKey: null,
  viewingFullDoc: false,
  approvedIds: new Set(JSON.parse(localStorage.getItem('pksf-approved') || '[]')),
  approvedReports: new Set(JSON.parse(localStorage.getItem('pksf-approved-reports') || '[]')),

  getRole() {
    return ROLES[App.role] || ROLES.programme;
  },

  getRolePersona() {
    var r = App.getRole();
    return {
      name: I18n.field(r, 'name', 'nameEn'),
      role: I18n.field(r, 'role', 'roleEn'),
      initials: r.initials,
      dept: r.dept,
    };
  },

  roleHasNav(id) {
    return App.getRole().nav.indexOf(id) !== -1;
  },

  getAgentsForRole() {
    var ids = App.getRole().agentIds;
    if (!ids) return AGENTS;
    return AGENTS.filter(function(a) { return ids.indexOf(a.id) !== -1; });
  },

  init() {
    I18n.setLang(I18n.lang);
    App.renderStaticIcons();
    App.applyShell();
    document.addEventListener('click', function(e) {
      if (!App.roleMenuOpen) return;
      var wrap = document.getElementById('user-wrap');
      if (wrap && !wrap.contains(e.target)) App.closeRoleMenu();
    });
    if (!localStorage.getItem('pksf-welcome-seen')) {
      document.getElementById('welcome-modal').classList.add('open');
    }
  },

  applyShell() {
    var persona = App.getRolePersona();
    document.getElementById('brand-sub').textContent = t('brand.sub');
    document.getElementById('freya-bar').title = t('freya.ask');
    document.getElementById('lang-toggle').title = t('lang.title');
    document.getElementById('mode-toggle').title = t('mode.title');
    document.getElementById('mode-manual').textContent = t('mode.manual');
    document.getElementById('mode-semi').textContent = t('mode.semi');
    document.getElementById('mode-full').textContent = t('mode.full');
    document.getElementById('theme-btn').title = t('theme.title');
    document.getElementById('notif-btn').title = t('notif.title');
    document.getElementById('user-name').textContent = persona.name;
    document.getElementById('user-role').textContent = persona.role;
    document.getElementById('user-av').textContent = persona.initials;
    document.getElementById('user-switcher').title = t('role.switch');
    document.getElementById('user-chevron').innerHTML = Icons.i('chevron-down', 14);
    document.getElementById('org-type').textContent = t('org.type');
    document.getElementById('fp-name').textContent = t('freya.panel.name');
    document.getElementById('fp-status').innerHTML = '<span class="status-dot sd-g"></span> ' + t('freya.panel.status');
    document.getElementById('fp-input').placeholder = t('freya.input.placeholder');
    document.getElementById('fp-send-btn').textContent = t('freya.send');
    document.getElementById('welcome-title').textContent = t('welcome.title');
    document.getElementById('welcome-body').innerHTML = t('welcome.body');
    document.getElementById('welcome-start-btn').innerHTML = t('welcome.start') + ' ' + Icons.i('arrow-right', 16);
    document.querySelectorAll('.lang-btn').forEach(function(b) {
      b.classList.toggle('on', b.dataset.lang === I18n.lang);
    });
    if (!App.roleHasNav(App.screen)) App.screen = App.getRole().defaultScreen || 'home';
    App.renderRoleMenu();
    App.renderNav();
    App.renderFreyaQuick();
    App.updateFreyaStatus();
    document.getElementById('main-content').innerHTML = Screens.render(App.screen);
    App.updateBadges();
  },

  renderRoleMenu() {
    var menu = document.getElementById('role-menu');
    if (!menu) return;
    var colors = {
      programme: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      credit: 'linear-gradient(135deg,#005C2B,#00A651)',
      hr: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
      director: 'linear-gradient(135deg,#b45309,#f59e0b)',
    };
    menu.innerHTML = '<div class="role-menu-hd">' + t('role.switchTitle') + '</div>' +
      Object.keys(ROLES).map(function(id) {
        var r = ROLES[id];
        var on = id === App.role ? ' on' : '';
        return '<div class="role-opt' + on + '" onclick="App.setRole(\'' + id + '\')">' +
          '<div class="role-opt-av" style="background:' + (colors[id] || colors.programme) + '">' + r.initials + '</div>' +
          '<div><div class="role-opt-name">' + I18n.field(r, 'name', 'nameEn') + '</div>' +
          '<div class="role-opt-role">' + I18n.field(r, 'role', 'roleEn') + '</div></div>' +
          '<span class="role-opt-check">' + Icons.i('check', 14) + '</span></div>';
      }).join('');
  },

  toggleRoleMenu(e) {
    e.stopPropagation();
    App.roleMenuOpen = !App.roleMenuOpen;
    document.getElementById('role-menu').classList.toggle('open', App.roleMenuOpen);
  },

  closeRoleMenu() {
    App.roleMenuOpen = false;
    var menu = document.getElementById('role-menu');
    if (menu) menu.classList.remove('open');
  },

  setRole(roleId) {
    if (!ROLES[roleId] || roleId === App.role) {
      App.closeRoleMenu();
      return;
    }
    App.role = roleId;
    localStorage.setItem('pksf-role', roleId);
    App.closeRoleMenu();
    document.getElementById('fp-msgs').innerHTML = '';
    App.applyShell();
    App.toast(t('toast.roleChanged', { role: I18n.field(ROLES[roleId], 'role', 'roleEn') }), 'user', 'a');
  },

  setLang(lang) {
    I18n.setLang(lang);
    App.applyShell();
    App.toast(lang === 'bn' ? t('toast.langBn') : t('toast.langEn'), 'info', 'a');
  },

  localizeTask(task) {
    return {
      title: I18n.field(task, 'title', 'titleEn'),
      desc: I18n.field(task, 'desc', 'descEn'),
      due: I18n.field(task, 'due', 'dueEn'),
    };
  },

  renderStaticIcons() {
    var map = {
      'tb-logo': ['leaf', 20, 'icon-white'],
      'tb-fa': ['bot', 16, 'icon-white'],
      'theme-btn': ['moon', 18],
      'notif-btn': ['bell', 18],
      'sb-org-av': ['building', 18, 'icon-white'],
      'ob-close-btn': ['close', 16],
      'fp-avatar': ['bot', 18, 'icon-white'],
      'fp-close-btn': ['close', 16],
      'welcome-ic': ['sparkles', 48],
      'action-close-btn': ['close', 16],
    };
    Object.keys(map).forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var args = map[id];
      if (id === 'fp-close-btn' || id === 'ob-close-btn' || id === 'action-close-btn') {
        el.innerHTML = Icons.i(args[0], args[1]);
        el.classList.add('btn-icon-only');
      } else {
        el.innerHTML = Icons.i(args[0], args[1], args[2] || '');
      }
    });
  },

  renderNav() {
    var el = document.getElementById('nav-list');
    var navIds = App.getRole().nav;
    el.innerHTML = NAV_ITEMS.filter(function(n) { return navIds.indexOf(n.id) !== -1; }).map(function(n) {
      var badge = n.badge != null
        ? '<span class="nav-badge ' + (n.badgeClass || '') + '" id="badge-' + n.id + '">' + App.getBadgeCount(n.id) + '</span>'
        : '';
      return '<div class="nav-item ' + (n.id === App.screen ? 'active' : '') + '" id="ni-' + n.id + '" onclick="App.nav(\'' + n.id + '\')">' +
        '<span class="nav-ic">' + Icons.i(n.ic, 18) + '</span>' +
        '<span style="flex:1">' + t(n.labelKey) + '</span>' +
        badge + '</div>';
    }).join('');
  },

  getBadgeCount(id) {
    if (id === 'home' || id === 'tasks') return App.getPendingTasks().length;
    if (id === 'credit') return App.role === 'hr' ? 0 : 2;
    if (id === 'reports') return App.role === 'hr' ? 1 : 1;
    return 0;
  },

  getPendingTasks() {
    return TASKS.filter(function(task) {
      return task.status === 'pending' &&
        !App.approvedIds.has(task.id) &&
        task.roles.indexOf(App.role) !== -1;
    });
  },

  getApprovedTasks() {
    return TASKS.filter(function(task) {
      return App.approvedIds.has(task.id) && task.roles.indexOf(App.role) !== -1;
    });
  },

  nav(id) {
    if (!App.roleHasNav(id)) return;
    App.screen = id;
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    var ni = document.getElementById('ni-' + id);
    if (ni) ni.classList.add('active');
    document.getElementById('main-content').innerHTML = Screens.render(id);
    App.updateBadges();
  },

  updateBadges() {
    ['home', 'tasks'].forEach(function(id) {
      var b = document.getElementById('badge-' + id);
      if (b) b.textContent = App.getPendingTasks().length;
    });
  },

  toggleTheme() {
    App.theme = App.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', App.theme);
    document.getElementById('theme-btn').innerHTML = Icons.i(App.theme === 'light' ? 'moon' : 'sun', 18);
    App.toast(App.theme === 'dark' ? t('toast.dark') : t('toast.light'), 'sparkles', 'a');
  },

  setMode(m, btn) {
    App.mode = m;
    document.querySelectorAll('.mode-btn').forEach(function(b) { b.classList.remove('on'); });
    btn.classList.add('on');
    App.toast(t('toast.mode.' + m), 'zap', 'g');
    App.updateFreyaStatus();
  },

  updateFreyaStatus() {
    var s = document.getElementById('freya-status-text');
    if (!s) return;
    var pending = App.getPendingTasks().length;
    if (App.mode === 'full') {
      s.innerHTML = t('freya.status.full');
    } else if (App.mode === 'semi') {
      s.innerHTML = t('freya.status.semi', { n: pending });
    } else {
      s.innerHTML = t('freya.status.manual');
    }
  },

  toast(msg, iconName, type) {
    type = type || 'g';
    var c = document.getElementById('toast-container');
    var t = document.createElement('div');
    t.className = 'toast toast-' + type;
    t.innerHTML = '<span class="toast-ic">' + Icons.i(iconName || 'info', 18) + '</span><div>' + msg + '</div>';
    c.appendChild(t);
    setTimeout(function() {
      t.style.opacity = '0';
      t.style.transform = 'translateX(20px)';
      t.style.transition = 'all .3s';
      setTimeout(function() { t.remove(); }, 300);
    }, 3500);
  },

  /* ── Output Modal ── */
  showOutput(key) {
    var d = OUTPUT_DATA[key];
    if (!d) { App.toast(t('toast.noData'), 'warning', 'r'); return; }
    App.currentOutputKey = key;
    App.viewingFullDoc = false;
    document.getElementById('ob-agent').textContent = d.agent;
    document.getElementById('ob-title').textContent = d.title;
    document.getElementById('ob-body').innerHTML = d.body;
    App.renderOutputFooter(key);
    document.getElementById('output-modal').classList.add('open');
  },

  renderOutputFooter(key) {
    var d = OUTPUT_DATA[key];
    document.getElementById('ob-footer').innerHTML =
      '<button class="btn btn-pri btn-sm" onclick="App.showFullDoc(\'' + key + '\')">' + Icons.i('file-text', 14) + ' ' + t('btn.fullReport') + '</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.showSources(\'' + key + '\')">' + Icons.i('link', 14) + ' ' + t('btn.sources') + '</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.showDownloadPicker(\'' + key + '\')">' + Icons.i('download', 14) + ' ' + t('btn.download') + '</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.showWhatsApp(\'' + key + '\')">' + Icons.i('whatsapp', 14) + ' ' + t('btn.whatsapp') + '</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.showEmailDraft(\'' + key + '\')">' + Icons.i('mail', 14) + ' ' + t('btn.email') + '</button>' +
      '<button class="btn btn-acc btn-sm" onclick="App.approveFromOutput(\'' + key + '\')">' + Icons.i('check', 14) + ' ' + t('btn.approve') + '</button>';
  },

  showFullDoc(key) {
    key = key || App.currentOutputKey;
    var d = OUTPUT_DATA[key];
    if (!d || !d.fullDoc) { App.toast('Full document unavailable', 'warning', 'a'); return; }
    App.viewingFullDoc = true;
    App.currentOutputKey = key;
    document.getElementById('ob-body').innerHTML = typeof d.fullDoc === 'function' ? d.fullDoc() : d.fullDoc;
    document.getElementById('ob-footer').innerHTML =
      '<button class="btn btn-sec btn-sm" onclick="App.backToSummary()">' + Icons.i('arrow-left', 14) + ' ' + t('btn.backSummary') + '</button>' +
      '<button class="btn btn-pri btn-sm" onclick="App.showDownloadPicker(\'' + key + '\')">' + Icons.i('download', 14) + ' ' + t('btn.download') + ' PDF</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.showEmailDraft(\'' + key + '\')">' + Icons.i('mail', 14) + ' ' + t('btn.send') + ' ' + t('btn.email') + '</button>';
    document.getElementById('output-modal').classList.add('open');
  },

  backToSummary() {
    if (App.currentOutputKey) App.showOutput(App.currentOutputKey);
  },

  closeOutput() {
    document.getElementById('output-modal').classList.remove('open');
    App.viewingFullDoc = false;
  },

  approveFromOutput(key) {
    var task = TASKS.find(function(t) { return t.outputKey === key && !App.approvedIds.has(t.id); });
    if (task) App.approveTask(task.id);
    else App.approveReport(key);
    App.closeOutput();
  },

  approveReport(key) {
    App.approvedReports.add(key);
    localStorage.setItem('pksf-approved-reports', JSON.stringify([].concat(Array.from(App.approvedReports))));
    var d = OUTPUT_DATA[key];
    App.toast(t('toast.reportApproved', { title: d ? d.title : key }), 'check-circle', 'g');
    setTimeout(function() {
      App.showEmailDraft(key);
    }, 800);
    if (App.screen === 'reports') App.nav('reports');
  },

  /* ── Action Modal (download / email / sources) ── */
  openActionModal(label, title, bodyHtml, footerHtml) {
    document.getElementById('action-label').textContent = label;
    document.getElementById('action-title').textContent = title;
    document.getElementById('action-body').innerHTML = bodyHtml;
    document.getElementById('action-footer').innerHTML = footerHtml || '';
    document.getElementById('action-modal').classList.add('open');
  },

  closeActionModal() {
    document.getElementById('action-modal').classList.remove('open');
  },

  showDownloadPicker(key) {
    key = key || App.currentOutputKey;
    var d = OUTPUT_DATA[key];
    if (!d) return;
    var files = d.files || { pdf: d.ref + '.pdf', docx: d.ref + '.docx', xlsx: d.ref + '.xlsx' };
    var formats = [
      { fmt: 'pdf', label: 'PDF', icon: 'file-text', file: files.pdf },
      { fmt: 'docx', label: 'Word (.docx)', icon: 'file-text', file: files.docx },
      { fmt: 'xlsx', label: 'Excel (.xlsx)', icon: 'chart', file: files.xlsx },
    ].filter(function(f) { return f.file; });

    var body = '<div class="lbl" style="margin-bottom:10px">' + t('modal.chooseFormat') + '</div><div class="download-grid">' +
      formats.map(function(f) {
        return '<button class="download-opt" onclick="App.downloadFormat(\'' + key + '\',\'' + f.fmt + '\')">' +
          Icons.i(f.icon, 24) + '<span>' + f.label + '</span><small>' + f.file + '</small></button>';
      }).join('') + '</div>';

    App.openActionModal('DOWNLOAD', d.title, body, '');
  },

  downloadFormat(key, fmt) {
    var d = OUTPUT_DATA[key];
    if (!d) return;
    var files = d.files || {};
    var filename = files[fmt] || (d.ref + '.' + fmt);
    App.closeActionModal();

    App.toast('Generating ' + fmt.toUpperCase() + '…', 'loader', 'g');

    setTimeout(function() {
      var content = App.buildDownloadPreview(key, fmt, filename);
      App.openActionModal(t('modal.downloadReady'), filename, content,
        '<button class="btn btn-pri btn-sm" onclick="App.simulateDownload(\'' + filename + '\')">' + Icons.i('download', 14) + ' ' + t('btn.saveFile') + '</button>' +
        '<button class="btn btn-sec btn-sm" onclick="App.closeActionModal()">' + t('btn.close') + '</button>'
      );
      App.toast(t('toast.downloadReady', { file: filename }), 'check-circle', 'g');
    }, 1200);
  },

  buildDownloadPreview(key, fmt, filename) {
    var d = OUTPUT_DATA[key];
    var preview = typeof d.fullDoc === 'function' ? d.fullDoc() : (d.body || '');
    if (fmt === 'xlsx') {
      var sheetMatch = d.body.match(/<table class="sheet">[\s\S]*?<\/table>/);
      return '<div class="preview-box preview-xlsx">' +
        '<div class="preview-file-header">' + Icons.i('chart', 20) + ' <strong>' + filename + '</strong></div>' +
        '<p style="font-size:12px;color:var(--tx2);margin-bottom:12px">Excel spreadsheet generated from live data.</p>' +
        (sheetMatch ? sheetMatch[0] : d.body) +
        '</div>';
    }
    if (fmt === 'docx') {
      return '<div class="preview-box"><div class="preview-file-header">' + Icons.i('file-text', 20) + ' <strong>' + filename + '</strong> · Word Document</div>' +
        (typeof d.fullDoc === 'function' ? d.fullDoc() : preview) + '</div>';
    }
    return '<div class="preview-box"><div class="preview-file-header">' + Icons.i('file-text', 20) + ' <strong>' + filename + '</strong> · PDF Preview</div>' +
      (typeof d.fullDoc === 'function' ? d.fullDoc() : preview) + '</div>';
  },

  simulateDownload(filename) {
    App.toast(t('toast.downloaded', { file: filename }), 'download', 'g');
    App.closeActionModal();
  },

  showSources(key) {
    key = key || App.currentOutputKey;
    var d = OUTPUT_DATA[key];
    if (!d || !d.sources) { App.toast('No sources linked', 'info', 'a'); return; }
    var body = d.sources.map(function(s) {
      return '<div class="source-item">' +
        '<div class="source-ic">' + Icons.i('file-text', 18) + '</div>' +
        '<div><div class="source-name">' + s.name + '</div>' +
        '<div class="source-meta">' + s.type + ' · ' + s.date + ' · <code>' + s.ref + '</code></div></div>' +
        '<button class="btn btn-sm btn-sec" onclick="App.openSourceDoc(\'' + s.ref + '\',\'' + s.name.replace(/'/g, "\\'") + '\')">' + Icons.i('eye', 14) + ' ' + t('modal.open') + '</button></div>';
    }).join('');
    App.openActionModal(t('modal.sources'), d.title, body, '<button class="btn btn-sec btn-sm" onclick="App.closeActionModal()">' + t('btn.close') + '</button>');
  },

  openSourceDoc(ref, name) {
    App.closeActionModal();
    App.openActionModal('SOURCE DOCUMENT', name,
      DocTemplate.build({
        org: 'PKSF · Evidence Archive',
        title: name,
        ref: ref,
        date: '12 May 2026',
        prepared: 'Document Management System',
        sections: [{ h: 'Document Contents', p: 'This is the archived source document referenced in the analysis. Ref: ' + ref + '. Content verified and indexed by Freya Compliance Sentinel.' }],
      }),
      '<button class="btn btn-sec btn-sm" onclick="App.closeActionModal()">' + t('btn.close') + '</button>'
    );
  },

  showEmailDraft(key) {
    key = key || App.currentOutputKey;
    var d = OUTPUT_DATA[key];
    if (!d || !d.email) { App.toast('Email template unavailable', 'warning', 'a'); return; }
    var e = d.email;
    var body = '<div class="email-preview">' +
      '<div class="email-row"><span class="email-lbl">To:</span><span>' + e.to + '</span></div>' +
      (e.cc ? '<div class="email-row"><span class="email-lbl">Cc:</span><span>' + e.cc + '</span></div>' : '') +
      '<div class="email-row"><span class="email-lbl">Subject:</span><strong>' + e.subject + '</strong></div>' +
      '<div class="email-attach">' + Icons.i('file-text', 14) + ' Attachment: ' + (d.files && d.files.pdf ? d.files.pdf : d.ref + '.pdf') + '</div>' +
      '<div class="email-body">' + e.body.replace(/\n/g, '<br>') + '</div></div>';
    App.openActionModal(t('modal.emailDraft'), t('modal.emailReview'), body,
      '<button class="btn btn-pri btn-sm" onclick="App.sendEmail(\'' + key + '\')">' + Icons.i('send', 14) + ' ' + t('modal.sendEmail') + '</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.closeActionModal()">' + t('btn.cancel') + '</button>'
    );
  },

  sendEmail(key) {
    var d = OUTPUT_DATA[key];
    App.closeActionModal();
    App.toast(t('toast.emailSent', { to: d.email ? d.email.to : 'recipient' }), 'mail', 'g');
  },

  showWhatsApp(key) {
    key = key || App.currentOutputKey;
    var d = OUTPUT_DATA[key];
    if (!d) return;
    var msg = 'PKSF Update: ' + d.title + ' — Ready for review. Ref: ' + d.ref + '. Open Antarious AI to approve.';
    App.openActionModal(t('modal.whatsapp'), t('modal.recipients'),
      '<div class="whatsapp-preview">' + Icons.i('whatsapp', 24) + '<div class="wa-bubble">' + msg + '</div></div>' +
      '<div class="lbl" style="margin-top:12px">' + t('modal.recipients') + '</div>' +
      '<div class="source-item"><span>PO-KHL-04 Field Officer</span><span class="badge badge-g">+880 1712-XXXXXX</span></div>' +
      '<div class="source-item"><span>Programme Director</span><span class="badge badge-g">+880 1811-XXXXXX</span></div>',
      '<button class="btn btn-pri btn-sm" onclick="App.sendWhatsApp()">' + Icons.i('send', 14) + ' ' + t('modal.sendWhatsapp') + '</button>' +
      '<button class="btn btn-sec btn-sm" onclick="App.closeActionModal()">' + t('btn.cancel') + '</button>'
    );
  },

  sendWhatsApp() {
    App.closeActionModal();
    App.toast(t('toast.whatsappSent'), 'whatsapp', 'g');
  },

  approveTask(id) {
    App.approvedIds.add(id);
    localStorage.setItem('pksf-approved', JSON.stringify([].concat(Array.from(App.approvedIds))));
    App.toast(t('toast.approved'), 'check-circle', 'g');
    App.nav(App.screen);
    App.updateFreyaStatus();
  },

  approveAll() {
    App.getPendingTasks().forEach(function(t) { App.approvedIds.add(t.id); });
    localStorage.setItem('pksf-approved', JSON.stringify([].concat(Array.from(App.approvedIds))));
    App.toast(t('toast.allApproved'), 'check-circle', 'g');
    App.nav('tasks');
    App.updateFreyaStatus();
  },

  closeWelcome() {
    document.getElementById('welcome-modal').classList.remove('open');
    localStorage.setItem('pksf-welcome-seen', '1');
  },

  openFreya() {
    document.getElementById('freya-panel').classList.add('open');
    var msgs = document.getElementById('fp-msgs');
    if (!msgs.children.length) {
      App.addFreyaMsg('system', t('freya.greeting', { n: App.getPendingTasks().length }));
    }
  },

  closeFreya() {
    document.getElementById('freya-panel').classList.remove('open');
  },

  renderFreyaQuick() {
    document.getElementById('fp-quick').innerHTML = I18n.freyaQuick().slice(0, 4).map(function(q) {
      return '<button class="btn btn-sm btn-sec" onclick="App.fpQuick(\'' + q.replace(/'/g, "\\'") + '\')">' + q + '</button>';
    }).join('');
  },

  addFreyaMsg(role, text) {
    var c = document.getElementById('fp-msgs');
    var div = document.createElement('div');
    if (role === 'system') {
      div.innerHTML = '<div style="margin-bottom:4px;display:flex;align-items:center;gap:4px">' + Icons.i('bot', 12) + '<span style="font-family:var(--mono);font-size:8px;font-weight:700;color:var(--pri)">FREYA</span></div>' +
        '<div style="background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;font-size:12px;color:var(--tx2);line-height:1.65">' + text + '</div>';
    } else {
      div.innerHTML = '<div style="display:flex;justify-content:flex-end;margin-bottom:4px"><span style="font-family:var(--mono);font-size:8px;font-weight:700;color:var(--tx3)">' + t('freya.you') + '</span></div>' +
        '<div style="background:rgba(0,92,43,.08);border:1px solid rgba(0,92,43,.18);border-radius:10px;padding:10px 12px;font-size:12px;color:var(--tx);line-height:1.65;text-align:right">' + text + '</div>';
    }
    c.appendChild(div);
    c.scrollTop = c.scrollHeight;
  },

  fpSend() {
    var inp = document.getElementById('fp-input');
    var msg = inp.value.trim();
    if (!msg) return;
    App.addFreyaMsg('user', msg);
    inp.value = '';
    setTimeout(function() {
      App.addFreyaMsg('system', I18n.freyaReplies()[App.freyaIdx++ % I18n.freyaReplies().length]);
    }, 700);
  },

  fpQuick(q) {
    App.openFreya();
    App.addFreyaMsg('user', q);
    setTimeout(function() {
      App.addFreyaMsg('system', I18n.freyaReplies()[App.freyaIdx++ % I18n.freyaReplies().length]);
    }, 600);
  },

  runAgent(agentId) {
    var agent = AGENTS.find(function(a) { return a.id === agentId; });
    if (!agent) return;
    if (agent.pipeline) App.runPipeline(agent.pipeline);
    else {
      App.toast(t('toast.agentStarting', { name: I18n.lang === 'en' ? agent.name : agent.nameBn }), agent.ic, 'g');
      setTimeout(function() { App.showOutput(agent.outputKey); }, 1500);
    }
  },

  runPipeline(key) {
    var pipeline = WORKFLOW_PIPELINES[key];
    if (!pipeline) return;

    var overlay = document.createElement('div');
    overlay.id = 'wf-run-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:900;display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;backdrop-filter:blur(4px)';

    overlay.innerHTML =
      '<div style="width:100%;max-width:720px;background:var(--card);border-radius:16px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.4);margin:auto">' +
        '<div style="padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px">' +
          '<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--pri),var(--acc));display:flex;align-items:center;justify-content:center;color:#fff">' + Icons.i('zap', 20, 'icon-white') + '</div>' +
          '<div style="flex:1"><div style="font-size:16px;font-weight:800;color:var(--tx)">' + pipeline.name + '</div>' +
          '<div style="font-size:11px;color:var(--tx3)">' + pipeline.desc + '</div></div>' +
          '<button onclick="document.getElementById(\'wf-run-overlay\').remove()" class="btn-icon-only ob-close" style="width:30px;height:30px">' + Icons.i('close', 16) + '</button>' +
        '</div><div id="wf-agents-list"></div>' +
        '<div style="padding:16px 24px;border-top:1px solid var(--border);display:flex;gap:10px;align-items:center">' +
          '<div style="flex:1;height:5px;background:var(--card2);border-radius:3px;overflow:hidden">' +
            '<div id="wf-progress-fill" style="height:100%;background:var(--pri);width:0%;transition:width .4s"></div></div>' +
          '<span id="wf-progress-text" style="font-family:var(--mono);font-size:10px;color:var(--tx3)">০ / ' + pipeline.agents.length + '</span>' +
        '</div></div>';

    document.body.appendChild(overlay);
    var list = document.getElementById('wf-agents-list');
    var agents = pipeline.agents;

    agents.forEach(function(ag, i) {
      var div = document.createElement('div');
      div.id = 'wf-agent-' + i;
      div.style.cssText = 'border-bottom:1px solid var(--border);opacity:.35;transition:opacity .3s';
      div.innerHTML =
        '<div style="display:flex;align-items:center;gap:14px;padding:14px 24px">' +
          '<div style="width:40px;height:40px;border-radius:10px;background:var(--card2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--pri)">' + Icons.i(ag.ic, 20) + '</div>' +
          '<div style="flex:1"><div style="font-family:var(--mono);font-size:9px;font-weight:700;color:var(--tx3);text-transform:uppercase">' + ag.cat + '</div>' +
          '<div style="font-size:14px;font-weight:700;color:var(--tx)">' + ag.n + '</div>' +
          '<div style="font-size:11px;color:var(--tx3)">' + ag.sub + '</div></div>' +
          '<div id="wf-badge-' + i + '" class="wf-badge">' + t('wf.waiting') + '</div>' +
        '</div>' +
        '<div id="wf-output-' + i + '" style="display:none;padding:12px 24px 16px;background:rgba(0,92,43,.03);border-top:1px solid rgba(0,92,43,.1)">' +
          '<div style="font-family:var(--mono);font-size:8px;font-weight:700;color:var(--pri);letter-spacing:2px;margin-bottom:7px">' + t('wf.result') + '</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">' +
            '<div style="font-size:13px;font-weight:700;color:var(--tx)">' + ag.out + '</div>' +
            '<button class="btn btn-sec btn-sm" onclick="document.getElementById(\'wf-run-overlay\').remove();App.showOutput(\'' + ag.outKey + '\')">' + Icons.i('eye', 14) + ' ' + t('btn.view') + '</button>' +
          '</div></div>';
      list.appendChild(div);
    });

    agents.forEach(function(ag, i) {
      var startDelay = 600 + i * 900;
      setTimeout(function() {
        document.getElementById('wf-agent-' + i).style.opacity = '1';
        var badge = document.getElementById('wf-badge-' + i);
        badge.className = 'wf-badge wf-running';
        badge.innerHTML = Icons.i('zap', 12) + ' ' + t('wf.running');
      }, startDelay);

      setTimeout(function() {
        var badge = document.getElementById('wf-badge-' + i);
        badge.className = 'wf-badge wf-done';
        badge.innerHTML = Icons.i('check', 12) + ' ' + t('wf.done');
        document.getElementById('wf-output-' + i).style.display = 'block';
        document.getElementById('wf-progress-fill').style.width = ((i + 1) / agents.length * 100) + '%';
        document.getElementById('wf-progress-text').textContent = t('wf.progress', { n: i + 1, total: agents.length });
        if (i === agents.length - 1) {
          setTimeout(function() { App.toast(t('toast.workflowDone'), 'check-circle', 'g'); }, 400);
        }
      }, startDelay + 800);
    });
  },
};

document.addEventListener('DOMContentLoaded', function() { App.init(); });
