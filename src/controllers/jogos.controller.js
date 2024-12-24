const Jogos = require('../models/jogos.model');

// Get all games
exports.getJogo = async (req, res) => {
    try {
        const jogos = await Jogos.find();
        res.status(200).send(jogos);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single game by ID
exports.getJogoById = async (req, res) => {
    try {
        const jogo = await Jogos.findById(req.params.id);
        if (!jogo) {
            return res.status(404).send({ message: 'Jogo não encontrado' });
        }
        res.status(200).send(jogo);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getJogobyUsuario = async (req, res) => {
    try {
        const jogos = await Jogos.find( { usuario: req.params.id } );
        res.status(200).send(jogos);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createJogo = async (req, res) => {
    const { nome, imagem, descricao, status, categoria, plataforma, usuario } = req.body;
    try {
      const jogo = new Jogos({
        nome,
        imagem,
        descricao,
        status,
        categoria,
        plataforma,
        usuario
      });
      await jogo.save();
      res.status(201).json(jogo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Update a game by ID
exports.updateJogo = async (req, res) => {
    try {
        const jogo = await Jogos.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!jogo) {
            return res.status(404).send({ message: 'Jogo não encontrado' });
        }
        res.status(200).send(jogo);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a game by ID
exports.deleteJogo = async (req, res) => {
    try {
        const jogo = await Jogos.findByIdAndDelete(req.params.id);
        if (!jogo) {
            return res.status(404).send({ message: 'Jogo não encontrado' });
        }
        res.status(200).send({ message: 'Jogo deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error);
    }
};