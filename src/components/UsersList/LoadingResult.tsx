import { FC } from 'react'

const loadingArray = [...Array(15)]

const LoadingResult: FC = () => {
  return (
    <>
      {
        loadingArray.map((_: any, index: number) => (
          <div className='user user_loading-result'>
            <div className='user-container' key={index}>
              <div className='user__image-container'>
              </div>
              <div className='user__info-container'>
                <div style={{ width: '100%' }}>
                  <p
                    className='user__name'
                  >
                  </p>
                </div>
                <p
                  className='user__position'
                >
                </p>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}
export default LoadingResult
