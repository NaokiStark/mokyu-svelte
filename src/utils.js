import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import locale_es from 'dayjs/locale/es'; //weird
export const getElapsed = function (dateString) {

    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.locale(locale_es); //weird
    return dayjs(dateString).fromNow();

}