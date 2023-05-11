type Procedure = (...args: any[]) => void

interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
}

export const debounce = <T extends Procedure>(
  func: T,
  waitMilliseconds = 50,
  options: DebounceOptions = {}
): T => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastExecutedTimestamp = 0
  let leadingExecuted = false
  let lastArgs: Parameters<T> | undefined

  const leading = options.leading ?? false
  const trailing = options.trailing ?? true

  const debouncedFunction = (thisAux: any, ...args: Parameters<T>) => {
    const now = Date.now()

    lastArgs = args

    function executeFunction() {
      func.apply(thisAux, lastArgs!)
      lastExecutedTimestamp = now
      leadingExecuted = false
    }

    if (!leadingExecuted && leading) {
      executeFunction()
      leadingExecuted = true
    } else {
      if (timeoutId !== undefined) clearTimeout(timeoutId)

      if (trailing) {
        timeoutId = setTimeout(() => {
          const timeSinceLastExecuted = now - lastExecutedTimestamp
          if (timeSinceLastExecuted >= waitMilliseconds) {
            executeFunction()
          }
        }, waitMilliseconds)
      } else {
        const timeSinceLastExecuted = now - lastExecutedTimestamp
        if (timeSinceLastExecuted >= waitMilliseconds) {
          executeFunction()
        }
      }
    }
  }

  // We cast the function type to any so that it can be returned without any issues
  return debouncedFunction as any
}
