import cs from 'classnames';
import { Dayjs } from 'dayjs';
import { useContext } from 'react';

import { CalendarProps } from '.';
import allLocale from './locale';
import LocaleContext from './localeContext';

interface MonthCalendarProps extends CalendarProps {
  curMonth: Dayjs;
  selectHandler?: (date: Dayjs) => void;
}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month');
  const day = startDate.day();

  const daysInfo = new Array<{ date: Dayjs; currentMonth: boolean }>(6 * 7);
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false,
    };
  }
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }
  return daysInfo;
}


function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext);
  const { value, curMonth, dateRender, dateInnerContent, selectHandler } = props;
  const CalendarLocale = allLocale[localeContext.locale];
  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const allDays = getAllDays(curMonth);

  function renderDays(
    days: Array<{ date: Dayjs; currentMonth: boolean }>,
  ) {
    const rows = [];
    //  6 * 7 个日期，按照 6 行，每行 7 个来组织成 jsx。
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            className={'calendar-month-body-cell' + (item.currentMonth ? ' calendar-month-body-cell-current' : '')}
            onClick={() => selectHandler?.(item.date)}>
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={cs(
                    'calendar-month-body-cell-date-value',
                    value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                      ? 'calendar-month-body-cell-date-selected'
                      : '',
                  )}>
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map(row => <div className="calendar-month-body-row">{row}</div>);
  }

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map(week => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {renderDays(allDays)}
      </div>
    </div>
  );
}

export default MonthCalendar;
