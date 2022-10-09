import { FC, SyntheticEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { ReactComponent as BackArrow } from '../../assets/ArrowLeftIcon.svg'
import { ReactComponent as StarIcon } from '../../assets/StarIcon.svg'
import { ReactComponent as PhoneIcon } from '../../assets/PhoneIcon.svg'
import AltImage from '../../assets/Alt.png'

import './index.css'
import { WorkspaceStateLoading } from "../../types/WorkspaceState";

const DetailsPage: FC = () => {
  const { id } = useParams()
  const { peopleIdQuery } = useAppDispatch()
  useEffect(() => {
    if (!id) {
      throw new Error('wrong user id')
    }
    peopleIdQuery(id)
  }, [])
  const { state } = useAppSelector(state => state.workspace)
  const details = useAppSelector(state => state.details)
  const personDate = !!details.birthday ? new Date(details.birthday) : null
  const yearDiffMS = personDate ? new Date().getTime() - personDate.getTime() : null
  const yearDiff = yearDiffMS ? Math.abs(new Date(yearDiffMS).getFullYear() - 1970) : null
  const imgErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { currentTarget } = e
    currentTarget.onerror = null
    currentTarget.src = AltImage
  }
  return (
    <div className="details">
      <div className="top-bar">
        <div className="top-bar__header">
          <Link to={'/'}>
            <BackArrow />
          </Link>
        </div>
        <div className="top-bar__content">
          <div className={`details__image-container `}>
            <img src={details.avatarUrl} onError={imgErrorHandler} />
          </div>
          <div className="details__info-container">
            <p className={`details__name `}>
              {`${details.firstName} ${details.lastName}`}
              <span className="details__tag">
                {details.userTag}
              </span>
            </p>
            <p className="details__department">
              {details.department}
            </p>
          </div>
        </div>
      </div>
      <div className="main-info">
        <ul className="main-info__list">
          <li className="main-info__list-item">
            <StarIcon />
            <p>
              {!!personDate &&
                `${personDate.toLocaleString(undefined, { day: 'numeric', month: 'long' })} ${personDate.getFullYear()}`}
              <span>
                {!!yearDiff &&
                  `${yearDiff} ${yearDiff % 10 < 5 ? 'года' : 'лет'}`}
              </span>
            </p>
          </li>
          <li className="main-info__list-item">
            <PhoneIcon />
            <a href={`tel:${details.phone}`}>
              {details.phone}
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DetailsPage
