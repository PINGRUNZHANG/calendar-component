import { Dayjs } from 'dayjs';
import { useContext } from 'react';

import allLocale from './locale';
import LocaleContext from './localeContext';

interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  toDayHandler: () => void;
}

function Header(props: HeaderProps) {
  const { curMonth, prevMonthHandler, nextMonthHandler, toDayHandler } = props;
  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocale[localeContext.locale];

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-value">{curMonth.format(CalendarContext.formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={toDayHandler}>
          {CalendarContext.today}
        </button>
      </div>
    </div>
  );
}

export default Header;
