const db = new Sqlite.Database(":memory:"); // Banco em memória, altere conforme necessário

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT)",
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, contato TEXT)",
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS transportadoras (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, placa TEXT)",
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, descricao TEXT, quantidade INTEGER)",
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS funcionarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cargo TEXT)",
  );

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
