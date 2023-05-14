import { InputField, SelectorField } from '@/pages/Admin/components'
import { New } from '../../..'
import { setNewResourceData } from '@/redux'
import { ManufacturerServices } from '@/services'
import { AppError } from '@/tools'
import { Sections } from '@/models'
import {
  FractionFieldGroupGenerator,
  QuantityFieldGroupGenerator,
  StringFieldGroupGenerator,
} from './components'

const sectionKey = Sections.PRODUCTS.key

const NewProduct = () => {
  const handleSend = async () => {
    console.log('send')
  }

  return (
    <New title="Nuevo Producto" handleSend={handleSend}>
      <InputField
        action={setNewResourceData}
        sectionKey={sectionKey}
        fieldKey="name"
        title="Nombre"
        validations={[
          {
            validation: (value: string) => value === '',
            errorMsg: 'Campo obligatorio',
            // break: true,
            break: false,
          },
          {
            validation: (value: string) => value.includes('m'),
            errorMsg: 'No puede contener m',
            break: false,
          },
          {
            validation: (value: string) => value.includes('n'),
            errorMsg: 'No puede contener n',
            break: false,
          },
        ]}
        inputExtraAttrs={{
          required: true,
          autoComplete: 'nope',
        }}
      />
      <InputField
        action={setNewResourceData}
        sectionKey={sectionKey}
        fieldKey="unitPrice"
        title="Precio"
        inputExtraAttrs={{
          type: 'number',
          min: 0,
          required: true,
        }}
      />
      {/* <InputSelectorField
                action={setNewResourceData}
                sectionKey={sectionKey}
                dependentSectionKey={Sections.MANUFACTURERS.key}
                fieldKey="manufacturer"
                title="Fabricante"
                validations={[
                  {
                    validation: (value: string) => value === '',
                    errorMsg: 'Campo obligatorio',
                    break: true,
                  },
                  {
                    validation: (value: string) => value.includes('m'),
                    errorMsg: 'No puede contener m',
                  },
                  {
                    validation: (value: string) => value.includes('n'),
                    errorMsg: 'No puede contener n',
                  },
                ]}
                loadOptions={async () => {
                  const manufacturers = await ManufacturerServices.getAll()
                  if (!manufacturers || manufacturers instanceof AppError)
                    return manufacturers as AppError

                    return manufacturers.map(item => ({
                      id: item.id.toString(),
                      title: item.name,
                    }))
                  }}
                /> */}
      <SelectorField
        action={setNewResourceData}
        sectionKey={sectionKey}
        dependentSectionKey={Sections.MANUFACTURERS.key}
        fieldKey="manufacturer"
        title="Fabricante"
        required
        loadOptions={async () => {
          const manufacturers = await ManufacturerServices.getAll()
          if (!manufacturers || manufacturers instanceof AppError)
            return manufacturers as AppError

          return manufacturers.map(item => ({
            id: item.id.toString(),
            title: item.name,
          }))
        }}
      />
      <InputField
        action={setNewResourceData}
        sectionKey={sectionKey}
        fieldKey="stock"
        title="Stock"
        inputExtraAttrs={{
          type: 'number',
          min: 0,
        }}
      />
      <InputField
        action={setNewResourceData}
        sectionKey={sectionKey}
        fieldKey="minStock"
        title="Stock mínimo"
        inputExtraAttrs={{
          type: 'number',
          min: 0,
        }}
      />
      <QuantityFieldGroupGenerator />
      <FractionFieldGroupGenerator />
      <StringFieldGroupGenerator />
    </New>
  )
}

export default NewProduct
