export type InputAdapter<DataType, BodyType> = (data: DataType) => BodyType

export type OutputAdapter<RawResponseType, ResponseType> = (
  response: RawResponseType
) => ResponseType
