//用来把时间的毫秒，秒等没用的删掉

export function h0(timestamp = Date.now()) {
    const target = new Date(timestamp);

    //把不需要的都改成零
    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);

    return target.getTime();
}
