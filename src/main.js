import { Auth } from './auth.js';
import { DB } from './db.js';
import { I18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = Auth.checkAuth();
  if (!user) return;

  // UI elements
  const sidebar = document.getElementById('sidebar');
  const userName = document.getElementById('userName');
  const userAvatar = document.getElementById('userAvatar');
  const requestsBody = document.getElementById('requestsBody');
  const logoutBtn = document.getElementById('logoutBtn');
  const adminLink = document.getElementById('adminLink');

  // Update User Info
  if (userName) userName.textContent = user.name;
  if (userAvatar) userAvatar.textContent = user.name.charAt(0);
  if (adminLink && user.role !== 'admin') {
    adminLink.style.display = 'none';
  }
  if (adminLink) adminLink.textContent = I18n.t('configuration');

  // Inject Sidebar
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 10px;">
        <img src="/public/logo.png" alt="Logo" style="width: 30px; height: 30px; object-fit: cover; border-radius: 4px;">
        Facility Manager
      </div>
      <ul class="sidebar-menu">
        <li><a href="dashboard.html" class="${window.location.pathname.includes('dashboard') ? 'active' : ''}"><span>${I18n.t('dashboard')}</span></a></li>
        <li><a href="new-request.html" class="${window.location.pathname.includes('new-request') ? 'active' : ''}"><span>${I18n.t('newRequest')}</span></a></li>
        <li><a href="history.html" class="${window.location.pathname.includes('history') ? 'active' : ''}"><span>${I18n.t('history')}</span></a></li>
        <li><a href="history.html?type=Disinfection"><span>${I18n.t('disinfection')}</span></a></li>
        <li><a href="history.html?type=Furniture"><span>${I18n.t('furniture')}</span></a></li>
        <li><a href="history.html?type=Trash"><span>${I18n.t('trashRemoval')}</span></a></li>
        <li><a href="history.html?type=Cleanup"><span>${I18n.t('urgentCleanup')}</span></a></li>
        <li><a href="history.html?type=Electrical"><span>${I18n.t('electrical')}</span></a></li>
        <li><a href="history.html?type=HVAC"><span>${I18n.t('hvac')}</span></a></li>
        <li><a href="history.html?type=Lighting"><span>${I18n.t('interiorLights')}</span></a></li>
        <li><a href="history.html?type=Plumbing"><span>${I18n.t('plumbing')}</span></a></li>
        ${user.role === 'admin' ? '<li><a href="admin.html" class="' + (window.location.pathname.includes('admin') ? 'active' : '') + '"><span>' + I18n.t('systemConfig') + '</span></a></li>' : ''}
      </ul>
      <div class="lang-switcher-container">
         <button class="lang-btn ${I18n.getLang() === 'en' ? 'active' : ''}" data-lang="en">EN</button>
         <button class="lang-btn ${I18n.getLang() === 'bg' ? 'active' : ''}" data-lang="bg">BG</button>
      </div>
    `;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        I18n.setLang(e.target.dataset.lang);
      });
    });
  }

  // Populate Shared Requests Table Logic (Dashboard)
  if (requestsBody) {
    const requests = DB.getRequests();
    requestsBody.innerHTML = requests.map(req => `
      <tr>
        <td style="color: var(--primary-color); font-weight: bold;">
          <a href="history.html?wo=${req.id}" style="color: inherit; text-decoration: none; border-bottom: 1px dashed var(--primary-color);">${req.id}</a>
        </td>
        <td>${req.date}</td>
        <td>${req.building}</td>
        <td>${I18n.t(req.problemType)}: ${req.description}</td>
        <td><span class="status-badge status-${req.status.toLowerCase()}">${I18n.t(req.status)}</span></td>
        <td>${req.userId === user.id ? I18n.t('you') : I18n.t('system')}</td>
      </tr>
    `).join('');

    // Add click events to stat cards
    const pendingCard = document.querySelector('.orange.stat-card');
    const openCard = document.querySelector('.blue.stat-card');

    if (pendingCard) {
      pendingCard.style.cursor = 'pointer';
      pendingCard.addEventListener('click', () => window.location.href = 'history.html?status=HLD');
    }
    if (openCard) {
      openCard.style.cursor = 'pointer';
      openCard.addEventListener('click', () => window.location.href = 'history.html?status=OPEN');
    }

    // Update stats
    const countPending = document.getElementById('countPending');
    const countOpen = document.getElementById('countOpen');
    if (countPending) countPending.textContent = requests.filter(r => r.status === 'HLD').length;
    if (countOpen) countOpen.textContent = requests.filter(r => r.status !== 'CMP').length;
  }

  // Logout logic
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  }
});
