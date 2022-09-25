import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/useReduxHooks';
import { peopleQuery } from './store/queries';

function App() {
  const { peopleQuery } = useAppDispatch()
  const selector = useAppSelector(state => state.workspace)
  console.log(selector)
  return (
    <div className="App">
      <button onClick={() => {
        peopleQuery();
      }}>test</button>
    </div>
  );
}

export default App;
