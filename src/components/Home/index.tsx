import { FC, useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { EWorkspaceDepartments } from "../../types/Department";
import { WorkspaceStateLoading } from "../../types/WorkspaceState";
import DepartmentsList from "../DepartmentsList";
import FilterModal from "../FilterModal";
import SearchInput from "../SearchInput";
import UsersList from "../UsersList";
import './index.css'

const Home: FC = () => {
  const { peopleDepartmentQuery, allPeopleQuery } = useAppDispatch()
  const { people, state, department, searchResult, displayFilter } = useAppSelector(state => state.workspace)
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
      <h2 className="home__title">
        Поиск
      </h2>
      <SearchInput />
      <DepartmentsList />
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

export default Home
