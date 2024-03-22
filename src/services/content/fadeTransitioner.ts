import { TransitionProvider } from './taskManager'

export default class FadeTransitioner implements TransitionProvider {
    target: HTMLElement

    static kfTranslucent: Keyframe = {
        opacity: '0%',
    }

    static kfOpaque: Keyframe = {
        opacity: '100%',
    }

    constructor(target: HTMLElement) {
        this.target = target
    }

    hide(): Promise<void> {
        return this.target
            .animate(
                [FadeTransitioner.kfOpaque, FadeTransitioner.kfTranslucent],
                { duration: 1000 }
            )
            .finished.then(() => {
                this.target.style.setProperty('opacity', '0%')
            })
    }

    show(): Promise<void> {
        return this.target
            .animate(
                [FadeTransitioner.kfTranslucent, FadeTransitioner.kfOpaque],
                { duration: 1000 }
            )
            .finished.then(() => {
                this.target.style.setProperty('opacity', '100%')
            })
    }
}
