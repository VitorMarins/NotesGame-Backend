const mongoose = require('mongoose');

const JogosSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    imagem: { type: String, required: true },
    status: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
});

module.exports = mongoose.model('Jogos', JogosSchema);