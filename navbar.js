/* ============================================
   ATOM ART BOX — Ortak Sabit Üst Bar (navbar.js)
   Bu dosyayı sayfaya ekleyince bar otomatik oluşur
   ve sayfa nereye giderse gitsin üstte sabit kalır.
   ============================================ */
(function () {
  'use strict';

  // index.html / kit.html zaten kendi barına sahip -> tekrar ekleme
  if (document.getElementById('navLinks') || document.querySelector('.aab-nav')) return;

  var LOGO =
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<circle cx="16" cy="16" r="4" fill="#F37121"/>' +
    '<g fill="none" stroke="currentColor" stroke-width="2">' +
    '<ellipse cx="16" cy="16" rx="13" ry="6"/>' +
    '<ellipse cx="16" cy="16" rx="13" ry="6" transform="rotate(60 16 16)"/>' +
    '<ellipse cx="16" cy="16" rx="13" ry="6" transform="rotate(120 16 16)"/>' +
    '</g></svg>';

  var nav = document.createElement('div');
  nav.className = 'aab-nav';
  nav.innerHTML =
    '<div class="aab-nav__inner">' +
      '<a class="aab-brand" href="index.html" aria-label="ATOM ART BOX ana sayfa">' +
        LOGO +
        '<span>ATOM ART BOX<small>Doğa · Sanat · Eğitim</small></span>' +
      '</a>' +
      '<nav>' +
        '<ul class="aab-links" id="aabLinks">' +
          '<li><a href="index.html" data-page="index.html">Ana Sayfa</a></li>' +
          '<li><a href="hakkimizda.html" data-page="hakkimizda.html">Hakkımızda</a></li>' +
          '<li class="aab-dd" id="aabDD">' +
            '<button class="aab-dd-btn" type="button" aria-expanded="false" aria-haspopup="true">İçeriklerimiz <span aria-hidden="true">▾</span></button>' +
            '<ul class="aab-dd__menu">' +
              '<li><a href="etkinlik.html" data-page="etkinlik.html">📅 Etkinlik Planı</a></li>' +
              '<li><a href="kit.html" data-page="kit.html">🎨 Kitlerimiz</a></li>' +
            '</ul>' +
          '</li>' +
          '<li><a href="kity.html" data-page="kity.html">Kitini Yarat</a></li>' +
          '<li><a href="videolar.html" data-page="videolar.html">Eğitim Videoları</a></li>' +
          '<li><a href="index.html#iletisim">İletişim</a></li>' +
        '</ul>' +
      '</nav>' +
      '<div class="aab-actions">' +
        '<a href="index.html#kurumsal" class="aab-cta">Kurumsal Çözümler</a>' +
        '<button class="aab-burger" id="aabBurger" type="button" aria-label="Menüyü aç" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</div>';

  document.body.insertBefore(nav, document.body.firstChild);

  /* --- Bar sabit (fixed) olduğu için içeriği aşağı it --- */
  var basePad = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
  function syncPadding() {
    document.body.style.paddingTop = (basePad + nav.offsetHeight) + 'px';
  }
  syncPadding();
  window.addEventListener('resize', syncPadding);
  window.addEventListener('load', syncPadding);

  /* --- Bulunduğun sayfayı işaretle --- */
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var current = nav.querySelector('[data-page="' + file + '"]');
  if (current) {
    current.classList.add('is-active');
    var parentDD = current.closest('.aab-dd');
    if (parentDD) parentDD.querySelector('.aab-dd-btn').style.color = 'var(--aab-green)';
  }

  /* --- Açılır menü --- */
  var dd = nav.querySelector('#aabDD');
  var ddBtn = dd.querySelector('.aab-dd-btn');
  ddBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var open = dd.classList.toggle('is-open');
    ddBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', function (e) {
    if (!dd.contains(e.target)) {
      dd.classList.remove('is-open');
      ddBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dd.classList.remove('is-open');
      ddBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* --- Mobil hamburger --- */
  var burger = nav.querySelector('#aabBurger');
  var links = nav.querySelector('#aabLinks');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();
