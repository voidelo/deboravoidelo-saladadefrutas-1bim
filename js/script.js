// Página de personalização: salva os dados
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

    localStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "pagamento.html";
  });
}

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

    document.getElementById("resumoPedido").innerHTML = `
      <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
      <p><strong>Tamanho:</strong> ${pedido.tamanho}ml</p>
      <p><strong>Frutas:</strong> ${pedido.frutas.length > 0 ? pedido.frutas.join(", ") : "Nenhuma"}</p>
      <p><strong>Total:</strong> R$ ${precoTotal.toFixed(2)}</p>
    `;
  } else {
    document.getElementById("resumoPedido").innerHTML = "<p>Nenhum pedido encontrado.</p>";
  }
}
