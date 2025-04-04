const URL = "https://chadefralda-dzr5.onrender.com";

async function carregarLista() {
  try {
    const resposta = await fetch(URL);
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.log(error);
  }
}

async function assinarItem(id, nome) {
  try {
    const resposta = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, nome }),
    });
    const texto = await resposta.text();
    if (resposta.ok) {
      alert(texto);
    } else {
      alert(texto);
    }
  } catch (error) {
    console.log(error);
  }
}

async function removerAssinatura(id) {
  try {
    const resposta = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const texto = await resposta.text();
    if (resposta.ok) {
      alert(texto);
    } else {
      alert(texto);
    }
  } catch (error) {
    console.log(error);
  }
}

carregarLista().then((dados) => {
  let table = document.getElementsByClassName("table");
  let tbody = document.createElement("tbody");
  dados.forEach((linha) => {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdItem = document.createElement("td");
    let tdNome = document.createElement("td");
    tdId.className = "id-col";
    tdItem.className = "item-col";
    tdNome.className = "nome-col";

    tdId.innerText = linha.id;
    tdItem.innerText = linha.item;
    if (linha.nome === "") {
      let button = document.createElement("button");
      button.innerText = "assinar";
      button.onclick = function () {
        let nome = prompt("Informe seu nome:");
        if (nome) {
          assinarItem(linha.id, nome);
        }
      };
      tdNome.appendChild(button);
    } else {
      tdNome.innerText = linha.nome;
    }

    tr.appendChild(tdId);
    tr.appendChild(tdItem);
    tr.appendChild(tdNome);
    tbody.appendChild(tr);
  });
  table[0].appendChild(tbody);
});
