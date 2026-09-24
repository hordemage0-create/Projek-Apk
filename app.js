/* =========================================================
   APP LOGIC — PutzzPedia App
   ========================================================= */

const PRODUK_PANEL = [
  { nama: 'Panel 1GB', ram: '1GB', harga: 500 },
  { nama: 'Panel 2GB', ram: '2GB', harga: 1000 },
  { nama: 'Panel 3GB', ram: '3GB', harga: 1500 },
  { nama: 'Panel 4GB', ram: '4GB', harga: 2000 },
  { nama: 'Panel 5GB', ram: '5GB', harga: 2500 },
  { nama: 'Panel 6GB', ram: '6GB', harga: 3000 },
  { nama: 'Panel 7GB', ram: '7GB', harga: 3500 },
  { nama: 'Panel 8GB', ram: '8GB', harga: 4000 },
  { nama: 'Panel 9GB', ram: '9GB', harga: 4500 },
  { nama: 'Panel 10GB', ram: '10GB', harga: 5000 },
  { nama: 'Panel UNLI', ram: 'Unlimited', harga: 5500 },
  { nama: 'Admin Panel', ram: 'Admin', harga: 7000 }
];

const PRODUK_VPS = [
  { nama: '1 RAM / 1 CORE', ram: '1GB', harga: 5000 },
  { nama: '2 RAM / 1 CORE', ram: '2GB', harga: 10000 },
  { nama: '2 RAM / 2 CORE', ram: '2GB', harga: 15000 },
  { nama: '4 RAM / 2 CORE', ram: '4GB', harga: 20000 },
  { nama: '8 RAM / 4 CORE', ram: '8GB', harga: 25000 },
  { nama: '16 RAM / 4 CORE', ram: '16GB', harga: 30000 },
  { nama: '16 RAM / 8 CORE', ram: '16GB', harga: 35000 },
  { nama: '32 RAM / 8 CORE', ram: '32GB', harga: 40000 },
  { nama: '128 RAM / 8 CORE', ram: '128GB', harga: 45000 }
];

const DOMAIN_LIST = [
  { name: 'pterocloud.my.id', full: false },
  { name: 'pteroq.biz.id', full: false },
  { name: 'smasnug.web.id', full: false },
  { name: 'surnxuesk.biz.id', full: false },
  { name: 'pteroqdactyl.my.id', full: false },
  { name: 'keselekbijiwowo.web.id', full: false },
  { name: 'rzhosts.my.id', full: false },
  { name: 'pteroq.xyz', full: false },
  { name: 'duckdns.top', full: false },
  { name: 'sano.biz.id', full: false }
];

let currentTab = 'panel';
let selectedDomain = null;
let currentProduct = null;
let currentType = null;

/* ========== INIT ========== */
window.addEventListener('load', () => {
  console.log('🚀 App loaded');
  renderProduk();
  renderDomainList();
  createParticles();
  initAuth();
});

/* ========== PARTICLES ========== */
function createParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.6 + 0.2;
    container.appendChild(p);
  }
}

/* ========== SIDEBAR ========== */
function toggleSidebar() {
  const s = document.getElementById('sidebar');
  if (s) s.classList.toggle('open');
}

/* ========== TABS ========== */
function switchTab(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.produk-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProduk();
}

/* ========== FORMAT ========== */
function formatRupiah(n) {
  return 'Rp' + Number(n).toLocaleString('id-ID');
}

/* ========== RENDER PRODUK ========== */
function renderProduk() {
  const grid = document.getElementById('produkGrid');
  if (!grid) return;

  const list = currentTab === 'panel' ? PRODUK_PANEL : PRODUK_VPS;
  const isVPS = currentTab === 'vps';

  grid.innerHTML = list.map((p, i) => `
    <div class="produk-item ${isVPS ? 'vps' : ''}">
      <div class="produk-icon">${isVPS ? '🖥️' : '💀'}</div>
      <div class="produk-nama">${p.nama}</div>
      <div class="produk-harga">${formatRupiah(p.harga)}</div>
      <button class="produk-btn" onclick="openOrder(${i})">
        ⚡ ORDER
      </button>
    </div>
  `).join('');
}

/* ========== OPEN ORDER ========== */
function openOrder(index) {
  if (currentTab === 'panel') {
    currentProduct = PRODUK_PANEL[index];
    currentType = 'panel';
    document.getElementById('orderPanelInfo').textContent =
      currentProduct.nama + ' — ' + formatRupiah(currentProduct.harga);
    document.getElementById('panelRam').value = currentProduct.ram;
    document.getElementById('panelUsername').value = '';
    document.getElementById('panelWa').value = '';
    document.getElementById('panelCatatan').value = '';
    document.getElementById('panelUsernameErr').textContent = '';
    document.getElementById('panelWaErr').textContent = '';
    openModal('modalOrderPanel');
  } else {
    currentProduct = PRODUK_VPS[index];
    currentType = 'vps';
    document.getElementById('orderVPSInfo').textContent =
      currentProduct.nama + ' — ' + formatRupiah(currentProduct.harga);
    document.getElementById('vpsRam').value = currentProduct.ram;
    document.getElementById('vpsUsername').value = '';
    document.getElementById('vpsWa').value = '';
    document.getElementById('vpsCatatan').value = '';
    document.getElementById('vpsUsernameErr').textContent = '';
    document.getElementById('vpsWaErr').textContent = '';
    selectedDomain = null;
    renderDomainList();
    openModal('modalOrderVPS');
  }
}

/* ========== RENDER DOMAIN ========== */
function renderDomainList() {
  const container = document.getElementById('domainList');
  if (!container) return;

  container.innerHTML = DOMAIN_LIST.map((d, i) => {
    const onclickAttr = d.full ? '' : `onclick="selectDomain('${d.name}')"`;
    const disabledClass = d.full ? 'disabled' : '';
    const selectedClass = selectedDomain === d.name ? 'selected' : '';

    return `
      <div class="domain-item ${disabledClass} ${selectedClass}" ${onclickAttr}>
        <span class="domain-name">[${i + 1}] ${d.name}</span>
      </div>
    `;
  }).join('');
}

function selectDomain(name) {
  selectedDomain = name;
  renderDomainList();
}

/* ========== SUBMIT ORDER PANEL ========== */
function submitOrderPanel() {
  const username = document.getElementById('panelUsername').value.trim();
  const wa = document.getElementById('panelWa').value.trim();
  const catatan = document.getElementById('panelCatatan').value.trim();

  let ok = true;

  if (!/^[a-z0-9_]{3,20}$/.test(username.toLowerCase())) {
    document.getElementById('panelUsernameErr').textContent = 'Username 3-20 huruf kecil/angka/_';
    ok = false;
  } else {
    document.getElementById('panelUsernameErr').textContent = '';
  }

  if (!/^0\d{9,13}$/.test(wa)) {
    document.getElementById('panelWaErr').textContent = 'Format WA: 08xxxxxxxxxx';
    ok = false;
  } else {
    document.getElementById('panelWaErr').textContent = '';
  }

  if (!ok) return;

  const user = window.firebaseAuth ? window.firebaseAuth.currentUser : null;
  if (!user) {
    closeModal('modalOrderPanel');
    openModal('modalLogin');
    return;
  }

  const pesan = `Halo *Toko PutzzPedia*! ⚡

Saya mau order *Panel Pterodactyl*:

📦 *Paket:* ${currentProduct.nama}
💾 *RAM:* ${currentProduct.ram}
👤 *Username:* ${username}
💰 *Harga:* ${formatRupiah(currentProduct.harga)}
📱 *WA Saya:* ${wa}
${catatan ? '📝 *Catatan:* ' + catatan : ''}

Mohon info cara pembayarannya. Terima kasih! 🙏`;

  window.open(`https://wa.me/62881011760799?text=${encodeURIComponent(pesan)}`, '_blank');

  document.getElementById('credentialBox').innerHTML = `
    <div class="credential-row">
      <span class="credential-label">📦 Paket</span>
      <span class="credential-value">${currentProduct.nama}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">👤 Username</span>
      <span class="credential-value">${username}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">💰 Harga</span>
      <span class="credential-value">${formatRupiah(currentProduct.harga)}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">📱 Status</span>
      <span class="credential-value">Menunggu konfirmasi admin</span>
    </div>
  `;
  closeModal('modalOrderPanel');
  setTimeout(() => openModal('modalSuccess'), 300);
}

/* ========== SUBMIT ORDER VPS ========== */
function submitOrderVPS() {
  const username = document.getElementById('vpsUsername').value.trim();
  const wa = document.getElementById('vpsWa').value.trim();
  const catatan = document.getElementById('vpsCatatan').value.trim();

  let ok = true;

  if (!/^[a-z0-9_]{3,20}$/.test(username.toLowerCase())) {
    document.getElementById('vpsUsernameErr').textContent = 'Username 3-20 huruf kecil/angka/_';
    ok = false;
  } else {
    document.getElementById('vpsUsernameErr').textContent = '';
  }

  if (!selectedDomain) {
    alert('❌ Pilih domain dulu!');
    ok = false;
  }

  if (!/^0\d{9,13}$/.test(wa)) {
    document.getElementById('vpsWaErr').textContent = 'Format WA: 08xxxxxxxxxx';
    ok = false;
  } else {
    document.getElementById('vpsWaErr').textContent = '';
  }

  if (!ok) return;

  const user = window.firebaseAuth ? window.firebaseAuth.currentUser : null;
  if (!user) {
    closeModal('modalOrderVPS');
    openModal('modalLogin');
    return;
  }

  const pesan = `Halo *Toko PutzzPedia*! ⚡

Saya mau order *VPS Digital Ocean*:

📦 *Paket:* ${currentProduct.nama}
💾 *RAM:* ${currentProduct.ram}
👤 *Username:* ${username}
🌐 *Domain:* ${selectedDomain}
💰 *Harga:* ${formatRupiah(currentProduct.harga)}
📱 *WA Saya:* ${wa}
${catatan ? '📝 *Catatan:* ' + catatan : ''}

Mohon info cara pembayarannya. Terima kasih! 🙏`;

  window.open(`https://wa.me/62881011760799?text=${encodeURIComponent(pesan)}`, '_blank');

  document.getElementById('credentialBox').innerHTML = `
    <div class="credential-row">
      <span class="credential-label">📦 Paket</span>
      <span class="credential-value">${currentProduct.nama}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">👤 Username</span>
      <span class="credential-value">${username}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">🌐 Domain</span>
      <span class="credential-value">${selectedDomain}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">💰 Harga</span>
      <span class="credential-value">${formatRupiah(currentProduct.harga)}</span>
    </div>
    <div class="credential-row">
      <span class="credential-label">📱 Status</span>
      <span class="credential-value">Menunggu konfirmasi admin</span>
    </div>
  `;
  closeModal('modalOrderVPS');
  setTimeout(() => openModal('modalSuccess'), 300);
}

/* ========== MODAL ========== */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ========== AUTH ========== */
function initAuth() {
  if (window.fbOnAuthStateChanged) {
    window.fbOnAuthStateChanged(window.firebaseAuth, (user) => {
      renderAuth(user);
    });
  }
}

function renderAuth(user) {
  const slot = document.getElementById('authSlot');
  const sidebarSlot = document.getElementById('sidebarAuth');
  if (!slot) return;

  if (user) {
    const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
    const name = user.displayName || user.email.split('@')[0];
    const avatar = user.photoURL
      ? `<img src="${user.photoURL}" alt="Avatar">`
      : `<div class="avatar">${initial}</div>`;

    slot.innerHTML = `
      <div class="auth-user" onclick="handleLogout()" title="Klik untuk logout">
        ${avatar}
        <span class="uname">${name}</span>
      </div>
    `;
    if (sidebarSlot) {
      sidebarSlot.innerHTML = `
        <div class="auth-user" style="width:100%;justify-content:center;padding:10px;">
          ${avatar}
          <span class="uname">${name}</span>
        </div>
        <button class="auth-login-btn" style="width:100%;margin-top:10px;" onclick="handleLogout()">🚪 LOGOUT</button>
      `;
    }
  } else {
    slot.innerHTML = `<button class="auth-login-btn" onclick="openModal('modalLogin')">🔐 LOGIN</button>`;
    if (sidebarSlot) {
      sidebarSlot.innerHTML = `<button class="auth-login-btn" style="width:100%;" onclick="openModal('modalLogin'); toggleSidebar();">🔐 LOGIN</button>`;
    }
  }
}

async function loginWithGoogle() {
  try {
    const provider = new window.fbGoogleProvider();
    const result = await window.fbSignInWithPopup(window.firebaseAuth, provider);
    console.log('✅ Login:', result.user.email);
    closeModal('modalLogin');
  } catch (err) {
    console.error('Login error:', err);
    alert('❌ Gagal login: ' + err.message);
  }
}

async function handleLogout() {
  if (!confirm('Yakin mau logout?')) return;
  try {
    await window.fbSignOut(window.firebaseAuth);
    console.log('✅ Logout');
  } catch (err) {
    alert('Gagal logout: ' + err.message);
  }
}

/* ========== PWA — Register Service Worker ========== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('✅ SW registered:', reg.scope))
      .catch((err) => console.warn('❌ SW error:', err));
  });
}

/* ========== PWA — Install Prompt ========== */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('📲 PWA ready to install');
  showInstallButton();
});

function showInstallButton() {
  if (document.getElementById('installBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'installBtn';
  btn.innerHTML = '📲 Install Aplikasi';
  btn.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #00bfff, #a855f7);
    color: #fff;
    border: none;
    border-radius: 30px;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    box-shadow: 0 0 25px rgba(0, 191, 255, 0.7);
    cursor: pointer;
    z-index: 150;
    animation: installPulse 2s infinite;
  `;

  btn.onclick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User response:', outcome);
    deferredPrompt = null;
    btn.remove();
  };

  document.body.appendChild(btn);
}

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed!');
  const btn = document.getElementById('installBtn');
  if (btn) btn.remove();
  deferredPrompt = null;
});

/* ========== EKSPOS ========== */
window.toggleSidebar = toggleSidebar;
window.switchTab = switchTab;
window.openOrder = openOrder;
window.selectDomain = selectDomain;
window.submitOrderPanel = submitOrderPanel;
window.submitOrderVPS = submitOrderVPS;
window.openModal = openModal;
window.closeModal = closeModal;
window.loginWithGoogle = loginWithGoogle;
window.handleLogout = handleLogout;
