import { AnimateState, Button, Icon, Input, Separator, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, FormEventHandler, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Item } from './components'
import { AppError } from '@/tools'
import { ItemData, setSearchedData, setSelectAll } from '@/redux'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { SearchStyled } from './Search.styled'
import { css } from 'styled-components'
import { SECTION_KEYS } from '@/models'
import { LoadItemData, LoadItems, LoadProperties } from './tools'

const Search = ({
  sectionKey,
  loadItems,
  loadItemData,
  loadProperties,
}: {
  sectionKey: SECTION_KEYS
  loadItems: LoadItems
  loadItemData: LoadItemData
  loadProperties: LoadProperties
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [searchName, setSearchName] = useState('')

  const handleSearchNameChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target

    setSearchName(value)
  }

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

    const items = await loadItems(searchName)

    if (items && !(items instanceof AppError)) {
      dispatch(setSearchedData({ sectionKey, items }))
    }

    setLoading(false)
  }

  const handleSelectAll = () => {
    dispatch(setSelectAll({ sectionKey, value: !allSelected }))
  }

  return (
    <SearchStyled.Component p={SearchStyled.adapter(darkMode)}>
      <div className="search-head">
        <Checkbox
          id="all"
          title="Seleccionar todo"
          text="Todo"
          checked={allSelected}
          handleChange={handleSelectAll}
        />
        <Icon iconName="fa-solid fa-cubes-stacked" style={{ size: FONT_SIZE.s }} />
        <div className="counter">{selectedItems}</div>
        <Separator
          style={{ long: NOT_FONT_SIZE.xs, backgroundColor: { dark: COLOR.g_8 } }}
        />
        <form className="form" onSubmit={loading ? undefined : handleSubmit}>
          <Input
            name={`search-${sectionKey}`}
            title="Buscar por nombre"
            showLabel={false}
            extraAttrs={{
              value: searchName,
              onChange: handleSearchNameChange,
              placeholder: 'Buscar...',
            }}
            style={{
              fontSize: 's',
              styled: css`
                width: 100%;
              `,
            }}
          />
          <Button
            title="Buscar"
            style={{
              tight: true,
              backgroundColor: {
                dark: COLOR.a,
              },
            }}
            extraAttrs={{
              type: 'submit',
              disabled: loading,
            }}
          >
            <AnimateState state={String(loading)}>
              <div className="button-content">
                {loading ? (
                  <Spinner />
                ) : (
                  <Icon
                    iconName="fa-solid fa-magnifying-glass"
                    style={{ size: FONT_SIZE.s }}
                  />
                )}
              </div>
            </AnimateState>
          </Button>
        </form>
      </div>
      <div className="search-items">
        {!loading &&
          items.map(item => (
            <Item
              sectionKey={sectionKey}
              resourceRef={{ id: item.id, text: item.data.meta.text }}
              loadItemData={loadItemData}
              loadProperties={loadProperties}
              key={item.id}
            />
          ))}
      </div>
    </SearchStyled.Component>
  )
}

export default Search
