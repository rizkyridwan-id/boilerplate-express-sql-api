import * as moment from "moment-timezone";

class DateService {
  localDateTime() {
    const date = moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    return date;
  }

  localDate() {
    const date = (moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD") + " 00:00:00");
    return date;
  }

  localTime() {
    const date = moment.tz(new Date(), "Asia/Jakarta").format("HH:mm:ss");
    return date;
  }

  dateToString(dateToString: any) {
    const date = dateToString || new Date();
    const stringDate = moment.tz(date, "Asia/Jakarta").format("YYYY-MM-DD").toString();
    return stringDate;
  }

  timeToString(dateToString: any) {
    const date = dateToString || new Date();
    const stringDate = moment.tz(date, "Asia/Jakarta").format("HH:mm:ss").toString();
    return stringDate;
  }
}

export default DateService;