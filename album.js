const SUPABASE_URL = "https://vizujiwztwdydalzjben.supabase.co";
const SUPABASE_KEY = "sb_publishable_YDn4e0TJNmKGF1FugH5ROA_IYIvDeEP";

const cliente = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function cargarFotos(){

    const { data, error } = await cliente.storage
        .from("Fotos boda Angel y Silvia")
        .list();

    if(error){
        console.log(error);
        return;
    }

    const galeria = document.getElementById("galeria");

    galeria.innerHTML="";

    data.forEach(foto=>{

        const { data:url } = cliente.storage
            .from("Fotos boda Angel y Silvia")
            .getPublicUrl(foto.name);

        const img=document.createElement("img");

       console.log(url.publicUrl);

img.src = url.publicUrl;

        galeria.appendChild(img);

    });

}

cargarFotos();
