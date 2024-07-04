import boolifyString from 'boolify-string'

export function hasBooleanParam(url, param) {
  url = typeof url === 'string' ? new URL(url, location) : url

  const booleanString = url.searchParams.get(param)

  if (booleanString === null) {
    return false
  }

  if (booleanString === '') {
    return true
  }

  return boolifyString(booleanString)
}

export function stringIsUrl(string) {
  try {
    new URL(string, location)
    return true
  } catch {
    return false
  }
}

// This is a modified version of https://www.npmjs.com/package/escape-string-regexp
export function escapeStringRegexp(string) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string')
  }

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string
    .replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/-/g, '\\x2d')
}