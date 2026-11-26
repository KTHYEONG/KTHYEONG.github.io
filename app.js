// 직무 탭: 해시(#data-eng 등)로 해당 직무 섹션만 보여 준다. JS가 없으면 모든 섹션이 순서대로 보인다.
(function () {
  var tracks = Array.prototype.slice.call(document.querySelectorAll('section.track'));
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-track]')).filter(function (a) { return a.tagName === 'A'; });
  var ids = tracks.map(function (t) { return t.id; });
  function show(id, scroll) {
    if (ids.indexOf(id) < 0) id = ids[0];
    tracks.forEach(function (t) { t.classList.toggle('active', t.id === id); });
    links.forEach(function (a) { var on = a.getAttribute('data-track') === id; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (scroll) { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  function fromHash() {
    var h = location.hash.replace('#', '');
    if (ids.indexOf(h) >= 0) show(h, true);
    else if (!document.querySelector('section.track.active')) show(ids[0], false);
  }
  // 위의 분야 카드가 보이는 동안에는 같은 선택지를 가진 고정 탭을 숨긴다.
  var bar = document.querySelector('.track-switch');
  var cards = document.querySelector('.tcards');
  if (bar && cards) {
    var sync = function () { bar.classList.toggle('stuck', cards.getBoundingClientRect().bottom < 56); };
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
