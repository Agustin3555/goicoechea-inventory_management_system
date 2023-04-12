import { Sections } from '@/models'
import { setNewResourceData } from '@/redux/states'
// import { ProductsService } from '@/services'
import { css } from 'styled-components'
import { Selector, SelectorField } from '../../..'
import { InputField } from '../../../'
import New from '../New/New'
import Search from '../Search/Search'
import Section from '../Section/Section'

const Products = () => {
  return (
    <Section
      id={Sections.PRODUCTS.key}
      title={Sections.PRODUCTS.title}
      iconName={Sections.PRODUCTS.iconName}
      views={[
        {
          ...Sections.PRODUCTS.views.SEARCH,
          component: <Search />,
        },
        {
          ...Sections.PRODUCTS.views.NEW,
          component: (
            <New title="Nuevo Producto">
              {/* <Selector
                sectionId="new"
                views={[
                  { id: 'hola', title: 'Holaaaaaaaaaaaaaaaaaaaaaaa', iconName: 'f' },
                  { id: 'hola1', title: 'Hola', iconName: 'f' },
                  { id: 'hola2', title: 'Hola', iconName: 'f' },
                  { id: 'hola3', title: 'Hola', iconName: 'f' },
                  { id: 'hola4', title: 'Hola', iconName: 'f' },
                  { id: 'hola5', title: 'Hola', iconName: 'f' },
                ]}
              />
              <Selector
                sectionId="new"
                variable={false}
                views={[
                  { id: 'hola', title: 'Hola', iconName: 'f' },
                  { id: 'hola1', title: 'Hola', iconName: 'f' },
                  { id: 'hola2', title: 'Hola', iconName: 'f' },
                  { id: 'hola3', title: 'Hola', iconName: 'f' },
                  { id: 'hola4', title: 'Hola', iconName: 'f' },
                  { id: 'hola5', title: 'Hola', iconName: 'f' },
                ]}
              /> */}
              <InputField
                action={setNewResourceData}
                sectionKey={Sections.PRODUCTS.key}
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
                sectionKey={Sections.PRODUCTS.key}
                fieldKey="unitPrice"
                title="Precio"
                inputExtraAttrs={{
                  type: 'number',
                  min: 0,
                  required: true,
                }}
              />
              <Selector
                sectionId={Sections.PRODUCTS.key}
                loadResources={async () => {
                  // const products = await ProductsService.findAll()
                  // return products.map(product => ({ id: product.id, title: product.name }))
                }}
                title="Fabricante"
              />
              <SelectorField
                action={setNewResourceData}
                sectionKey={Sections.PRODUCTS.key}
                loadOptions={async () => {
                  // const products = await ProductsService.findAll()
                  // if (!products) return undefined
                  // return products.map(product => ({ id: product.id, title: product.name }))
                }}
                fieldKey="manufacturer"
                title="Fabricante"
                required
              />
              <InputField
                action={setNewResourceData}
                sectionKey={Sections.PRODUCTS.key}
                fieldKey="stock"
                title="Stock"
                inputExtraAttrs={{
                  type: 'number',
                  min: 0,
                }}
              />
              <InputField
                action={setNewResourceData}
                sectionKey={Sections.PRODUCTS.key}
                fieldKey="minStock"
                title="Stock mínimo"
                inputExtraAttrs={{
                  type: 'number',
                  min: 0,
                }}
              />
            </New>
          ),
        },
      ]}
    />
  )
}

export default Products
