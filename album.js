const SUPABASE_URL = "https://vizujiwztwdydalzjben.supabase.co";
const SUPABASE_KEY = "sb_publishable_YDn4e0TJNmKGF1FugH5ROA_IYIvDeEP";

const cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let modoSeleccion = false;
let fotosSeleccionadas = [];
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
const contenedor = document.createElement("div");
contenedor.className = "foto";
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

       contenedor.appendChild(img);

if(modoSeleccion){

    const marca = document.createElement("div");

    marca.className = "marca";

    marca.textContent = "○";

    marca.onclick = (e) => {

        e.stopPropagation();

        if(fotosSeleccionadas.includes(foto.name)){

            fotosSeleccionadas =
                fotosSeleccionadas.filter(f=>f!==foto.name);

            marca.textContent="○";
            marca.classList.remove("seleccionada");

        }else{

            fotosSeleccionadas.push(foto.name);

            marca.textContent="✓";
            marca.classList.add("seleccionada");

        }
const barra = document.getElementById("barraSeleccion");
const contador = document.getElementById("cantidadSeleccionadas");

contador.textContent =
    fotosSeleccionadas.length +
    (fotosSeleccionadas.length == 1
        ? " foto seleccionada"
        : " fotos seleccionadas");

if(fotosSeleccionadas.length > 0){

    barra.classList.remove("oculto");

}else{

    barra.classList.add("oculto");

}
    };

    contenedor.appendChild(marca);

}

galeria.appendChild(contenedor);

    });

}

cargarFotos();
setInterval(cargarFotos, 10000);
document.getElementById("modoSeleccion").onclick = () => {

    modoSeleccion = !modoSeleccion;

    fotosSeleccionadas = [];

    if(modoSeleccion){

        document.getElementById("modoSeleccion").textContent =
        "❌ Cancelar selección";

    }else{

        document.getElementById("modoSeleccion").textContent =
        "☑ Seleccionar fotos";

    }

    cargarFotos();

};
document.getElementById("cerrar").onclick = () => {

    document.getElementById("visor").classList.add("oculto");

};
