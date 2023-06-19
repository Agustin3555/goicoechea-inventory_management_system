import { AppError } from '@/tools'
import { CategoryServices, ManufacturerServices } from '../services'

export const categoryLoadOptions = async () => {
  const categories = await CategoryServices.getAll()

  if (!categories || categories instanceof AppError) return categories as AppError

  return categories.map(item => ({
    id: String(item.id),
    title: item.name,
  }))
}

export const manufacturerLoadOptions = async () => {
  const manufacturers = await ManufacturerServices.getAll()

  if (!manufacturers || manufacturers instanceof AppError)
    return manufacturers as AppError

  return manufacturers.map(item => ({
    id: String(item.id),
    title: item.name,
  }))
}
