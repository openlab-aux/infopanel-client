import { ISlide } from '../entities/content'
import { Task } from '../services/content/taskManager'

export default abstract class AbstractRenderer implements Task {
    slide: ISlide
    stylesheet?: string

    constructor(slide: ISlide) {
        this.slide = slide
    }

    abstract run(target: HTMLElement): void
    abstract cancel(): void
    abstract finished(): Promise<void>
}
