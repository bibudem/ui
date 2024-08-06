import { name } from '../../package.json'

/**
 * Creates a logger function with a prefix.
 *
 * @param {string} [prefix=name] - The prefix to use for the logger. Defaults to the name from the package.json file.
 * @returns {Function} - A logger function that logs messages with the specified prefix.
 */
export function loggerFactory(prefix = name, color = 'green') {

  return Function.prototype.bind.call(console.log, console, `%c[${prefix}]`, `color: ${color}; font-weight: bold;`)
}