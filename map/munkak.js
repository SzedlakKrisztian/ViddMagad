let lastClicked = null;

function changeSelectedDistrict(district) {
    if (lastClicked && lastClicked !== district) {
        lastClicked.style.fill = "#e5e5e5";
    }
    district.style.fill = "#a01313";
    lastClicked = district;

    document.getElementById('district').innerText = "Kiválaszott kerület: " + lastClicked.id;
    fetchAndDisplayData();
}

const properties = [
    { key: 'meret', prefix: 'Csomag mérete: ', suffix: '' },
    { key: 'kerulet', prefix: 'Kerület: ', suffix: '' },
    { key: 'ber', prefix: 'Bér: ', suffix: ' Ft' },
    { key: 'tavolsag', prefix: 'Távolság: ', suffix: ' km' }
];

function booleanToString(value) {
    return value ? "igen" : "nem";
}

function fetchAndDisplayData() {
    fetch('munkak.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const section = document.getElementById('csomagLista');
            section.innerHTML = '';
            data.forEach(csomag => {
                if (parseInt(lastClicked.id) === csomag.kerulet) {
                    const csomagAzonosito = document.createElement('div');
                    csomagAzonosito.innerHTML = `<h1>Csomag #${csomag.id}</h1>`;
                    const munka = document.createElement('li');
                    
                    let reszletek = properties.map(prop => {
                        return `${prop.prefix}${csomag[prop.key]}${prop.suffix}`;
                    }).join('<br>');

                    munka.innerHTML = reszletek;
                    section.appendChild(csomagAzonosito);
                    section.appendChild(munka);
                }
            });
        })
        .catch(error => console.error('Hiba történt a lekéréskor', error));
}
