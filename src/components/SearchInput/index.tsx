import { FC, useMemo, useRef } from "react";
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg'
import { ReactComponent as ShowFilterIcon } from '.../../assets/ShowFilterIcon.svg'
import './index.css'
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";

const SearchInput: FC = () => {
  const { filterBySearch } = useAppDispatch()
  const { people } = useAppSelector(state => state.workspace)
  return (
    <div className="search">
      <SearchIcon />
      <input
        className="search__input"
        placeholder="Введи имя, тег, почту..."
        onChange={(e) => filterBySearch(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
