import { utils as postmessageUtils } from 'postmessage-promise'
import { hasBooleanParam } from '@/utils/url.js'
import { PREFIX, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT } from './constants.js'

export function getKeyName(key) {
  return `${PREFIX}-${key}`
}

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

export async function getServerMode(client, timeout = SERVER_REQUEST_DEFAULT_TIMEOUT) {

  const serverUrl = client.serverUrl

  if (!serverUrl) {
    return SERVER_MODE.LOCAL
  }

  // Check if server page exists
  const controller = new AbortController()
  let response

  try {
    const timeoutHandle = setTimeout(() => {
      console.log('Request timed out. Aborting request...')
      controller.abort()
    }, timeout)
    response = await fetch(serverUrl, { signal: controller.signal })
    clearTimeout(timeoutHandle)

    if (response.ok) {
      return SERVER_MODE.REMOTE
    }
  } catch (error) {

    if (controller.signal.aborted) {
      throw new Error(`Unable to locate server page. The request timed out after ${timeout}ms. url: ${serverUrl.href}`)
    }

    throw new Error(`Unable to locate server page. Request url: ${serverUrl.href}.`, error)
  }

  throw new Error(`Unable to locate server page. The request failed with status code ${response.status}. url: ${serverUrl.href}`)
}