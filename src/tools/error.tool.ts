export enum ERRORS {
  unknown = 'ERR_UNKNOWN',
  client_fieldRequired = 'ERR_REQUIRED',
  client_fieldsErrors = 'ERR_FIELDS_ERRORS',
  ws_network = 'TransportError',
  api_network = 'ERR_NETWORK',
  api_login = 'ERR_LOGIN',
  api_nameUnique = 'ERR_NAME_UNIQUE',
  api_product_charsKeyUnique = 'ERR_PRODUCT_CHARS_KEY_UNIQUE',
}

export const ERROR_MATCHER: { [key: string]: string } = {
  [ERRORS.unknown]: 'Se ha producido un error desconocido.',
  [ERRORS.client_fieldRequired]: 'Campo obligatorio',
  [ERRORS.client_fieldsErrors]:
    'No se puede completar porque existen errores en los campos.',
  [ERRORS.ws_network]:
    'No se puede establecer una conexión con el servidor. Reintentando ...',
  [ERRORS.api_network]: 'No se puede obtener datos del servidor.',
  [ERRORS.api_login]: 'Email o contraseña incorrectos.',
  [ERRORS.api_nameUnique]: 'Ya existe un recurso con el mismo "Nombre".',
  [ERRORS.api_product_charsKeyUnique]:
    'No se permiten "Características" con el mismo "Nombre".',
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
