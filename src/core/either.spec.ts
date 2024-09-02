import { Either, failure, success } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return success('success')
  }
  return failure('error')
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isSuccess()).toEqual(true)
  expect(result.isFailure()).toEqual(false)
})

test('failure result', () => {
  const result = doSomething(false)

  expect(result.isSuccess()).toEqual(false)
  expect(result.isFailure()).toEqual(true)
})
