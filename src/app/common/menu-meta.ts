export type MenuItemType = {
  key: string
  label: string
  isTitle?: boolean
  icon?: string
  url?: string
  badge?: {
    variant: string
    text: string
  }
  parentKey?: string
  isDisabled?: boolean
  collapsed?: boolean
  children?: MenuItemType[]
}

export type SubMenus = {
  item: MenuItemType
  linkClassName?: string
  subMenuClassName?: string
  activeMenuItems?: Array<string>
  toggleMenu?: (item: MenuItemType, status: boolean) => void
  className?: string
}
export type TabMenuItem = {
  index: number
  name: string
  icon: string
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'dashboards',
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    url: '/dashboards',
  },

  {
    key: 'products',
    label: 'Catalogue',
    icon: 'ri-box-3-line',
    url: '/products',
    collapsed: false,
  },
  {
    key: 'commande',
    label: 'COMMANDE',
    isTitle: true,
  },
  {
    key: 'orders',
    label: 'Commandes',
    icon: 'ri-home-office-line',
    url: '/orders/list',
  },
  {
    key: 'litige',
    label: 'Mes Litiges',
    icon: 'ri-anticlockwise-line',
    url: '/litiges/list',
  },
  {
    key: 'retours',
    label: 'Mes Retours',
    icon: 'ri-text-wrap',
    url: '/retours/list',
  },
  {
    key: 'retours',
    label: 'Mes Retours',
    icon: 'ri-text-wrap',
    url: '/retours/list',
  },
  {
    key: 'account',
    label: 'Mon compte',
    icon: 'ri-account',
    url: '/retours/list',
  },
  {
    key: 'help',
    label: 'Aide/Faq',
    icon: 'ri-hepl',
    url: '/retours/list',
  }
]
