/* Mars Map: InterImm's map of Mars in 2200. The page's colours, fonts, header and
   footer come from the shared kit (https://interimm.org/kit/); this file draws the
   map, its places and its key. Both language pages run it; they differ only in
   <html lang>. */
(function () {
  'use strict';

  var lang = document.documentElement.lang.toLowerCase().indexOf('zh') === 0 ? 'cn' : 'en';
  var BOOK = 'https://book.interimm.org/history/mars_immigration/';

  var T = {
    cn: {
      circle: '城市圈', founded: '成立', read: '在《星际移民之书》中阅读',
      record: '城市档案', explore: '3D 探索',
      cities: '火星城市', amazonia: '阿玛宗共和国', sites: '着陆遗址',
      elevation: '海拔（MOLA，千米）', landed: '着陆', impact: '坠毁',
      zoomIn: '放大', zoomOut: '缩小'
    },
    en: {
      circle: 'Circle', founded: 'Founded', read: 'Read in the Book of Interplanetary Civilization',
      record: 'City record', explore: 'Explore in 3D',
      cities: 'Martian cities', amazonia: 'Republic of Amazonia', sites: 'Landing sites',
      elevation: 'Elevation (MOLA, km)', landed: 'Landed', impact: 'Impact',
      zoomIn: 'Zoom in', zoomOut: 'Zoom out'
    }
  }[lang];

  var REGION = {
    isidis: { cn: '伊希地', en: 'Isidis' },
    amazonis: { cn: '亚马逊', en: 'Amazonis' },
    meridiani: { cn: '子午线', en: 'Meridiani' },
    hellas: { cn: '希腊', en: 'Hellas' }
  };

  // Martian cities. Longitudes are east, 0 to 360, as on the original map.
  var CITIES = [
    { cn: '南河城', en: 'Procyon City', at: [16.181, 84.624], side: 'left', year: 2123, region: 'isidis',
      note: { cn: '火星第一座城市，以服务业为主，城市中心是星际移民中心大楼。', en: 'The first city on Mars, mostly services, with the InterImm building at its centre.' },
      record: { cn: 'https://interimm.org/cities/mars/isidis-procyon/', en: 'https://interimm.org/en/cities/mars/isidis-procyon/' },
      explore: { cn: 'https://cities.interimm.org/?lang=cn', en: 'https://cities.interimm.org/' } },
    { cn: '参宿城', en: 'Betelgeuse City', at: [11.323, 93.728], year: 2123, region: 'isidis' },
    { cn: '天狼城', en: 'Sirius City', at: [7.439, 86.578], side: 'left', year: 2123, region: 'isidis' },
    { cn: '楼兰城', en: 'Kroran City', at: [6.0, 176.0], side: 'left', year: 2250, region: 'amazonis' },
    { cn: '庞贝城', en: 'Pompeii City', at: [15.893, 199.833], year: 2250, region: 'amazonis' },
    { cn: '亚特兰蒂斯城', en: 'Atlantis City', at: [5.496, 190.603], year: 2250, region: 'amazonis' },
    { cn: '奇点城', en: 'Singularity City', at: [15.799, 351.137], year: 2145, region: 'meridiani',
      note: { cn: '安逸的生活环境。', en: 'A calm and comfortable place to live.' } },
    { cn: '视界城', en: 'Horizon City', at: [5.029, 10.541], year: 2148, region: 'meridiani',
      note: { cn: '城内的视界星港是火星最大的星港。', en: 'Home to Horizon Spaceport, the largest spaceport on Mars.' } },
    { cn: '星坠城', en: 'Bolide City', at: [28.850, 309.830], year: 2165, region: 'meridiani',
      note: { cn: '围绕行星地质大学（Planetary Geology University）建成。', en: 'Built around the Planetary Geology University.' } },
    { cn: '端点城', en: 'Terminus City', at: [-38.142, 86.896], year: 2156, region: 'hellas',
      note: { cn: '农业为主的城市。', en: 'A farming city.' } },
    { cn: '川陀城', en: 'Trantor City', at: [-39.939, 67.842], side: 'left', year: 2155, region: 'hellas',
      note: { cn: '矿业和资源产业。', en: 'Mining and resources.' } }
  ];

  var AMAZONIA = [
    { cn: '仓颉城', en: 'Cangjie City', at: [12.39, 186.13], side: 'left',
      note: { cn: '阿玛宗共和国首都。', en: 'Capital of the Republic of Amazonia.' },
      link: 'https://amazonia-gov.github.io/' }
  ];

  // Real landers and rovers, for scale and history.
  var SITES = [
    { cn: '好奇号', en: 'Curiosity', at: [-4.590, 137.442], year: 2012 },
    { cn: '火星二号', en: 'Mars 2', at: [-45.653, 46.865], year: 1971, impact: true },
    { cn: '勇气号', en: 'Spirit', at: [-14.568, 175.473], year: 2004 },
    { cn: '机遇号', en: 'Opportunity', at: [-1.946, 354.473], year: 2004 },
    { cn: '维京一号', en: 'Viking 1', at: [22.485, 310.034], side: 'left', year: 1976 },
    { cn: '维京二号', en: 'Viking 2', at: [48.269, 134.015], year: 1976 },
    { cn: '火星三号', en: 'Mars 3', at: [-45.025, 202.488], year: 1971 },
    { cn: '火星探路者', en: 'Mars Pathfinder', at: [19.136, 326.781], side: 'left', year: 1997 }
  ];

  // MOLA colour shaded relief key (USGS Mars_MGS_MOLA_ClrShade_merge_global_463m), metres.
  var ELEVATION = [
    [-9000, '104,38,103'], [-8000, '129,38,152'], [-7000, '130,38,199'], [-6000, '76,38,211'],
    [-5000, '38,62,223'], [-4000, '38,134,235'], [-3000, '38,230,170'], [-2000, '66,225,38'],
    [-1000, '148,239,38'], [0, '243,254,38'], [1000, '254,188,63'], [2000, '240,147,67'],
    [3000, '226,111,69'], [5000, '190,107,91'], [6000, '168,119,105'], [7000, '177,130,116'],
    [8000, '186,141,128'], [9000, '194,153,141'], [11000, '211,179,170'], [12000, '221,193,185'],
    [13000, '229,208,201'], [14000, '238,223,218'], [15000, '246,238,236'], [16000, '248,241,239'],
    [17000, '249,244,243'], [18000, '252,249,249'], [19000, '255,255,255'], [20000, '218,253,255'],
    [21000, '181,251,254']
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function other(p) { return lang === 'cn' ? p.en : p.cn; }
  function link(href, text) { return '<a class="text-link" href="' + esc(href) + '">' + esc(text) + '</a>'; }

  // ---------- map ----------
  var narrow = window.matchMedia('(max-width: 760px)').matches;
  var map = L.map('map', {
    center: [16.181, 84.624],
    zoom: narrow ? 2 : 3,
    minZoom: 1,
    maxZoom: 8,
    zoomControl: false,
    worldCopyJump: false
  });
  L.control.zoom({ position: 'topright', zoomInTitle: T.zoomIn, zoomOutTitle: T.zoomOut }).addTo(map);
  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');

  L.tileLayer('https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png', {
    tms: true,
    maxNativeZoom: 6,
    attribution: '<a href="https://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_ClrShade_merge_global_463m">NASA/MOLA</a> · ' +
      '<a href="https://github.com/nmanaud/whereonmars/wiki/Basemaps">whereonmars</a> · ' +
      '<a href="' + (lang === 'cn' ? 'https://interimm.org/' : 'https://interimm.org/en/') + '">' + (lang === 'cn' ? '星际移民中心' : 'InterImm') + '</a>'
  }).addTo(map);

  function icon(kind) {
    return L.divIcon({ className: 'pin pin-' + kind, html: '<span></span>', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -8] });
  }

  function place(group, p, kind, popup) {
    L.marker(p.at, { icon: icon(kind), title: p[lang], riseOnHover: true })
      .bindTooltip(esc(p[lang]), {
        permanent: true,
        direction: p.side || 'right',
        offset: p.side === 'left' ? [-8, 0] : [8, 0],
        className: 'place-label place-label-' + kind
      })
      .bindPopup(popup, { className: 'place-popup', minWidth: 230, maxWidth: 280, autoPanPadding: [24, 24] })
      .addTo(group);
  }

  var cities = L.layerGroup().addTo(map);
  CITIES.forEach(function (c) {
    var r = REGION[c.region][lang];
    var links = [link(BOOK, T.read)];
    if (c.record) links.unshift(link(c.record[lang], T.record));
    if (c.explore) links.splice(1, 0, link(c.explore[lang], T.explore));
    place(cities, c, 'city',
      '<p class="kicker">' + esc(lang === 'cn' ? r + T.circle : r + ' ' + T.circle) + '</p>' +
      '<h3>' + esc(c[lang]) + ' <small>' + esc(other(c)) + '</small></h3>' +
      '<p class="meta">' + esc(lang === 'cn' ? c.year + ' 年' + T.founded : T.founded + ' ' + c.year) + '</p>' +
      (c.note ? '<p>' + esc(c.note[lang]) + '</p>' : '') +
      '<p class="links">' + links.join('') + '</p>');
  });

  var amazonia = L.layerGroup().addTo(map);
  AMAZONIA.forEach(function (c) {
    place(amazonia, c, 'state',
      '<p class="kicker">' + esc(T.amazonia) + '</p>' +
      '<h3>' + esc(c[lang]) + ' <small>' + esc(other(c)) + '</small></h3>' +
      '<p>' + esc(c.note[lang]) + '</p>' +
      '<p class="links">' + link(c.link, 'amazonia-gov.github.io') + '</p>');
  });

  var sites = L.layerGroup().addTo(map);
  SITES.forEach(function (s) {
    place(sites, s, 'site',
      '<p class="kicker">' + esc(T.sites) + '</p>' +
      '<h3>' + esc(s[lang]) + ' <small>' + esc(other(s)) + '</small></h3>' +
      '<p class="meta">' + esc((s.impact ? T.impact : T.landed) + (lang === 'cn' ? ' · ' + s.year + ' 年' : ' ' + s.year)) + '</p>');
  });

  // ---------- key: layer switches and the elevation scale ----------
  var key = document.getElementById('key');
  var layers = [[cities, 'city', T.cities], [amazonia, 'state', T.amazonia], [sites, 'site', T.sites]];
  var list = key.querySelector('.key-layers');
  layers.forEach(function (l) {
    var row = document.createElement('label');
    row.className = 'key-row';
    row.innerHTML = '<input type="checkbox" checked> <span class="pin pin-' + l[1] + '"><span></span></span> ' + esc(l[2]);
    row.firstChild.addEventListener('change', function (e) {
      if (e.target.checked) map.addLayer(l[0]); else map.removeLayer(l[0]);
    });
    list.appendChild(row);
  });

  var lo = ELEVATION[0][0], hi = ELEVATION[ELEVATION.length - 1][0];
  var stops = ELEVATION.map(function (e) {
    return 'rgb(' + e[1] + ') ' + ((e[0] - lo) / (hi - lo) * 100).toFixed(1) + '%';
  });
  key.querySelector('.key-elev-title').textContent = T.elevation;
  key.querySelector('.key-bar').style.background = 'linear-gradient(to right,' + stops.join(',') + ')';
  key.querySelector('.key-ticks').innerHTML = [-8, 0, 8, 16, 21].map(function (v) {
    return '<span style="left:' + ((v * 1000 - lo) / (hi - lo) * 100).toFixed(1) + '%">' + (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + '</span>';
  }).join('');
  if (!narrow) key.open = true;

  // Clicks and scrolls inside the panels belong to the panels, not the map.
  document.querySelectorAll('.map-panel').forEach(function (el) {
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  });

  // The map fills the window under the shared header, whatever height that header ends up.
  var header = document.querySelector('.site-header');
  var stage = document.querySelector('.map-stage');
  if (header && stage && window.ResizeObserver) {
    new ResizeObserver(function () {
      if (header.offsetHeight) stage.style.setProperty('--hh', header.offsetHeight + 'px');
      map.invalidateSize();
    }).observe(header);
  }
})();
