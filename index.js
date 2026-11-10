const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
 
const app = express();
app.use(express.json());
 
const client = new MongoClient(process.env.NARIN);
const lapiseiras = client.db('lapisari').collection('lapiseiras');
 
const PORT = process.env.PORT || 3000;
 
// Rota inicial, útil para conferir se a API está no ar
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Lapiseiras no ar! Acesse /lapiseiras' });
});
 
// CREATE - cadastra uma nova lapiseira
app.post('/lapiseiras', async (req, res) => {
    const novaLapiseira = await lapiseiras.insertOne(req.body);
    res.status(201).json(novaLapiseira);
});
 
// READ - lista todas as lapiseiras
app.get('/lapiseiras', async (req, res) => {
    const lista = await lapiseiras.find().toArray();
    res.json(lista);
});
 
// READ - busca uma lapiseira pelo id
app.get('/lapiseiras/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ erro: 'ID inválido' });
    }
    const lapiseira = await lapiseiras.findOne({ _id: new ObjectId(req.params.id) });
    if (!lapiseira) {
        return res.status(404).json({ erro: 'Lapiseira não encontrada' });
    }
    res.json(lapiseira);
});
 
// UPDATE - atualiza os dados de uma lapiseira
app.put('/lapiseiras/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ erro: 'ID inválido' });
    }
    const lapiseiraAtualizada = await lapiseiras.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json(lapiseiraAtualizada);
});
 
// DELETE - exclui uma lapiseira
app.delete('/lapiseiras/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ erro: 'ID inválido' });
    }
    const lapiseiraExcluida = await lapiseiras.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(lapiseiraExcluida);
});
 
client.connect().then(() => {
    console.log('Conectado ao MongoDB com sucesso');
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
}).catch((erro) => console.log('ERRO', erro.message));