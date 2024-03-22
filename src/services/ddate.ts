import DDate from '../ddate'

export default class DDateService {
    target: HTMLElement
    interval: number

    constructor(target: HTMLElement) {
        this.target = target
        this.interval = 0
    }

    start() {
        this.interval = window.setInterval(() => {
            let date = DDate.now()
            this.target.innerHTML = date.toString()
        }, 1000)
    }
}
