module.exports = function (address, network) {
  const net = parseInt(network)
  let link
  switch (net) {
    case 1: // main net
      link = `https://wanscan.org/address/${address}`
      break
    case 3: // wanchain testnet
      link = `https://testnet.wanscan.org/address/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
