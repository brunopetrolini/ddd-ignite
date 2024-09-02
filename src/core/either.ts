class Failure<F, S> {
  readonly value: F

  constructor(reason: F) {
    this.value = reason
  }

  public isSuccess(): this is Success<S, F> {
    return false
  }

  public isFailure(): this is Failure<F, S> {
    return true
  }
}

class Success<S, F> {
  readonly value: S

  constructor(result: S) {
    this.value = result
  }

  public isSuccess(): this is Success<S, F> {
    return true
  }

  public isFailure(): this is Failure<F, S> {
    return false
  }
}

export type Either<F, S> = Failure<F, S> | Success<S, F>

export const failure = <F, S>(reason: F): Either<F, S> => new Failure(reason)
export const success = <F, S = void>(result?: S): Either<F, S> =>
  new Success(result as S)
