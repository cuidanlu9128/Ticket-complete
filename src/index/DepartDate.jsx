import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { h0 } from '../common/fp';
//(npm i dayjs --save)
import dayjs from 'dayjs';
import './DepartDate.css';
import PropTypes from 'prop-types';


export default function DepartDate(props) {

    const {
        time,
        onClick,
    } = props;

    //用零时刻表示同一天
    const h0OfDepart = h0(time);
    const departDate = new Date(h0OfDepart);

    const departDateString = useMemo(() => {
        return dayjs(time).format('YYYY-MM-DD');
    }, [h0OfDepart]);

    const isToday = h0OfDepart === h0();

    //departDate.getDay()返回周几的数字，可以用作index
    const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]
                            + (isToday ? '(今天)' : '');

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString}/>
            { departDateString }<span className="depart-week">{ weekString }</span>
        </div>
    );
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}
