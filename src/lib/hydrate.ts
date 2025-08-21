// src/lib/hydrate.ts
import { API, getJSON, imgSrc, fmtMoney, percent, linkIcon, socialIconsHtml, escapeHtml, escapeAttr, dateRange, formatDate,
  Cause, Volunteer, EventItem, Blog, Testimonial, Contact } from './api';

function safeQuery(root: ParentNode, sel: string) {
  return root.querySelector(sel) as HTMLElement | null;
}
function safeQueryAll(root: ParentNode, sel: string) {
  return Array.from(root.querySelectorAll(sel)) as HTMLElement[];
}

// --- Individual sections ---
async function hydrateCauses(root: ParentNode) {
  const list = await getJSON<Cause[]>('/causes');
  const wrapper = safeQuery(root, '.cause__slider .swiper-wrapper');
  if (!list || !wrapper) return;

  wrapper.innerHTML = list.map(c => {
    const p = percent(c.raisedAmount, c.goalAmount);
    return `
    <div class="swiper-slide">
      <div class="cause__item">
        <div class="cause__image image">
          <img src="${imgSrc(c.imageUrl)}" alt="image">
          ${c.category ? `<span class="cause-tag">${escapeHtml(c.category)}</span>` : ''}
        </div>
        <div class="cause__content">
          <h4 class="mb-4 mt-20"><a href="#" class="primary-hover">${escapeHtml(c.title || '')}</a></h4>
          <div class="progress-area">
            <div class="progress__item">
              <div class="progress__content" style="width: ${p}%;"><span>${p}%</span></div>
            </div>
            <div class="progress__goal mt-15">
              <h6>Goal : <span>${fmtMoney(c.goalAmount)}</span></h6>
              <h6>Raised : <span>${fmtMoney(c.raisedAmount)}</span></h6>
            </div>
            <div class="btn-three mt-30">
              <span class="btn-circle"></span>
              <a href="#" class="btn-inner"><span class="btn-text">DONATE NOW</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

async function hydrateVolunteers(root: ParentNode) {
  const list = await getJSON<Volunteer[]>('/volunteers');
  const grid = safeQuery(root, '#team .row.g-4');
  if (!list || !grid) return;

  grid.innerHTML = list.map(v => `
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
      <div class="team__item image">
        <img src="${imgSrc(v.imageUrl)}" alt="image">
        <div class="team__content">
          <div class="social-icon mb-30">
            ${linkIcon(v.socialLinks?.facebook, 'fa-facebook-f')}
            ${linkIcon(v.socialLinks?.instagram, 'fa-instagram', true)}
            ${linkIcon(v.socialLinks?.linkedin, 'fa-linkedin-in')}
            ${linkIcon(v.socialLinks?.twitter, 'fa-twitter')}
          </div>
          <div class="content">
            <h4><a href="#0" class="primary-hover">${escapeHtml(v.name || '')}</a></h4>
            <span>${escapeHtml(v.role || 'Volunteer')}</span>
          </div>
        </div>
      </div>
    </div>`).join('');
}

async function hydrateEvents(root: ParentNode) {
  const list = await getJSON<EventItem[]>('/events');
  const row = safeQuery(root, '#event .row.g-4');
  if (!list || !row) return;

  row.innerHTML = list.map((e, idx) => `
    <div class="col-xl-6 wow fadeIn${idx % 2 === 0 ? 'Down' : 'Up'}" data-wow-delay="${idx % 2 === 0 ? '00ms' : '200ms'}" data-wow-duration="1500ms">
      <div class="event__item h-100">
        <div class="image h-100">
          <img class="h-100" src="${imgSrc(e.imageUrl)}" alt="image">
        </div>
        <div class="event__content">
          <ul class="mb-4">
            <li><span>${dateRange(e.startsAt, e.endsAt)}</span></li>
            ${e.location ? `<li><span>${escapeHtml(e.location)}</span></li>` : ''}
          </ul>
          <h4 class="mt-20 pb-25 bor-bottom"><a href="#0" class="primary-hover">${escapeHtml(e.title || '')}</a></h4>
          ${e.description ? `<p class="mt-15">${escapeHtml(e.description)}</p>` : ''}
          <a href="#0" class="primary-hover fw-bold mt-4">EXPLORE MORE <i class="fa-regular fa-arrow-right ms-2"></i></a>
        </div>
      </div>
    </div>`).join('');
}

async function hydrateBlogs(root: ParentNode) {
  const list = await getJSON<Blog[]>('/blogs');
  const row = safeQuery(root, '#blog .row.g-4');
  if (!list || !row) return;

  row.innerHTML = list.map(b => `
    <div class="col-xl-4 col-md-6 wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
      <div class="blog__item">
        <div class="image">
          <img src="${imgSrc(b.imageUrl)}" alt="image">
          ${b.tag ? `<span class="blog-tag">${escapeHtml(b.tag)}</span>` : ''}
        </div>
        <div class="blog__content pt-4">
          <ul><li><span>${formatDate(b.createdAt)}</span></li></ul>
          <h4 class="mt-20 pb-25 bor-bottom"><a href="#0" class="primary-hover">${escapeHtml(b.title || '')}</a></h4>
          <a class="mt-4" href="#0"><span class="read-more fw-bold transition">Read More <i class="fa-solid fa-arrow-right ms-1"></i></span></a>
        </div>
      </div>
    </div>`).join('');
}

async function hydrateTestimonials(root: ParentNode) {
  const list = await getJSON<Testimonial[]>('/testimonials');
  const wrap = safeQuery(root, '.testimonial__slider .swiper-wrapper');
  if (!list || !wrap) return;

  wrap.innerHTML = list.map(t => `
    <div class="swiper-slide">
      <div class="testimonial__item">
        <svg class="shape" width="59" height="67" viewBox="0 0 59 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="59" height="67">
            <rect width="59" height="67" fill="#F74F22" />
          </mask>
          <g mask="url(#mask0_87_43)">
            <circle opacity="0.7" cx="59" cy="9" r="56" fill="#F74F22" />
            <circle cx="59" cy="9" r="47.5" fill="#F74F22" stroke="white" stroke-dasharray="2 2" />
          </g>
        </svg>
        <div class="top">
          <div class="image"><img src="${imgSrc(t.imageUrl)}" alt="image"></div>
          <div><h5>${escapeHtml(t.name || '')}</h5>${t.role ? `<span>${escapeHtml(t.role)}</span>` : ''}</div>
        </div>
        <p class="mt-30">${escapeHtml(t.message || '')}</p>
      </div>
    </div>`).join('');
}

async function hydrateContact(root: ParentNode) {
  const c = await getJSON<Contact>('/contact');
  if (!c) return;

  const headerInfo = safeQuery(root, '.header-top .info');
  if (headerInfo) headerInfo.innerHTML = `<li class="ms-4"><a href="mailto:${escapeAttr(c.email || '')}">${escapeHtml(c.email || '')}</a></li>`;

  const headerSocial = safeQuery(root, '.header-top .social-icon');
  if (headerSocial) headerSocial.innerHTML = socialIconsHtml(c.socialLinks);

  const footerInfo = safeQuery(root, 'footer .footer__item .link.info');
  if (footerInfo) footerInfo.innerHTML = `
    ${c.phone ? `<li class="mb-3"><a href="tel:${escapeAttr(c.phone)}">${escapeHtml(c.phone)}</a></li>` : ''}
    ${c.email ? `<li class="mb-3"><a href="mailto:${escapeAttr(c.email)}">${escapeHtml(c.email)}</a></li>` : ''}
    ${c.address ? `<li><a href="#0">${escapeHtml(c.address)}</a></li>` : ''}`;

  const footerSocial = safeQuery(root, 'footer .social-icon');
  if (footerSocial) footerSocial.innerHTML = socialIconsHtml(c.socialLinks);
}

async function hydrateCounters(root: ParentNode) {
  const stats = await getJSON<{ totalRaised?: number }>('/donations/stats');
  let totalRaised = stats?.totalRaised ?? 0;
  let totalGoal = 0;
  const causes = await getJSON<Cause[]>('/causes');
  if (causes) {
    totalRaised = totalRaised || causes.reduce((a, c) => a + (c.raisedAmount || 0), 0);
    totalGoal = causes.reduce((a, c) => a + (c.goalAmount || 0), 0);
  }
  const allInfos = safeQueryAll(root, '.info');
  const goalEl = allInfos.find(el => /Our\s+Goal/i.test(el.textContent || ''));
  const raisedEl = allInfos.find(el => /Raised\s+Now/i.test(el.textContent || ''));
  if (goalEl) {
    const h2 = goalEl.querySelector('h2') as HTMLElement | null;
    if (h2) h2.innerHTML = fmtMoney(totalGoal);
  }
  if (raisedEl) {
    const h2 = raisedEl.querySelector('h2') as HTMLElement | null;
    if (h2) h2.innerHTML = fmtMoney(totalRaised);
  }
}

// Execute inline scripts present in loaded static HTML
export function runInlineScripts(root: HTMLElement) {
  const scripts = Array.from(root.querySelectorAll('script')) as HTMLScriptElement[];
  for (const old of scripts) {
    const s = document.createElement('script');
    if (old.src) s.src = old.src;
    if (old.type) s.type = old.type;
    s.textContent = old.textContent || '';
    (old.parentNode as HTMLElement)?.replaceChild(s, old);
  }
}

function initSwipers() {
  const Swiper = (window as any).Swiper;
  if (!Swiper) return;
  try {
    new Swiper('.cause__slider', { slidesPerView: 1, spaceBetween: 24, navigation: { nextEl: '.cause__arry-next', prevEl: '.cause__arry-prev' }, breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } } });
  } catch {}
  try {
    new Swiper('.testimonial__slider', { slidesPerView: 1, spaceBetween: 24, navigation: { nextEl: '.testimonial__arry-next', prevEl: '.testimonial__arry-prev' } });
  } catch {}
}

export async function hydrateAll(root: HTMLElement) {
  await Promise.all([
    hydrateContact(root),
    hydrateCauses(root),
    hydrateVolunteers(root),
    hydrateEvents(root),
    hydrateBlogs(root),
    hydrateTestimonials(root),
    hydrateCounters(root),
  ]);
  initSwipers();
}
