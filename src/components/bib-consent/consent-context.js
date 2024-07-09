import { createContext } from '@lit/context'
import { getKeyName } from './utils.js'

export const consentContext = createContext(Symbol(getKeyName('consent-context')))