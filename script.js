document.querySelector("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const nome = e.target[0].value;
  const data = e.target[1].value;
  const formato = e.target[2].value;
  const premio = e.target[3].value;

  const { error } = await supabase
    .from("torneios")
    .insert([{ nome, data, formato, premio }]);

  if (error) {
    alert("Erro ao salvar!");
    console.log(error);
  } else {
    alert("🚀 Torneio salvo!");
    carregarTorneios();
  }
});

async function carregarTorneios() {
  const { data, error } = await supabase
    .from("torneios")
    .select("*");

  const grid = document.querySelector(".grid");
  grid.innerHTML = "";

  data.forEach(t => {
    grid.innerHTML += `
      <div class="card">
        <h3>${t.nome}</h3>
        <p>📅 ${t.data}</p>
        <p>💰 ${t.premio}</p>
      </div>
    `;
  });
}

carregarTorneios();
