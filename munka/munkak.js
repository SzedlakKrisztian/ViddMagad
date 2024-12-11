let lastClicked = null;

function initializeLocalStorage() {
    const existingData = localStorage.getItem('munkakData');
    if (!existingData) {
        fetch('munkak.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                localStorage.setItem('munkakData', JSON.stringify(data));
                console.log('Local storage initialized with JSON data.');
            })
            .catch(error => console.error('Error loading JSON data:', error));
    } else {
        console.log('Local storage already contains data.');
    }
}

function changeSelectedDistrict(district) {
    if (lastClicked && lastClicked !== district) {
        lastClicked.style.fill = "#e5e5e5";
    }
    district.style.fill = "#a01313";
    lastClicked = district;

    document.getElementById('district').innerText = "Kiválaszott kerület: " + lastClicked.id;
    fetchAndDisplayData(lastClicked.id);
}

function fetchAndDisplayData(districtId) {
    const storedData = localStorage.getItem('munkakData');
    if (storedData) {
        const data = JSON.parse(storedData);
        const districtKey = `district ${districtId}`;
        const districtEntries = data[0][districtKey];

        if (districtEntries) {
            const section = document.getElementById('packageList');
            section.innerHTML = '';

            const unacceptedPackages = districtEntries.filter(csomag => !csomag.accepted);
            const filteredPackages = applyFilters(unacceptedPackages);

            filteredPackages.forEach(csomag => {
                let totalPrice = csomag.wage;

                if (csomag.outerPackaging) totalPrice += totalPrice * 0.05;
                if (csomag.sensitive) totalPrice += totalPrice * 0.10;
                if (csomag.fragile) totalPrice += totalPrice * 0.15;
                if (csomag.urgent) totalPrice += totalPrice * 0.20;
                if (csomag.heavy) totalPrice += totalPrice * 0.25;

                totalPrice = Math.round(totalPrice);

                const listItem = document.createElement('li');
                listItem.className = "item";

                const csomagIdElement = document.createElement('h1');
                csomagIdElement.className = "csomag-id";
                csomagIdElement.innerText = `Csomag azonosító: ${csomag.id}`;

                const dataDiv = document.createElement('div');
                dataDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between;">
                        <span>Csomag mérete: ${csomag.size || 'N/A'}</span>
                        <span>Távolság: ${csomag.distance} km</span>
                        <span>Bér: ${totalPrice} Ft</span>
                    </div>
                    <span style ="font-weight: bold; display: block; margin-top: 10px; text-align: center;">Fontos tudnivalók</span>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <span>${getImportantInfo(csomag)}</span>
                        <button style="background-color: #ff5733; color: white; border: 1px solid black; border-radius: 10px; font-size: 20px;" onclick="handleAccept('${csomag.id}')">Csomag elvállalása</button>
                    </div>
                `;

                listItem.appendChild(csomagIdElement);
                listItem.appendChild(dataDiv);
                section.appendChild(listItem);
            });
        } else {
            console.error('Nincs adat a megadott kerülethez.');
        }
    } else {
        console.error('Nincs adat a helyi tárolóban.');
    }
}

function applyFilters(packages) {
    const checkboxes = document.querySelectorAll('.filterCheckbox');
    const filters = Array.from(checkboxes).map(checkbox => ({
        checked: checkbox.checked,
        id: checkbox.id
    }));

    return packages.filter(csomag => {
        return filters.every(filter => {
            if (filter.id === 'filterOuterPackaging') {
                return filter.checked ? csomag.outerPackaging : true;
            }
            if (filter.id === 'filterSensitive') {
                return filter.checked ? csomag.sensitive : true;
            }
            if (filter.id === 'filterFragile') {
                return filter.checked ? csomag.fragile : true;
            }
            if (filter.id === 'filterUrgent') {
                return filter.checked ? csomag.urgent : true;
            }
            if (filter.id === 'filterHeavy') {
                return filter.checked ? csomag.heavy : true;
            }
            return true;
        });
    });
}

function getImportantInfo(csomag) {
    let info = '';
    if (csomag.outerPackaging) info += 'A csomag külső csomagolással rendelkezik.<br>';
    if (csomag.sensitive) info += 'A csomag érzékeny anyagot tartalmaz.<br>';
    if (csomag.fragile) info += 'A csomag tartalma törékeny.<br>';
    if (csomag.urgent) info += 'A csomag sürgős.<br>';
    if (csomag.heavy) info += 'A csomag nehéz.<br>';
    return info || 'Nincs fontos tudnivaló.';
}

function openModal() {
    document.getElementById('confirmationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function handleAccept(csomagId) {
    console.log("Attempting to accept package with ID:", csomagId);
    const storedData = localStorage.getItem('munkakData');
    if (storedData) {
        const data = JSON.parse(storedData);
        const districtKey = `district ${lastClicked.id}`;
        const districtEntries = data[0][districtKey];

        console.log("District Entries:", districtEntries);

        const csomag = districtEntries.find(c => c.id.toString() === csomagId.toString());
        console.log("Found csomag:", csomag);

        if (csomag) {
            openModal();

            document.getElementById('confirmButton').onclick = function() {
                csomag.accepted = true;
                localStorage.setItem('munkakData', JSON.stringify(data));
                fetchAndDisplayData(lastClicked.id);
                closeModal();
            };
        } else {
            console.error('Csomag nem található.');
        }
    } else {
        console.error('Nincs adat a helyi tárolóban.');
    }
}

document.querySelectorAll('.filterCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (lastClicked) {
            fetchAndDisplayData(lastClicked.id);
        }
    });
});

initializeLocalStorage();
