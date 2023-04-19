export enum ERRORS {
  unknown = 'ERR_UNKNOWN',
  client_required = 'ERR_REQUIRED',
  api_network = 'ERR_NETWORK',
  api_login = 'ERR_LOGIN',
  ws_network = 'TransportError',
}

// TODO: agregar?: Por favor, revise su conexión a Internet o inténtelo de nuevo más tarde.

const ERROR_MATCHER: { [key: string]: string } = {
  [ERRORS.unknown]: 'Se ha producido un error desconocido.',
  [ERRORS.client_required]: 'Campo obligatorio',
  [ERRORS.api_network]: 'No se puede obtener datos del servidor.',
  [ERRORS.api_login]: 'Email o contraseña incorrectos.',
  [ERRORS.ws_network]: 'No se puede establecer una conexión directa con el servidor.',
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
