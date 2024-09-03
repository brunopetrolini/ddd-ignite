import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found.')
    this.name = 'RESOURCE_NOT_FOUND'
  }
}
