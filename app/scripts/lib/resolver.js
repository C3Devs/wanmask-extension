const namehash = require('wan-wns-namehash')
const multihash = require('multihashes')
const HttpProvider = require('ethjs-provider-http')
const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')
const registrarAbi = require('./contracts/registrar')
const resolverAbi = require('./contracts/resolver')

function ens (name, provider) {
  const eth = new Eth(new HttpProvider(getProvider(provider.type)))
  const hash = namehash.hash(name)
  const contract = new EthContract(eth)
  const Registrar = contract(registrarAbi).at(getRegistrar(provider.type))
  return new Promise((resolve, reject) => {
    if (provider.type === 'wanchain') {
      Registrar.resolver(hash).then((address) => {
        if (address === '0x0000000000000000000000000000000000000000') {
          reject(null)
        } else {
          const Resolver = contract(resolverAbi).at(address['0'])
          return Resolver.content(hash)
        }
      }).then((contentHash) => {
        if (contentHash['0'] === '0x0000000000000000000000000000000000000000000000000000000000000000') reject(null)
        if (contentHash.ret !== '0x') {
          const hex = contentHash['0'].substring(2)
          const buf = multihash.fromHexString(hex)
          resolve(multihash.toB58String(multihash.encode(buf, 'sha2-256')))
        } else {
          reject(null)
        }
      })
    } else {
      return reject('unsupport')
    }
  })
}

function getProvider (type) {
  switch (type) {
    case 'wanchain':
      return 'https://mywanwallet.nl/api/'
    default:
      return 'http://localhost:8545/'
  }
}

function getRegistrar (type) {
  switch (type) {
    case 'wanchain':
      return '0xee8d418fd33e69782015ea4313dfd8eb7b1b91ce'
    default:
      return '0x0000000000000000000000000000000000000000'
  }
}

module.exports.resolve = function (name, provider) {
  const path = name.split('.')
  const topLevelDomain = path[path.length - 1]
  if (topLevelDomain === 'wan' || topLevelDomain === 'test') {
    return ens(name, provider)
  } else {
    return new Promise((resolve, reject) => {
      reject(null)
    })
  }
}
