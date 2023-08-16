import axios from 'axios'
import { utilService } from './utilService'

const cacheKey = 'caching'
let cache = localStorage.getItem(cacheKey)
cache = cache ? JSON.parse(cache) : {}

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
}

async function getRate(coins) {
  const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
  const { data } = await axios.get(url)
  return data
}

async function getMarketPrice(timeSpan = '6months') {
  if (cache[timeSpan]) {
    console.log(
      'returning from cache data about bitcoin for timespan of ' +
        timeSpan
    )
    return cache[timeSpan]
  }
  const url = `https://api.blockchain.info/charts/market-price?timespan=${timeSpan}&format=json&cors=true`
  const res = await axios.get(url)
  return res.data.values
}

getConfirmedTransactions()
async function getConfirmedTransactions() {
  let confirmedTransactions = utilService.loadFromStorage('confirmedTransactions')
  if (!confirmedTransactions) {
    const url = `https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&format=json&cors=true`
    const { data } = await axios.get(url)
    utilService.saveToStorage('confirmedTransactions', data)
  }
  return confirmedTransactions
}
