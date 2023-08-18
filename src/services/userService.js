
import { utilService } from './utilService.js'
import { storageService } from './storageService.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gFilterBy = { txt: '', minSpeed: 0 }

const usersArr = [
  {
    id: 'w101',
    name: 'Puki Ba',
    coins: 100,
    moves: []
  },
  {
    id: 'w102',
    name: 'Charli Blat',
    coins: 100,
    moves: []
  },
  {
    id: 'w103',
    name: 'Garga ga',
    coins: 100,
    moves: []
  },
]

_createUsers()

export const userService = {
  query,
  get,
  remove,
  save,
  getEmptyUser,
  getNextUserId,
  getFilterBy,
  setFilterBy,
  getUser,
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getEmptyMove,
}

async function getUser() {
  return Promise.resolve({
    name: 'Akiva Abramson',
    coins: 100,
    moves: [],
  })
}

function getUsers() {
  return storageService.query(USER_KEY)
}

async function login(userCred) {
  const users = await storageService.query(USER_KEY)
  const user = users.find(user => user.username === userCred.username)
  if (user) {
      return saveLocalUser(user)
  }
}

async function signup(userCred) {
  // userCred.score = 10000
  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  const user = await storageService.post(USER_KEY, userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
  user = {_id: user._id, name: user.name, imgUrl: user.imgUrl, coins: user.coins, moves:user.moves}
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function query() {
  let users = await storageService.query(USER_KEY)
  if (gFilterBy.txt) {
    const regex = new RegExp(gFilterBy.txt, 'i')
    users = users.filter((user) => regex.test(user.vendor))
  }
  if (gFilterBy.minSpeed) {
    users = users.filter((user) => user.maxSpeed >= gFilterBy.minSpeed)
  }
  return users
}

function get(userId) {
  return storageService.get(USER_KEY, userId)
}

function remove(userId) {
  return storageService.remove(USER_KEY, userId)
}

function save(user) {
  if (user._id) {
    return storageService.put(USER_KEY, user)
  } else {
    return storageService.post(USER_KEY, user)
  }
}

function getEmptyUser(name = '', coins = 100, moves = []) {
  return { name, coins, moves }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
  return gFilterBy
}

async function getNextUserId(userId) {
  const users = await storageService.query(USER_KEY)
  var idx = users.findIndex((user) => user.id === userId)
  if (idx === users.length - 1) idx = -1
  return users[idx + 1].id
}

function _createUsers() {
  let users = utilService.loadFromStorage(USER_KEY)
  if (!users || !users.length) {
    users = usersArr

    utilService.saveToStorage(USER_KEY, users)
  }
}

function _createUser(vendor, maxSpeed = 250) {
  const user = getEmptyUser(vendor, maxSpeed)
  user.id = utilService.makeId()
  return user
}

function getEmptyMove(){
  return {
    toId: '',
    to: '',
    at: Date.now(),
    amount: 0
  }
  
}
