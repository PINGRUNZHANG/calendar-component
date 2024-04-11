import './App.css';

import dayjs from 'dayjs';

import Calendar from './component/calendar';

function App() {
  return <Calendar value={dayjs('2023-11-08')} locale="en-US" />;
}

export default App;
