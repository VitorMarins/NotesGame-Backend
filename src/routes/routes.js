const usuarioRoutes = require('./usuario.routes');
const authRoutes = require('./auth.routes');
const jogosRoutes = require('./jogos.routes');

/**
 * Configura as rotas do aplicativo.
 * @param {Object} app - Aplicativo Express
 */
const routes = (app) => {
    app.use('/api/usuarios', usuarioRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/jogos', jogosRoutes);
};

module.exports = routes;
