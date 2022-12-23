import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hide as hideModal } from './reducer'

export const connectModal = ({ name, getModalState = state => state.modal }) => Component => props => {
  const [isShow, setIsShow] = useState(false)
  const dispatch = useDispatch()
  const delay = useRef(null)
  const modalState = useSelector(getModalState)
  const show = modalState && modalState[name] && modalState[name].show
  const modalProps = modalState && modalState[name] && modalState[name].props || {}

  useEffect(() => {
    if (show) {
      clearTimeout(delay.current)
      return setIsShow(show)
    }
    delay.current = setTimeout(() => {
      setIsShow(false)
    }, 500)
  }, [show])

  const handleHide = () => {
    dispatch(hideModal(name))
  }

  if (!isShow) return null

  return (
    <Component
      {...props}
      {...modalProps}
      handleHide={handleHide}
      show={show}
    />
  )
}