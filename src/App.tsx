import React from 'react';
import './App.css';
import { Backend } from './Backend';
import './tailwind.output.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredItems, updateList } from './store/store';
import ResponseItem from './ResponseItems/ResponseItem';
import debounce from 'lodash.debounce';

const BackendController = new Backend();

const App: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectFilteredItems);
  const [searchValue, setSearchValue] = React.useState('');
  React.useEffect(() => {
    BackendController.getData(dispatch);
  }, [])

  const handleSearchValue = React.useCallback((event) => {
    const value = event.target.value
    setSearchValue(value)
    debounce(() => dispatch(updateList(value)), 1000)()
  }, [searchValue])


  return (
    <div className="App">
      <input type='text' value={searchValue} className='mt-8 ml-4 w-48 h-8 border-black border-2 rounded-md outline-none pl-2' onChange={handleSearchValue} />
      <div className='flex flex-wrap'>
        {data.map(item => <ResponseItem {...item} key={item._id} />)}
      </div>
    </div>
  );
}

export default App;
