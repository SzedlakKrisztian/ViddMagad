const bonuszok = [
    "Külső csomagolás",
    "Érzékeny",
    "Törékeny",
    "Sürgős",
    "bonusz5",

    "+5%",
    "+10%",
    "+15%",
    "+20%",
    "+?%"
  ];

  const berek = [
    "Pici csomag (10 cm x 10 cm x 10 cm)",
    "Kis csomag (30 cm x 30 cm x 30 cm)",
    "Közepes csomag (45 cm x 45 cm x 45 cm)",
    "Nagy csomag (60 cm x 60 cm x 60 cm)",
    "Hatalmas csomag (90 cm x 90 cm x 90 cm)",

    "90 Ft",
    "210 Ft",
    "330 Ft",
    "450 Ft",
    "570 Ft"
  ];

function bonuszokMutatasa(){
    for (let i = 5; i < bonuszok.length; i++) {
        document.getElementById(i+1).innerHTML = bonuszok[i]
    }
    for (let i = 0; i < bonuszok.length; i++) {
        document.getElementById(i+1).innerHTML = bonuszok[i]
    }
};

function berekMutatasa(){
    for (let i = 5; i < berek.length; i++) {
        document.getElementById(i+1).innerHTML = berek[i]
    }
    for (let i = 0; i < berek.length; i++) {
        document.getElementById(i+1).innerHTML = berek[i]
    }
};

let csomagszam = 0;

function csomagHozzaadasa() {
    csomagszam++;

    var csomag = document.createElement('li');
    csomag.className = "item";

    var sor1 = document.createElement('div');
    sor1.style.display = "flex";
    sor1.style.justifyContent = "space-between";

    var csomagnev = document.createElement('span');
    csomagnev.innerHTML = "Csomag " + csomagszam;

    var torol = document.createElement('button');
    torol.innerHTML = "X";
    torol.onclick = function() {
        csomag.remove();
    };

    sor1.append(csomagnev, torol);

    var sor2 = document.createElement('div');

    var meret = document.createElement('select');
    meret.innerHTML = `
        <option value="pici">Pici csomag</option>
        <option value="kis">Kis csomag</option>
        <option value="koze">Közepes csomag</option>
        <option value="nagy">Nagy csomag</option>
        <option value="hatalmas">Hatalmas csomag</option>
    `;

    var tavolsag = document.createElement('select');
    tavolsag.innerHTML = `
        <option value="option1">1-5 km</option>
        <option value="option2">5-10 km</option>
        <option value="option3">10-25 km</option>
        <option value="option4">25-50 km</option>
        <option value="option5">50+ km</option>
    `;

    sor2.appendChild(meret);

    var bonusz1 = document.createElement('label');
    bonusz1.innerHTML = "Külső csomagolás";
    sor2.appendChild(bonusz1);

    var checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    sor2.appendChild(checkbox1);

    var bonusz2 = document.createElement('label');
    bonusz2.innerHTML = "Érzékeny";
    sor2.appendChild(bonusz2);

    var checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    sor2.appendChild(checkbox2);

//------------------------------------------------

    var sor3 = document.createElement('div');

    var bonusz3 = document.createElement('label');
    bonusz3.innerHTML = "Törékeny";

    var checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';

    var bonusz4 = document.createElement('label');
    bonusz4.innerHTML = "Sürgős";

    var checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';

    var bonusz5 = document.createElement('label');
    bonusz5.innerHTML = "bonusz5";

    var checkbox5 = document.createElement('input');
    checkbox5.type = 'checkbox';

    sor3.append(tavolsag, bonusz3, checkbox3, bonusz4, checkbox4, bonusz5, checkbox5);
    csomag.append(sor1, sor2, sor3);

    var csomagok = document.getElementById('csomagLista');
    csomagok.appendChild(csomag);
}

function torolOsszes(){
    var parentElement = document.getElementById('csomagLista');
    parentElement.replaceChildren();
    csomagszam = 0;
}