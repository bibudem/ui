import { name } from '../../package.json'

export default function logger(prefix = name) {

  return function logger() {
    console.log.apply(console, [`%c[${prefix}]`, 'color: green; font-weight: bold;', ...arguments])
  }
}