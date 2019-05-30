// Instanciando perfis
const { profiles } = require('../datasource/db')

module.exports = {
  // Função para retornar salário do usuário
  salary(user) {
  	return user.salary_real
  },
  // Função para filtrar um perfil de usuário
  profile(user) {
  	const self = profiles.filter(p => p.id === user.profile_id)
  }	
}