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
