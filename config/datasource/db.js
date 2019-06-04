// Modelo para tipos de perfil do usuário
const profiles = [
  {id: 1, name: 'visitante'},
  {id: 2, name: 'administrador'}
]
// modelo para usuários
const users = [
  {
    id: 1,
    name: 'Clark Kent',
    email: 'superman@universe.com',
    age: 26,
    profile_id: 2,
    status: 'ACTIVE'
  },
  {
    id: 2,
    name: 'Diana Prince',
    email: 'wonderwoman@universe.com',
    age: 26,
    profile_id: 1,
    status: 'INACTIVE'
  },
  {
    id: 3,
    name: 'Bruce Wayne',
    email: 'batman@universe.com',
    age: 26,
    profile_id: 2,
    status: 'LOCKED'
  }
]

module.exports  = {users, profiles}