import { ResourceRef } from '@/pages/Admin/tools'
import { ItemData } from '@/redux'
import { AppError } from '@/tools'

export type LoadItems = (name: string) => Promise<AppError | ResourceRef[]>

export type LoadItemData = (id: number) => Promise<AppError | {}>

export type LoadProperties = (id: number, itemData: ItemData) => JSX.Element
