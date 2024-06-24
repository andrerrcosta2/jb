import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import orderRoutes from './route/order.route.js';

config();
// console.log("\n\nENVIRONMENT:", process.env.NODE_ENV);
// console.log("\nMONGO_URL:", process.env.MONGO_URL, "\n\n");
const server = express();
const PORT = process.env.APP_PORT || 3000;

server.use(bodyParser.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://root:12345678@localhost:27017/";

// MongoDB
mongoose.connect(mongoUrl, {dbName: 'orderDB'})
  .then(() => console.log(`Conectado ao MongoDB: ${mongoUrl}`))
  .catch(err => console.error(`Erro de conexão com o MongoDB: ${mongoUrl}`, err));

// Rotas
server.use('/order', orderRoutes);

// Server
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const application = {
  server: server,
  dbConnection: mongoose.connection
}

export default application;
