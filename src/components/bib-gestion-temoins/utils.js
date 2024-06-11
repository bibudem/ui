import { utils as postmessageUtils } from 'postmessage-promise'
import boolifyString from 'boolify-string'
import { PREFIX, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT } from './constants.js'

export function k(key) {
  return `${PREFIX}-${key}`
}

export function hasDebugParam(url) {
  url = typeof url === 'string' ? new URL(url, location) : url

  const debugParam = url.searchParams.get('debug')

  if (debugParam === null) {
    return false
  }

  if (debugParam === '') {
    return true
  }

  return boolifyString(debugParam)
}

export function getIframeServer(
  container,
  targetUrl,
) {
  const root = typeof container !== 'undefined' ? container : document.body
  const origin = postmessageUtils.resolveOrigin(targetUrl)
  const iframe = document.createElement('iframe')
  const isDebugOn = hasDebugParam(targetUrl)

  if (!isDebugOn) {
    iframe.ariaHidden = true
    iframe.tabIndex = -1
    iframe.hidden = true
    iframe.style.setProperty('display', 'none')
  }

  root.appendChild(iframe)
  iframe.src = targetUrl

  const iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow

  return {
    server: iframeWindow,
    origin,
    iframe,
  }
}

export async function getServerMode(client, timeout) {

  timeout = timeout || client.timeout || SERVER_REQUEST_DEFAULT_TIMEOUT

  if (!client.server) {
    return SERVER_MODE.LOCAL
  }

  let serverUrl
  try {
    serverUrl = new URL(client.server, location)
  } catch (error) {
    throw new Error('The server property has an invalid value: ', error)
  }

  // Check if server page exists
  const controller = new AbortController()
  let response

  try {
    const timeoutHandle = setTimeout(() => {
      console.log('Aborting request...')
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