const SUPABASE_URL = "https://vizujiwztwdydalzjben.supabase.co";
const SUPABASE_KEY = "sb_publishable_YDn4e0TJNmKGF1FugH5ROA_IYIvDeEP";

const cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ==========================
// CARGAR PORTADA
// ==========================

async function cargarPortada() {

    const contador = document.getElementById("numeroMomentos");
    const ultimas = document.getElementById("ultimasFotos");

    if (!contador || !ultimas) return;

    const { data, error } = await cliente.storage
        .from("fotos-boda")
        .list("", {
            limit: 1000,
            sortBy: {
                column: "created_at",
                order: "desc"
            }
        });

    if (error) {
        console.error(error);
        return;
    }

    // Contador
    contador.textContent = data.length;

    // Últimas fotos
    ultimas.innerHTML = "";

    data.slice(0, 6).forEach(foto => {

        const { data: url } = cliente.storage
            .from("fotos-boda")
            .getPublicUrl(foto.name);

        const img = document.createElement("img");
        img.src = url.publicUrl;
        img.loading = "lazy";

        ultimas.appendChild(img);

    });

}

// ==========================
// SUBIR FOTOS
// ==========================

document.getElementById("subirFotos").addEventListener("click", async () => {

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {

        const archivo = input.files[0];
        if (!archivo) return;

        const nombreArchivo = Date.now() + "_" + archivo.name;

        const { error } = await cliente.storage
            .from("fotos-boda")
            .upload(nombreArchivo, archivo);

        if (error) {
            alert("Error al subir la foto");
            console.error(error);
            return;
        }

        alert("✅ ¡Muchas gracias por compartir este momento con nosotros!");

        cargarPortada();

    };

    input.click();

});

// ==========================
// VER ÁLBUM
// ==========================

document.getElementById("verAlbum").addEventListener("click", () => {

    window.location.href = "album.html";

});

// ==========================
// INICIAR
// ==========================

cargarPortada();
