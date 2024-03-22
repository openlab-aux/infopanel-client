import axios from 'axios'
import { Task, TaskGenerator } from './taskManager'
import jsyaml from 'js-yaml'
import { IContent, ISlide, isIContent, isISlide } from '../../entities/content'
import AbstractRenderer from '../../renderers/abstractRenderer'
import { Renderer } from 'marked'
import getRendererFactory from '../../renderers/factory'
import getRenderer from '../../renderers/factory'

export default class HTTPYAMLTaskProvider implements TaskGenerator {
    private tasks: Array<Task> = new Array<Task>()

    private endpointURL: string

    constructor(endpointURL: string) {
        this.endpointURL = endpointURL
    }

    private static async loadTasks(url: string): Promise<Array<Task>> {
        return axios
            .get(url)
            .then((response) => {
                var data: object

                if (typeof response.data == 'object') {
                    data = response.data
                } else if (typeof response.data == 'string') {
                    data = jsyaml.load(response.data) as object
                } else {
                    return Promise.reject(
                        new Error('axios response.data of unknown type')
                    )
                }

                if (!isIContent(data)) {
                    return Promise.reject(new Error('Error validating Content'))
                } else {
                    return data as IContent
                }
            })
            .then((content: IContent) => {
                return content
                    .flatMap((slide) => {
                        let renderer = getRenderer(slide)
                        return renderer ?? []
                    })
                    .reverse()
            })
    }

    async next(): Promise<Task> {
        if (this.tasks.length == 0) {
            this.tasks = await HTTPYAMLTaskProvider.loadTasks(this.endpointURL)
        }

        let task = this.tasks.pop()
        if (!task) {
            throw new Error('no tasks available')
        } else {
            return task
        }
    }
}
