import { ISlide, isISlide } from "./Slide"

export interface IContent extends Array<ISlide> {}

export function isIContent(o: any): o is IContent {
    if (!Array.isArray(o)) {
        return false
    }

    return o.every((elem) => isISlide(elem))
}

