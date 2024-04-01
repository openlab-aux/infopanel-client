import * as marked from 'marked'

import CancellableTimeout from '../util/CancellableTimeout'
import SetContent from '../util/SetContent'
import AbstractRenderer from './abstractRenderer'
import { ISlide } from '../interfaces/Slide'

interface MarkdownColunn {
    width: number
    text: string
}

export interface IMarkdownSlide extends ISlide {
    markdown: {
        text?: string
        columns?: Array<MarkdownColunn>
    }
}

function isIMarkdownSlide(slide: ISlide): slide is IMarkdownSlide {
    if (!('markdown' in slide)) {
        return false
    }
    if (!slide.markdown || slide.markdown) {
        return false
    }

    return true
}

export default class MarkdownRenderer extends AbstractRenderer {
    timeout: CancellableTimeout | undefined
    cancelled = false

    finished(): Promise<void> {
        this.timeout = new CancellableTimeout(this.slide.duration ?? 10000)
        if (this.cancelled) {
            this.timeout.cancel()
        }
        return this.timeout.promise
    }

    run(target: HTMLElement): void {
        let currentSlide = this.slide as IMarkdownSlide

        target.innerHTML = ''

        marked.use({
            pedantic: false,
            gfm: true,
            breaks: false,
        })

        if (currentSlide.markdown.text) {
            let style = `
                #markdown {
                    width: 95%;
                    margin-left: 2.5%;
                    font-size: 260%;
                }
            `

            marked
                .parse(currentSlide.markdown.text, { async: true })
                .then((html) => {
                    SetContent(target, html, style)
                })
        } else if (currentSlide.markdown.columns !== undefined) {
            let style = currentSlide.markdown.columns.reduce(
                (prev, current, index) => {
                    return (
                        prev +
                        `
                        #col-${index} {
                            flex: ${current.width}%;
                        }
                        `
                    )
                },
                `
                #markdown {
                    width: 95%;
                    margin-left: 2.5%;
                    font-size: 260%;
                    display: flex;
                }
                `
            )

            Promise.allSettled(
                currentSlide.markdown.columns.map((column) =>
                    marked.parse(column.text, { async: true })
                )
            ).then((results) => {
                if (!results.every((result) => result.status == 'fulfilled')) {
                    console.error('one or more columns failed to parse.')
                    return
                }

                let html = ''

                results
                    .flatMap((result) =>
                        result.status == 'fulfilled' ? [result.value] : []
                    )
                    .forEach((columnHtml, index) => {
                        html += `<div id="col-${index}">${columnHtml}</div>`
                    })

                SetContent(target, html, style)
            })
        }
    }

    cancel() {
        this.cancelled = true
        this.timeout?.cancel()
    }
}
