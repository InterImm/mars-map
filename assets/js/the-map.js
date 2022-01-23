/***  little hack starts here ***/
L.Map = L.Map.extend({
    openPopup: function (popup) {
        //        this.closePopup();  // just comment this
        this._popup = popup;

        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
}); /***  end of hack ***/





var map = L.map('map', {
    center: [16.181, 84.624],
    // center: [0, 0],
    zoom: 3
});


var siteMarker = L.ExtraMarkers.icon({
    icon: 'far fa-lightbulb',
    markerColor: 'blue',
    shape: 'star',
    prefix: 'fa'
});

var cityMarker = L.ExtraMarkers.icon({
    // icon: 'far fa-street-view',
    icon: 'fas fa-home',
    markerColor: 'orange',
    shape: 'penta',
    prefix: 'fa'
});

var greenMarker = L.ExtraMarkers.icon({
    icon: 'fas fa-water',
    markerColor: 'green',
    shape: 'star',
    prefix: 'fa'
});



var baseUrl = 'http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/';


var basemapMOLAColor = new L.tileLayer(baseUrl + 'mola-color/{z}/{x}/{y}.png', {
    attribution: '<a href="http://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_ClrShade_merge_global_463m">NASA/MOLA</a> | <a href="http://interimm.org">星际移民中心</a>',
    tms: true,
    maxNativeZoom: 6,
}).addTo(map).setZIndex(0);


var baseMaps = {
    "Color MOLA Elevation": basemapMOLAColor
};




var marsCities = new L.LayerGroup().addTo(map);

marsCitiesPopup = {
    Procyon: "<div class='leaflet-popup-content-card'><h4><a href='http://book.interimm.org/history/mars_immigration/'>南河城（Procyon）</a></h4>2123 年成立；伊希地城市圈</div>",
    Sirius: "<div class='leaflet-popup-content-card'><h4><a href='http://book.interimm.org/history/mars_immigration/'>参宿城（Sirius）</a></h4>2123 年成立；伊希地城市圈</div>"
}

L.marker([16.181, 84.624], {
        icon: cityMarker,
    }).bindLabel('<b>南河城</b>', {
        noHide: true,
        direction: 'left',
        offset: [23, -35]
    }).bindPopup(marsCitiesPopup['Procyon']).addTo(marsCities),
    L.marker([11.323, 93.728], {
        icon: cityMarker,
    }).bindLabel('<b>参宿城</b>', {
        noHide: true,
        offset: [23, -35]
    }).bindPopup(marsCitiesPopup['Sirius']).addTo(marsCities),
    L.marker([7.439, 86.578], {
        icon: cityMarker,
    }).bindLabel('<b>天狼城</b>', {
        noHide: true,
        direction: 'left',
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([6.0, 176.0], {
        icon: cityMarker,
    }).bindLabel('<b>楼兰城</b>', {
        noHide: true,
        direction: 'left',
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([15.893, 199.833], {
        icon: cityMarker,
    }).bindLabel('<b>庞贝城</b>', {
        noHide: true,
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([15.799, 351.137], {
        icon: cityMarker,
    }).bindLabel('<b>奇点城</b>', {
        noHide: true,
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([5.496, 190.603], {
        icon: cityMarker,
    }).bindLabel('<b>亚特兰蒂斯城</b>', {
        noHide: true,
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([5.029, 10.541], {
        icon: cityMarker,
    }).bindLabel('<b>视界城</b>', {
        noHide: true,
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([28.850, 309.830], {
        icon: cityMarker,
    }).bindLabel('<b>星坠城</b>', {
        noHide: true,
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([-38.142, 86.896], {
        icon: cityMarker,
    }).bindLabel('<b>端点城</b>', {
        noHide: true,
        offset: [23, -35]
    }).addTo(marsCities),
    L.marker([-39.939, 67.842], {
        icon: cityMarker,
    }).bindLabel('<b>川陀城</b>', {
        noHide: true,
        direction: 'left',
        offset: [23, -35]
    }).addTo(marsCities),

    // https://amazonia-gov.github.io/


    greenPopup = {
        cangjie: "<div class='leaflet-popup-content-card'><h4><a href='https://amazonia-gov.github.io/'>仓颉城</a></h4>阿玛宗共和国首都</div>"
    }

    L.marker([12.39, 186.13], {
        icon: greenMarker,
    }).bindLabel('<b>仓颉城</b>', {
        noHide: true,
        direction: 'left',
        offset: [23, -35]
    }).bindPopup(greenPopup['cangjie']).addTo(marsCities);



// var circle = L.circle([51.508, -0.11], 1000, {
// color: 'red',
// fillColor: '#f03',
// fillOpacity: 1
// }).addTo(map);


var marsSites = new L.LayerGroup().addTo(map);


var citiesPopup = {
    mars2: "<div class='leaflet-popup-content-card'><img src='assets/images/Mars3_iki.jpg'> <h4>Title</h4>Description</div>",
}

L.marker([-4.590, 137.442], {
        icon: siteMarker,
    }).bindLabel('<b>好奇号</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([-45.653, 46.865], {
        icon: siteMarker,
    }).bindLabel('<b>火星二号</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([-14.568, 175.473], {
        icon: siteMarker,
    }).bindLabel('<b>勇气号</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([-1.946, 354.473], {
        icon: siteMarker,
    }).bindLabel('<b>机遇号</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([22.485, 310.034], {
        icon: siteMarker,
    }).bindLabel('<b>维京一号</b>', {
        noHide: true,
        direction: 'left',
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([48.269, 134.015], {
        icon: siteMarker,
    }).bindLabel('<b>维京二号</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([-45.025, 202.488], {
        icon: siteMarker,
    }).bindLabel('<b>火星三号</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([19.136, 326.781], {
        icon: siteMarker,
    }).bindLabel('<b>火星探路者</b>', {
        noHide: true,
        direction: 'left',
        offset: [20, -30]
    }).addTo(marsSites);






var mapLegends = new L.LayerGroup().addTo(map);


// Using color legends data from http://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_ClrShade_merge_global_463m

function getColor(d) {
    return d >= 21000 ? 'rgb(181,251,254)' :
        d >= 20000 ? 'rgb(218,253,255)' :
        d >= 19000 ? 'rgb(255,255,255)' :
        d >= 18000 ? 'rgb(252,249,249)' :
        d >= 17000 ? 'rgb(249,244,243)' :
        d >= 16000 ? 'rgb(248,241,239)' :
        d >= 15000 ? 'rgb(246,238,236)' :
        d >= 14000 ? 'rgb(238,223,218)' :
        d >= 13000 ? 'rgb(229,208,201)' :
        d >= 12000 ? 'rgb(221,193,185)' :
        d >= 11000 ? 'rgb(211,179,170)' :
        d >= 9000 ? 'rgb(194,153,141)' :
        d >= 8000 ? 'rgb(186,141,128)' :
        d >= 7000 ? 'rgb(177,130,116)' :
        d >= 6000 ? 'rgb(168,119,105)' :
        d >= 5000 ? 'rgb(190,107,91)' :
        d >= 3000 ? 'rgb(226,111,69)' :
        d >= 2000 ? 'rgb(240,147,67)' :
        d >= 1000 ? 'rgb(254,188,63)' :
        d >= 0 ? 'rgb(243,254,38)' :
        d >= -1000 ? 'rgb(148,239,38)' :
        d >= -2000 ? 'rgb(66,225,38)' :
        d >= -3000 ? 'rgb(38,230,170)' :
        d >= -4000 ? 'rgb(38,134,235)' :
        d >= -5000 ? 'rgb(38,62,223)' :
        d >= -6000 ? 'rgb(76,38,211)' :
        d >= -7000 ? 'rgb(130,38,199)' :
        d >= -8000 ? 'rgb(129,38,152)' :
        'rgb(104,38,103)';
}

var legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function (map) {



    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 18000, 19000, 20000, 21000],
        labels = [];



    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] + 1 ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);




var overlayMaps = {
    "火星城市": marsCities,
    "火星景点": marsSites,
    //   "其他": otherLocs
}


L.control.layers(baseMaps, overlayMaps).addTo(map);