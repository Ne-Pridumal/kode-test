import { FC, useState } from 'react'
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
  const [filterState, setFilterState] = useState<EFilter>(filter)
  const closeModal = () => {
    filterByParam(filterState)
    dispatch(setFilterDiplay(false))
  }

  return (
    <div
      className='filter-modal'
    >
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
              onClick={() => { setFilterState(EFilter.alphabet) }}
              checked={filterState === EFilter.alphabet}
            />
            По алфавиту
          </div>
          <div className='filter-modal__choice'>
            <input
              className='filter-modal__radio'
              type='radio'
              id='birthday'
              name='filter'
              onClick={() => { setFilterState(EFilter.birthday) }}
              checked={filterState === EFilter.birthday}
            />
            По дню рождения
          </div>
        </div>
      </div>
    </div>
  )
}
export default FilterModal
