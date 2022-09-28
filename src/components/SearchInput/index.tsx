import { FC } from "react";
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg'
import { ReactComponent as ShowFilterIcon } from '.../../assets/ShowFilterIcon.svg'
import './index.css'

const SearchInput: FC = () => {
  return (
    <div className="search">
      <SearchIcon />
      <input
        className="search__input"
        placeholder="Введи имя, тег, почту..."
      />
    </div>
  )
}

export default SearchInput
