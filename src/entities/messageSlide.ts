import { ISlide } from './content'

export interface IMessageSlide extends ISlide {
    message: {
        text: string
    }
}

function isIMessageSlide(slide: ISlide): slide is IMessageSlide {
    return 'message' in slide && typeof slide.message == 'object'
}
