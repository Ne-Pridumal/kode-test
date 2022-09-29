import { FC } from 'react'
import SearchImage from '../../assets/SearchImage.png'

const EmptyResult: FC = () => {
  return (
    <div
      className='empty-result'>
      <img src={SearchImage} />
      <p
        className='empty-result__title'
      >
        Мы никого не нашли
      </p>
      <p
        className='empty-result__subtitle'
      >
        Попробуйте скорректировать запрос
      </p>
    </div>
  )
}
export default EmptyResult
