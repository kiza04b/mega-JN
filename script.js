document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("🚀 Torneio publicado no Mega JN!");
});

function doar() {
  let valor = document.getElementById("valorDoacao").value;

  if (!valor) {
    alert("Digite um valor!");
    return;
  }

  alert("💰 Em breve sistema de doação real!");
}
