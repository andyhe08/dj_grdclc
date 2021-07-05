const buttons = document.querySelectorAll("button")

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseover", function (e) {
        let className = e.target.id
        document.querySelector("#whereto").value = className
        console.log(e)
        console.log(className)
    })
}