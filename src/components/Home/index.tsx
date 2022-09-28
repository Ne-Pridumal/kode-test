import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import DepartmentsList from "../DepartmentsList";
import SearchInput from "../SearchInput";
import UsersList from "../UsersList";
import './index.css'

const Home: FC = () => {
  const { allPeopleQuery } = useAppDispatch()
  const { people, state } = useAppSelector(state => state.workspace)
  useEffect(() => {
    allPeopleQuery()
  }, [])
  return (
    <div className="home">
      <h2 className="home__title">
        Поиск
      </h2>
      <SearchInput />
      <DepartmentsList />
      <UsersList
        people={people}
        loadingState={state}
      />
    </div>
  )
}

export default Home
