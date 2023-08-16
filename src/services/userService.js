export const userService = {
  getUser,
}

async function getUser() {
  return Promise.resolve({
    name: 'Akiva Abramson',
    coins: 100,
    moves: [],
  })
}
