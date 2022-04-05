import { useEffect, useState } from 'react'

const containImage = url => {
  return new Promise(resolve => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      resolve(true)
    }
    img.onerror = () => {
      resolve(false)
    }
  })
}

export const useImageCheck = path => {
  const [validOrEmptyPath, setValidOrEmptyPath] = useState('')

  useEffect(() => {
    let isSubscribed = true

    containImage(path).then(result => {
      if (isSubscribed) {
        setValidOrEmptyPath(result ? path : '')
      }
    })

    return () => {
      isSubscribed = false
    }
  }, [path])

  return validOrEmptyPath
}
