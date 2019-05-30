// Instanciando modelos/schemas
const { users, profiles } = require('../datasource/db')

module.exports = {
  // Função de Hora atual
  hourNow() {
  	return new Date
  },
  // Função usuario logado
  userLogged(data) {
  	// imprimir dados 
  	console.log(data)
  	return {
  	  id: 1,
  	  name: 'Aníbal Henrique',
  	  email: 'annibalhsouza@gmail.com',
  	  age: 26,
  	  salary_real: 4800.50,
  	  vip: true
  	}
  },
  // Função retorna produto em destaque
  productSpotlight() {
  	return {
  	  name: 'Notebook Gamer',
  	  price: 5800.60,
  	  discount: 0.5
  	}
  },

  numbersMegaSena() {
  	// Criação de métodos que recebe como parâmetros elementos na função crescente & descrescente
  	const crescente = (a, b) => a-b
  	const decrescente = (b, a) => b-a
  	// retornando array/vetor de 6 elementos e atribuindo com valores mapeados por uma função randômica e classificando de forma crescente 
  	return Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(crescente)
  },

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