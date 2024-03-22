import DDateService from "./services/ddate";
import { TaskManager } from "./services/content/taskManager";
import FadeTransitioner from "./services/content/fadeTransitioner";
import HTTPYAMLTaskProvider from "./services/content/yamlTaskProvider";
import { IMessageSlide } from "./entities/messageSlide";
import MessageRenderer from "./renderers/messageRenderer";

window.addEventListener("DOMContentLoaded", (ev: Event) => {
    let dateElem = document.getElementById("date");
    if(dateElem != null) {
        new DDateService(dateElem).start();
    }

    let contentElem = document.getElementById("slide");
    let contentStyleElem = document.getElementById("content_style");
    if(contentElem!= null && contentStyleElem != null) {
        let mgr = new TaskManager(
            new FadeTransitioner(contentElem),
            new HTTPYAMLTaskProvider("/content.yaml"),
            contentElem
        )

        mgr.run()
    }
})