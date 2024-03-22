export interface TransitionProvider {
    hide(): Promise<void>
    show(): Promise<void>
}

export interface TaskGenerator {
    next(): Promise<Task>
}

export interface Task {
    run(target: HTMLElement): void
    cancel(): void
    finished(): Promise<void>
}

export class TaskManager {
    private transitioner: TransitionProvider
    private generator: TaskGenerator
    private target: HTMLElement

    private flashTasks: Array<Task> = new Array<Task>()
    private currentTask: Task | undefined

    constructor(
        transitioner: TransitionProvider,
        generator: TaskGenerator,
        target: HTMLElement
    ) {
        this.transitioner = transitioner
        this.generator = generator
        this.target = target
    }

    async run() {
        this.currentTask =
            this.flashTasks.pop() ?? (await this.generator.next())

        this.transitioner
            .hide()
            .then(() => {
                if (this.currentTask) {
                    this.currentTask.run(this.target)
                }
            })
            .then(() => {
                return this.transitioner.show()
            })
            .then(() => {
                if (this.currentTask) {
                    return this.currentTask.finished()
                }
            })
            .then(() => {
                this.currentTask = undefined
                window.setTimeout(() => {
                    this.run()
                }, 100)
            })
    }

    flash(task: Task) {
        this.flashTasks.push(task)

        if (this.currentTask) {
            this.currentTask.cancel()
        }
    }
}
