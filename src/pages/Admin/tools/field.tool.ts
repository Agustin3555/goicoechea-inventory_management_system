import { AppError } from '@/tools'
import { Option } from './selector.tool'
import { SingleField } from '@/models'

export interface FieldProps {
  fieldData: SingleField
  storageAddress: string
  unlabeled?: boolean
}

export interface FieldOptionalProps extends FieldProps {
  optional?: boolean
}

export interface FieldSelectorProps extends FieldOptionalProps {
  fieldDependency?: string[]
  loadOptions: () => Promise<AppError | Option[]>
}
