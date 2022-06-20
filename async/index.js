const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=fff1d4c4-91b9-4bf7-b587-b88061086c4e";

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=fff1d4c4-91b9-4bf7-b587-b88061086c4e";

const spanError =  document.getElementById("Error");

async function getRandomCats () {
        const res = await fetch(API_URL_RANDOM);
        const data = await res.json();
        if (res.status !== 200) {
                spanError.innerHTML = "Hubo un error: " + res.status;
        }
        else{
                const img1 = document.getElementById("img1");
                const img2 = document.getElementById("img2");
                const img3 = document.getElementById("img3");

                const btn1 = document.getElementById("btn1");
                const btn2 = document.getElementById("btn2");
                const btn3 = document.getElementById("btn3");

                img1.src = data[0].url;
                img2.src = data[1].url;
                img3.src = data[2].url;

                btn1.onclick = () => saveFavoriteCat(data[0].id);
                btn2.onclick = () => saveFavoriteCat(data[1].id);
                btn3.onclick = () => saveFavoriteCat(data[2].id);
        }
}

async function getFavoritesCats() {
        const res = await fetch(API_URL_FAVORITES);
        const data = await res.json();
        if (res.status !== 200) {
                spanError.innerHTML = "Hubo un error: " + res.status;
        }else{
                data.forEach(cat =>{
                        const section = document.getElementById("favorites-cats");
                        const article =  document.createElement("article");
                        const img = document.createElement("img");
                        const btn = document.createElement("button");
                        const btnText = document.createTextNode("keep cat off favourites");
                        btn.appendChild(btnText);
                        img.src = cat.image.url;
                        article.appendChild(img);
                        article.appendChild(btn);
                        section.appendChild(article);

                })
        }
}

async function saveFavoriteCat(id){
        const res = await fetch(API_URL_FAVORITES, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        image_id: id
                })
        })
        const data = await res.json();

        console.log("saveFavoriteCats", data);
        if(res.status !== 200){
                spanError.innerHTML = "You got an error " + res.status +  data.message;
        }
}

getRandomCats(API_URL_RANDOM);
getFavoritesCats(API_URL_FAVORITES);
