export interface ISlide {
    type: string
    duration?: number
}

export function isISlide(o: any): o is ISlide {
    return 'type' in o
}

export interface IContent extends Array<ISlide> {}

export function isIContent(o: any): o is IContent {
    if (!Array.isArray(o)) {
        return false
    }

    return o.every((elem) => isISlide(elem))
}
