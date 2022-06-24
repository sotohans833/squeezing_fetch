const api = axios.create({
        baseURL: "https://api.thecatapi.com/v1"
});
api.defaults.headers.common["x-api-key"] = "fff1d4c4-91b9-4bf7-b587-b88061086c4e";

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3";

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";

const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";



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
        const { data, status } = await api.get("/favourites")
        // const res = await fetch(API_URL_FAVORITES, {
        //         method: 'GET',
        //         headers: {
        //                 "x-api-key": "fff1d4c4-91b9-4bf7-b587-b88061086c4e",
        //         }
        // });
        // const data = await res.json();
        if (status !== 200) {
                spanError.innerHTML = "Hubo un error: " + status;
        }else{
                const section = document.getElementById("favorites-cats");
                section.innerHTML = "";

                data.forEach(cat =>{
                        const article =  document.createElement("article");
                        const img = document.createElement("img");
                        const btn = document.createElement("button");
                        const btnText = document.createTextNode("keep cat off favourites");
                        btn.appendChild(btnText);
                        img.src = cat.image.url;
                        btn.onclick = () => deleteFavoriteCat(cat.id);
                        article.appendChild(img);
                        article.appendChild(btn);
                        section.appendChild(article);

                })
        }
}

async function saveFavoriteCat(id){
        const { data, status} = await api.post("/favourites", {image_id: id});

        // const res = await fetch(API_URL_FAVORITES, {
        //         method: "POST",
        //         headers: {
        //                 "Content-Type": "application/json",
        //                 "x-api-key": "fff1d4c4-91b9-4bf7-b587-b88061086c4e",
        //         },
        //         body: JSON.stringify({
        //                 image_id: id
        //         })
        // })
        // const data = await res.json();

        console.log("saveFavoriteCats", data);
        if(status !== 200){
                spanError.innerHTML = "You got an error " + status +  data.message;
        }else{
                console.log("Cat saved successfully");
                getFavoritesCats();
        }
}

async function deleteFavoriteCat(id){
        const { data, status } = await api.delete(`/favourites/${id}`, {image_id: id})
        // const res = await fetch(API_URL_DELETE(id), {
        //         method: "DELETE",
        //         headers:{
        //         "x-api-key": "fff1d4c4-91b9-4bf7-b587-b88061086c4e",
        //         }
        // });
        // const data = await res.json();

        console.log("deleteFavoriteCat", data);
        if (status !== 200) {
                spanError.innerHTML = "You got an error " + status + data.message;
        }
        else{
                console.log("Cat deleted successfully");
                getFavoritesCats();
        }
}

async function uploadCatPhoto(){
        const form = document.getElementById("upload-form");
        const formData = new FormData(form);
        console.log(formData.get("file"), "antes de cargar");
        const res = await fetch(API_URL_UPLOAD,{
                method: "POST",
                headers: {
                        // "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
                        "x-api-key": "fff1d4c4-91b9-4bf7-b587-b88061086c4e",
                },
                //Si le pasamos una instancia de prototipo FormData, fetch automáticamente define el Content-Type como previamente lo definimos.
                body: formData,
        })
        const data = await res.json();
        if(res.status !== 201){
                spanError.innerHTML = "There was an error " + res.status + data.message;
                console.log({data});
        }else{
                const imageChosen = document.getElementById("upLoadedImage");
                imageChosen.src = data.url;
                console.log("successfully uploaded");
                console.log({data});
                console.log(data.url);
                saveFavoriteCat(data.id);
        }
}

getRandomCats(API_URL_RANDOM);
getFavoritesCats(API_URL_FAVORITES);
