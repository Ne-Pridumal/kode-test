import { FC, useContext, useEffect } from 'react'

const Separator: FC = () => {
  return (
    <div className='user__separator'>
      {new Date().getUTCFullYear() + 1}
    </div>
  )
}
export default Separator
