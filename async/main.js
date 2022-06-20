const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=fff1d4c4-91b9-4bf7-b587-b88061086c4e";

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=3&api_key=fff1d4c4-91b9-4bf7-b587-b88061086c4e";

const spanError = document.getElementById("Error")

const getRandomCats =  async(API) => {
    try {
        const res = await fetch(API);
        const data = await res.json();
        console.log("random ", data);
        // const img = document.querySelector("img");
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const img3 = document.getElementById("img3");
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img1.alt = data[0].id;
        img2.alt = data[1].id;
        img3.alt = data[2].id;

    } catch (e) {
        spanError.innerHTML = "There was an error, please try again later. You got the next type of Error ----" + e;
        console.error(e);}
}

const getFavoritesCats =  async(API_URL) => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log("Favorites", data);
    } catch (e) {
        spanError.innerHTML = "There was an error " + e;
        console.error(e);}
}

getFavoritesCats(API_URL_FAVORITES);

getRandomCats(API_URL_RANDOM);

function reload() {
    return getRandomCats(API_URL_RANDOM);
}