import { Button, Icon, Input, Separator, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { FormEventHandler, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Checkbox, Item } from './components'
import { searchStyleAdapter, StylizedSearch } from './Search.styled'
import { AppError } from '@/tools'
import { ResourceRef } from '@/pages/Admin/tools'
import { ItemData, setSearchedData, setSelectAll } from '@/redux'

const Search = ({
  sectionKey,
  loadItems,
  children,
}: {
  sectionKey: string
  loadItems: () => Promise<AppError | ResourceRef[]>
  children: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const items = useSelector((store: AppStore) => {
    const keys = store.searchedData[sectionKey]

    const array: { id: number; data: ItemData }[] = []

    for (const key in keys) array.push({ id: parseInt(key), data: keys[key] })

    return array
  })

  const selectedItems = useMemo(
    () => items.filter(item => item.data.meta.selected === true).length,
    [items]
  )

  const allSelected = useMemo(() => {
    if (items.length === 0) return false
    for (const item of items) if (!item.data.meta.selected) return false

    return true
  }, [items])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: any) => {
    event.preventDefault()

    setLoading(true)

    const items = await loadItems()

    if (items && !(items instanceof AppError)) {
      dispatch(setSearchedData({ sectionKey, items }))
    }

    setLoading(false)
  }

  const handleSelectAll = () => {
    dispatch(setSelectAll({ sectionKey, value: !allSelected }))
  }

  return (
    <StylizedSearch p={searchStyleAdapter(darkMode)}>
      <div className="search-head">
        <Checkbox id="all" title="Todo" checked={allSelected} handleChange={handleSelectAll} />
        <Icon iconName="fa-solid fa-cubes-stacked" style={{ size: 's' }} />
        <div className="counter">{selectedItems}</div>
        <Separator style={{ long: 'xs', backgroundColor: { dark: 'g-8' } }} />
        <form className="form" onSubmit={loading ? undefined : handleSubmit}>
          <Input
            name={`search-${sectionKey}`}
            title="Buscar por nombre"
            showLabel={false}
            style={{ fontSize: 's' }}
            extraAttrs={{ placeholder: 'Buscar...' }}
          />
          <Button
            title="Acceder"
            style={{
              tight: true,
              backgroundColor: {
                dark: 'a',
              },
            }}
            extraAttrs={{
              type: 'submit',
              disabled: loading,
            }}
          >
            <SwitchTransition>
              <CSSTransition
                key={loading.toString()}
                classNames="fade"
                addEndListener={(node, done) =>
                  node.addEventListener('transitionend', done, false)
                }
              >
                <div className="button-content">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Icon iconName="fa-solid fa-magnifying-glass" style={{ size: 's' }} />
                  )}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </Button>
        </form>
      </div>
      <div className="items">
        {items.map(item => (
          <Item
            properties={children}
            sectionKey={sectionKey}
            id={item.id}
            title={item.data.meta.text}
            key={item.id}
          />
        ))}
      </div>
    </StylizedSearch>
  )
}

export default Search
