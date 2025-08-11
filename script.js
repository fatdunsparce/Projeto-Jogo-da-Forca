const palavras = [
  { palavra: "banana", dica: "Fruta amarela" },
  { palavra: "computador", dica: "Máquina de trabalho" },
  { palavra: "avião", dica: "Meio de transporte aéreo" },
  { palavra: "praia", dica: "Lugar com areia e mar" },
  { palavra: "livro", dica: "Objeto de leitura" },
  { palavra: "Tartaruga", dica: "Um tipo de pet" },
  { palavra: "Tubarão", dica: "Animal marinho" }
];

let palavraEscolhida;
let palavraNormalizada; // versão sem acento para comparação
let dica;
let letrasCertas = [];
let letrasErradas = [];
let tentativas = 6;

// Função para remover acentos
function removerAcentos(texto) {
  return texto
    .normalize("NFD") // separa letra e acento
    .replace(/[\u0300-\u036f]/g, ""); // remove marcas diacríticas
}

function escolherPalavra() {
  const item = palavras[Math.floor(Math.random() * palavras.length)];
  palavraEscolhida = item.palavra.toLowerCase();
  palavraNormalizada = removerAcentos(palavraEscolhida); // nova versão sem acento
  dica = item.dica;
  document.getElementById("dicaTexto").innerText = dica;
  atualizarPalavra();
}

function atualizarPalavra() {
  const container = document.getElementById("palavra-container");
  container.innerHTML = "";

  for (let letra of palavraEscolhida) {
    const span = document.createElement("span");
    span.textContent = letrasCertas.some(l => removerAcentos(l) === removerAcentos(letra))
      ? letra
      : "_";
    container.appendChild(span);
  }
}

function jogar() {
  const input = document.getElementById("letraInput");
  let letra = input.value.toLowerCase().trim();
  let letraNormalizada = removerAcentos(letra);

  if (!letra || letra.length !== 1 || !letra.match(/[a-zçáéíóúãõ]/i)) {
    alert("Digite uma letra válida.");
    return;
  }

  if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) {
    alert("Você já tentou essa letra.");
    return;
  }

  if (palavraNormalizada.includes(letraNormalizada)) {
    letrasCertas.push(letra);
  } else {
    letrasErradas.push(letra);
    tentativas--;
  }

  input.value = "";
  atualizarPalavra();
  atualizarStatus();
  verificarFimDeJogo();
}

function atualizarStatus() {
  document.getElementById("letras-erradas").textContent = letrasErradas.join(", ");
  document.getElementById("tentativas").textContent = tentativas;
}

function verificarFimDeJogo() {
  const mensagem = document.getElementById("mensagem");

  if (tentativas === 0) {
    mensagem.textContent = `Você perdeu! A palavra era "${palavraEscolhida}".`;
    desativarInput();
  }

  const palavraCompleta = palavraEscolhida
    .split("")
    .every(letra =>
      letrasCertas.some(l => removerAcentos(l) === removerAcentos(letra))
    );

  if (palavraCompleta) {
    mensagem.textContent = "Parabéns! Você acertou a palavra!";
    desativarInput();
  }
}

function desativarInput() {
  document.getElementById("letraInput").disabled = true;
}

function reiniciarJogo() {
  letrasCertas = [];
  letrasErradas = [];
  tentativas = 6;
  document.getElementById("letraInput").disabled = false;
  document.getElementById("mensagem").textContent = "";
  document.getElementById("letras-erradas").textContent = "";
  document.getElementById("tentativas").textContent = tentativas;
  escolherPalavra();
}

window.onload = escolherPalavra;