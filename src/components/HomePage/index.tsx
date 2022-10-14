import { FC, useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { EWorkspaceDepartments } from "../../types/Department";
import FilterModal from "../FilterModal";
import TopBar from "../TopBar";
import UsersList from "../UsersList";
import './index.css'

const HomePage: FC = () => {
  const { allPeopleQuery } = useAppDispatch()
  const { people, department, searchResult, displayFilter } = useAppSelector(state => state.workspace)
  useEffect(() => {
    // раздельные запросы только для теста, по идее можно просто использовать peopleDepartmentQuery(EWorkspaceDepartments.all)
    if (department === EWorkspaceDepartments.all && people === null) {
      allPeopleQuery()
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
