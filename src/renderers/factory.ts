import { ISlide } from "../entities/content"
import AbstractRenderer from "./abstractRenderer"
import MarkdownRenderer from "./markdownRenderer"
import MessageRenderer from "./messageRenderer"

export default function getRenderer(slide: ISlide): AbstractRenderer | null {
    switch(slide.type) {
        case "message": {
            return new MessageRenderer(slide)
            break;
        }
        case "markdown": {
            return new MarkdownRenderer(slide)
            break;
        }
        default:{
            return null
            break;
        }
    }
}