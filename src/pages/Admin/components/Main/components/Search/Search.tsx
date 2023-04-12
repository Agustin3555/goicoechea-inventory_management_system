import { Button, Icon, Input, Separator, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { setSearchedData } from '@/redux/states/searchedData.state'
import { AppStore } from '@/redux/store'
import { FormEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Checkbox, Item } from './components'
import { searchStyleAdapter, StylizedSearch } from './Search.styled'

const Search = ({ sectionId }: { sectionId: string }) => {
  const darkMode = useDarkMode()
  const [loading, setLoading] = useState(false)
  const items = useSelector((store: AppStore) => store.searchedData['products'])
  const dispatch = useDispatch()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: any) => {
    event.preventDefault()

    setLoading(true)

    try {
      // const products = await ProductsService.findAll()
      // dispatch(setSearchedData({ sectionId: 'products', data: products }))
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <StylizedSearch p={searchStyleAdapter(darkMode)}>
      <div className="search-head">
        <Checkbox id="all" title="Todo" />
        <Icon iconName="fa-solid fa-cubes-stacked" style={{ size: 's' }} />
        <div className="counter">3555</div>
        <Separator style={{ long: 'xs', backgroundColor: { dark: 'g-8' } }} />
        <form className="form" onSubmit={loading ? undefined : handleSubmit}>
          <Input
            name={`search-${sectionId}`}
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
          <Item key={item.data.id} id={item.data.id as number} title={item.data.name} />
        ))}
      </div>
    </StylizedSearch>
  )
}

export default Search
