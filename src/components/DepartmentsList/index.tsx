import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useReduxHooks";
import { setDepartment } from "../../store/routers/workspace";
import { EWorkspaceDepartments, verstkaDepartmentsList } from '../../types/Department'
import { WorkspaceStateLoading } from "../../types/WorkspaceState";
import './index.css'



const DepartmentsList: FC = () => {
  const dispatch = useDispatch()
  const { state, department: activeDepartment } = useAppSelector(state => state.workspace)

  const departmentClick = (e: EWorkspaceDepartments) => {
    if (state !== WorkspaceStateLoading.loading) {
      dispatch(setDepartment(e))
    }
  }

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
            onClick={() => departmentClick(department[1])}
          >
            {department[0]}
          </div>
        )
      })}
    </div>
  )
}
export default DepartmentsList
