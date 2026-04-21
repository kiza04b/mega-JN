// LOGIN
async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google'
  });
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// MOSTRAR USUÁRIO
async function getUser() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    document.getElementById("userInfo").innerText =
      "Logado como: " + data.user.email;
  } else {
    document.getElementById("userInfo").innerText =
      "Não logado";
  }
}

// SALVAR TORNEIO
document.querySelector("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const nome = e.target[0].value;
  const dataT = e.target[1].value;
  const formato = e.target[2].value;
  const premio = e.target[3].value;

  const { error } = await supabase.from("torneios").insert([{
    nome,
    data: dataT,
    formato,
    premio,
    user_id: user?.id || "anon"
  }]);

  if (error) {
    alert("Erro ao salvar!");
    console.log(error);
  } else {
    alert("🚀 Torneio salvo!");
    carregarTorneios();
  }
});

// LISTAR TORNEIOS
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

// INICIAR
getUser();
carregarTorneios();
