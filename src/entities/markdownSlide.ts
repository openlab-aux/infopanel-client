import { ISlide } from "./content";

export interface IMarkdownSlide extends ISlide{
    markdown: {
        text?: string
        columns?: {
            [index: number]: {
                width: number
                text: string
            }
        }

    }
}

function isIMarkdownSlide(slide: ISlide): slide is IMarkdownSlide {
    if(!('markdown' in slide)) {
        return false
    }
    if(!slide.markdown || slide.markdown) {
        return false
    }

    return true
}