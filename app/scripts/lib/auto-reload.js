module.exports = setupDappAutoReload

function setupDappAutoReload (wan3, observable) {
  // export wan3 as a global, checking for usage
  let hasBeenWarned = false
  let reloadInProgress = false
  let lastTimeUsed
  let lastSeenNetwork

  global.wan3 = new Proxy(wan3, {
    get: (_wan3, key) => {
      // show warning once on wan3 access
      if (!hasBeenWarned && key !== 'currentProvider') {
        console.warn('WanMask: wan3 will be deprecated in the near future in favor of the ethereumProvider \nhttps://github.com/MetaMask/faq/blob/master/detecting_metamask.md#web3-deprecation')
        hasBeenWarned = true
      }
      // get the time of use
      lastTimeUsed = Date.now()
      // return value normally
      return _wan3[key]
    },
    set: (_wan3, key, value) => {
      // set value normally
      _wan3[key] = value
    },
  })

  observable.subscribe(function (state) {
    // if reload in progress, no need to check reload logic
    if (reloadInProgress) return

    const currentNetwork = state.networkVersion

    // set the initial network
    if (!lastSeenNetwork) {
      lastSeenNetwork = currentNetwork
      return
    }

    // skip reload logic if wan3 not used
    if (!lastTimeUsed) return

    // if network did not change, exit
    if (currentNetwork === lastSeenNetwork) return

    // initiate page reload
    reloadInProgress = true
    const timeSinceUse = Date.now() - lastTimeUsed
    // if wan3 was recently used then delay the reloading of the page
    if (timeSinceUse > 500) {
      triggerReset()
    } else {
      setTimeout(triggerReset, 500)
    }
  })
}

// reload the page
function triggerReset () {
  global.location.reload()
}
