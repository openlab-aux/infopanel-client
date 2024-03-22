export default function SetContent(target: HTMLElement, html: string, css: string) {
    target.innerHTML = ""

    let style = document.createElement("style")
    style.setAttribute("scoped", "")
    style.textContent = css

    target.appendChild(style)

    let content = document.createElement("div")
    content.setAttribute("id", "markdown")
    content.innerHTML = html

    target.appendChild(content)
}