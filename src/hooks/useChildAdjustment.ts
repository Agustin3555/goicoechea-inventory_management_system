import { useRef, useState, useLayoutEffect } from 'react'

export const useChildAdjustment = () => {
  const childRef = useRef<HTMLDivElement>(null)
  const [childHeight, setChildHeight] = useState(0)

  useLayoutEffect(() => {
    const updateChildHeight = () => {
      if (childRef.current) setChildHeight(childRef.current.clientHeight)
    }

    // Actualizar la altura inicial del hijo
    updateChildHeight()

    /*
      Configuramos un observer de mutación para detectar cambios en el contenido del
      hijo
    */
    const observer = new MutationObserver(updateChildHeight)

    if (childRef.current)
      /*
        Se utiliza la opción { childList: true, subtree: true } al observar el
        elemento hijo. Esto permite que el observador detecte cambios en la lista
        de hijos del elemento y en los descendientes del elemento.
      */
      observer.observe(childRef.current, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return { childRef, childHeight }
}
