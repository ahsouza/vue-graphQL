// Instanciando 'apollo-server' e tag literal 'gql' para escrever consultas de forma simples
// Instanciando módulo de importação e exportação de Schemas graphQL
const 
  { ApolloServer, gql } = require('apollo-server'),
  { Schema } = require('graphql-import'),
  controllers = require('./config/controllers'),
  // Atribuindo caminho dos schemas graphQL
  schemaPath = './config/models/index.graphql'

// Criando objeto para servir a aplicação com nossos controllers e modelos de dados
const server = new ApolloServer({
  typeDefs: Schema(schemaPath),
  controllers
})