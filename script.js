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
                        <h5 class="card-title">Hostname:  ${datas[i].hostname}</h5>
                        <h5 class="card-title">Location:  ${datas[i].location}</h5>
                        <h5 class="card-title">Price: ${datas[i].price}</h5>
                        <h5 class="card-title">Minimum Nights:  ${datas[i].minimum_nights}</h5>
                        <button class="btn btn-dark" style="width: 100%;" onclick ="deleteAccommodation()">Törlés</button>
                        <button class="btn btn-dark mt-1" style="width: 100%;">Modosítás</button>
                        <button class="btn btn-dark mt-1" style="width: 100%;">Részletek</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    }
});

//POST
function addAccommodation() {
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
        hostname: hostname
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
        fetch(`https://www.nodejs.sulla.hu/data/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
        getAccommodations();
        }
    });
    }   
} 


