const catContent = (name, weight) => {
    return `
    <div class="cat-title">
        <input class="name" type="text" placeholder="Category Name" value="${name}">
        <input class="weight" type="number" placeholder="Weight e.g: 20" step="0.1" value="${weight}">
        <button onclick="return false" class="add-category">+</button>
        <button onclick="return false" class="delete-category">-</button>
        <button onclick="return false" class="normalize-category">Norm all</button>
    </div>
    `
}
const assnContent = (name, yourPoints, totalPoints) => {
    return `
        <input class="name" type="text" placeholder="Assignment 1" value="${name}">
        <input class="yourPoints" type="number" placeholder="Your Points" step="0.1" value="${yourPoints}">
        <input class="totalPoints" type="number" placeholder="Total Points" step="0.1" value="${totalPoints}">
        <button onclick="return false" class="add-assignment">+</button>
        <button onclick="return false" class="delete-assignment">-</button>
        <button onclick="return false" class="normalize-assignment">Norm</button>
    `
}
const raw = document.getElementById("loadin").value

let rowSplit = raw.split("|")

const className = rowSplit[0]

rowSplit.shift() // Deletes the first element

rowSplit.pop() // Deletes the last element

// INTERACT WITH DEFAULT PAGE

document.querySelector("#courseName").value = className

let curRow = rowSplit[0] // FIRST ROW
let curRowSplit = curRow.split("~")

document.querySelector(".cat-title .name").value = curRowSplit[3]
document.querySelector(".cat-title .weight").value = curRowSplit[4]

// SECOND ROW

curRow = rowSplit[1]
curRowSplit = curRow.split("~")

document.querySelector(".assignments .name").value = curRowSplit[3]
document.querySelector(".assignments .yourPoints").value = curRowSplit[5]
document.querySelector(".assignments .totalPoints").value = curRowSplit[6]

//THIRD ROW +

rowSplit.shift() // Deletes the first two elements
rowSplit.shift()
console.log("ran")
console.log(rowSplit)
for (let i = 0; i < rowSplit.length; i++) {
    let curRow = rowSplit[i]
    curRowSplit = curRow.split("~")

    if (curRowSplit[0] == "Y") { // New category
        let categories = document.querySelectorAll(".category")
        let lastCategory = categories[categories.length - 1]

        let newCategory = document.createElement("section");
        newCategory.setAttribute("class", "category");

        newCategory.innerHTML = catContent(curRowSplit[3], curRowSplit[4]);

        lastCategory.after(newCategory)
    } else { // New assignment within category
        let categories = document.querySelectorAll(".category")
        let lastCategory = categories[categories.length - 1]

        const newAssn = document.createElement("div");
        newAssn.setAttribute("class", "assignments");

        newAssn.innerHTML = assnContent(curRowSplit[3], curRowSplit[5], curRowSplit[6]);

        let lastThing = lastCategory.children[lastCategory.children.length - 1]

        lastThing.after(newAssn)
    }
}