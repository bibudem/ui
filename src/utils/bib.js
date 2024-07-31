import { isObject, merge } from 'lodash-es'
import pkg from '../../package.json'

export function addToGlobalBib(prop, value) {
  const bib = globalThis.bib ?? (globalThis.bib = {})
  if (typeof bib[prop] === 'undefined') {
    if (isObject(value)) {
      bib[prop] = merge({}, bib[prop], value, { version: pkg.version })
    } else {
      bib[prop] = value
    }
  }
}