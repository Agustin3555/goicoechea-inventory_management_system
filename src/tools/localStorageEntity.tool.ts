export class LocalStorageEntity<T> {
  protected entity: string

  constructor(entity: string) {
    this.entity = entity
  }

  set(value: T) {
    localStorage.setItem(this.entity, JSON.stringify(value))
  }

  get() {
    const value = localStorage.getItem(this.entity)

    return value ? (JSON.parse(value as string) as T) : null
  }

  delete() {
    localStorage.removeItem(this.entity)
  }
}
