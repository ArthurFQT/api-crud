"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Rota principal
app.get('/', (req, res) => {
    res.send('Olá, Servidor rodando com Node.js');
});
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
let itens = [];
// Rota de criação (Create)
app.post('/itens', (req, res) => {
    const { nome } = req.body;
    const novoItem = { id: itens.length + 1, nome };
    itens.push(novoItem);
    res.status(201).json(novoItem);
});
// Rota de leitura (Read)
app.get('/itens', (req, res) => {
    res.json(itens);
});
// Rota de atualização (Update)
app.put('/itens/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const item = itens.find((i) => i.id == parseInt(id));
    if (item) {
        item.nome = nome;
        res.json(item);
    }
    else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});
// Rota de exclusão (Delete)
app.delete('/itens/:id', (req, res) => {
    const { id } = req.params;
    const index = itens.findIndex((i) => i.id == parseInt(id));
    if (index !== -1) {
        const itemRemovido = itens.splice(index, 1);
        res.json(itemRemovido);
    }
    else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});
