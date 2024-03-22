import CancellableTimeout from '../util/CancellableTimeout'
import SetContent from '../util/SetContent'
import AbstractRenderer from './abstractRenderer'
import { ISlide } from '../interfaces/Slide'

export interface IMessageSlide extends ISlide {
    message: {
        text: string
    }
}

function isIMessageSlide(slide: ISlide): slide is IMessageSlide {
    return 'message' in slide && typeof slide.message == 'object'
}

export default class MessageRenderer extends AbstractRenderer {
    stylesheet = `
    #slide {
        margin-top: 20%;
        font-size: 200%;
        text-align: center;
    }
    `

    timeout: CancellableTimeout | undefined

    finished(): Promise<void> {
        this.timeout = new CancellableTimeout(this.slide.duration ?? 10000)
        return this.timeout.promise
    }

    run(target: HTMLElement) {
        let messageSlide = this.slide as IMessageSlide

        SetContent(
            target,
            `<h1>${messageSlide.message.text}</h1>`,
            this.stylesheet
        )
    }

    cancel() {
        this.timeout?.cancel()
    }
}
