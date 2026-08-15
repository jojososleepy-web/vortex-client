/* ═══════════════════════════════════════
   VORTEX CLIENT — FRONTEND APP
═══════════════════════════════════════ */

// ── Navbar scroll ──────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger ──────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-nav').classList.toggle('open');
});

document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobile-nav').classList.remove('open'));
});

// ── Active nav link on scroll ──────────
const sections = ['home','features','premium','commands','faq'];
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── Category tabs ──────────────────────
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.category-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('panel-' + tab.dataset.cat);
    if (panel) panel.classList.add('active');
  });
});

// Premium module cards open modal
document.querySelectorAll('.module-card[data-premium="true"]').forEach(card => {
  card.addEventListener('click', () => openModal('premium-modal'));
});

// ── FAQ accordion ──────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ── Modals ─────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
window.openModal = openModal;
window.closeModal = closeModal;

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

function openPremiumModal() {
  closeModal('premium-modal');
  openModal('stripe-modal');
}
window.openPremiumModal = openPremiumModal;

// ── Toast ──────────────────────────────
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}
window.showToast = showToast;

// ── Auth state ─────────────────────────
async function checkAuth() {
  try {
    const res = await fetch('/api/auth/status');
    const data = await res.json();
    if (data.authenticated) {
      const loginBtn = document.getElementById('nav-login-btn');
      if (loginBtn) {
        loginBtn.textContent = '✓ ' + (data.user.displayName || 'Connected');
        loginBtn.href = '/account';
        loginBtn.classList.remove('btn-primary');
        loginBtn.classList.add('btn-outline');
      }
    }
    // Show auth error/success from URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'error') {
      showToast('⚠️ Login failed: ' + (params.get('reason') || 'Unknown error'), 'error');
      history.replaceState({}, '', '/');
    }
  } catch (_) {}
}

checkAuth();


// Demo login button on homepage
document.getElementById('demo-login-btn')?.addEventListener('click', async () => {
  try {
    const res = await fetch('/auth/demo-login', { method: 'POST' });
    if (res.ok) {
      showToast('✅ Demo login successful!', 'success');
      setTimeout(() => window.location.href = '/account.html', 800);
    } else {
      showToast('⚠️ Demo login failed', 'error');
    }
  } catch (err) {
    showToast('⚠️ Demo login failed: ' + err.message, 'error');
  }
});
