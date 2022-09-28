import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useReduxHooks";
import { EWorkspaceDepartments } from '../../types/Department'
import './index.css'

const departmentsList = Object.values(EWorkspaceDepartments)

const DepartmentsList: FC = () => {
  const [activeDepartment, setActiveDepartment] = useState<EWorkspaceDepartments>(EWorkspaceDepartments.all)
  const { peopleDepartmentQuery } = useAppDispatch()

  useEffect(() => {
    peopleDepartmentQuery(activeDepartment)
  }, [activeDepartment])

  return (
    <div className="departments-container">
      {departmentsList.map((department: EWorkspaceDepartments) => {
        return (
          <div
            className={
              activeDepartment === department
                ? `department department_active`
                : `department`
            }
            key={department}
            onClick={() => setActiveDepartment(department)}
          >
            {department === 'all' ? 'все' : department.replace(/_/, ' ')}
          </div>
        )
      })}
    </div>
  )
}
export default DepartmentsList
