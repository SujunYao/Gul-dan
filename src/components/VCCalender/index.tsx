import React, { MouseEvent, SFC, useState } from 'react';
import { getCurrentViewDays, D_WEEK_DAYS, D_MONTHS, getNextMonth, getPreviousMonth, getMonthDays, zeroPad } from '../../helpers/VCDCalenderHelper';
import './VCCalender.scss';


type props = {
    minDate?: Date,
    maxDate?: Date,
    currentDate?: Date,
    onClick?(event: MouseEvent<HTMLElement>): void,
}



const VCCalender: SFC<props> = ({ currentDate = new Date(), onClick, minDate, maxDate }) => {
    const [c_date_list, setCDateList] = useState(getCurrentViewDays(currentDate));
    const [c_date_info, setCDateInfo] = useState({
        cYear: currentDate.getFullYear(),
        cMonth: currentDate.getMonth(),
        cDay: currentDate.getDate(),
        cDate: currentDate
    });

    /* Switch the year from current year */
    const goSwtichYear = (goNext: boolean = false) => {
        const targetYear = goNext ? c_date_info.cYear + 1 : c_date_info.cYear - 1;
        const monthDays = getMonthDays(c_date_info.cMonth);
        const targetDay = monthDays && c_date_info.cDay > monthDays ? (c_date_info.cDay - 1) : c_date_info.cDay;
        const newSelectedDate = new Date(`${targetYear}-${zeroPad((c_date_info.cMonth + 1).toString(), 2)}-${targetDay}`)
        setCDateInfo({
            ...c_date_info,
            cDay: targetDay,
            cDate: newSelectedDate,
            cYear: targetYear
        });
        setCDateList(getCurrentViewDays(newSelectedDate));
    };

    /* Switch the month from current month */
    const goSwtichMonth = (goNext: boolean = false) => {
        const targetMonth = goNext ? getNextMonth(c_date_info.cDate) : getPreviousMonth(c_date_info.cDate);

        if (!targetMonth.month || !targetMonth.year) {
            return;
        }
        const monthDays = getMonthDays(targetMonth.month, targetMonth.year);
        const targetDay = monthDays && c_date_info.cDay > monthDays ? c_date_info.cDay-- : c_date_info.cDay;
        const newSelectedDate = new Date(`${targetMonth.year}-${zeroPad(targetMonth.month.toString(), 2)}-${targetDay}`);
        setCDateInfo({
            cYear: targetMonth.year,
            cMonth: targetMonth.month - 1,
            cDay: targetDay,
            cDate: newSelectedDate
        });
        setCDateList(getCurrentViewDays(newSelectedDate));
    };

    /* Render the header of the calender box */
    const VCCalenderHeader = () => {
        return (
            <div className='VCCalender_header'>
                <i className={'pre_year iconfont icon-ic_keyboard_arrow_le'} onClick={() => goSwtichYear(false)} />
                <i className={'pre_month iconfont icon-ic_keyboard_arrow_le'} onClick={() => goSwtichMonth(false)} />
                <span className='VCCalender_header_title'>{`${c_date_info.cYear} ${Object.values(D_MONTHS)[c_date_info.cMonth]}`}</span>
                <i className={'next_year iconfont icon-ic_keyboard_arrow_ri'} onClick={() => goSwtichYear(true)} />
                <i className={'next_month iconfont icon-ic_keyboard_arrow_ri'} onClick={() => goSwtichMonth(true)} />
            </div>
        );
    };

    /* Render the table header of the calender table(week days' title) */
    const VCCalenderGridHeader = () => {
        return (
            <thead className='VCCalender_grid_header'>
                <tr>
                    {Object.values(D_WEEK_DAYS).map(day => <th key={`th-${day}`}><span className='header_title'>{day}</span></th>)}
                </tr>
            </thead>
        );
    };

    const calcDayClasses = (_dayInfo: { year: number, month: number, day: number }): string => {
        let result = '';
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        if (_dayInfo.day === currentDay && _dayInfo.month === currentMonth && _dayInfo.year === currentYear) {
            result += ' currentDay'
        }
        if (_dayInfo.day === c_date_info.cDay && _dayInfo.month - 1 === c_date_info.cMonth) {
            result += ' selected'
        }
        console.log(JSON.stringify(c_date_info));
        console.log(JSON.stringify(_dayInfo));
        if (_dayInfo.month - 1 !== c_date_info.cMonth) {
            result += ' outOfCurrentMonth'
        }
        if (minDate) {
            const minYear = minDate.getFullYear();
            const minMonth = minDate.getMonth() + 1;
            const minDay = minDate.getDate();
            if (_dayInfo.year < minYear || (_dayInfo.year === minYear && _dayInfo.month < minMonth) || (_dayInfo.year === minYear && _dayInfo.month === minMonth && _dayInfo.day < minDay)) {
                result += ' outOfRange'
            }
        }
        if (maxDate) {
            const maxYear = maxDate.getFullYear();
            const maxMonth = maxDate.getMonth() + 1;
            const maxDay = maxDate.getDate();
            if (_dayInfo.year > maxYear || (_dayInfo.year === maxYear && _dayInfo.month > maxMonth) || (_dayInfo.year === maxYear && _dayInfo.month === maxMonth && _dayInfo.day > maxDay)) {
                result += ' outOfRange'
            }
        }
        return result;
    };

    /* Render the body of the calender table(rows, cells) */
    const VCCalenderContent = () => {
        let temp: { year: number, month: number, day: number }[] = [];
        let countRow = 0;
        return (
            <tbody className='VCCalender_grid_body'>
                {c_date_list.map((dayInfo, index) => {
                    const [year, month, day] = dayInfo;
                    let tr = undefined;
                    if (index !== 0 && index % 7 === 0) {
                        tr = <tr key={`row-${countRow}`}>
                            {temp.map(_dayInfo =>
                                <td key={`${_dayInfo.year}-${_dayInfo.month}-${_dayInfo.day}`}>
                                    <span className={calcDayClasses(_dayInfo)}>{_dayInfo.day}</span>
                                </td>)}
                        </tr>;
                        temp = [];
                        countRow++;
                    }
                    temp.push({ year, month, day });
                    return tr;
                })}
            </tbody>
        );
    };

    /* Render the footer of the calender box */
    const VCCalenderFooter = () => {
        return (<div className='VCCalender_footer'><span>{'Today'}</span></div>);
    };

    return (
        <div className='VCCalender_container'>
            <VCCalenderHeader />
            <div className='VCCalender_grid'>
                <table>
                    <VCCalenderGridHeader />
                    <VCCalenderContent />
                </table>
            </div>
            <VCCalenderFooter />
        </div>
    );
};
export default VCCalender;