interface IConfig {
    contentUrl: string
}

export default class ConfigService {
    private config_name = "infopanel_config"

    getConfig(): IConfig {
        let currentConfigStr = localStorage.getItem(this.config_name)
        if(!currentConfigStr) {
            let defaultConfig: IConfig = { contentUrl: "/content.yaml"}
            localStorage.setItem(
                this.config_name,
                JSON.stringify(defaultConfig)
            )
            return defaultConfig
        } else {
            return JSON.parse(currentConfigStr) as IConfig
        }
    }
}