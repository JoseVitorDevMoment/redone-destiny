const db = new Sqlite.Database(":memory:"); // Banco em memória, altere conforme necessário

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT)",
  );

  // Inserir usuário administrador
  db.get("SELECT * FROM usuarios WHERE nome = 'admin'", [], (err, row) => {
    if (!row) {
      db.run(
        "INSERT INTO usuarios (nome, senha) VALUES (?, ?)",
        ["admin", "admin"],
        function (err) {
          if (err) {
            console.error("Erro ao inserir usuário administrador:", err);
          } else {
            console.log("Usuário administrador adicionado com sucesso!");
          }
        },
      );
    }
  });

  // Exemplo de inserção
  db.run(
    "INSERT INTO clientes (nome, email) VALUES ('Cliente A', 'cliente_a@example.com')",
  );
});

function getAllProducts() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Inicializar a lista de produtos
getAllProducts()
  .then((products) => {
    const tableBody = document
      .getElementById("productTable")
      .getElementsByTagName("tbody")[0];
    products.forEach((product) => {
      tableBody.innerHTML += `
      <tr>
        <td>${product.id}</td>
        <td>${product.nome}</td>
        <td>${product.descricao}</td>
        <td>${product.quantidade}</td>
        <td><button onclick="editProduct(${product.id})">Editar</button> <button onclick="deleteProduct(${product.id})">Excluir</button></td>
      </tr>
    `;
    });
  })
  .catch((err) => {
    console.error("Erro ao carregar produtos:", err);
  });
