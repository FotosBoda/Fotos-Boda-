document.addEventListener("DOMContentLoaded", () => {

    const botonSubir = document.querySelector("#subirFotos");
    const botonAlbum = document.querySelector("#verAlbum");

    if (botonSubir) {
        botonSubir.addEventListener("click", () => {
            alert("Próximamente podrás subir tus fotos 📸");
        });
    }

    if (botonAlbum) {
        botonAlbum.addEventListener("click", () => {
            alert("Próximamente podrás ver el álbum 🖼️");
        });
    }

});
