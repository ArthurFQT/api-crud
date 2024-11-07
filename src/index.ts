import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Interface do item
interface Item {
  id: number; // ID sequencial
  task: string;
  uid: string;
}

let itens: Item[] = [];
let nextId = 1; // Variável para armazenar o próximo ID disponível

// Rota de criação (Create)
app.post("/itens", (req: Request, res: Response) => {
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "O campo 'task' é obrigatório" });
  }

  const novoItem: Item = { id: nextId++, task, uid: uuidv4() }; // Atribui o próximo ID e incrementa
  itens.push(novoItem);
  res.status(201).json(novoItem);
});

// Rota de leitura (Read)
app.get("/itens", (req: Request, res: Response) => {
  res.json(itens);
});

// Rota de atualização (Update)
app.put("/itens/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "O campo 'task' é obrigatório" });
  }

  const item = itens.find((i) => i.id === id);
  if (item) {
    item.task = task;
    res.json(item);
  } else {
    res.status(404).json({ error: "Item não encontrado" });
  }
});

// Rota de exclusão (Delete)
app.delete("/itens/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = itens.findIndex((i) => i.id === id);

  if (index !== -1) {
    const itemRemovido = itens.splice(index, 1);
    res.status(200).json({ message: "Item removido com sucesso", item: itemRemovido });
  } else {
    res.status(404).json({ error: "Item não encontrado" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
