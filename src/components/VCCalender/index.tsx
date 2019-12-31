import React, { MouseEvent, SFC, useState } from 'react';
import { getCurrentViewDays, C_YEAR, C_MONTH, D_WEEK_DAYS, D_MONTHS } from '../../helpers/VCDCalenderHelper';
import './VCCalender.scss';


type props = {
    // mixDate?: Date,
    // maxDate?: Date,
    currentDate?: Date,
    onClick?(event: MouseEvent<HTMLElement>): void,
}



const VCCalender: SFC<props> = ({ currentDate = new Date(), onClick: selectDateHandler }) => {
    const [dateInfo, setDateInfo] = useState(getCurrentViewDays(currentDate));

    const VCCalenderHeader = () => {
        return (
            <div className='VCCalender_header'>
                <i className={'pre_year iconfont icon-ic_keyboard_arrow_le'} />
                <i className={'pre_month iconfont icon-ic_keyboard_arrow_le'} />
                <span className='VCCalender_header_title'>{`${currentDate.getFullYear()} ${Object.values(D_MONTHS)[currentDate.getMonth()]}`}</span>
                <i className={'next_month iconfont icon-ic_keyboard_arrow_ri'} />
                <i className={'next_year iconfont icon-ic_keyboard_arrow_ri'} />
            </div>
        );
    };

    const VCCalenderGridHeader = () => {
        return (
            <thead className='VCCalender_grid_header'>
                <tr>
                    {Object.values(D_WEEK_DAYS).map(day => <th key={`th-${day}`}><span className='header_title'>{day}</span></th>)}
                </tr>
            </thead>
        );
    };

    const VCCalenderContent = () => {
        let temp: { year: number, month: number, day: number }[] = [];
        let countRow = 0;
        return (
            <tbody className='VCCalender_grid_body'>
                {dateInfo.map((dayInfo, index) => {
                    const [year, month, day] = dayInfo;
                    let tr = undefined;
                    if (index !== 0 && index % 7 === 0) {
                        tr = <tr key={`row-${countRow}`}>{temp.map(_dayInfo => <td key={`${_dayInfo.year}-${_dayInfo.month}-${_dayInfo.day}`}><span>{_dayInfo.day}</span></td>)}</tr>;
                        temp = [];
                        countRow++;
                    }
                    temp.push({ year, month, day });
                    return tr;
                })}
            </tbody>
        );
    };

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