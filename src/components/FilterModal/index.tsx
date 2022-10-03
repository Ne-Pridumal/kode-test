import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as CloseIcon } from '../../assets/CloseIcon.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { setFilterDiplay } from '../../store/routers/workspace'
import { EFilter } from '../../types/EFilter'
import './index.css'


const FilterModal: FC = () => {
  const dispatch = useDispatch()
  const { filterByParam } = useAppDispatch()
  const { filter } = useAppSelector(state => state.workspace)
  useEffect(() => {
    document.getElementsByTagName('body')[0].style.cssText = "overflow: hidden; height: 100vh"
    return () => {
      document.getElementsByTagName('body')[0].style.cssText = "overflow: auto; height: auto"
    }
  }, [])
  const closeModal = () => {
    dispatch(setFilterDiplay(false))
  }
  const setFilter = (filter: EFilter) => {
    filterByParam(filter)
    dispatch(setFilterDiplay(false))
  }
  return (
    <div
      className='filter-modal'
    >
      <div className='filter-modal__background' onClick={closeModal} />
      <div className='filter-modal__container'>
        <h3 className='filter-modal__header'>Сортировка</h3>
        <button
          className='filter-modal__close-button'
          onClick={closeModal}
        >
          <CloseIcon />
        </button>
        <div className='filter-modal__choices-container'>
          <div className='filter-modal__choice'>
            <input
              className='filter-modal__radio'
              type='radio'
              id='alaphabet'
              name='filter'
              onChange={() => { setFilter(EFilter.alphabet) }}
              checked={filter === EFilter.alphabet}
            />
            По алфавиту
          </div>
          <div className='filter-modal__choice'>
            <input
              className='filter-modal__radio'
              type='radio'
              id='birthday'
              name='filter'
              onChange={() => { setFilter(EFilter.birthday) }}
              checked={filter === EFilter.birthday}
            />
            По дню рождения
          </div>
        </div>
      </div>
    </div>
  )
}
export default FilterModal
