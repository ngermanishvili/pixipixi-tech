import { http } from 'msw'
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// ვორქერი
export const worker = setupWorker(...handlers)