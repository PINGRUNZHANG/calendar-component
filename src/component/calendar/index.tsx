import './index.scss';

import cs from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { CSSProperties, ReactNode } from 'react';

import Header from './header';
import LocaleContext from './localeContext';
import MonthCalendar from './monthCalendar';

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = props => {
  const { value, style, className, locale, onChange } = props;
  const [curValue, setCurValue] = React.useState<Dayjs>(value);
  const [curMonth, setCurMonth] = React.useState<Dayjs>(value);
  const classNames = cs('calendar', className);


  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function selectHandler(date: Dayjs) {
    changeDate(date)
  }

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  }

  function toDayHandler() {
    const date = dayjs(Date.now());
    changeDate(date)
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          toDayHandler={toDayHandler}
        />
        <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
      </div>
    </LocaleContext.Provider>
  );
};

export default Calendar;
