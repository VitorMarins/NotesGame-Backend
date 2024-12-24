const mongoose = require('mongoose');

const JogosSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    imagem: { type: String, required: true },
    descricao: { type: String, required: true },
    status: { type: String, required: true },
    categoria: { type: String, required: true },
    plataforma: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
});

module.exports = mongoose.model('Jogos', JogosSchema);