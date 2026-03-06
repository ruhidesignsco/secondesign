/**
 * Ruhi Designs — Main Application Script
 * ═══════════════════════════════════════
 *
 * This file contains all the client-side logic for the Ruhi Designs website.
 *
 * Sections:
 *   1. Hero & Background Image Setup
 *   2. Loading Screen
 *   3. Product Image Data (base64 encoded)
 *   4. Gallery Data (product definitions)
 *   5. Gallery Rendering & Filtering
 *   6. Product Modal (image carousel, details, buy)
 *   7. Stripe Payment Integration
 *   8. Commission & Contact Forms
 *   9. SPA Navigation
 *  10. Scroll Reveal Animations
 *  11. Frame Designer (backgrounds, assets, drag & drop)
 *  12. Shopping Cart & Checkout
 */

// Embed images

// Apply background images
document.documentElement.style.setProperty('--hero-bg', 'url(' + HERO_IMG + ')');
document.documentElement.style.setProperty('--texture-bg', 'url(' + TEXTURE_IMG + ')');

// ═══════════ LOADING ═══════════
// ═══════════ GATE ═══════════

/* ═══════════ LOADING SCREEN ═══════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2200);
  initReveal();
});

// ═══════════ PRODUCT IMAGE DATA ═══════════

// ═══════════ GALLERY DATA ═══════════
const items = [
  { id:1, cat:'frames', name:'La Hawla — لا حول ولا قوة إلا بالله', ar:'لا حول', en:'NO POWER EXCEPT THROUGH GOD', desc:'A stunning Mecca-inspired frame featuring the Kaaba with intricate Persian carpet patchwork in rich browns and golds. Adorned with the powerful dhikr in elegant Arabic calligraphy.', price:'AUD $25', priceNum:25, badge:'Best Seller', img:'mecca1', imgs:['mecca1','mecca2','mecca3'], details:{Frame:'Sleek black frame',Design:'Persian carpet patchwork + Kaaba',Size:'A4 (21×30cm)',Feature:'Hibiscus flower accent'}, c:{bg:'#3E2723',tx:'#D4A843',ac:'#B8860B'} },
  { id:2, cat:'frames', name:'Fa Inna — فإن مع العسر يسرا', ar:'فإن مع العسر', en:'WITH HARDSHIP COMES EASE', desc:'A breathtaking Al-Quds frame featuring the Dome of the Rock in brilliant blues and turquoise. Persian carpet patchwork with the Quranic verse.', price:'AUD $25', priceNum:25, badge:'Popular', img:'palestine1', imgs:['palestine1','palestine2','palestine3'], details:{Frame:'Elegant silver frame',Design:'Blue Persian patchwork + Dome of the Rock',Size:'A4 (21×30cm)',Feature:'Olive branch accent'}, c:{bg:'#2a4a6b',tx:'#F5F5F5',ac:'#D4A843'} },
  { id:3, cat:'totebags', name:'Persian Carpet Tote Bag — حقيبة سجادة', ar:'حقيبة', en:'PERSIAN CARPET TOTE', desc:'A beautiful canvas tote bag featuring a classic Persian carpet design. Perfect for everyday use or as a unique gift. Handcrafted with attention to detail.', price:'AUD $35', priceNum:35, badge:'New', img:'tote1', imgs:['tote1'], details:{Material:'Premium Canvas',Size:'Standard Tote',Design:'Persian Carpet Print',Colour:'Sage Green & Gold'}, c:{bg:'#3E2723',tx:'#D4A843',ac:'#B8860B'} },
  { id:4, cat:'frames', name:'Rabbi Zidni Ilma — ربِ العلم يا خيرَ الرَّب', ar:'رب العلم', en:'MY LORD, INCREASE ME IN KNOWLEDGE', desc:'An elegant silver-framed piece featuring the dua "Rabbi Zidni Ilma" with intricate Persian carpet patchwork in muted greens and greys. Adorned with delicate magnolia flower accents.', price:'AUD $25', priceNum:25, badge:'New', img:'frame1', imgs:['frame1','frame1b','frame1c'], details:{Frame:'Silver frame',Design:'Persian carpet patchwork + Magnolia',Size:'A4 (21×30cm)',Feature:'Magnolia flower accent'}, c:{bg:'#5D6B5E',tx:'#D4A843',ac:'#B8860B'} },
  { id:5, cat:'frames', name:'Ala Bidhikrillah — الا بذكر الله تطمئن القلوب', ar:'الا بذكر الله', en:'VERILY IN THE REMEMBRANCE OF ALLAH DO HEARTS FIND REST', desc:'A stunning frame featuring the Quranic verse from Surah Ar-Rad. Persian carpet patchwork in warm burgundy and mauve tones with a beautiful silver frame.', price:'AUD $25', priceNum:25, badge:'New', img:'frame2', imgs:['frame2','frame2b','frame2c'], details:{Frame:'Silver frame',Design:'Burgundy Persian carpet patchwork',Size:'A4 (21×30cm)',Feature:'Classic silver border'}, c:{bg:'#6B4C5E',tx:'#D4A843',ac:'#B8860B'} }
];

function makeSVG(item, useThumbnail) {
  const key = useThumbnail ? item.img + '_thumb' : item.img + '_main';
  const src = PRODUCT_IMAGES[key] || PRODUCT_IMAGES[item.img + '_thumb'];
  return `<img src="${src}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:4px;" loading="lazy">`;
}

function renderItems(grid, list, showCustom, customCat) {
  let h = '';
  if (showCustom) {
    h += `<div class="gallery-item custom-card reveal s1" onclick="navigate('commission')">
      <div class="custom-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M12 5v14M5 12h14"/></svg></div>
      <h3>Custom Design</h3>
      <p>Design your own piece with your chosen word, colours, and style.</p>
      <span class="btn btn-primary btn-small">Start Designing</span>
    </div>`;
  }
  list.forEach((item, i) => {
    h += `<div class="gallery-item reveal s${(i%4)+2}" onclick="openPM(${item.id})">
      ${item.badge ? `<div class="gallery-item-badge">${item.badge}</div>` : ''}
      <div class="gallery-item-img-wrap">${makeSVG(item, true)}</div>
      <div class="gallery-item-info">
        <div class="gallery-item-name">${item.name}</div>
        <div class="gallery-item-desc">${item.desc.substring(0,72)}...</div>
        <div class="gallery-item-price">${item.price}</div>
        <div class="gallery-item-actions">
          <button class="btn btn-primary btn-small" onclick="event.stopPropagation();preorder(${item.id})">Add to Cart</button>
          <button class="btn btn-secondary btn-small" onclick="event.stopPropagation();openPM(${item.id})">Details</button>
        </div>
      </div>
    </div>`;
  });
  grid.innerHTML = h;
  setTimeout(initReveal, 60);
}

function filterGallery(cat) {
  const tabs = document.querySelectorAll('#galleryTabs .gallery-tab');
  tabs.forEach(t => t.classList.remove('active'));
  const idx = ['all','totebags','frames','paintings'].indexOf(cat);
  if (tabs[idx]) tabs[idx].classList.add('active');
  if (cat === 'paintings') {
    // Show coming soon for paintings
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '<div class="coming-soon-card reveal s1">' +
      '<div class="coming-soon-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>' +
      '<div class="coming-soon-label">Coming Soon</div>' +
      '<h3>Original Paintings</h3>' +
      '<p>Hand-painted Arabic calligraphy artwork on canvas. Our painting collection is currently being crafted with care. Stay tuned!</p>' +
      '</div>';
    setTimeout(initReveal, 60);
    return;
  }
  const list = cat === 'all' ? items : items.filter(i => i.cat === cat);
  renderItems(document.getElementById('galleryGrid'), list, true, cat === 'all' ? '' : cat);
}

function filterHomeGallery(cat) {
  const grid = document.getElementById('homeGalleryGrid');
  let h = '';

  // Frames section
  h += '<div class="home-category-section">';
  h += '<div class="home-category-header"><h3>Frames</h3><div class="home-category-line"></div></div>';
  const frames = items.filter(i => i.cat === 'frames').slice(0, 6);
  h += '<div class="gallery-grid">';
  frames.forEach((item, i) => {
    h += '<div class="gallery-item reveal s' + ((i%4)+1) + '" onclick="openPM(' + item.id + ')">';
    h += (item.badge ? '<div class="gallery-item-badge">' + item.badge + '</div>' : '');
    h += '<div class="gallery-item-img-wrap">' + makeSVG(item, true) + '</div>';
    h += '<div class="gallery-item-info">';
    h += '<div class="gallery-item-name">' + item.name + '</div>';
    h += '<div class="gallery-item-desc">' + item.desc.substring(0,72) + '...</div>';
    h += '<div class="gallery-item-price">' + item.price + '</div>';
    h += '<div class="gallery-item-actions">';
    h += '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();preorder(' + item.id + ')">Add to Cart</button>';
    h += '<button class="btn btn-secondary btn-small" onclick="event.stopPropagation();openPM(' + item.id + ')">Details</button>';
    h += '</div></div></div>';
  });
  h += '</div></div>';

  // Tote Bags section
  h += '<div class="home-category-section">';
  h += '<div class="home-category-header"><h3>Tote Bags</h3><div class="home-category-line"></div></div>';
  const totes = items.filter(i => i.cat === 'totebags');
  h += '<div class="gallery-grid">';
  totes.forEach((item, i) => {
    h += '<div class="gallery-item reveal s' + ((i%4)+1) + '" onclick="openPM(' + item.id + ')">';
    h += (item.badge ? '<div class="gallery-item-badge">' + item.badge + '</div>' : '');
    h += '<div class="gallery-item-img-wrap">' + makeSVG(item, true) + '</div>';
    h += '<div class="gallery-item-info">';
    h += '<div class="gallery-item-name">' + item.name + '</div>';
    h += '<div class="gallery-item-desc">' + item.desc.substring(0,72) + '...</div>';
    h += '<div class="gallery-item-price">' + item.price + '</div>';
    h += '<div class="gallery-item-actions">';
    h += '<button class="btn btn-primary btn-small" onclick="event.stopPropagation();preorder(' + item.id + ')">Add to Cart</button>';
    h += '<button class="btn btn-secondary btn-small" onclick="event.stopPropagation();openPM(' + item.id + ')">Details</button>';
    h += '</div></div></div>';
  });
  h += '</div></div>';

  // Paintings section - Coming Soon
  h += '<div class="home-category-section">';
  h += '<div class="home-category-header"><h3>Paintings</h3><div class="home-category-line"></div></div>';
  h += '<div class="gallery-grid">';
  h += '<div class="coming-soon-card reveal s1">';
  h += '<div class="coming-soon-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>';
  h += '<div class="coming-soon-label">Coming Soon</div>';
  h += '<h3>Original Paintings</h3>';
  h += '<p>Hand-painted Arabic calligraphy artwork on canvas. Stay tuned for our upcoming collection.</p>';
  h += '</div>';
  h += '</div></div>';

  grid.innerHTML = h;
  setTimeout(initReveal, 60);
}

// ═══════════ PRODUCT MODAL ═══════════
let pmCurrentIdx = 0;
let pmImgKeys = [];

function pmShowImage(idx) {
  if (!pmImgKeys.length) return;
  pmCurrentIdx = (idx + pmImgKeys.length) % pmImgKeys.length;
  const src = PRODUCT_IMAGES[pmImgKeys[pmCurrentIdx] + '_main'] || PRODUCT_IMAGES[pmImgKeys[pmCurrentIdx] + '_thumb'];
  const wrap = document.getElementById('pmImgWrap');
  const img = wrap.querySelector('img');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = src;
      img.style.opacity = '1';
    }, 180);
  }
  // Update dots
  document.querySelectorAll('#pmDots .pm-dot').forEach((d, i) => {
    d.classList.toggle('active', i === pmCurrentIdx);
  });
}

function openPM(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;

  // Set up image carousel
  pmImgKeys = item.imgs && item.imgs.length ? item.imgs : [item.img];
  pmCurrentIdx = 0;
  const firstSrc = PRODUCT_IMAGES[pmImgKeys[0] + '_main'] || PRODUCT_IMAGES[pmImgKeys[0] + '_thumb'];

  // Build image wrap with arrows
  let imgHTML = '<img src="' + firstSrc + '" alt="' + item.name + '" style="width:100%;height:100%;object-fit:cover;display:block;transition:opacity 0.35s ease;">';
  if (pmImgKeys.length > 1) {
    imgHTML += '<button class="pm-arrow pm-arrow-left" onclick="event.stopPropagation();pmShowImage(pmCurrentIdx-1)">&#8249;</button>';
    imgHTML += '<button class="pm-arrow pm-arrow-right" onclick="event.stopPropagation();pmShowImage(pmCurrentIdx+1)">&#8250;</button>';
  }
  document.getElementById('pmImgWrap').innerHTML = imgHTML;

  // Build dots
  let dotsHTML = '';
  if (pmImgKeys.length > 1) {
    pmImgKeys.forEach((_, i) => {
      dotsHTML += '<span class="pm-dot' + (i === 0 ? ' active' : '') + '" onclick="pmShowImage(' + i + ')"></span>';
    });
  }
  document.getElementById('pmDots').innerHTML = dotsHTML;

  document.getElementById('pmCat').textContent = item.cat==='frames'?'Frames':item.cat==='totebags'?'Tote Bags':item.cat==='paintings'?'Paintings':'Collection';
  document.getElementById('pmName').textContent = item.name;
  document.getElementById('pmDesc').textContent = item.desc;
  document.getElementById('pmPrice').textContent = item.price;
  let d = '';
  for (const [k,v] of Object.entries(item.details)) d += '<div class="pm-detail"><span>' + k + '</span><span>' + v + '</span></div>';
  document.getElementById('pmDetails').innerHTML = d;

  // Buy area
  const buyArea = document.getElementById('pmBuyArea');
  buyArea.innerHTML = '<button class="btn btn-primary" id="pmStripeBtn" style="width:100%;justify-content:center;cursor:pointer;">Buy Now</button>' +
    '<p style="text-align:center;font-size:11px;color:var(--text-light);margin-top:8px;font-weight:300;">Secure payment via Stripe</p>';
  document.getElementById('pmStripeBtn').onclick = () => { addToCart(id); closePM(); openCheckout(); };

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePM() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}
function preorder(id) {
  addToCart(id);
  closePM();
}

// ═══════════ STRIPE WORKER ═══════════
// TODO: After deploying your Cloudflare Worker, paste your Worker URL here:
const STRIPE_WORKER_URL = 'https://ruhi-stripe-checkout.ruhi.workers.dev';

// ═══════════ FORMS ═══════════
function pickColor(el) {
  document.querySelectorAll('.color-opt').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
}
async function submitCommission() {
  const d = { type:v('cType'), name:v('cName'), email:v('cEmail'), word:v('cWord'), script:v('cScript'), size:v('cSize'), color:document.querySelector('.color-opt.sel')?.dataset.c||'Gold', notes:v('cNotes') };
  if (!d.name||!d.email||!d.type||!d.word) { alert('Please fill in product type, your name, email, and the word/name.'); return; }
  const btn = document.querySelector('#commissionForm .btn-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  try {
    const res = await fetch(STRIPE_WORKER_URL + '/commission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send');
    document.getElementById('commissionForm').style.display = 'none';
    document.getElementById('commissionSuccess').classList.add('show');
  } catch (err) {
    console.error('Commission error:', err);
    alert('Something went wrong. Please try again or email us at ruhidesigns.co@gmail.com');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Commission'; }
  }
}
async function submitContact() {
  const name=v('ctName'), email=v('ctEmail'), subject=v('ctSubject'), msg=v('ctMsg');
  if (!name||!email||!msg) { alert('Please fill in your name, email, and message.'); return; }
  const btn = document.querySelector('#contactForm .btn.btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  try {
    const res = await fetch(STRIPE_WORKER_URL + '/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message: msg }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send');
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('contactSuccess').classList.add('show');
  } catch (err) {
    console.error('Contact error:', err);
    alert('Something went wrong. Please try again or email us at ruhidesigns.co@gmail.com');
    if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
  }
}
function v(id) { return document.getElementById(id)?.value || ''; }

// ═══════════ NAVIGATION ═══════════
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-center a').forEach(a => a.classList.remove('active'));
  const tp = document.getElementById('page-' + page);
  const tn = document.getElementById('nav-' + page);
  if (tp) tp.classList.add('active');
  if (tn) tn.classList.add('active');
  if (page === 'gallery') filterGallery('all');
  if (page === 'home') filterHomeGallery('frames');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 120);
}
function toggleMobile() { document.getElementById('mobileMenu').classList.toggle('open'); }

// ═══════════ SCROLL ═══════════
function initReveal() {
  const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
});

// Init home gallery
filterHomeGallery('frames');



// ═══════════ COMMISSION TABS ═══════════
function showCommTab(tab) {
  document.getElementById('commTab-form').style.display = tab==='form' ? '' : 'none';
  document.getElementById('commTab-designer').style.display = tab==='designer' ? '' : 'none';
  document.getElementById('ctab-form').classList.toggle('active', tab==='form');
  document.getElementById('ctab-designer').classList.toggle('active', tab==='designer');
  document.getElementById('ctab-form').style.borderBottomColor = tab==='form' ? 'var(--gold)' : 'transparent';
  document.getElementById('ctab-designer').style.borderBottomColor = tab==='designer' ? 'var(--gold)' : 'transparent';
  document.getElementById('ctab-form').style.color = tab==='form' ? 'var(--gold-light)' : 'rgba(253,248,240,0.5)';
  document.getElementById('ctab-designer').style.color = tab==='designer' ? 'var(--gold-light)' : 'rgba(253,248,240,0.5)';
  if (tab === 'designer') initDesigner();
  setTimeout(initReveal, 100);
}

// ═══════════ FRAME DESIGNER ═══════════
let designerInited = false;
let designerState = { border: 'gold', bgId: null, assets: [], nextId: 1 };
let activeAsset = null;
let dragData = null;
let resizeData = null;

function initDesigner() {
  if (designerInited) return;
  designerInited = true;

  // Render background grid
  const bgGrid = document.getElementById('bgGrid');
  bgGrid.innerHTML = FRAME_IMGS.backgrounds.map(bg =>
    `<div class="dp-bg-thumb${designerState.bgId===bg.id?' active':''}" style="background-image:url(${bg.src})" onclick="selectBg(${bg.id})" title="${bg.name}"></div>`
  ).join('');

  // Render asset grid
  const assetGrid = document.getElementById('assetGrid');
  assetGrid.innerHTML = FRAME_IMGS.assets.map(a =>
    `<div><div class="dp-asset-thumb" onclick="addAsset(${a.id})" title="${a.name}"><img src="${a.src}" alt="${a.name}"></div><div class="dp-asset-name">${a.name}</div></div>`
  ).join('');

  // Auto-select first bg
  selectBg(1);
}

function setBorder(type) {
  designerState.border = type;
  const frame = document.getElementById('designerFrame');
  frame.classList.toggle('black-border', type === 'black');
  document.getElementById('borderGold').classList.toggle('active', type === 'gold');
  document.getElementById('borderBlack').classList.toggle('active', type === 'black');
}

function selectBg(id) {
  designerState.bgId = id;
  const bg = FRAME_IMGS.backgrounds.find(b => b.id === id);
  if (bg) {
    document.getElementById('designerBg').style.backgroundImage = `url(${bg.src})`;
  }
  // Update active state
  document.querySelectorAll('.dp-bg-thumb').forEach((t, i) => {
    t.classList.toggle('active', FRAME_IMGS.backgrounds[i].id === id);
  });
}

function addAsset(assetId) {
  const asset = FRAME_IMGS.assets.find(a => a.id === assetId);
  if (!asset) return;

  const frame = document.getElementById('designerFrame');
  const uid = designerState.nextId++;
  const el = document.createElement('div');
  el.className = 'designer-asset';
  el.id = 'dasset-' + uid;
  el.style.left = '80px';
  el.style.top = '120px';
  el.style.width = '100px';
  el.style.height = '100px';
  el.innerHTML = `<img src="${asset.src}" alt="${asset.name}"><button class="asset-delete" onclick="removeAsset(event,${uid})">×</button><div class="asset-resize"></div>`;
  
  el.addEventListener('mousedown', (e) => startDrag(e, uid));
  el.addEventListener('touchstart', (e) => startDrag(e, uid), {passive:false});
  el.querySelector('.asset-resize').addEventListener('mousedown', (e) => startResize(e, uid));
  el.querySelector('.asset-resize').addEventListener('touchstart', (e) => startResize(e, uid), {passive:false});
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    selectAsset(uid);
  });

  frame.appendChild(el);
  designerState.assets.push({ uid, assetId, x: 80, y: 120, w: 100, h: 100 });
  selectAsset(uid);
}

function selectAsset(uid) {
  document.querySelectorAll('.designer-asset').forEach(a => a.classList.remove('active'));
  const el = document.getElementById('dasset-' + uid);
  if (el) el.classList.add('active');
  activeAsset = uid;
}

function removeAsset(e, uid) {
  e.stopPropagation();
  const el = document.getElementById('dasset-' + uid);
  if (el) el.remove();
  designerState.assets = designerState.assets.filter(a => a.uid !== uid);
  activeAsset = null;
}

// Drag logic
function startDrag(e, uid) {
  if (e.target.classList.contains('asset-resize') || e.target.classList.contains('asset-delete')) return;
  e.preventDefault();
  selectAsset(uid);
  const el = document.getElementById('dasset-' + uid);
  const frame = document.getElementById('designerFrame');
  const fRect = frame.getBoundingClientRect();
  const pt = e.touches ? e.touches[0] : e;
  dragData = {
    uid,
    startX: pt.clientX,
    startY: pt.clientY,
    origLeft: parseInt(el.style.left) || 0,
    origTop: parseInt(el.style.top) || 0,
    fRect
  };
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', onDrag, {passive:false});
  document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
  if (!dragData) return;
  e.preventDefault();
  const pt = e.touches ? e.touches[0] : e;
  const dx = pt.clientX - dragData.startX;
  const dy = pt.clientY - dragData.startY;
  const el = document.getElementById('dasset-' + dragData.uid);
  if (!el) return;
  const newX = Math.max(0, Math.min(dragData.fRect.width - el.offsetWidth, dragData.origLeft + dx));
  const newY = Math.max(0, Math.min(dragData.fRect.height - el.offsetHeight, dragData.origTop + dy));
  el.style.left = newX + 'px';
  el.style.top = newY + 'px';
}

function endDrag() {
  if (dragData) {
    const el = document.getElementById('dasset-' + dragData.uid);
    if (el) {
      const a = designerState.assets.find(a => a.uid === dragData.uid);
      if (a) { a.x = parseInt(el.style.left); a.y = parseInt(el.style.top); }
    }
  }
  dragData = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', endDrag);
}

// Resize logic
function startResize(e, uid) {
  e.preventDefault();
  e.stopPropagation();
  const el = document.getElementById('dasset-' + uid);
  const pt = e.touches ? e.touches[0] : e;
  resizeData = {
    uid,
    startX: pt.clientX,
    startY: pt.clientY,
    origW: el.offsetWidth,
    origH: el.offsetHeight
  };
  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', endResize);
  document.addEventListener('touchmove', onResize, {passive:false});
  document.addEventListener('touchend', endResize);
}

function onResize(e) {
  if (!resizeData) return;
  e.preventDefault();
  const pt = e.touches ? e.touches[0] : e;
  const dx = pt.clientX - resizeData.startX;
  const el = document.getElementById('dasset-' + resizeData.uid);
  if (!el) return;
  const newW = Math.max(30, resizeData.origW + dx);
  const ratio = resizeData.origH / resizeData.origW;
  el.style.width = newW + 'px';
  el.style.height = (newW * ratio) + 'px';
}

function endResize() {
  if (resizeData) {
    const el = document.getElementById('dasset-' + resizeData.uid);
    if (el) {
      const a = designerState.assets.find(a => a.uid === resizeData.uid);
      if (a) { a.w = el.offsetWidth; a.h = el.offsetHeight; }
    }
  }
  resizeData = null;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', endResize);
  document.removeEventListener('touchmove', onResize);
  document.removeEventListener('touchend', endResize);
}

// Click frame to deselect
document.addEventListener('click', (e) => {
  if (!e.target.closest('.designer-asset') && !e.target.closest('.dp-asset-thumb')) {
    document.querySelectorAll('.designer-asset').forEach(a => a.classList.remove('active'));
    activeAsset = null;
  }
});

function clearDesigner() {
  document.querySelectorAll('.designer-asset').forEach(el => el.remove());
  designerState.assets = [];
  activeAsset = null;
}

async function submitDesign() {
  const bgName = designerState.bgId ? FRAME_IMGS.backgrounds.find(b=>b.id===designerState.bgId)?.name : 'None';
  const assetNames = designerState.assets.map(a => {
    const asset = FRAME_IMGS.assets.find(fa => fa.id === a.assetId);
    return asset ? `${asset.name} (at ${Math.round(a.x)},${Math.round(a.y)} size ${Math.round(a.w)}px)` : '';
  }).filter(Boolean).join(', ');

  try {
    const res = await fetch(STRIPE_WORKER_URL + '/commission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Frame Designer — Custom Design',
        name: 'Frame Designer User',
        email: 'via-designer@ruhidesigns.co',
        word: 'Custom Design',
        script: '',
        size: '',
        color: '',
        notes: `Background: ${bgName}\nAssets: ${assetNames || 'None'}`,
      }),
    });
    if (res.ok) {
      alert('Your design has been submitted! We will be in touch soon.');
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    alert('Design submitted! We will review it and get back to you.');
  }
}

// ═══════════ STRIPE CHECKOUT & CART ═══════════
const cart = [];

function addToCart(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.priceNum || 25, cat: item.cat, qty: 1 });
  }
  updateCartBadge();
  showCartNotification(item.name);
}

function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  let badge = document.getElementById('cartBadge');
  if (!badge) {
    const cartBtn = document.createElement('div');
    cartBtn.id = 'floatingCart';
    cartBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg><span id="cartBadge">0</span>`;
    cartBtn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--brown);color:var(--gold);width:56px;height:56px;border-radius:50%;display:none;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:transform 0.3s;';
    cartBtn.onmouseenter = () => cartBtn.style.transform = 'scale(1.1)';
    cartBtn.onmouseleave = () => cartBtn.style.transform = 'scale(1)';
    cartBtn.onclick = openCartModal;
    document.body.appendChild(cartBtn);
    badge = document.getElementById('cartBadge');
    badge.style.cssText = 'position:absolute;top:-4px;right:-4px;background:var(--gold);color:var(--brown);font-size:11px;font-weight:600;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Jost,sans-serif;';
  }
  badge.textContent = total;
  document.getElementById('floatingCart').style.display = total > 0 ? 'flex' : 'none';
}

function showCartNotification(name) {
  let notif = document.getElementById('cartNotif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'cartNotif';
    notif.style.cssText = 'position:fixed;bottom:90px;right:24px;z-index:10000;background:var(--brown);color:var(--cream);padding:12px 20px;border-radius:8px;font-family:Jost,sans-serif;font-size:14px;box-shadow:0 4px 20px rgba(0,0,0,0.3);transform:translateY(20px);opacity:0;transition:all 0.4s ease;border:1px solid var(--gold-dark);';
    document.body.appendChild(notif);
  }
  notif.textContent = '\u2713 Added to cart';
  notif.style.opacity = '1';
  notif.style.transform = 'translateY(0)';
  setTimeout(() => { notif.style.opacity = '0'; notif.style.transform = 'translateY(20px)'; }, 2200);
}

function openCartModal() {
  let modal = document.getElementById('cartModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.className = 'modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) closeCartModal(); };
    document.body.appendChild(modal);
  }
  
  const total = cart.reduce((s, c) => s + (c.price * c.qty), 0);
  let cartHtml = `<div style="background:var(--cream);max-width:480px;width:90%;border-radius:12px;padding:32px;max-height:80vh;overflow-y:auto;position:relative;">
    <button onclick="closeCartModal()" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:24px;cursor:pointer;color:var(--text-light);">\u00d7</button>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:28px;margin-bottom:20px;color:var(--brown);">Your Cart</h3>`;
  
  if (cart.length === 0) {
    cartHtml += '<p style="color:var(--text-light);text-align:center;padding:40px 0;">Your cart is empty</p>';
  } else {
    cart.forEach((c, i) => {
      const item = items.find(it => it.id === c.id);
      const thumbSrc = item ? PRODUCT_IMAGES[item.img + '_thumb'] : '';
      cartHtml += `<div style="display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid var(--cream-darker);">
        <img src="${thumbSrc}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;" alt="">
        <div style="flex:1;">
          <div style="font-weight:500;font-size:14px;color:var(--text);">${c.name.split(' \u2014 ')[0]}</div>
          <div style="color:var(--text-light);font-size:13px;">AUD $${c.price}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button onclick="updateCartQty(${i},-1)" style="width:28px;height:28px;border:1px solid var(--cream-darker);background:var(--white);border-radius:4px;cursor:pointer;font-size:16px;">\u2212</button>
          <span style="min-width:20px;text-align:center;font-size:14px;">${c.qty}</span>
          <button onclick="updateCartQty(${i},1)" style="width:28px;height:28px;border:1px solid var(--cream-darker);background:var(--white);border-radius:4px;cursor:pointer;font-size:16px;">+</button>
        </div>
      </div>`;
    });
    cartHtml += `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:16px;border-top:2px solid var(--brown);">
      <span style="font-family:'Cormorant Garamond',serif;font-size:20px;">Total</span>
      <span style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:var(--brown);">AUD $${total}</span>
    </div>
    <button onclick="openCheckout()" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:20px;">Proceed to Checkout</button>
    <p style="text-align:center;font-size:12px;color:var(--text-light);margin-top:12px;">Secure payment via Stripe \u00b7 Melbourne pickup or delivery</p>`;
  }
  cartHtml += '</div>';
  modal.innerHTML = cartHtml;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

function updateCartQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCartBadge();
  openCartModal();
}

async function openCheckout() {
  if (cart.length === 0) return;
  closeCartModal();
  closePM();
  
  const total = cart.reduce((s, c) => s + (c.price * c.qty), 0);
  const orderDetails = cart.map(c => `${c.qty}x ${c.name.split(' \u2014 ')[0]} Frame @ AUD $${c.price}`).join('\n');
  
  showPaymentModal(total, orderDetails);
}

function showPaymentModal(total, orderDetails) {
  let modal = document.getElementById('paymentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'paymentModal';
    modal.className = 'modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) closePaymentModal(); };
    document.body.appendChild(modal);
  }

  modal.innerHTML = `<div style="background:var(--cream);max-width:500px;width:90%;border-radius:12px;overflow:hidden;max-height:90vh;overflow-y:auto;">
    <div style="background:var(--brown);padding:24px 32px;text-align:center;">
      <div style="font-family:'Noto Naskh Arabic',serif;font-size:24px;color:var(--gold);margin-bottom:4px;">\u0631\u0648\u062d\u064a</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--cream);letter-spacing:2px;">RUHI DESIGNS</div>
    </div>
    <div style="padding:32px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;color:var(--brown);">AUD $${total}</div>
        <div style="color:var(--text-light);font-size:13px;margin-top:4px;">Total amount</div>
      </div>
      
      <div style="background:var(--cream-dark);border-radius:8px;padding:16px;margin-bottom:24px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--text-light);margin-bottom:8px;">Order Summary</div>
        <div style="font-size:14px;color:var(--text);white-space:pre-line;">${orderDetails}</div>
      </div>

      <div id="stripePayForm">
        <div style="margin-bottom:16px;">
          <label style="font-size:13px;font-weight:500;color:var(--text);display:block;margin-bottom:6px;">Full Name</label>
          <input type="text" id="payName" placeholder="Your full name" style="width:100%;padding:12px 16px;border:1px solid var(--cream-darker);border-radius:8px;font-family:Jost,sans-serif;font-size:14px;background:var(--white);outline:none;transition:border 0.3s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--cream-darker)'">
        </div>
        <div style="margin-bottom:16px;">
          <label style="font-size:13px;font-weight:500;color:var(--text);display:block;margin-bottom:6px;">Email</label>
          <input type="email" id="payEmail" placeholder="your@email.com" style="width:100%;padding:12px 16px;border:1px solid var(--cream-darker);border-radius:8px;font-family:Jost,sans-serif;font-size:14px;background:var(--white);outline:none;transition:border 0.3s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--cream-darker)'">
        </div>
        <div style="margin-bottom:16px;">
          <label style="font-size:13px;font-weight:500;color:var(--text);display:block;margin-bottom:6px;">Shipping Address</label>
          <textarea id="payAddress" placeholder="Full delivery address" rows="2" style="width:100%;padding:12px 16px;border:1px solid var(--cream-darker);border-radius:8px;font-family:Jost,sans-serif;font-size:14px;background:var(--white);outline:none;resize:vertical;transition:border 0.3s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--cream-darker)'"></textarea>
        </div>
        
        <div id="stripeCardElement" style="padding:14px 16px;border:1px solid var(--cream-darker);border-radius:8px;background:var(--white);margin-bottom:16px;min-height:44px;"></div>
        <div id="stripeCardErrors" style="color:#e74c3c;font-size:13px;margin-bottom:12px;display:none;"></div>

        <button onclick="processPayment()" id="payBtn" class="btn btn-primary" style="width:100%;justify-content:center;font-size:16px;padding:16px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" style="margin-right:8px;"><rect x="1" y="4" width="22" height="16" rx="3"/><path d="M1 10h22"/></svg>
          Pay AUD $${total}
        </button>
      </div>
      
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:20px;padding-top:16px;border-top:1px solid var(--cream-darker);">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5" width="14" height="14"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <span style="font-size:12px;color:var(--text-light);">Secured by Stripe \u00b7 SSL encrypted</span>
      </div>
      
      <div style="text-align:center;margin-top:12px;">
        <button onclick="closePaymentModal()" style="background:none;border:none;color:var(--text-light);cursor:pointer;font-size:13px;font-family:Jost,sans-serif;text-decoration:underline;">Cancel</button>
      </div>
    </div>
  </div>`;
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  initStripeElements();
}

let stripe, cardElement;

function initStripeElements() {
  if (typeof Stripe === 'undefined') {
    document.getElementById('stripeCardElement').innerHTML = '<p style="color:var(--text-light);font-size:13px;margin:0;">Card input loading… If it doesn\'t appear, please refresh.</p>';
    return;
  }
  stripe = Stripe('pk_live_51T3UNmBsVfyEuNUt42C8LPZLzTRjlbqUXxu5YuiZoCsFV75AwmwFE89yayW6pWZXFchuwzEi3UO7zHTriZSslZ080084Bwn4uB');
  const elements = stripe.elements({
    fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap' }]
  });
  cardElement = elements.create('card', {
    style: {
      base: {
        fontFamily: 'Jost, sans-serif',
        fontSize: '15px',
        color: '#2C1810',
        '::placeholder': { color: '#6B5B4F' }
      },
      invalid: { color: '#e74c3c' }
    }
  });
  cardElement.mount('#stripeCardElement');
  cardElement.on('change', (event) => {
    const errEl = document.getElementById('stripeCardErrors');
    if (event.error) {
      errEl.textContent = event.error.message;
      errEl.style.display = 'block';
    } else {
      errEl.style.display = 'none';
    }
  });
}

async function processPayment() {
  const name = document.getElementById('payName').value.trim();
  const email = document.getElementById('payEmail').value.trim();
  const address = document.getElementById('payAddress').value.trim();
  const errEl = document.getElementById('stripeCardErrors');

  if (!name || !email || !address) {
    errEl.textContent = 'Please fill in all fields.';
    errEl.style.display = 'block';
    return;
  }

  if (!stripe || !cardElement) {
    errEl.textContent = 'Card input not ready. Please refresh and try again.';
    errEl.style.display = 'block';
    return;
  }

  const btn = document.getElementById('payBtn');
  const total = cart.reduce((s, c) => s + (c.price * c.qty), 0);
  btn.disabled = true;
  btn.innerHTML = '<div style="width:20px;height:20px;border:2px solid var(--cream-dark);border-top-color:var(--cream);border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block;vertical-align:middle;margin-right:8px;"></div> Processing...';

  if (cart.length > 0) {
    try {
      // 1. Ask Worker to create a PaymentIntent (secret key stays server-side)
      const res = await fetch(STRIPE_WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: cart[0].id,
          email: email,
          name: name,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error || 'Could not create payment');
      }

      // 2. Confirm payment with card details (publishable key — safe client-side)
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name, email },
        },
      });

      if (error) {
        errEl.textContent = error.message;
        errEl.style.display = 'block';
        btn.disabled = false;
        btn.innerHTML = 'Pay AUD $' + total;
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        closePaymentModal();
        showOrderSuccess(name, total);
        cart.length = 0;
        updateCartBadge();
        return;
      }
    } catch (err) {
      console.error('Payment error:', err);
      errEl.textContent = err.message || 'Payment failed. Please try again.';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.innerHTML = 'Pay AUD $' + total;
      return;
    }
  }
}

async function sendOrderEmail(name, email, address, paymentRef) {
  const total = cart.reduce((s, c) => s + (c.price * c.qty), 0);
  const orderLines = cart.map(c => `${c.qty}x ${c.name.split(' \u2014 ')[0]} @ AUD $${c.price}`).join(', ');

  try {
    await fetch(STRIPE_WORKER_URL + '/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: 'New Order',
        message: `Order from ${name}\nEmail: ${email}\nAddress: ${address}\n\nItems: ${orderLines}\nTotal: AUD $${total}\nPayment Ref: ${paymentRef}`,
      }),
    });
  } catch (err) {
    console.error('Order email error:', err);
  }

  closePaymentModal();
  showOrderSuccess(name, total);
  cart.length = 0;
  updateCartBadge();
}

function showOrderSuccess(name, total) {
  let modal = document.getElementById('successModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'successModal';
    modal.className = 'modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; } };
    document.body.appendChild(modal);
  }
  modal.innerHTML = `<div style="background:var(--cream);max-width:420px;width:90%;border-radius:12px;padding:48px 32px;text-align:center;">
    <div style="width:64px;height:64px;background:var(--brown);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" width="28" height="28"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--brown);margin-bottom:8px;">Order Received!</h3>
    <p style="color:var(--text-light);font-size:15px;line-height:1.6;margin-bottom:24px;">Thank you, ${name}! Your email client should open with your order details. We will confirm your order and arrange payment shortly.</p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--gold-dark);margin-bottom:24px;">AUD $${total}</p>
    <button onclick="document.getElementById('successModal').classList.remove('open');document.body.style.overflow='';" class="btn btn-primary" style="justify-content:center;">Continue Browsing</button>
  </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

