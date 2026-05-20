/* ═══════════════════════════════════════════════════════
   PKSF · ANTARIOUS AI — Demo Auth (Login / Sign Up)
   ═══════════════════════════════════════════════════════ */

const Auth = {
  view: 'login',
  appStarted: false,

  init() {
    I18n.setLang(I18n.lang);
    Auth.renderDemoAccounts();
    Auth.renderRoleOptions();
    Auth.applyUI();
    Auth.bindEvents();

    var session = Auth.getSession();
    if (session) {
      Auth.enterApp(session, true);
    } else {
      Auth.showAuth();
    }
  },

  getSession() {
    try {
      var raw = localStorage.getItem('pksf-session');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  setSession(session) {
    localStorage.setItem('pksf-session', JSON.stringify(session));
  },

  clearSession() {
    localStorage.removeItem('pksf-session');
  },

  getRegisteredUsers() {
    try {
      return JSON.parse(localStorage.getItem('pksf-demo-users') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveRegisteredUser(user) {
    var users = Auth.getRegisteredUsers();
    users.push(user);
    localStorage.setItem('pksf-demo-users', JSON.stringify(users));
  },

  findAccount(email) {
    email = email.trim().toLowerCase();
    var demo = DEMO_LOGIN_ACCOUNTS.find(function(a) { return a.email.toLowerCase() === email; });
    if (demo) {
      var role = ROLES[demo.roleId];
      return {
        email: demo.email,
        roleId: demo.roleId,
        name: I18n.field(role, 'name', 'nameEn'),
        password: AUTH_DEMO_PASSWORD,
        isDemo: true,
      };
    }
    return Auth.getRegisteredUsers().find(function(u) { return u.email.toLowerCase() === email; }) || null;
  },

  showAuth() {
    document.getElementById('auth-screen').classList.remove('is-hidden');
    document.getElementById('shell').classList.add('is-hidden');
    document.getElementById('freya-panel').classList.add('is-hidden');
    document.title = t('auth.pageTitle');
  },

  hideAuth() {
    document.getElementById('auth-screen').classList.add('is-hidden');
    document.getElementById('shell').classList.remove('is-hidden');
    document.getElementById('freya-panel').classList.remove('is-hidden');
    document.title = t('app.title');
  },

  enterApp(session, silent) {
    App.role = session.roleId || 'programme';
    localStorage.setItem('pksf-role', App.role);
    Auth.hideAuth();

    if (!Auth.appStarted) {
      Auth.appStarted = true;
      App.init();
    } else {
      App.applyShell();
    }

    if (!silent) {
      App.toast(t('toast.signedIn', { name: session.name }), 'user', 'g');
    }
  },

  logout() {
    Auth.clearSession();
    App.closeRoleMenu();
    App.closeFreya();
    App.closeOutput();
    App.closeActionModal();
    document.getElementById('welcome-modal').classList.remove('open');
    document.getElementById('fp-msgs').innerHTML = '';
    Auth.showAuth();
    Auth.setView('login');
    App.toast(t('toast.signedOut'), 'info', 'a');
  },

  setView(view) {
    Auth.view = view;
    document.getElementById('auth-login-panel').classList.toggle('is-hidden', view !== 'login');
    document.getElementById('auth-signup-panel').classList.toggle('is-hidden', view !== 'signup');
    document.getElementById('auth-tab-login').classList.toggle('on', view === 'login');
    document.getElementById('auth-tab-signup').classList.toggle('on', view === 'signup');
    Auth.applyUI();
  },

  applyUI() {
    document.getElementById('auth-brand-tagline').textContent = t('auth.brandTagline');
    document.getElementById('auth-brand-org').textContent = t('auth.brandOrg');
    document.getElementById('auth-feat-freya').textContent = t('auth.feat.freya');
    document.getElementById('auth-feat-freya-desc').textContent = t('auth.feat.freyaDesc');
    document.getElementById('auth-feat-portfolio').textContent = t('auth.feat.portfolio');
    document.getElementById('auth-feat-portfolio-desc').textContent = t('auth.feat.portfolioDesc');
    document.getElementById('auth-feat-reports').textContent = t('auth.feat.reports');
    document.getElementById('auth-feat-reports-desc').textContent = t('auth.feat.reportsDesc');
    document.getElementById('auth-feat-approve').textContent = t('auth.feat.approve');
    document.getElementById('auth-feat-approve-desc').textContent = t('auth.feat.approveDesc');
    document.getElementById('auth-stat-partners-lbl').textContent = t('auth.stat.partners');
    document.getElementById('auth-stat-loans-lbl').textContent = t('auth.stat.loans');
    document.getElementById('auth-stat-programs-lbl').textContent = t('auth.stat.programs');
    document.getElementById('auth-tab-login').textContent = t('auth.tabLogin');
    document.getElementById('auth-tab-signup').textContent = t('auth.tabSignup');
    document.getElementById('auth-login-welcome').textContent = t('auth.loginWelcome');
    document.getElementById('auth-login-title').textContent = t('auth.loginTitle');
    document.getElementById('auth-login-sub').textContent = t('auth.loginSub');
    document.getElementById('auth-signup-welcome').textContent = t('auth.signupWelcome');
    document.getElementById('auth-signup-title').textContent = t('auth.signupTitle');
    document.getElementById('auth-signup-sub').textContent = t('auth.signupSub');
    document.getElementById('auth-label-email').textContent = t('auth.email');
    document.getElementById('auth-label-signup-email').textContent = t('auth.email');
    document.getElementById('auth-label-password').textContent = t('auth.password');
    document.getElementById('auth-label-signup-pass').textContent = t('auth.password');
    document.getElementById('auth-label-name').textContent = t('auth.name');
    document.getElementById('auth-label-role').textContent = t('auth.role');
    document.getElementById('auth-label-confirm').textContent = t('auth.confirmPassword');
    document.getElementById('login-email').placeholder = t('auth.emailPlaceholder');
    document.getElementById('login-pass').placeholder = t('auth.passwordPlaceholder');
    document.getElementById('signup-name').placeholder = t('auth.namePlaceholder');
    document.getElementById('signup-email').placeholder = t('auth.emailPlaceholder');
    document.getElementById('signup-pass').placeholder = t('auth.passwordPlaceholder');
    document.getElementById('signup-pass2').placeholder = t('auth.passwordPlaceholder');
    document.getElementById('auth-remember-label').textContent = t('auth.remember');
    document.getElementById('auth-forgot').textContent = t('auth.forgot');
    document.getElementById('auth-signin-btn').textContent = t('auth.signIn');
    document.getElementById('auth-signup-btn').textContent = t('auth.createAccount');
    document.getElementById('auth-or-demo').textContent = t('auth.orDemo');
    document.getElementById('auth-demo-hint').textContent = t('auth.demoHint');
    document.getElementById('auth-footer-main').textContent = t('auth.footer');
    document.getElementById('auth-footer-note').textContent = t('auth.footerNote');
    document.getElementById('auth-switch-login-text').textContent = t('auth.haveAccount');
    document.getElementById('auth-switch-signup-text').textContent = t('auth.noAccount');
    document.getElementById('auth-go-login').textContent = t('auth.switchLogin');
    document.getElementById('auth-go-signup').textContent = t('auth.switchSignup');
    document.getElementById('auth-lang-toggle').title = t('lang.title');
    document.querySelectorAll('#auth-lang-toggle .lang-btn').forEach(function(b) {
      b.classList.toggle('on', b.dataset.lang === I18n.lang);
    });
    Auth.renderRoleOptions();
    if (!document.getElementById('shell').classList.contains('is-hidden')) {
      document.title = t('app.title');
    } else {
      document.title = t('auth.pageTitle');
    }
  },

  renderRoleOptions() {
    var sel = document.getElementById('signup-role');
    if (!sel) return;
    var val = sel.value || 'programme';
    sel.innerHTML = Object.keys(ROLES).map(function(id) {
      return '<option value="' + id + '">' + I18n.field(ROLES[id], 'role', 'roleEn') + '</option>';
    }).join('');
    sel.value = val;
  },

  renderDemoAccounts() {
    var el = document.getElementById('auth-demo-list');
    if (!el) return;
    el.innerHTML = DEMO_LOGIN_ACCOUNTS.map(function(acc) {
      var role = ROLES[acc.roleId];
      return '<button type="button" class="demo-account" onclick="Auth.loginAs(\'' + acc.roleId + '\')">' +
        '<div class="demo-account-av" style="background:' + acc.gradient + '">' + role.initials + '</div>' +
        '<div class="demo-account-body">' +
          '<div class="demo-account-name">' + I18n.field(role, 'name', 'nameEn') + '</div>' +
          '<div class="demo-account-role">' + I18n.field(role, 'role', 'roleEn') + '</div>' +
        '</div>' +
        '<span class="demo-account-arrow">' + Icons.i('arrow-right', 16) + '</span>' +
      '</button>';
    }).join('');
  },

  bindEvents() {
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      Auth.doLogin();
    });
    document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();
      Auth.doSignup();
    });
    document.getElementById('login-pass').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') Auth.doLogin();
    });
  },

  setLang(lang) {
    I18n.setLang(lang);
    Auth.renderDemoAccounts();
    Auth.applyUI();
  },

  doLogin() {
    var email = document.getElementById('login-email').value.trim();
    var pass = document.getElementById('login-pass').value;
    if (!email) {
      Auth.toast(t('toast.authEmailRequired'), 'warning', 'a');
      return;
    }
    if (!pass) {
      Auth.toast(t('toast.authPasswordRequired'), 'warning', 'a');
      return;
    }
    var account = Auth.findAccount(email);
    if (!account || account.password !== pass) {
      Auth.toast(t('toast.authInvalid'), 'warning', 'r');
      return;
    }
    Auth.toast(t('toast.signingIn'), 'loader', 'g');
    setTimeout(function() {
      var session = { email: account.email, roleId: account.roleId, name: account.name };
      if (document.getElementById('auth-remember').checked) {
        Auth.setSession(session);
      } else {
        Auth.clearSession();
      }
      Auth.enterApp(session, false);
    }, 700);
  },

  loginAs(roleId) {
    var acc = DEMO_LOGIN_ACCOUNTS.find(function(a) { return a.roleId === roleId; });
    if (!acc) return;
    document.getElementById('login-email').value = acc.email;
    document.getElementById('login-pass').value = AUTH_DEMO_PASSWORD;
    Auth.doLogin();
  },

  doSignup() {
    var name = document.getElementById('signup-name').value.trim();
    var email = document.getElementById('signup-email').value.trim().toLowerCase();
    var roleId = document.getElementById('signup-role').value;
    var pass = document.getElementById('signup-pass').value;
    var pass2 = document.getElementById('signup-pass2').value;

    if (!name) {
      Auth.toast(t('toast.authNameRequired'), 'warning', 'a');
      return;
    }
    if (!email) {
      Auth.toast(t('toast.authEmailRequired'), 'warning', 'a');
      return;
    }
    if (!pass) {
      Auth.toast(t('toast.authPasswordRequired'), 'warning', 'a');
      return;
    }
    if (pass !== pass2) {
      Auth.toast(t('toast.authPasswordMismatch'), 'warning', 'r');
      return;
    }
    if (Auth.findAccount(email)) {
      Auth.toast(t('toast.authEmailExists'), 'warning', 'r');
      return;
    }

    Auth.saveRegisteredUser({ name: name, email: email, roleId: roleId, password: pass });
    Auth.toast(t('toast.signupSuccess'), 'check-circle', 'g');
    document.getElementById('login-email').value = email;
    document.getElementById('login-pass').value = pass;
    Auth.setView('login');
  },

  toast(msg, iconName, type) {
    if (Auth.appStarted && typeof App !== 'undefined' && App.toast) {
      App.toast(msg, iconName, type);
      return;
    }
    var c = document.getElementById('toast-container');
    var el = document.createElement('div');
    el.className = 'toast toast-' + (type || 'g');
    el.innerHTML = '<span class="toast-ic">' + Icons.i(iconName || 'info', 18) + '</span><div>' + msg + '</div>';
    c.appendChild(el);
    setTimeout(function() {
      el.style.opacity = '0';
      el.style.transform = 'translateX(20px)';
      el.style.transition = 'all .3s';
      setTimeout(function() { el.remove(); }, 300);
    }, 3500);
  },
};
