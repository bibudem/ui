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
export function patternMatchesOrigin(pattern, origin) {

  const escapedPattern = pattern
    .replace(/[.]/g, '\\$&')
    .replace(/-/g, '\\x2d')
    .replace(/[*]/g, '.*')

  return new RegExp(`^${escapedPattern}$`, 'u').test(origin)
}