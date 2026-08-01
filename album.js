const SUPABASE_URL = "https://vizujiwztwdydalzjben.supabase.co";
const SUPABASE_KEY = "sb_publishable_YDn4e0TJNmKGF1FugH5ROA_IYIvDeEP";

const cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarFotos(){

    const { data, error } = await cliente.storage
        .from("fotos-boda")
        .list();

    if(error){
        console.log(error);
        return;
    }

    const galeria = document.getElementById("galeria");
const contador = document.getElementById("contador");
    galeria.innerHTML="";
contador.textContent = `📷 ${data.length} fotos compartidas`;
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

data.forEach(foto => {

        const { data:url } = cliente.storage
            .from("fotos-boda")
            .getPublicUrl(foto.name);

        const img=document.createElement("img");

       console.log(url.publicUrl);
img.onclick = () => {

    document.getElementById("visor").classList.remove("oculto");

    document.getElementById("imagenGrande").src = url.publicUrl;
const botonDescargar = document.getElementById("descargar");

botonDescargar.onclick = async () => {

    const respuesta = await fetch(url.publicUrl);
    const blob = await respuesta.blob();

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = foto.name;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(enlace.href);
};
};    
    
img.src = url.publicUrl;
img.onerror = () => console.log("ERROR AL CARGAR:", url.publicUrl);

        galeria.appendChild(img);

    });

}

cargarFotos();
document.getElementById("cerrar").onclick = () => {

    document.getElementById("visor").classList.add("oculto");

};
