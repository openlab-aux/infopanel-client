export default class DDate {
    date: Date

    static seasons = [
        'Chaos',
        'Discord',
        'Confusion',
        'Bureaucracy',
        'The Aftermath',
    ]

    static weekday = [
        'Sweetmorn',
        'Boomtime',
        'Pungenday',
        'Prickle-Prickle',
        'Setting Orange',
    ]

    static apostle = ['Mungday', 'Mojoday', 'Syaday', 'Zaraday', 'Maladay']

    static holiday = [
        'Chaoflux',
        'Discoflux',
        'Confuflux',
        'Bureflux',
        'Afflux',
    ]

    constructor(date: Date) {
        this.date = date
    }

    static now(): DDate {
        return new DDate(new Date())
    }

    isLeapYear(): Boolean {
        return this.getYear() % 4 == 2
    }

    getDayOfYear(): number {
        const startOfYear = new Date(this.date.getFullYear(), 0, 0)
        const diff = this.date.valueOf() - startOfYear.valueOf()
        let days = Math.floor(diff / 1000 / 60 / 60 / 24)

        if (this.isLeapYear() && this.date.getMonth() >= 2) {
            days -= 1
        }

        return days
    }

    getSeason(): number {
        return Math.floor(this.getDayOfYear() / 73)
    }

    getSeasonName(): string {
        return DDate.seasons[this.getSeason()]
    }

    getSeasonDay(): number {
        return this.getDayOfYear() % 73
    }

    getDayOfWeek(): number {
        return this.getDayOfYear() % 5
    }

    getDayOfWeekName(): string {
        return DDate.weekday[this.getDayOfWeek()]
    }

    getYear(): number {
        return this.date.getFullYear() + 1166
    }

    toString(): string {
        let suffix = 'th'
        if (this.getSeasonDay() == 0) {
            suffix = 'st'
        } else if (this.getSeasonDay() == 1) {
            suffix = 'nd'
        } else if (this.getSeasonDay() == 2) {
            suffix = 'rd'
        }

        return `Today is ${this.getDayOfWeekName()}, the ${this.getSeasonDay()}${suffix} day of ${this.getSeasonName()} in the YOLD ${this.getYear()}`
    }
}
