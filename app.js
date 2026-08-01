const SUPABASE_URL = "https://vizujiwztwdydalzjben.supabase.co";
const SUPABASE_KEY = "sb_publishable_YDn4e0TJNmKGF1FugH5ROA_IYIvDeEP";

const cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

        alert("✅ Foto subida correctamente");
    };

    input.click();

});
document.getElementById("verAlbum").addEventListener("click", () => {
    window.location.href = "album.html";
});
