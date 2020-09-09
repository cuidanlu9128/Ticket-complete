import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { h0 } from '../common/fp';
import Header from './Header.jsx';

import './DateSelector.css';

function Day(props) {
    const { day, onSelect } = props;

    //如果day是空
    if (!day) {
        return <td className="null"></td>;
    }

    //每个人的样式不一样，所以用数组确定有哪些class
    const classes = [];

    //当天的零时刻
    const now = h0();

    //过去，就不能选
    if (day < now) {
        classes.push('disabled');
    }

    //周六周日放weekend
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend');
    }

    //看看是不是今天，是的话显示今天，否则传入day
    const dateString = now === day ? '今天' : new Date(day).getDate();

    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    );
}

Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};

function Week(props) {
    const { days, onSelect } = props;

    return (
        <tr className="date-table-days">
            {days.map((day, idx) => {
                return <Day key={idx} day={day} onSelect={onSelect} />;
            })}
        </tr>
    );
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

function Month(props) {
    const { startingTimeInMonth, onSelect } = props;

    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);

    let days = [];

    //初始月份已经传进来了，所以只要还是这个月就放进列表
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        //递增
        currentDay.setDate(currentDay.getDate() + 1);
    }

    //startDay.getDay()? 意思是星期日的话，会是false。。补齐null，再和现在的day连起来，？后面是补几个null最后再和原数组连一起
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days);

    //找到最后一天的日期，就是days数组中最后一个
    const lastDay = new Date(days[days.length - 1]);

    //在最后一天的尾部填满null
    days = days.concat(
        new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
    );

    //按周分组
    const weeks = [];

    for (let row = 0; row < days.length / 7; ++row) {
        //把days按照7天一份分成n组
        const week = days.slice(row * 7, (row + 1) * 7);
        //把每周放进weeks
        weeks.push(week);
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                        //月从0开始所以要加一
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}
                            月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {weeks.map((week, idx) => {
                    return <Week key={idx} days={week} onSelect={onSelect} />;
                })}
            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function DateSelector(props) {
    const { show, onSelect, onBack } = props;

    //new Date是当下的日期，把日期换成1，就是找到这个月的零时刻
    const now = new Date();
    //新的日期值用来遍历
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

    //把这个月放进list里
    const monthSequence = [now.getTime()];

    //把下个月放进list
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    //把下下个月放进去
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    return (
        <div className={classnames('date-selector', { hidden: !show })}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {monthSequence.map(month => {
                    return (
                        <Month
                            key={month}
                            onSelect={onSelect}
                            startingTimeInMonth={month}
                        />
                    );
                })}
            </div>
        </div>
    );
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};
