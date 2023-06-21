import {
  AnimateState,
  Button,
  ConfirmationButton,
  Icon,
  Spinner,
} from '@/components'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import { useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, FONT_SIZE, MICROINTERACTION, NOT_FONT_SIZE } from '@/styles'
import { ItemStyled } from './Item.styled'
import { css } from 'styled-components'
import { SECTION_KEYS } from '@/models'
import { AppStore, loadItemInfo, toggleSelectItem } from '@/redux'
import { AppError, MAIN_GAP, sleep } from '@/tools'
import { ResourceRef } from '@/pages/Admin/tools'
import { LoadItemData, LoadProperties } from '../../tools'

export enum STATUS {
  loading,
  error,
  ready,
}

const Item = ({
  sectionKey,
  resourceRef,
  loadItemData,
  loadProperties,
}: {
  sectionKey: SECTION_KEYS
  resourceRef: ResourceRef
  loadItemData: LoadItemData
  loadProperties: LoadProperties
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const { childRef, childHeight } = useChildAdjustment()
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(STATUS.loading)
  const { id, text } = resourceRef
  const item = useSelector((store: AppStore) => store.searchedData[sectionKey][id])

  const handleSelectItem = () => {
    dispatch(toggleSelectItem({ sectionKey, id }))
  }

  const handleToggleExpandClick = async () => {
    setExpanded(prevExpanded => !prevExpanded)

    if (!expanded && status !== STATUS.ready) {
      if (item.info) {
        setStatus(STATUS.ready)
        return
      }

      setStatus(STATUS.loading)

      await sleep(500)
      const itemData = await loadItemData(id)

      if (itemData && !(itemData instanceof AppError)) {
        dispatch(loadItemInfo({ sectionKey, id, info: itemData }))

        setStatus(STATUS.ready)
        return
      }

      setStatus(STATUS.error)
    }
  }

  const handleDeleteItem = async () => {
    // TODO: TASK. Eliminar

    return false
  }

  const componentsByStatus = {
    [STATUS.loading]: (
      <div className="icon-C">
        <Spinner
          style={{
            semicircleBackgroundColor: { dark: COLOR.g_10, bright: COLOR.g_4 },
            lineBackgroundColor: { dark: COLOR.g_2, bright: COLOR.g_12 },
          }}
        />
      </div>
    ),
    [STATUS.error]: (
      <div className="icon-C">
        <Icon
          iconName="fa-solid fa-xmark"
          style={{
            size: FONT_SIZE.m,
          }}
        />
      </div>
    ),
    [STATUS.ready]: (
      <div className="properties">{item && loadProperties(id, item)}</div>
    ),
  }

  return (
    <ItemStyled.Component p={ItemStyled.adapter(darkMode, expanded, childHeight)}>
      <div className="item-head">
        <Checkbox
          id={id.toString()}
          title={`Seleccionar ${text}`}
          text={text}
          checked={item.meta.selected}
          handleChange={handleSelectItem}
          style={{
            inactiveValueColor: { dark: COLOR.g_0, bright: COLOR.g_16 },
            inactiveBackgroundColor: { dark: COLOR.g_15, bright: COLOR.g_1 },
            styled: css`
              width: ${NOT_FONT_SIZE['3xl']};
            `,
          }}
        />
        <div className="actions">
          <Button
            title={expanded ? 'Cerrar' : 'Abrir'}
            handleClick={handleToggleExpandClick}
            style={{
              padding: MAIN_GAP,
              backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
              styled: css`
                display: flex;
                justify-content: center;
                flex-grow: 1;
              `,
            }}
          >
            <Icon
              iconName="fa-solid fa-chevron-down"
              style={{
                styled: css`
                  transition: transform ${MICROINTERACTION.s} ease-out;
                  transform: rotate(${expanded ? '-180' : '0'}deg);
                `,
              }}
            />
          </Button>
          {/* <ConfirmationButton
            title={`Borrar ${text}`}
            iconName="fa-solid fa-trash"
            trigger={handleDeleteItem}
            style={{
              borderRadius: NOT_FONT_SIZE['4xs'],
              primaryBackgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
            }}
          /> */}
        </div>
      </div>
      <div ref={childRef} className="item-body">
        <AnimateState state={String(status)}>
          <div className="body-AC">{componentsByStatus[status]}</div>
        </AnimateState>
      </div>
    </ItemStyled.Component>
  )
}

export default Item
