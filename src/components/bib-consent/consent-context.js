import { createContext } from '@lit/context'
import { getKeyName } from './utils.js'

/**
 * Creates a context for managing consent-related state and functionality.
 * This context provides a way to share consent-related data and operations
 * throughout the application.
 */
export const consentContext = createContext(Symbol(getKeyName('consent-context')))