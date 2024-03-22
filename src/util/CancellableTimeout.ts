export default class CancellableTimeout {
    public promise: Promise<void>
    private resolve: undefined | ((value: void | PromiseLike<void>) => void)

    constructor(duration: number) {
        this.promise = new Promise<void>((resolve) => {
            this.resolve = resolve
            window.setTimeout(() => {
                resolve()
            }, duration)
        })
    }

    cancel() {
        if (this.resolve) {
            this.resolve()
        }
    }
}
