const express = require('express');
const {
    getJogo,
    getJogoById,
    getJogobyUsuario,
    createJogo,
    updateJogo,
    deleteJogo
} = require('../controllers/jogos.controller');
const authMiddleware = require('./../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jogos
 *   description: Operações relacionadas a jogos
 */

/**
 * @swagger
 * /api/jogos:
 *   get:
 *     summary: Retorna todos os jogos
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []  # Especifica que a autenticação é necessária
 *     responses:
 *       200:
 *         description: Lista de jogos
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, getJogo);

/**
 * @swagger
 * /api/jogos/{id}:
 *   get:
 *     summary: Retorna um jogo específico
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []  # Especifica que a autenticação é necessária
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do jogo a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *       404:
 *         description: Jogo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, getJogoById);

/**
 * @swagger
 * /api/jogos/usuario/{id}:
 *   get:
 *     summary: Retorna todos os jogos de um usuário
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []  # Especifica que a autenticação é necessária
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jogos encontrados
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/usuario/:id', authMiddleware, getJogobyUsuario);

/**
 * @swagger
 * /api/jogos:
 *   post:
 *     summary: Cria um novo jogo
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []  # Especifica que a autenticação é necessária
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do jogo
 *               imagem:
 *                 type: string
 *                 description: URL da imagem do jogo
 *               descricao:
 *                 type: string
 *                 description: Descrição do jogo
 *               status:
 *                 type: string
 *                 description: Status do jogo
 *               categoria:
 *                 type: string
 *                 description: Categoria do jogo
 *               plataforma:
 *                 type: string
 *                 description: Plataforma do jogo
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, createJogo);

/**
 * @swagger
 * /api/jogos/{id}:
 *   put:
 *     summary: Atualiza um jogo existente
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []  # Especifica que a autenticação é necessária
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do jogo a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do jogo
 *               imagem:
 *                 type: string
 *                 description: URL da imagem do jogo
 *               descricao:
 *                 type: string
 *                 description: Descrição do jogo
 *               status:
 *                 type: string
 *                 description: Status do jogo
 *               categoria:
 *                 type: string
 *                 description: Categoria do jogo
 *               plataforma:
 *                 type: string
 *                 description: Plataforma do jogo
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Jogo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, updateJogo);

/**
 * @swagger
 * /api/jogos/{id}:
 *   delete:
 *     summary: Deleta um jogo existente
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []  # Especifica que a autenticação é necessária
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do jogo a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jogo deletado com sucesso
 *       404:
 *         description: Jogo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, deleteJogo);

module.exports = router;
