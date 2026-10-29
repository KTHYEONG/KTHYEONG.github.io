// 직무 탭: 해시(#quant 등)로 해당 직무 섹션만 보여 준다. JS가 없으면 모든 섹션이 순서대로 보인다.
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
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
