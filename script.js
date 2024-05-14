fetch("https://www.nodejs.sulla.hu/data")
.then(function (datas) {
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
                        <button class="btn btn-dark" style="width: 100%;">Törlés</button>
                        <button class="btn btn-dark mt-1" style="width: 100%;">Modosítás</button>
                        <button class="btn btn-dark mt-1" style="width: 100%;">Részletek</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    }
});

