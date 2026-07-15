/**
 * lang.js — Atom Art Box dil sistemi
 * Tüm sayfalara <script src="lang.js"></script> ile ekle.
 * Çevrilecek elementlere data-key="anahtar" ekle.
 */

const translations = {
  tr: {
    // Navbar
    nav_kurumsal: "Kurumsal Çözümler",

    // Hero
    hero_eyebrow: "Doğa · Sanat · Eğitim",
    hero_h1: 'Çocukların hayal gücüne <em>sanatla renk</em> katıyoruz.',
    hero_p: "Atom Art Box, çocuklar için özgün sanat içerikleri ve etkinlik kutuları üretir. Farklı sanat dallarını harmanlayarak yaratıcılığı besleyen, eğlenceli ve öğretici bir dünya kurar.",

    // Diğer sayfalarınızdaki data-key'leri buraya ekleyin:
    // örnek:
    // about_title: "Hakkımızda",
    // contact_title: "İletişim",
  },
  en: {
    // Navbar
    nav_kurumsal: "Corporate Solutions",

    // Hero
    hero_eyebrow: "Nature · Art · Education",
    hero_h1: 'We bring <em>colour through art</em> to children\'s imagination.',
    hero_p: "Atom Art Box creates original art content and activity kits for children. Blending different art forms, we build a fun and educational world that nurtures creativity.",

    // Diğer sayfalarınızdaki data-key'leri buraya ekleyin:
    // örnek:
    // about_title: "About Us",
    // contact_title: "Contact",
  }
};

/**
 * Dili uygula: data-key elementlerini güncelle, butonları ayarla, html lang'ı güncelle.
 */
function setLang(lang) {
  if (!translations[lang]) return;
  localStorage.setItem("aab_lang", lang);
  document.documentElement.lang = lang;

  // İçerikleri güncelle
  document.querySelectorAll("[data-key]").forEach(function(el) {
    var key = el.getAttribute("data-key");
    var value = translations[lang][key];
    if (value === undefined) return;
    // HTML içerik (em, strong gibi taglar için)
    if (value.indexOf("<") !== -1) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  // Toggle butonlarını güncelle
  var btnTr = document.getElementById("btn-tr");
  var btnEn = document.getElementById("btn-en");
  if (btnTr && btnEn) {
    btnTr.classList.toggle("active", lang === "tr");
    btnEn.classList.toggle("active", lang === "en");
  }
}

// Sayfa yüklenince kayıtlı dili uygula
(function() {
  var saved = localStorage.getItem("aab_lang") || "tr";
  // DOM hazır olunca çalıştır
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { setLang(saved); });
  } else {
    setLang(saved);
  }
})();
