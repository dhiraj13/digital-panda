import { RefObject, useEffect } from "react"

type Event = MouseEvent | TouchEvent

export const useOnPressEscape = (setEvent: (e: null) => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEvent(null)
      }
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [setEvent])
}
