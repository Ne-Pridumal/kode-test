import { FC } from 'react'
import { useAppSelector } from '../../hooks/useReduxHooks'
import { WorkspaceStateLoading } from '../../types/WorkspaceState'
import DepartmentsList from '../DepartmentsList'
import SearchInput from '../SearchInput'

import './index.css'

const TopBar: FC = () => {
  const { state } = useAppSelector(state => state.workspace)
  const loadingStateClass =
    state === WorkspaceStateLoading.loading
      ? 'top-bar__state_loading'
      : state === WorkspaceStateLoading.crashed
        ? 'top-bar__state_crashed'
        : ''

  return (
    <div className='top-bar'>
      <div className={`top-bar__state ${loadingStateClass}`}>
        <h2 className="top-bar__title">
          Поиск
        </h2>
        {state === WorkspaceStateLoading.success &&
          <SearchInput />}
        {state === WorkspaceStateLoading.loading &&
          <div className='top-bar__loading-placeholder'>
            Секундочку, гружусь...
          </div>
        }
        {state === WorkspaceStateLoading.crashed &&
          <div className='top-bar__loading-placeholder'>
            Не могу обновить данные. Проверь соединение с интернетом.
          </div>
        }
      </div>
      <DepartmentsList />
    </div>
  )
}
export default TopBar;
