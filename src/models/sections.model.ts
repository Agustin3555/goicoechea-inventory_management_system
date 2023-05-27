export enum SECTION_KEYS {
  sales = 'sales',
  offers = 'offers',
  products = 'products',
  manufacturers = 'manufacturers',
  categories = 'categories',
  users = 'users',
  me = 'me',
}

export enum VIEW_KEYS {
  search = 'search',
  new = 'new',
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
  }
} = {
  [SECTION_KEYS.sales]: {
    title: 'Ventas',
    iconName: 'fa-solid fa-cash-register',
    views: {
      [VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
  },
  [SECTION_KEYS.offers]: {
    title: 'Ofertas',
    iconName: 'fa-solid fa-fire',
    views: {
      [VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
  },
  [SECTION_KEYS.products]: {
    title: 'Productos',
    iconName: 'fa-solid fa-boxes-stacked',
    views: {
      [VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
  },
  [SECTION_KEYS.manufacturers]: {
    title: 'Fabricantes',
    iconName: 'fa-solid fa-industry',
    views: {
      [VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
  },
  [SECTION_KEYS.categories]: {
    title: 'Categorías',
    iconName: 'fa-solid fa-sitemap',
    views: {
      [VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
  },
  [SECTION_KEYS.users]: {
    title: 'Usuarios',
    iconName: 'fa-solid fa-users',
    views: {
      [VIEW_KEYS.search]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
      [VIEW_KEYS.new]: {
        title: 'Nuevo',
        iconName: 'fa-solid fa-plus',
      },
    },
  },
  [SECTION_KEYS.me]: {
    title: 'Mi cuenta',
    iconName: 'fa-solid fa-user',
    views: {
      [VIEW_KEYS.profile]: {
        title: 'Buscar',
        iconName: 'fa-solid fa-magnifying-glass',
      },
    },
  },
}
