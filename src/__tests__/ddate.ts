import DDate from "../ddate"

describe('ddate module', () => {
    it('January 1st is first day of year', () => {
        let greg = new Date(2021, 0, 1)
        let disc = new DDate(greg)

        expect(disc.getDayOfYear()).toEqual(1)
    })

    it('January 5th is fifth day of year', () => {
        let greg = new Date(2021, 0, 5)
        let disc = new DDate(greg)

        expect(disc.getDayOfYear()).toEqual(5)
    })

 
    it('February 1st is 32nd day of year', () => {
        let greg = new Date(2021, 1, 1)
        let disc = new DDate(greg)

        expect(disc.getDayOfYear()).toEqual(32)
    })


    it('1st of March is 60th day of the year in non-leap years', () => {
        let greg = new Date(2021, 2, 1)
        let disc = new DDate(greg)

        expect(disc.getDayOfYear()).toEqual(60)
    })

    it('1st of March is 61st day of the year in leap years', () => {
        let greg = new Date(2020, 2, 1)
        let disc = new DDate(greg)

        expect(disc.getDayOfYear()).toEqual(61)
    })

    it('first day of year is also first day of week', () => {
        let greg = new Date(2021, 0, 1)
        let disc = new DDate(greg)

        expect(disc.getDayOfWeek()).toEqual(1)
    })


    it('January 1st is Sweetmorn', () => {
        let greg = new Date(2021, 0, 1)
        let disc = new DDate(greg)

        expect(disc.getDayOfWeekName()).toEqual("Sweetmorn")
    })

    it('March 1st is the same day of week in leap-year and non-leap-year', () => {
        let greg_leap = new Date(2020, 2, 1)
        let greg_nonleap = new Date(2021, 2, 1)
        let disc_leap = new DDate(greg_leap)
        let disc_nonleap = new DDate(greg_nonleap)

        expect(disc_leap.getDayOfWeekName()).toEqual(disc_leap.getDayOfWeekName())
    })

    it('29th of February in a leap year is St.Tibb`s day', () => {
        let greg = new Date(2020, 1, 29)
        let disc = new DDate(greg)

        expect(disc.getDayOfYear()).toEqual(60)
        expect(disc.getDayOfWeekName()).toEqual("St. Tibb's Day")
    })

})