const SUPABASE_URL = "https://vizujiwztwdydalzjben.supabase.co";
const SUPABASE_KEY = "sb_publishable_YDn4e0TJNmKGF1FugH5ROA_IYIvDeEP";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
input.multiple = true;

const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", () => {
    input.click();
});

input.addEventListener("change", async () => {

    const files = [...input.files];

    if (!files.length) return;

    for (const file of files) {

        const fileName = Date.now() + "-" + file.name;

        const { error } = await supabase.storage
            .from("Fotos boda Angel y Silvia")
            .upload(fileName, file);

        if (error) {
            alert("❌ Error al subir: " + error.message);
            continue;
        }

        const { data } = supabase.storage
            .from("Fotos boda Angel y Silvia")
            .getPublicUrl(fileName);

        await supabase
            .from("fotos")
            .insert({
                nombre: file.name,
                url: data.publicUrl
            });
    }

    alert("✅ Fotos subidas correctamente");
});
