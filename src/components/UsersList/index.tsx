import { FC, SyntheticEvent, } from 'react'
import { IPerson } from '../../types/IPerson'
import EmptyResult from './EmptyResult'
import { useAppSelector } from '../../hooks/useReduxHooks'
import { EFilter } from '../../types/EFilter'
import Separator from './Separator'
import { WorkspaceStateLoading } from '../../types/WorkspaceState'
import LoadingResult from './LoadingResult'

import AltImage from '../../assets/Alt.png'
import './index.css'

interface IUserList {
  people: IPerson[] | null
}


const UsersList: FC<IUserList> = ({ people }) => {
  const { filter, state } = useAppSelector(state => state.workspace)
  const nowMonth = new Date().getUTCMonth()
  const nowDay = new Date().getUTCDate()
  const imgErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { currentTarget } = e
    currentTarget.onerror = null
    currentTarget.src = AltImage
  }
  return (
    <div className='user-list default-margin'>
      {state === WorkspaceStateLoading.success && people && (people.length > 0
        ? people.map((person: IPerson, index: number) => {
          const personDate = new Date(person.birthday)
          const nextPersonDate = people[index + 1] ? new Date(people[index + 1].birthday) : null
          return (
            <div className='user'>
              <div className='user-container' key={person.id}>
                <div className='user__image-container'>
                  <img src={person.avatarUrl}
                    onError={imgErrorHandler} />
                </div>
                <div className='user__info-container'>
                  <p
                    className='user__name'
                  >
                    {`${person.firstName} ${person.lastName}`}
                  </p>
                  <p
                    className='user__tag'
                  >
                    {person.userTag}
                  </p>
                  <p
                    className='user__position'
                  >
                    {person.position}
                  </p>
                </div>
                {filter === EFilter.birthday && (
                  <div className='user__birthday'>
                    {`${personDate.getDate()} ${personDate.toLocaleString(undefined, { month: 'short' })}`}
                  </div>
                )}
                {(filter === EFilter.birthday && nextPersonDate
                  && new Date(2022, nowMonth, nowDay) > new Date(2022, nextPersonDate.getUTCMonth(), nextPersonDate.getUTCDate())
                  && new Date(2022, nowMonth, nowDay) < new Date(2022, personDate.getUTCMonth(), personDate.getUTCDate())) && (
                    <Separator />
                  )}
              </div>
            </div>
          )
        })
        : <EmptyResult />)
      }
      {state === WorkspaceStateLoading.loading && (
        <LoadingResult />
      )}
    </div>
  )
}

export default UsersList
