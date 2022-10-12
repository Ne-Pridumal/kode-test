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
import { Link } from 'react-router-dom'
import CriticalError from './CriticalError'

interface IUserList {
  people: IPerson[] | null
}

const nowMonth = new Date().getUTCMonth()
const nowDay = new Date().getUTCDate()
const nowYear = new Date().getFullYear()

const UsersList: FC<IUserList> = ({ people }) => {
  const { filter, state } = useAppSelector(state => state.workspace)
  const imgErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { currentTarget } = e
    currentTarget.onerror = null
    currentTarget.src = AltImage
  }
  return (
    <div className='user-list default-margin'>
      {state !== WorkspaceStateLoading.loading && people && (people.length > 0
        ? people.map((person: IPerson, index: number) => {
          const personDate = new Date(person.birthday)
          const prevPersonDate = people[index - 1] ? new Date(people[index - 1].birthday) : null
          return (
            <div className='user' key={person.id}>
              <div className='user-container'>
                {(filter === EFilter.birthday && prevPersonDate
                  && new Date(nowYear, nowMonth, nowDay) < new Date(nowYear, prevPersonDate.getUTCMonth(), prevPersonDate.getUTCDate())
                  && new Date(nowYear, nowMonth, nowDay) > new Date(nowYear, personDate.getUTCMonth(), personDate.getUTCDate())) && (
                    <Separator />
                  )}
                {(filter === EFilter.birthday && !prevPersonDate
                  && new Date(nowYear, nowMonth, nowDay) > new Date(nowYear, personDate.getUTCMonth(), personDate.getUTCDate())) && (
                    <Separator />
                  )}
                <Link to={`/user/${person.id}`} className='user__image-container'>
                  <img src={person.avatarUrl}
                    onError={imgErrorHandler} />
                </Link>
                <Link to={`/user/${person.id}`} className='user__info-container'>
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
                </Link>
                {filter === EFilter.birthday && (
                  <div className='user__birthday'>
                    {personDate.toLocaleString(undefined, {
                      day: 'numeric', month: 'short'
                    })}
                  </div>
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
      {state === WorkspaceStateLoading.crashed && !people && (
        <CriticalError />
      )}
    </div>
  )
}

export default UsersList
