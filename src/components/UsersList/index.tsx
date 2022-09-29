import { FC } from 'react'
import { IPerson } from '../../types/IPerson'
import EmptyResult from './EmptyResult'
import './index.css'

interface IUserList {
  people: IPerson[]
}

const UsersList: FC<IUserList> = ({ people }) => {
  return (
    <div className='user-list'>
      {people.length > 0
        ? people.map((person: IPerson, index: number) => {
          return (
            <div className='user-container' key={person.id + index}>
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
                  className='user__department'
                >
                  {person.department.replace(/_/, ' ')}
                </p>
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
