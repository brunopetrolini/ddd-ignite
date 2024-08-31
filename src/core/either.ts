class Failure<F> {
  readonly reason: F

  constructor(reason: F) {
    this.reason = reason
  }
}

class Success<S> {
  readonly result: S

  constructor(result: S) {
    this.result = result
  }
}

export type Either<F, S> = Failure<F> | Success<S>

export const failure = <F, S>(reason: F): Either<F, S> => new Failure(reason)
export const success = <F, S = void>(result?: S): Either<F, S> =>
  new Success(result as S)
