import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const content = event.target.value;
    dispatch(setFilter(content));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filter" value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;