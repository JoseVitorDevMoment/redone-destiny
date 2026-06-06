let usuarios = [new Funcionario(1, "Admin", "Gerente")];

function login() {
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
}

function addProduto() {
  document.getElementById("productForm").style.display = "block";
}

function cancelForm() {
  document.getElementById("productForm").style.display = "none";
}

function saveProduct() {
  const nome = document.getElementById("prodNome").value;
  const descricao = document.getElementById("prodDesc").value;
  const quantidade = parseInt(document.getElementById("prodQuantidade").value);

  if (nome && descricao && !isNaN(quantidade)) {
    const produto = new Produto(Date.now(), nome, descricao, quantidade);
    document
      .getElementById("productTable")
      .getElementsByTagName("tbody")[0].innerHTML += `
      <tr>
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.descricao}</td>
        <td>${produto.quantidade}</td>
        <td><button onclick="editProduct(${produto.id})">Editar</button> <button onclick="deleteProduct(${produto.id})">Excluir</button></td>
      </tr>
    `;
    document.getElementById("productForm").reset();
    cancelForm();
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

function editProduct(id) {
  // Implementar edição de produto
}

function deleteProduct(id) {
  // Implementar exclusão de produto
}

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  saveProduct();
});
