import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDepartment } from "../../store/routers/workspace";
import { EWorkspaceDepartments, verstkaDepartmentsList } from '../../types/Department'
import './index.css'



const DepartmentsList: FC = () => {
  const [activeDepartment, setActiveDepartment] = useState<EWorkspaceDepartments>(EWorkspaceDepartments.all)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setDepartment(activeDepartment))
  }, [activeDepartment])

  return (
    <div className="departments-container">
      {verstkaDepartmentsList.map((department) => {
        return (
          <div
            className={
              activeDepartment === department[1]
                ? `department department_active`
                : `department`
            }
            key={department[0]}
            onClick={() => setActiveDepartment(department[1])}
          >
            {department[0]}
          </div>
        )
      })}
    </div>
  )
}
export default DepartmentsList
