import { Auth } from './auth.js';
import { DB } from './db.js';

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
        <li><a href="/dashboard.html" class="${window.location.pathname.includes('dashboard') ? 'active' : ''}"><span>Dashboard</span></a></li>
        <li><a href="/new-request.html" class="${window.location.pathname.includes('new-request') ? 'active' : ''}"><span>New Request</span></a></li>
        <li><a href="/history.html" class="${window.location.pathname.includes('history') ? 'active' : ''}"><span>History</span></a></li>
        <li><a href="#"><span>Disinfection</span></a></li>
        <li><a href="#"><span>Furniture</span></a></li>
        <li><a href="#"><span>Trash Removal</span></a></li>
        <li><a href="#"><span>Urgent Cleanup</span></a></li>
        <li><a href="#"><span>Electrical</span></a></li>
        <li><a href="#"><span>HVAC</span></a></li>
        <li><a href="#"><span>Interior Lights</span></a></li>
        <li><a href="#"><span>Plumbing</span></a></li>
        ${user.role === 'admin' ? '<li><a href="/admin.html" class="' + (window.location.pathname.includes('admin') ? 'active' : '') + '"><span>System Config</span></a></li>' : ''}
      </ul>
    `;
  }

  // Populate Requests Table
  if (requestsBody) {
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
