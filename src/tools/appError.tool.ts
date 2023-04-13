export enum ERRORS {
  unknown = 'ERR_UNKNOWN',
  network = 'ERR_NETWORK',
  login = 'ERR_LOGIN',
  required = 'ERR_REQUIRED',
}

const ERROR_MATCHER: { [key: string]: string } = {
  [ERRORS.unknown]: 'Se ha producido un error desconocido.',
  [ERRORS.network]:
    'No se puede conectar al servidor. Por favor, revise su conexión a Internet o inténtelo de nuevo más tarde.',
  [ERRORS.login]: 'Email o contraseña incorrectos.',
  [ERRORS.required]: 'Campo obligatorio',
}

export const getErrorInterpretation = (errorCode: string) =>
  ERROR_MATCHER[errorCode] || undefined

export class AppError extends Error {
  code: ERRORS

  constructor(code: ERRORS) {
    const message = getErrorInterpretation(code)
    super(message)

    this.name = 'AppError'
    this.code = code
  }
}
