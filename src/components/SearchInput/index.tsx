import { FC } from "react";
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg'
import { ReactComponent as ShowFilterIcon } from '../../assets/ShowFilterIcon.svg'
import './index.css'
import { useAppDispatch } from "../../hooks/useReduxHooks";
import { useDispatch } from "react-redux";
import { setFilterDiplay } from "../../store/routers/workspace";

const SearchInput: FC = () => {
  const { filterBySearch } = useAppDispatch()
  const dispatch = useDispatch()
  return (
    <div className="search">
      <SearchIcon />
      <input
        className="search__input"
        placeholder="Введи имя, тег, почту..."
        onChange={(e) => filterBySearch(e.target.value)}
      />
      <button
        className="search__filter-button"
        onClick={() => { dispatch(setFilterDiplay(true)) }}
      >
        <ShowFilterIcon />
      </button>
    </div>
  )
}

export default SearchInput
