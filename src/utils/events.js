

const DEFAULT_PUBLIC_EVENT_OPTIONS = { bubbles: true, composed: true }
export function dispatchPublicEvent(element, name, options = {}) {
  options = { ...DEFAULT_PUBLIC_EVENT_OPTIONS, ...options }
  return element.dispatchEvent(new CustomEvent(name, options))
}