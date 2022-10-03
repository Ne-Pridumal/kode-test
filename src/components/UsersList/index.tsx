import { FC, useState, createContext, useEffect } from 'react'
import { IPerson } from '../../types/IPerson'
import { verstkaDepartmentsList } from '../../types/Department'
import EmptyResult from './EmptyResult'
import './index.css'
import { useAppSelector } from '../../hooks/useReduxHooks'
import { EFilter } from '../../types/EFilter'
import Separator from './Separator'

interface IUserList {
  people: IPerson[]
}

const UsersList: FC<IUserList> = ({ people }) => {
  const { filter } = useAppSelector(state => state.workspace)
  const nowMonth = new Date().getUTCMonth()
  const nowDay = new Date().getUTCDate()
  return (
    <div className='user-list'>
      {people.length > 0
        ? people.map((person: IPerson, index: number) => {
          const personDate = new Date(person.birthday)
          const nextPersonDate = people[index + 1] ? new Date(people[index + 1].birthday) : null
          return (
            <div className='user'>
              <div className='user-container' key={person.id}>
                <div className='user__image-container'>
                  <img src={person.avatarUrl} />
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
        : <EmptyResult />
      }
    </div>
  )
}

export default UsersList
