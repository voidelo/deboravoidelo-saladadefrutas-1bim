// Página de personalização: salva os dados
// Detecção do envio do formulário
if (document.getElementById("formPedido")) {
  document.getElementById("formPedido").addEventListener("submit", function (e) {
    e.preventDefault();

    const tamanho = document.getElementById("tamanho").value;
    const quantidade = document.getElementById("quantidade").value;

    const frutasSelecionadas = Array.from(document.querySelectorAll('input[name="fruta"]:checked'))
      .map(el => el.value);

    const pedido = {
      tamanho,
      quantidade: parseInt(quantidade),
      frutas: frutasSelecionadas
    };

    // Salva os dados no localStorage
    localStorage.setItem("pedido", JSON.stringify(pedido));

    // Redireciona para a página de pagamento
    window.location.href = "pagamento.html";
  });
}

// Detecta a seleção da última fruta e muda o fundo
const frutasCheckbox = document.querySelectorAll('input[name="fruta"]');
frutasCheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    // Pega todas as frutas selecionadas
    const frutasSelecionadas = Array.from(document.querySelectorAll('input[name="fruta"]:checked')).map(checkbox => checkbox.value);

    // Se houver alguma fruta selecionada, pega a última da lista
    if (frutasSelecionadas.length > 0) {
      const ultimaFruta = frutasSelecionadas[frutasSelecionadas.length - 1];

      // Aplica o fundo da última fruta selecionada
      switch (ultimaFruta) {
        case "Manga":
          document.body.style.backgroundImage = "url('./../imagens/manga.jpg')";
          break;
        case "Abacaxi":
          document.body.style.backgroundImage = "url('./../imagens/abacaxi.webp')";
          break;
        case "Banana":
          document.body.style.backgroundImage = "url('./../imagens/banana.avif')";
          break;
        case "Kiwi":
          document.body.style.backgroundImage = "url('./../imagens/kiwi.webp')";
          break;
        case "Morango":
          document.body.style.backgroundImage = "url('./../imagens/morango.jpg')";
          break;
        default:
          document.body.style.backgroundImage = 'none';
          break;
      }

      document.body.style.backgroundSize = 'cover'; // Ajuste o tamanho da imagem de fundo
    } else {
      document.body.style.backgroundImage = 'none'; // Se não houver nenhuma fruta selecionada
    }
  });
});

// Página de pagamento: carrega e exibe o pedido
if (window.location.pathname.includes("pagamento.html")) {
  const pedido = JSON.parse(localStorage.getItem("pedido"));

  if (pedido) {
    const precos = {
      "200": 10,
      "300": 15,
      "500": 20
    };

    const precoTotal = precos[pedido.tamanho] * pedido.quantidade;

    // Exibir apenas o nome das frutas, sem as imagens
    let frutasHtml = pedido.frutas.filter(fruta => fruta !== "Morango").map(fruta => {
      return `<p>${fruta}</p>`;  // Mostra apenas o nome da fruta
    }).join('');  // Adiciona os nomes das frutas no resumo do pedido

    document.getElementById("resumoPedido").innerHTML = `
      <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
      <p><strong>Tamanho:</strong> ${pedido.tamanho}ml</p>
      <p><strong>Frutas:</strong></p>
      <div style="display: flex; flex-wrap: wrap;">${frutasHtml}</div>
      <p><strong>Total:</strong> R$ ${precoTotal.toFixed(2)}</p>
    `;
  } else {
    document.getElementById("resumoPedido").innerHTML = "<p>Nenhum pedido encontrado.</p>";
  }
}

// Carregar os dados do localStorage e preencher a seção de resumo na página de personalização
window.addEventListener('DOMContentLoaded', () => {
  const pedido = JSON.parse(localStorage.getItem('pedido'));
  const resumo = document.getElementById('resumoPedido');
  
  if (pedido) {
    const precos = {
      "200": 10,
      "300": 15,
      "500": 20
    };

    const precoTotal = precos[pedido.tamanho] * pedido.quantidade;

    // Exibe o histórico de frutas e preços no resumo
    resumo.innerHTML = `
      <h2>Detalhes do Pedido</h2>
      <p><strong>Tamanho:</strong> ${pedido.tamanho}ml</p>
      <p><strong>Frutas:</strong> ${pedido.frutas.join(', ')}</p>
      <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
      <p><strong>Total:</strong> R$ ${precoTotal.toFixed(2)}</p>
    `;
  } else {
    resumo.innerHTML = `<p>Nenhum pedido encontrado. Volte e personalize sua salada.</p>`;
  }
});

// Função de pagamento
function finalizarPagamento() {
  window.location.href = 'qrcode.html';
}

// Função de voltar para a página de pagamento
function voltar() {
  window.location.href = 'pagamento.html';
}
