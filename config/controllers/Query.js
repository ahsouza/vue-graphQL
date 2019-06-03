// Instanciando modelos/schemas
const { users, profiles } = require('../datasource/db')

module.exports = {
  users() {
  	return users
  },

  user(_, {id}) {
  	// Procurando usuário instanciado por '../datasource/db' e verificando se confere os "id's" passados pelo parâmetro
  	const self = users.filter(u => u.id === id)
  	// Caso encontre retorne o usuário, caso não encontre retorno será vazio
  	return self ? self[0] : null
  },

  profiles() {
  	return profiles
  },

  profile(_, {id}) {
  	// Procurando profile instanciado por '../datasource/db' e verificando se confere os "id's" passados pelo parâmetro
    const self = profiles.filter(p => p.id === id)
    // Caso encontre retorne o profile, caso não encontre retorno será vazio
    return self ? self[0] : null
  }
}