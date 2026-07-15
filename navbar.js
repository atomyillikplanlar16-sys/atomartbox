/* ============================================
   ATOM ART BOX — Ortak Sabit Üst Bar (navbar.js)
   Bu dosyayı sayfaya ekleyince bar otomatik oluşur
   ve sayfa nereye giderse gitsin üstte sabit kalır.
   ============================================ */
(function () {
  'use strict';

  // Bar zaten eklendiyse tekrar ekleme
  if (document.querySelector('.aab-nav')) return;

  /* index.html ve kit.html'deki eski (elle yazılmış) barı kaldır.
     Sayfanın kendi script'i bu script'ten ÖNCE çalıştığı için hata oluşmaz. */
  var legacy = document.getElementById('navLinks');
  var legacyHeader = legacy ? legacy.closest('header') : null;
  if (legacyHeader) legacyHeader.remove();

  /* Logo doğrudan gömülü: dosya yolu / klasör sorunu yaşanmaz. */
  var LOGO_SRC = 'data:image/png;base64,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';
  var LOGO = '<img class="aab-brand__logo" src="' + LOGO_SRC + '" alt="ATOM ART BOX logo">';

  var nav = document.createElement('div');
  nav.className = 'aab-nav';
  nav.innerHTML =
    '<div class="aab-nav__inner">' +
      '<a class="aab-brand" href="/" aria-label="ATOM ART BOX ana sayfa">' +
        LOGO +
        '<span>ATOM ART BOX<small>Doğa · Sanat · Eğitim</small></span>' +
      '</a>' +
      '<nav>' +
        '<ul class="aab-links" id="aabLinks">' +
          '<li><a href="/" data-page="index">Ana Sayfa</a></li>' +
          '<li><a href="/hakkimizda" data-page="hakkimizda">Hakkımızda</a></li>' +
          '<li class="aab-dd" id="aabDD">' +
            '<button class="aab-dd-btn" type="button" aria-expanded="false" aria-haspopup="true">İçeriklerimiz <span aria-hidden="true">▾</span></button>' +
            '<ul class="aab-dd__menu">' +
              '<li><a href="/etkinlik" data-page="etkinlik">📅 Etkinlik Planı</a></li>' +
              '<li><a href="/kit" data-page="kit">🎨 Kitlerimiz</a></li>' +
            '</ul>' +
          '</li>' +
          '<li><a href="/kity" data-page="kity">Kitini Yarat</a></li>' +
          '<li><a href="/videolar" data-page="videolar">Eğitim Videoları</a></li>' +
          '<li><a href="/#iletisim">İletişim</a></li>' +
        '</ul>' +
      '</nav>' +
      '<div class="aab-actions">' +
        '<a href="/#kurumsal" class="aab-cta">Kurumsal Çözümler</a>' +
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
  var path = location.pathname.toLowerCase()
    .replace(/\/index\.html$/, '/')   // /hakkimizda/index.html -> /hakkimizda/
    .replace(/\.html$/, '');          // /hakkimizda.html      -> /hakkimizda
  if (path.length > 1) path = path.replace(/\/$/, ''); // sondaki / kaldır (kök hariç)
  var page = (path === '' || path === '/') ? 'index' : path.split('/').pop();
  var current = nav.querySelector('[data-page="' + page + '"]');
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
