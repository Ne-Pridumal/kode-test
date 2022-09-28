import { FC } from "react";
import SearchInput from "../SearchInput";
import './index.css'

const Home: FC = () => {
  return (
    <div className="home">
      <h2 className="home__title">
        Поиск
      </h2>
      <SearchInput />
    </div>
  )
}

export default Home
