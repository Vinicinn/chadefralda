import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgEAeATp9zhWUff-rK2LXDWjmo4gr6fPU",
  authDomain: "fir-back-test.firebaseapp.com",
  databaseURL: "https://fir-back-test-default-rtdb.firebaseio.com",
  projectId: "fir-back-test",
  storageBucket: "fir-back-test.appspot.com",
  messagingSenderId: "75117160680",
  appId: "1:75117160680:web:d399831e99225c79e7415d",
  measurementId: "G-QRHE0629LX",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

async function loadList() {
  try {
    const response = await get(child(dbRef, "lista"));
    if (response.exists()) {
      return response.val();
    }
  } catch (error) {
    console.log(error);
  }
}

async function signItem(id, nome) {
  try {
    const lista = await loadList();
    const item = lista.find((element) => element.id === id);
    if (item) {
      if (item.nome === "") {
        item.nome = nome;
        await set(ref(db, "lista/" + (id - 1)), item);
        alert("Item assinado com sucesso!");
      } else {
        alert("Item já assinado!");
      }
    } else {
      alert("Item não encontrado!");
    }
    document.location.reload(true);
  } catch (error) {
    console.log(error);
  }
}

async function unsignItem(id) {
  try {
    const list = await loadList();
    const item = list.find((element) => element.id === id);
    if (item) {
      item.nome = "";
      await set(ref(db, "lista/" + (id - 1)), item);
      alert("Assinatura removida com sucesso!");
    } else {
      alert("Item não encontrado!");
    }
    document.location.reload(true);
  } catch (error) {
    console.log(error);
  }
}

loadList().then((list) => {
  let table = document.getElementsByClassName("table");
  let tbody = document.createElement("tbody");
  list.forEach((element) => {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdItem = document.createElement("td");
    let tdNome = document.createElement("td");
    tdId.className = "id-col";
    tdItem.className = "item-col";
    tdNome.className = "nome-col";

    tdId.innerText = element.id;
    tdItem.innerText = element.item;
    if (element.nome === "") {
      let button = document.createElement("button");
      button.innerText = "assinar";
      button.onclick = function () {
        let nome = prompt("Informe seu nome:");
        if (nome) {
          signItem(element.id, nome);
        }
      };
      tdNome.appendChild(button);
    } else {
      tdNome.innerText = element.nome;
    }

    tr.appendChild(tdId);
    tr.appendChild(tdItem);
    tr.appendChild(tdNome);
    tbody.appendChild(tr);
  });
  table[0].appendChild(tbody);
});
