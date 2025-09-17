import { utils as postmessageUtils } from 'postmessage-promise'
import { hasBooleanParam } from '@/utils/url.js'
import { PREFIX, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT } from './constants.js'

/**
 * Creates a prefixed key name for the BIB consent module.
 * @param {string} key - The key to be prefixed.
 * @returns {string} - The prefixed key name.
 */
export function getKeyName(key) {
  return `${PREFIX}-${key}`
}

/**
 * Gets an iframe server for a given target URL.
 * @param {HTMLElement} [container=document.body] - The container element for the iframe.
 * @param {string} targetUrl - The target URL for the iframe.
 * @returns {object} - An object containing the iframe server, origin, and the iframe element.
 */
export function getIframeServer(
  container,
  targetUrl,
) {
  const root = typeof container !== 'undefined' ? container : document.body
  const origin = postmessageUtils.resolveOrigin(targetUrl)
  const iframeId = getKeyName('iframe')
  let iframe
  if (document.querySelector(`#${iframeId}`)) {
    iframe = document.querySelector(`#${iframeId}`)
  } else {
    iframe = document.createElement('iframe')
    iframe.id = iframeId

    const isDebugOn = hasBooleanParam(targetUrl, 'debug')

    if (!isDebugOn) {
      iframe.ariaHidden = true
      iframe.tabIndex = -1
      iframe.hidden = true
      iframe.style.setProperty('display', 'none')
    } else {
      iframe.style.cssText = 'width: 100%; height: 100%; border: 0;'
    }

    root.appendChild(iframe)
    iframe.src = targetUrl
  }

  const iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow

  return {
    server: iframeWindow,
    origin,
    iframe,
  }
}

/**
 * Checks the server mode for a given client.
 * 
 * If the client has no server URL, the function returns `SERVER_MODE.LOCAL`.
 * Otherwise, it checks if the server page exists by making a fetch request to the server URL.
 * If the request is successful (response.ok), the function returns `SERVER_MODE.REMOTE`.
 * If the request times out or fails, the function throws an error with the appropriate message.
 *
 * @param {object} client - The client object containing the server URL.
 * @param {number} [timeout=SERVER_REQUEST_DEFAULT_TIMEOUT] - The timeout in milliseconds for the server request.
 * @returns {string} - The server mode, either `SERVER_MODE.LOCAL` or `SERVER_MODE.REMOTE`.
 * @throws {Error} - If the server page cannot be located or the request fails.
 */
export async function getServerMode(client) {

  const serverUrl = client.serverUrl
  const timeout = client.serverRequestTimeout || SERVER_REQUEST_DEFAULT_TIMEOUT

  if (!serverUrl) {
    return SERVER_MODE.LOCAL
  }

  // Check if server page exists
  const controller = new AbortController()
  let response
  let timeoutHandle

  try {
    timeoutHandle = setTimeout(() => {
      console.warn(`Request timed out after ${timeout}ms. Aborting request...`)
      controller.abort()
    }, timeout)
    response = await fetch(serverUrl, { signal: controller.signal })

    if (response.ok) {
      return SERVER_MODE.REMOTE
    }
  } catch (error) {
    console.error(error)

    if (controller.signal.aborted) {
      // throw new Error(`Unable to locate server page. The request timed out after ${timeout}ms. url: ${serverUrl.href}`)
      console.error(`Unable to locate server page. The request timed out after ${timeout}ms. url: ${serverUrl.href}`)
      return SERVER_MODE.LOCAL
    }

    // throw new Error(`Unable to locate server page : ${serverUrl.href}.`, error)
    console.error(`Unable to locate server page : ${serverUrl.href}.`, error)
    return SERVER_MODE.LOCAL
  } finally {
    clearTimeout(timeoutHandle)
  }

  throw new Error(`Unable to locate server page. The request failed with status code ${response.status}. url: ${serverUrl.href}`)
}