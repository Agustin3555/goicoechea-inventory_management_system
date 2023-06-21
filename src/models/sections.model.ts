import { Validation } from '@/pages/Admin/tools'
import { InputHTMLAttributes } from 'react'

export interface Checkbox {
  defaultValue: boolean
}

export interface Input {
  validations?: Validation[]
  inputExtraAttrs?: InputHTMLAttributes<HTMLInputElement>
  defaultValue?: number
}

export interface Selector {
  sectionDependency?: SECTION_KEYS[]
}

export interface InputSelector extends Input, Selector {}

export interface Field {
  title: string
}

export interface SingleField extends Field {
  extra: Checkbox | Input | Selector | InputSelector
}

export interface GroupField extends Field {
  fields: {
    [key: string]: SingleField
  }
}

export enum SECTION_KEYS {
  sales = 'sales',
  offers = 'offers',
  products = 'products',
  manufacturers = 'manufacturers',
  categories = 'categories',
  users = 'users',
  me = 'me',
}

export enum SALE_VIEW_KEYS {
  view = 'view',
}

export enum OFFER_VIEW_KEYS {
  view = 'view',
}

export enum PRODUCT_VIEW_KEYS {
  search = 'search',
  new = 'new',
}

export enum PRODUCT_FIELD_KEYS {
  category = 'category',
  manufacturer = 'manufacturer',
  createdByUser = 'createdByUser',
  updatedByUser = 'updatedByUser',
  chars = 'chars',
  booleanChars = 'booleanChars',
  quantityChars = 'quantityChars',
  fractionChars = 'fractionChars',
  stringChars = 'stringChars',
  name = 'name',
  description = 'description',
  stock = 'stock',
  minStock = 'minStock',
  price = 'price',
  imported = 'imported',
  discontinued = 'discontinued',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum PRODUCT_BOOLEAN_CHARS_FIELD_KEYS {
  key = 'key',
  value = 'value',
}

export enum PRODUCT_QUANTITY_CHARS_FIELD_KEYS {
  key = 'key',
  value = 'value',
  unit = 'unit',
}

export enum PRODUCT_FRACTION_CHARS_FIELD_KEYS {
  key = 'key',
  numeratorValue = 'numeratorValue',
  denominatorValue = 'denominatorValue',
  unit = 'unit',
}

export enum PRODUCT_STRING_CHARS_FIELD_KEYS {
  key = 'key',
  value = 'value',
}

export enum MANUFACTURER_VIEW_KEYS {
  view = 'view',
}

export enum CATEGORY_VIEW_KEYS {
  view = 'view',
}

export enum USER_VIEW_KEYS {
  view = 'view',
}

export enum ME_VIEW_KEYS {
  profile = 'profile',
}

export const SECTIONS: {
  [key: string]: {
    title: string
    iconName: string
    views: {
      [key: string]: {
        title: string
        iconName: string
      }
    }
    fields?: {
      [key: string]: Field | SingleField | GroupField
    }
  }
} = {
  [SECTION_KEYS.sales]: {
    title: 'Ventas',
    iconName: 'fa-solid fa-cash-register',
    views: {
      [SALE_VIEW_KEYS.view]: {
        title: 'view',
        iconName: '',
      },
    },
  },
  [SECTION_KEYS.offers]: {
    title: 'Ofertas',
    iconName: 'fa-solid fa-fire',
    views: {
      [OFFER_VIEW_KEYS.view]: {
        title: 'view',
        iconName: '',
      },
    },
  },
  [SECTION_KEYS.products]: {
    title: 'Productos',
    iconName: 'fa-solid fa-boxes-stacked',
    views: {
      [PRODUCT_VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [PRODUCT_VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
    fields: {
      [PRODUCT_FIELD_KEYS.createdAt]: {
        title: 'Creación',
      },
      [PRODUCT_FIELD_KEYS.updatedAt]: {
        title: 'Última actualización',
      },
      [PRODUCT_FIELD_KEYS.createdByUser]: {
        title: 'Usuario creador',
      },
      [PRODUCT_FIELD_KEYS.updatedByUser]: {
        title: 'Usuario actualizador',
      },
      [PRODUCT_FIELD_KEYS.name]: {
        title: 'Nombre',
        extra: {
          inputExtraAttrs: { autoComplete: 'nope' },
        },
      },
      [PRODUCT_FIELD_KEYS.description]: {
        title: 'Descripción',
        extra: {},
      },
      [PRODUCT_FIELD_KEYS.stock]: {
        title: 'Stock inicial',
        extra: {
          validations: [
            {
              validation: value => (value as number) < 0,
              errorMsg: 'No puede ser menor que 0',
            },
          ],
          inputExtraAttrs: { type: 'number', min: 0 },
          defaultValue: 0,
        },
      },
      [PRODUCT_FIELD_KEYS.minStock]: {
        title: 'Stock mínimo',
        extra: {
          validations: [
            {
              validation: value => (value as number) < 0,
              errorMsg: 'No puede ser menor que 0',
            },
          ],
          inputExtraAttrs: { type: 'number', min: 0 },
          defaultValue: 0,
        },
      },
      [PRODUCT_FIELD_KEYS.price]: {
        title: 'Precio',
        extra: {
          validations: [
            {
              validation: value => (value as number) < 0,
              errorMsg: 'No puede ser menor que 0',
            },
          ],
          inputExtraAttrs: { type: 'number', min: 0 },
          defaultValue: 0,
        },
      },
      [PRODUCT_FIELD_KEYS.imported]: {
        title: 'Importado',
        extra: {
          defaultValue: false,
        },
      },
      [PRODUCT_FIELD_KEYS.discontinued]: {
        title: 'Descontinuado',
        extra: {
          defaultValue: false,
        },
      },
      [PRODUCT_FIELD_KEYS.category]: {
        title: 'Categoría',
        extra: {
          sectionDependency: [SECTION_KEYS.categories],
        },
      },
      [PRODUCT_FIELD_KEYS.manufacturer]: {
        title: 'Fabricante',
        extra: {
          sectionDependency: [SECTION_KEYS.manufacturers],
        },
      },
      [PRODUCT_FIELD_KEYS.chars]: {
        title: 'Características',
      },
      [PRODUCT_FIELD_KEYS.booleanChars]: {
        title: 'Características por cantidad',
        fields: {
          [PRODUCT_BOOLEAN_CHARS_FIELD_KEYS.key]: {
            title: 'Nombre',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
          [PRODUCT_BOOLEAN_CHARS_FIELD_KEYS.value]: {
            title: 'Valor',
            extra: {
              defaultValue: false,
            },
          },
        },
      },
      [PRODUCT_FIELD_KEYS.quantityChars]: {
        title: 'Características por cantidad',
        fields: {
          [PRODUCT_QUANTITY_CHARS_FIELD_KEYS.key]: {
            title: 'Nombre',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
          [PRODUCT_QUANTITY_CHARS_FIELD_KEYS.value]: {
            title: 'Valor',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
              inputExtraAttrs: { type: 'number' },
            },
          },
          [PRODUCT_QUANTITY_CHARS_FIELD_KEYS.unit]: {
            title: 'Unidad',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
        },
      },
      [PRODUCT_FIELD_KEYS.fractionChars]: {
        title: 'Características por cantidad',
        fields: {
          [PRODUCT_FRACTION_CHARS_FIELD_KEYS.key]: {
            title: 'Nombre',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
          [PRODUCT_FRACTION_CHARS_FIELD_KEYS.numeratorValue]: {
            title: 'Numerador',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
              inputExtraAttrs: { type: 'number' },
            },
          },
          [PRODUCT_FRACTION_CHARS_FIELD_KEYS.denominatorValue]: {
            title: 'Denominador',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
              inputExtraAttrs: { type: 'number' },
            },
          },
          [PRODUCT_FRACTION_CHARS_FIELD_KEYS.unit]: {
            title: 'Unidad',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
        },
      },
      [PRODUCT_FIELD_KEYS.stringChars]: {
        title: 'Características por cantidad',
        fields: {
          [PRODUCT_STRING_CHARS_FIELD_KEYS.key]: {
            title: 'Nombre',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
          [PRODUCT_STRING_CHARS_FIELD_KEYS.value]: {
            title: 'Valor',
            extra: {
              sectionDependency: [SECTION_KEYS.products],
            },
          },
        },
      },
    },
  },
  [SECTION_KEYS.manufacturers]: {
    title: 'Fabricantes',
    iconName: 'fa-solid fa-industry',
    views: {
      [MANUFACTURER_VIEW_KEYS.view]: {
        title: 'view',
        iconName: '',
      },
    },
  },
  [SECTION_KEYS.categories]: {
    title: 'Categorías',
    iconName: 'fa-solid fa-sitemap',
    views: {
      [CATEGORY_VIEW_KEYS.view]: {
        title: 'view',
        iconName: '',
      },
    },
  },
  [SECTION_KEYS.users]: {
    title: 'Usuarios',
    iconName: 'fa-solid fa-users',
    views: {
      [USER_VIEW_KEYS.view]: {
        title: 'view',
        iconName: '',
      },
    },
  },
  [SECTION_KEYS.me]: {
    title: 'Mi cuenta',
    iconName: 'fa-solid fa-user',
    views: {
      [ME_VIEW_KEYS.profile]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
    },
  },
}
