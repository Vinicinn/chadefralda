import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

function lerLista() {
  return fs.readFileSync("lista.json");
}
function salvarLista(lista) {
  fs.writeFileSync("lista.json", JSON.stringify(lista));
}

app.get("/", (req, res) => {
  console.log("get");
  res.send(lerLista());
});

app.post("/", (req, res) => {
  console.log("post");
  const { id, nome } = req.body;
  const lista = JSON.parse(lerLista());
  const item = lista.find((item) => item.id === id);
  if (item) {
    item.nome = nome;
    salvarLista(lista);
    res.status(200).send("Item assinado com sucesso!");
    console.log(`${nome} assinou ${item.item}`);
  } else {
    res.status(404).send("Item não encontrado!");
  }
});

app.delete("/", (req, res) => {
  console.log("delete");
  const { id } = req.body;
  const lista = JSON.parse(lerLista());
  const item = lista.find((item) => item.id === id);
  if (item) {
    item.nome = "";
    salvarLista(lista);
    res.status(200).send("Assinatura removida com sucesso!");
    console.log(`Assinatura de ${item.item} removida`);
  } else {
    res.status(404).send("Item não encontrado!");
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor rodando na porta 5000");
});
