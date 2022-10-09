import { FC } from "react";
import UFO from '../../assets/UFO.png'
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";

const CriticalError: FC = () => {
  const { peopleDepartmentQuery } = useAppDispatch()
  const { department } = useAppSelector(state => state.workspace)
  return (
    <div className="critical-error">
      <img src={UFO} />
      <p
        className="critical-error__title">
        Какой-то сверхразум всё сломал
      </p>
      <p
        className="critical-error__subtitle">
        Постараемся быстро починить
      </p>
      <p
        className="critical-error__reboot-text"
        onClick={() => peopleDepartmentQuery(department)}
      >
        Попробовать снова
      </p>
    </div>
  )
}
export default CriticalError
