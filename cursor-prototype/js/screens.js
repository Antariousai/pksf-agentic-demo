/* ═══════════════════════════════════════════════════════
   PKSF · ANTARIOUS AI — Screen Renderers
   ═══════════════════════════════════════════════════════ */

function ic(name, size, cls) { return Icons.i(name, size || 20, cls || ''); }

function lt(task) {
  return {
    title: I18n.field(task, 'title', 'titleEn'),
    desc: I18n.field(task, 'desc', 'descEn'),
    due: I18n.field(task, 'due', 'dueEn'),
  };
}

const Screens = {
  render(id) {
    const fn = Screens[id];
    return fn ? fn() : Screens.empty();
  },

  empty() {
    return '<div class="empty-state"><div class="empty-state-ic">' + ic('construction', 48) + '</div><div class="empty-state-title">' + t('empty.coming') + '</div></div>';
  },

  home() {
    const pending = App.getPendingTasks();
    const persona = App.getRolePersona();
    const role = App.getRole();
    const urgentCount = pending.filter(function(x) { return x.urgency; }).length;
    const freyaKey = 'role.' + App.role + '.freyaText';
    const freyaText = t(freyaKey, { n: pending.length });
    return `
      <div class="welcome-banner">
        <div class="welcome-banner-ic">${ic('user', 36, 'icon-white')}</div>
        <div>
          <h2>${t('home.greeting', { name: persona.name })}</h2>
          <p>${t('home.intro', { n: pending.length })}</p>
        </div>
      </div>
      <div class="freya-box">
        <div class="freya-box-ic">${ic('bot', 18, 'icon-white')}</div>
        <div>
          <div class="freya-box-label">${t('home.freyaLabel')}</div>
          <div class="freya-box-text">${freyaText}</div>
        </div>
        <div class="freya-box-acts">
          <button class="btn btn-pri btn-sm" onclick="App.nav('tasks')">${t('home.viewAll')} (${pending.length})</button>
          <button class="btn btn-sec btn-sm" onclick="App.openFreya()">${t('home.askFreya')}</button>
        </div>
      </div>
      <div class="grid-4" style="margin-bottom:20px">
        ${role.homeStats.map(function(stat) {
          var val = stat.dynamic ? pending.length : stat.val;
          var changeText = stat.change ||
            (stat.changeKey === 'home.stat.urgentToday'
              ? t(stat.changeKey, { n: urgentCount })
              : t(stat.changeKey));
          var changeHtml = stat.changeIcon
            ? '<span class="stat-change-inner">' + ic(stat.changeIcon, 12) + ' ' + changeText + '</span>'
            : changeText;
          return '<div class="stat-card card-hover" onclick="App.nav(\'' + stat.nav + '\')">' +
            '<div class="stat-ic">' + ic(stat.ic, 22) + '</div><div class="stat-val">' + val + '</div>' +
            '<div class="stat-label">' + t(stat.labelKey) + '</div>' +
            '<div class="stat-change ' + stat.changeClass + '">' + changeHtml + '</div></div>';
        }).join('')}
      </div>
      <div class="lbl" style="margin-bottom:10px">${ic('target', 14)} ${t('home.quickActions')}</div>
      <div class="qa-grid">
        ${role.quickActions.map(function(row) {
          var desc = row[1] === 'qa.approve'
            ? t('qa.approveDesc', { n: pending.length })
            : t(row[2]);
          return '<div class="qa-card" onclick="App.nav(\'' + row[3] + '\')">' +
            '<div class="qa-card-ic">' + ic(row[0], 28) + '</div>' +
            '<div class="qa-card-title">' + t(row[1]) + '</div>' +
            '<div class="qa-card-desc">' + desc + '</div></div>';
        }).join('')}
      </div>
      <div class="lbl" style="margin-bottom:10px">${ic('zap', 14)} ${t('home.urgent')}</div>
      ${pending.slice(0, 3).map(function(task) { return Screens.taskCard(task); }).join('')}
      ${pending.length > 3 ? '<button class="btn btn-sec" onclick="App.nav(\'tasks\')">' + t('home.more', { n: pending.length - 3 }) + ' ' + ic('arrow-right', 14) + '</button>' : ''}
      ${pending.length === 0 ? '<div class="alert alert-g">' + ic('check-circle', 18) + ' <div>' + t('tasks.allDoneDesc') + '</div></div>' : ''}
    `;
  },

  taskCard(task) {
    var loc = lt(task);
    return `
      <div class="task-card ${task.urgency}">
        <div class="task-card-header">
          <div class="task-card-ic">${ic(task.ic, 24)}</div>
          <div>
            <div class="task-card-title">${loc.title}</div>
            <div class="task-card-desc">${loc.desc}</div>
          </div>
        </div>
        <div class="task-card-meta">
          <span class="badge badge-b">${ic('bot', 12)} ${task.agent}</span>
          <span class="badge badge-a">${ic('clock', 12)} ${loc.due}</span>
        </div>
        <div class="task-card-actions">
          <button class="btn btn-sec" onclick="App.showOutput('${task.outputKey}')">${ic('eye', 16)} ${t('btn.view')}</button>
          <button class="btn btn-pri" onclick="App.approveTask('${task.id}')">${ic('check', 16)} ${t('btn.approve')}</button>
        </div>
      </div>`;
  },

  tasks() {
    const pending = App.getPendingTasks();
    const done = App.getApprovedTasks();
    return `
      <div class="page-hd">
        <div>
          <div class="page-title">${ic('check-circle', 22)} ${t('tasks.title')}</div>
          <div class="page-sub">${t('tasks.sub', { pending: pending.length, done: done.length })}</div>
        </div>
        <div class="page-acts">
          <button class="btn btn-pri" onclick="App.approveAll()">${ic('check', 16)} ${t('btn.approveAll')} (${pending.length})</button>
        </div>
      </div>
      <div class="alert alert-g">${ic('lightbulb', 18)} <div>${t('tasks.howto')}</div></div>
      ${pending.length ? pending.map(function(task) { return Screens.taskCard(task); }).join('') : `
        <div class="empty-state">
          <div class="empty-state-ic">${ic('check-circle', 48, 'icon-success')}</div>
          <div class="empty-state-title">${t('tasks.allDone')}</div>
          <div class="empty-state-desc">${t('tasks.allDoneDesc')}</div>
        </div>`}
      ${done.length ? `
        <div class="divider"></div>
        <div class="lbl">${t('tasks.completed')} (${done.length})</div>
        ${done.map(function(task) {
          var loc = lt(task);
          return '<div class="task-card" style="opacity:.7;border-left:4px solid var(--acc)">' +
            '<div class="task-card-header">' +
              '<div class="task-card-ic">' + ic('check-circle', 24, 'icon-success') + '</div>' +
              '<div>' +
                '<div class="task-card-title">' + loc.title + '</div>' +
                '<div class="task-card-desc">' + t('tasks.approvedDesc') + '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
        }).join('')}
      ` : ''}
    `;
  },

  programs() {
    return `
      <div class="page-hd">
        <div><div class="page-title">${ic('clipboard', 22)} ${t('programs.title')}</div>
        <div class="page-sub">${t('programs.sub')}</div></div>
      </div>
      <div class="freya-box">
        <div class="freya-box-ic">${ic('bot', 18, 'icon-white')}</div>
        <div><div class="freya-box-label">${t('programs.insightLabel')}</div>
          <div class="freya-box-text">${t('programs.insight')}</div>
        </div>
        <div class="freya-box-acts"><button class="btn btn-pri btn-sm" onclick="App.showOutput('loan-portfolio')">${t('btn.details')}</button></div>
      </div>
      <div class="grid-3">
        ${PROGRAMS.map(function(p) {
          return '<div class="card card-hover" onclick="App.showOutput(\'donor-report\')">' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:8px">' +
              '<div style="font-size:13px;font-weight:700;color:var(--tx)">' + p.name + '</div>' +
              '<span class="badge badge-' + p.badge + ' badge-dot">' + p.status + '</span>' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;font-size:11px;text-align:center">' +
              '<div><div style="font-weight:700">' + p.budget + '</div><div style="color:var(--tx3);font-size:9px">Budget</div></div>' +
              '<div><div style="font-weight:700">' + p.po + ' PO</div><div style="color:var(--tx3);font-size:9px">Partners</div></div>' +
              '<div><div style="font-weight:700">' + p.ben + '</div><div style="color:var(--tx3);font-size:9px">Beneficiaries</div></div>' +
            '</div>' +
            (p.par !== '—' ? '<div style="font-size:10px;margin-bottom:6px">PAR30: <strong style="color:' + (parseFloat(p.par) > 5 ? 'var(--rd)' : 'var(--pri)') + '">' + p.par + '</strong></div>' : '') +
            '<div class="prog-bar" style="margin-bottom:8px"><div class="prog-fill" style="width:' + p.goal + '%"></div></div>' +
            '<div style="font-size:9px;color:var(--tx3);display:flex;align-items:center;gap:4px">' + ic('bot', 12) + ' ' + p.agent + '</div>' +
          '</div>';
        }).join('')}
      </div>
    `;
  },

  credit() {
    return `
      <div class="page-hd">
        <div><div class="page-title">${ic('bank', 22)} ${t('credit.title')}</div>
        <div class="page-sub">${t('credit.sub')}</div></div>
        <div class="page-acts">
          <button class="btn btn-pri" onclick="App.runAgent('loan')">${ic('zap', 16)} ${t('credit.runAnalysis')}</button>
          <button class="btn btn-sec" onclick="App.showOutput('loan-portfolio')">${ic('chart', 16)} ${t('credit.viewReport')}</button>
        </div>
      </div>
      <div class="grid-4" style="margin-bottom:16px">
        <div class="stat-card"><div class="stat-ic">${ic('money', 22)}</div><div class="stat-val">৳১৬০Cr</div><div class="stat-label">${t('credit.totalPortfolio')}</div></div>
        <div class="stat-card amber"><div class="stat-ic">${ic('warning', 22)}</div><div class="stat-val">5.8%</div><div class="stat-label">PAR30</div></div>
        <div class="stat-card"><div class="stat-ic">${ic('trend-down', 22)}</div><div class="stat-val">2.1%</div><div class="stat-label">PAR90</div></div>
        <div class="stat-card red"><div class="stat-ic">${ic('alert-triangle', 22)}</div><div class="stat-val">২</div><div class="stat-label">${t('credit.atRiskPOs')}</div></div>
      </div>
      <div class="card">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px">${t('credit.partnerSummary')}</div>
        <table class="data-table">
          <thead><tr><th>PO Code</th><th>Name</th><th>Loans</th><th>PAR30</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${PARTNERS.map(function(p) {
              return '<tr>' +
                '<td>' + p.code + '</td><td>' + p.name + '</td><td>' + p.loans + '</td>' +
                '<td style="color:' + (parseFloat(p.par30) > 5 ? 'var(--rd)' : 'var(--pri)') + ';font-weight:700">' + p.par30 + '</td>' +
                '<td><span class="badge badge-' + p.badge + '">' + p.status + '</span></td>' +
                '<td><button class="btn btn-sm btn-sec" onclick="App.showOutput(\'' + (p.badge === 'r' ? 'field-synthesis' : 'loan-portfolio') + '\')">' + t('btn.view') + '</button></td>' +
              '</tr>';
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  partners() {
    return `
      <div class="page-hd">
        <div><div class="page-title">${ic('handshake', 22)} ${t('partners.title')}</div>
        <div class="page-sub">${t('partners.sub')}</div></div>
      </div>
      <div class="grid-auto">
        ${PARTNERS.map(function(p) {
          return '<div class="card card-hover" onclick="App.showOutput(\'' + (p.badge === 'r' ? 'field-synthesis' : 'loan-portfolio') + '\')">' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:8px">' +
              '<div><div style="font-family:var(--mono);font-size:10px;color:var(--tx3)">' + p.code + '</div>' +
              '<div style="font-size:14px;font-weight:700">' + p.name + '</div></div>' +
              '<span class="badge badge-' + p.badge + '">' + p.status + '</span>' +
            '</div>' +
            '<div style="font-size:11px;color:var(--tx2);margin-bottom:8px;display:flex;align-items:center;gap:4px">' + ic('map-pin', 12) + ' ' + p.region + ' · ' + p.loans + ' loans</div>' +
            '<div style="font-size:12px;font-weight:700;color:' + (parseFloat(p.par30) > 5 ? 'var(--rd)' : 'var(--pri)') + '">PAR30: ' + p.par30 + '</div>' +
          '</div>';
        }).join('')}
      </div>
    `;
  },

  reports() {
    var allReports = [
      { ic:'chart', title:'World Bank Q3 Performance Report', status:'Draft 78%', badge:'a', key:'donor-report', due:'১৪ দিন', roles:['programme','director'] },
      { ic:'shield', title:'USAID Annual Compliance Portfolio', status:'Ready for review', badge:'g', key:'compliance-audit', due:'২৮ দিন', roles:['programme','director'] },
      { ic:'folder', title:'Field Data Synthesis — Khulna Q1', status:'Complete', badge:'g', key:'field-synthesis', due:'Done', roles:['programme','credit','director'] },
      { ic:'money', title:'Loan Portfolio Health — Q1 2026', status:'Complete', badge:'g', key:'loan-portfolio', due:'Done', roles:['programme','credit','director'] },
      { ic:'users', title:'April 2026 Payroll Report', status:'Needs approval', badge:'a', key:'salary-report', due:'৩ দিন', roles:['hr','programme','director'] },
    ];
    var reports = allReports.filter(function(r) { return r.roles.indexOf(App.role) !== -1; });
    var showPipeline = App.role === 'programme' || App.role === 'director';
    return `
      <div class="page-hd">
        <div><div class="page-title">${ic('file-text', 22)} ${t('reports.title')}</div>
        <div class="page-sub">${t('reports.sub')}</div></div>
        ${showPipeline ? '<div class="page-acts"><button class="btn btn-pri" onclick="App.runPipeline(\'donor-report\')">' + ic('zap', 16) + ' ' + t('reports.runQ3') + '</button></div>' : ''}
      </div>
      ${reports.map(function(r) {
        return '<div class="task-card">' +
          '<div class="task-card-header">' +
            '<div class="task-card-ic">' + ic(r.ic, 24) + '</div>' +
            '<div>' +
              '<div class="task-card-title">' + r.title + '</div>' +
              '<div class="task-card-desc">' + t('reports.status') + ': ' + r.status + ' · ' + t('reports.due') + ': ' + r.due + '</div>' +
            '</div>' +
            '<span class="badge badge-' + r.badge + '">' + r.status + '</span>' +
          '</div>' +
          '<div class="task-card-actions">' +
            '<button class="btn btn-sec" onclick="App.showOutput(\'' + r.key + '\')">' + ic('eye', 16) + ' ' + t('btn.view') + '</button>' +
            '<button class="btn btn-pri" onclick="App.approveReport(\'' + r.key + '\')">' + ic('check', 16) + ' ' + t('btn.approve') + '</button>' +
            '<button class="btn btn-sec" onclick="App.showDownloadPicker(\'' + r.key + '\')">' + ic('download', 16) + ' PDF</button>' +
            '<button class="btn btn-sec" onclick="App.showFullDoc(\'' + r.key + '\')">' + ic('file-text', 16) + ' ' + t('btn.fullDoc') + '</button>' +
          '</div>' +
        '</div>';
      }).join('')}
    `;
  },

  agents() {
    return `
      <div class="page-hd">
        <div><div class="page-title">${ic('bot', 22)} ${t('agents.title')}</div>
        <div class="page-sub">${t('agents.sub')}</div></div>
      </div>
      <div class="alert alert-b">${ic('lightbulb', 18)} <div>${t('agents.tip')}</div></div>
      <div class="grid-auto">
        ${App.getAgentsForRole().map(function(a) {
          var displayName = I18n.lang === 'en' ? a.name : a.nameBn;
          var altName = I18n.lang === 'en' ? a.nameBn : a.name;
          return '<div class="agent-card" onclick="App.runAgent(\'' + a.id + '\')">' +
            '<div class="agent-card-ic">' + ic(a.ic, 32) + '</div>' +
            '<div class="agent-card-name">' + displayName + '</div>' +
            '<div style="font-size:10px;color:var(--tx3);margin-bottom:4px">' + altName + '</div>' +
            '<div class="agent-card-desc">' + I18n.field(a, 'desc', 'descEn') + '</div>' +
            '<button class="btn btn-pri btn-sm" style="width:100%">' + ic('zap', 14) + ' ' + t('btn.run') + '</button>' +
          '</div>';
        }).join('')}
      </div>
    `;
  },

  help() {
    return `
      <div class="page-hd">
        <div><div class="page-title">${ic('help', 22)} ${t('help.title')}</div>
        <div class="page-sub">${t('help.sub')}</div></div>
        <div class="page-acts"><button class="btn btn-pri" onclick="App.openFreya()">${ic('bot', 16)} ${t('home.askFreya')}</button></div>
      </div>
      <div class="help-step"><div class="help-num">১</div><div><h4>${t('help.step1.title')}</h4><p>${t('help.step1.desc')}</p></div></div>
      <div class="help-step"><div class="help-num">২</div><div><h4>${t('help.step2.title')}</h4><p>${t('help.step2.desc')}</p></div></div>
      <div class="help-step"><div class="help-num">৩</div><div><h4>${t('help.step3.title')}</h4><p>${t('help.step3.desc')}</p></div></div>
      <div class="divider"></div>
      <div class="lbl">${t('help.freyaAsk')}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        ${I18n.freyaQuick().map(function(q) {
          return '<button class="btn btn-sec btn-sm" onclick="App.openFreya();App.fpQuick(\'' + q.replace(/'/g, "\\'") + '\')">' + q + '</button>';
        }).join('')}
      </div>
    `;
  },
};
