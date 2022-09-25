import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHooks';

function App() {
  const { allPeopleQuery } = useAppDispatch()
  const selector = useAppSelector(state => state.workspace)
  console.log(selector)
  return (
    <div className="App">
      <button onClick={() => {
        allPeopleQuery();
      }}>test</button>
    </div>
  );
}

export default App;
