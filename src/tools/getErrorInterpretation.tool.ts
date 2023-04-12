export const getErrorInterpretation = (errorCode: string) => {
  const codeMatcher: { [key: string]: string } = {
    ERR_CLIENT_0: 'Campo obligatorio',
    ERR_NETWORK:
      'No se puede conectar al servidor. Por favor, revise su conexión a Internet o inténtelo de nuevo más tarde.',
  }

  return codeMatcher[errorCode]
}
