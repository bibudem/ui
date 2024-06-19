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