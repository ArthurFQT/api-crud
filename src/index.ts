import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(cors()); // Permitir CORS para facilitar a comunicação com o frontend
app.use(express.json()); // Middleware para interpretar JSON

// Rota principal
app.get("/", (req: Request, res: Response) => {
  res.send("Olá, Servidor rodando com Node.js");
});

// Interface do item, agora com completed
interface Item {
  uid: number; // Agora usamos uma string para ID (uuid)
  task: string;
  completed: boolean; // Campo completed
}

let itens: Item[] = [];

let contadorId = 1;

// Rota de criação (Create)
app.post("/itens", (req: Request, res: Response) => {
  const { task, completed = false } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "O campo 'task' é obrigatório" });
  }

  const novoItem: Item = { uid: Number(contadorId++), task, completed }; // Usando o contador
  itens.push(novoItem);
  res.status(201).json(novoItem);
});

// Rota de leitura (Read)
app.get("/itens", (req: Request, res: Response) => {
  res.json(itens);
});

// Rota de atualização (Update)
app.put("/itens/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { task, completed } = req.body; // Agora também podemos alterar 'completed'

  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "O campo 'task' é obrigatório" });
  }

  const item = itens.find((i) => i.uid === Number(id));
  if (item) {
    item.task = task;
    item.completed = completed !== undefined ? completed : item.completed; // Atualiza 'completed' se fornecido
    res.json(item);
  } else {
    res.status(404).json({ error: "Item não encontrado" });
  }
});

// Rota de exclusão (Delete)
app.delete("/itens/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = itens.findIndex((i) => i.uid === Number(id));

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
