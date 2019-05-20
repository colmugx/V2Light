import Taro from '@tarojs/taro';
import moment from 'moment';

const transTime = time => moment(time * 1000);

export const formatTime = time => transTime(time).format('MM/DD/YY hh:mm');

export const timeFormNow = time =>
  transTime(time)
    .startOf('hour')
    .fromNow();

export const getStatusHeight = () => Taro.getSystemInfoSync().statusBarHeight;
