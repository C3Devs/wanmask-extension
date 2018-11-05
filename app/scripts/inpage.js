cleanContextForImports()
const Wan3 = require('web3')
const log = require('loglevel')
const LocalMessageDuplexStream = require('post-message-stream')
const setupDappAutoReload = require('./lib/auto-reload.js')
const WanmaskPageProvider = require('wanmask-inpage-provider')
restoreContextAfterImports()

log.setDefaultLevel(process.env.METAMASK_DEBUG ? 'debug' : 'warn')

//
// setup plugin communication
//

// setup background connection
var wanMaskStream = new LocalMessageDuplexStream({
  name: 'inpage2',
  target: 'contentscript2',
})

// compose the inpage provider
var wanPageProvider = new WanmaskPageProvider(wanMaskStream)

//
// setup wan3
//

if (typeof window.wan3 !== 'undefined') {
  throw new Error(`WanMask detected another wan3.
     WanMask will not work reliably with another wan3 extension.
     This usually happens if you have two WanMasks installed,
     or WanMask and another wan3 extension. Please remove one
     and try again.`)
}

var wan3 = new Wan3(wanPageProvider)

wan3.setProvider = function () {
  log.debug('WanMask - overrode wan3.setProvider')
}
log.debug('WanMask - injected wan3')
setupDappAutoReload(wan3, wanPageProvider.publicConfigStore)

// export global wan3, with usage-detection and deprecation warning

/* TODO: Uncomment this area once auto-reload.js has been deprecated:
let hasBeenWarned = false
global.wan3 = new Proxy(wan3, {
  get: (_wan3, key) => {
    // show warning once on wan3 access
    if (!hasBeenWarned && key !== 'currentProvider') {
      console.warn('WanMask: wan3 will be deprecated in the near future in favor of the ethereumProvider \nhttps://github.com/MetaMask/faq/blob/master/detecting_metamask.md#web3-deprecation')
      hasBeenWarned = true
    }
    // return value normally
    return _wan3[key]
  },
  set: (_wan3, key, value) => {
    // set value normally
    _wan3[key] = value
  },
})
*/

// set wan3 defaultAccount
wanPageProvider.publicConfigStore.subscribe(function (state) {
  wan3.eth.defaultAccount = state.selectedAddress
})

// need to make sure we aren't affected by overlapping namespaces
// and that we dont affect the app with our namespace
// mostly a fix for wan3's BigNumber if AMD's "define" is defined...
var __define

/**
 * Caches reference to global define object and deletes it to
 * avoid conflicts with other global define objects, such as
 * AMD's define function
 */
function cleanContextForImports () {
  __define = global.define
  try {
    global.define = undefined
  } catch (_) {
    console.warn('WanMask - global.define could not be deleted.')
  }
}

/**
 * Restores global define object from cached reference
 */
function restoreContextAfterImports () {
  try {
    global.define = __define
  } catch (_) {
    console.warn('WanMask - global.define could not be overwritten.')
  }
}
