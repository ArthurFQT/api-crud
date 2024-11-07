import express, { Request, Response } from "express";
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota principal
app.get("/", (req: Request, res: Response) => {
  res.send("Olá, Servidor rodando com Node.js");
});

// Interface do item
interface Item {
  id: number;
  task: string;  // Alterado para 'task' ao invés de 'nome'
}

let itens: Item[] = [];

// Rota de criação (Create)
app.post("/itens", (req: Request, res: Response) => {
  const { task } = req.body;  // Alterado para 'task'
  const novoItem: Item = { id: itens.length + 1, task };  // Alterado para 'task'
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
  const { task } = req.body;  // Alterado para 'task'
  const item = itens.find((i) => i.id == parseInt(id));
  if (item) {
    item.task = task;  // Alterado para 'task'
    res.json(item);
  } else {
    res.status(404).json({ error: "Item não encontrado" });
  }
});

// Rota de exclusão (Delete)
app.delete("/itens/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = itens.findIndex((i) => i.id == parseInt(id));
  if (index !== -1) {
    const itemRemovido = itens.splice(index, 1);
    res.json(itemRemovido);
  } else {
    res.status(404).json({ error: "Item não encontrado" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
