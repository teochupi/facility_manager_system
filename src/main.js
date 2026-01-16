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

  // Inject Sidebar
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 10px;">
        <img src="/public/logo.png" alt="Logo" style="width: 30px; height: 30px; object-fit: cover; border-radius: 4px;">
        Facility Manager
      </div>
      <ul class="sidebar-menu">
        <li><a href="/dashboard.html" class="${window.location.pathname.includes('dashboard') ? 'active' : ''}"><span>${I18n.t('dashboard')}</span></a></li>
        <li><a href="/new-request.html" class="${window.location.pathname.includes('new-request') ? 'active' : ''}"><span>${I18n.t('newRequest')}</span></a></li>
        <li><a href="/history.html" class="${window.location.pathname.includes('history') ? 'active' : ''}"><span>${I18n.t('history')}</span></a></li>
        <li><a href="#"><span>${I18n.t('disinfection')}</span></a></li>
        <li><a href="#"><span>${I18n.t('furniture')}</span></a></li>
        <li><a href="#"><span>${I18n.t('trashRemoval')}</span></a></li>
        <li><a href="#"><span>${I18n.t('urgentCleanup')}</span></a></li>
        <li><a href="#"><span>${I18n.t('electrical')}</span></a></li>
        <li><a href="#"><span>${I18n.t('hvac')}</span></a></li>
        <li><a href="#"><span>${I18n.t('interiorLights')}</span></a></li>
        <li><a href="#"><span>${I18n.t('plumbing')}</span></a></li>
        ${user.role === 'admin' ? '<li><a href="/admin.html" class="' + (window.location.pathname.includes('admin') ? 'active' : '') + '"><span>' + I18n.t('systemConfig') + '</span></a></li>' : ''}
      </ul>
      <div style="padding: 1rem; margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1);">
         <select id="langSwitcher" style="width: 100%; background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; padding: 5px;">
            <option value="en" ${I18n.getLang() === 'en' ? 'selected' : ''}>English</option>
            <option value="bg" ${I18n.getLang() === 'bg' ? 'selected' : ''}>Български</option>
         </select>
      </div>
    `;

    document.getElementById('langSwitcher').addEventListener('change', (e) => {
      I18n.setLang(e.target.value);
    });
  }

  // Populate Requests Table
  if (requestsBody) {
    // Dynamic Updates for Labels
    const pendingLabel = document.querySelector('.orange div:last-child');
    if (pendingLabel) pendingLabel.textContent = I18n.t('ordersNeedingAttention');

    const openLabel = document.querySelector('.blue div:last-child');
    if (openLabel) openLabel.textContent = I18n.t('myOpenOrders');

    const recentH3 = document.querySelector('.table-header h3');
    if (recentH3) recentH3.textContent = I18n.t('recentlyEnteredRequests');

    const historyLink = document.querySelector('.table-header a');
    if (historyLink) historyLink.textContent = I18n.t('viewHistory');

    const requests = DB.getRequests();
    requestsBody.innerHTML = requests.map(req => `
      <tr>
        <td style="color: var(--primary-color); font-weight: bold;">${req.id}</td>
        <td>${req.date}</td>
        <td>${req.building}</td>
        <td>${req.problemType}: ${req.description}</td>
        <td><span class="status-badge status-${req.status.toLowerCase()}">${req.status}</span></td>
        <td>${req.userId === user.id ? 'You' : 'System'}</td>
      </tr>
    `).join('');

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
