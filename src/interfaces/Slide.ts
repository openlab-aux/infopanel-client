export interface ISlide {
    type: string
    duration?: number
}

export function isISlide(o: any): o is ISlide {
    return 'type' in o
}

