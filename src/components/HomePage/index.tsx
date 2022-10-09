import { FC, useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { WORKSPACE_STORAGE_NAME } from "../../types/consts";
import { EWorkspaceDepartments } from "../../types/Department";
import FilterModal from "../FilterModal";
import TopBar from "../TopBar";
import UsersList from "../UsersList";
import './index.css'

const HomePage: FC = () => {
  const { peopleDepartmentQuery, allPeopleQuery } = useAppDispatch()
  const { people, department, searchResult, displayFilter } = useAppSelector(state => state.workspace)
  useEffect(() => {
    if (department === EWorkspaceDepartments.all) {
      allPeopleQuery()
    }
    else {
      peopleDepartmentQuery(department)
    }
  }, [department])

  return (
    <div className="home">
      <TopBar />
      {!!searchResult ?
        <UsersList
          people={searchResult}
        /> :
        <UsersList
          people={people}
        />
      }
      {displayFilter && (
        <FilterModal />
      )}
    </div>
  )
}

export default HomePage
