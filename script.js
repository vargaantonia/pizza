// GET
fetch("https://www.nodejs.sulla.hu/data")
.then(function getAccommodations (datas) {
    return datas.json();
})
.then(function(datas) {
    let container = document.querySelector('#container .row');
    for (let i = 0; i < datas.length; i++) {
        let cardHtml = `
            <div class="col-md-4 mb-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${datas[i].name}</h5>
                        <h5 class="card-title">Price: ${datas[i].price}</h5>
                        <h5 class="card-title">ID: ${datas[i].id}</h5>
                        <button class="btn btn-dark" style="width: 100%;" onclick="deleteAccommodation(${datas[i].id})">Törlés</button>
                        <button class="btn btn-dark mt-1" style="width: 100%;" onclick="TobbAdat(${datas[i].id})">Részletek</button>
                        <button class="btn btn-dark mt-1" style="width: 100%;" onclick="modifyAccommodation(${datas[i].id})">Módosítás</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    }
});

//POST
function addAccommodation() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const min_nights = document.getElementById('min_nights').value;
    const hostname = document.getElementById('hostname').value;
    const newAccommodation = {
        name: name,
        location: location,
        price: price,
        minimum_nights: min_nights,
        hostname: hostname,
        id : id
    };
    fetch("https://www.nodejs.sulla.hu/data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAccommodation),
    })
}

//DELETE
function deleteAccommodation(id) {
    const confirmDelete = confirm('Biztosan törlöd?');
    if (confirmDelete) {
        fetch(`https://nodejs.sulla.hu/data/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Sikeres törlés");
            } else {
                alert('Hiba történt a törlés során:', response.status);
            }
        })
    }
}

//PUT
function modifyAccommodation(id) {
    const newName = prompt('New name:');
    const newPrice = prompt('New price:');
    const newId = prompt('New ID:');
    const newLocation = prompt('New location:');
    const newMinNights = prompt('New nights:');
    const newHostname = prompt('New hostname:');
    const updatedAccommodation = {
        name: newName,
        price: newPrice,
        id: newId,
        location: newLocation,
        min_nights: newMinNights,
        hostname: newHostname
    };

    fetch(`https://nodejs.sulla.hu/data/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAccommodation)
    })
    .then(response => {
        if (response.ok) {
            alert("Sikeres módosítás");
        } else {
            alert('Hiba történt a módosítás során:', response.status);
        }
    })
}

//TÖBBI ADAT
function TobbAdat(id) {
    fetch(`https://www.nodejs.sulla.hu/data/${id}`)
    .then(response => response.json())
    .then(data => {
        alert(`Name: ${data.name}\nLocation: ${data.location}\nPrice: ${data.price}\nMinimum nights: ${data.minimum_nights}\nHostname: ${data.hostname}`);
    })
}
