let usuarios = [new Funcionario(1, "Admin", "Gerente")];

document.getElementById("loginButton").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  verifyLogin(username, password)
    .then((isAdmin) => {
      if (isAdmin) {
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("loginForm").reset();
      } else {
        alert("Usuário ou senha incorretos.");
      }
    })
    .catch((err) => {
      console.error("Erro ao verificar login:", err);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
});

async function verifyLogin(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM usuarios WHERE nome = ? AND senha = ?",
      [username, password],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row !== undefined);
        }
      },
    );
  });
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
