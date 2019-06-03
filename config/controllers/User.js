// Instanciando perfis
const { profiles } = require('../datasource/db')

module.exports = {
  // Função para filtrar um perfil de usuário
  profile(user) {
  	const self = profiles.filter(p => p.id === user.profile_id)
  	return self ? self[0] : null
  }	
}