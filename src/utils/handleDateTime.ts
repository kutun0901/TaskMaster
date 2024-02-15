import { monthNames } from "../constants/appInfos";


// Write as class so you don't have to export multiple function handle date time
export class HandleDateTime {
    static DateString = (num: Date) => {
        const date = new Date(num);

        // return `${date.getMonth() + 1}/${date.getDate()}`
        return `${monthNames[date.getMonth()]}, ${date.getDate()} ${date.getFullYear()}`

    }

    static GetHour = (num: Date) => {
        const date = new Date(num);

        const hour = date.getHours();
        return hour > 12 ? `${hour - 12} PM` : `${hour} AM`
    }
}
