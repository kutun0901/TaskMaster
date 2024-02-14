import { monthNames } from "../constants/appInfos";


// Write as class so you don't have to export multiple function handle date time
export class HandleDateTime {
    static DateString = (num: number) => {
        const date = new Date(num);

        // return `${date.getMonth() + 1}/${date.getDate()}`
        return `${monthNames[date.getMonth()]}, ${date.getDate()} ${date.getDate()}`

    }

    static GetHour = (num: number) => {
        const date = new Date(num);

        return `${date.getHours()}`
    }
}
