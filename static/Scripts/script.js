// Adding categories
const addCategoryHTML = (e) => {
    const content = `
    <div class="cat-title">
        <input class="name" type="text" placeholder="Category Name">
        <input class="weight" type="number" placeholder="Weight e.g: 20" step="0.1">
        <button onclick="return false" class="add-category">+</button>
        <button onclick="return false" class="delete-category">-</button>
        <button onclick="return false" class="normalize-category">Norm all</button>
    </div>
    <div class="assignments">
        <input class="name" type="text" placeholder="Assignment 1">
        <input class="yourPoints" type="number" placeholder="Your Points" step="0.1">
        <input class="totalPoints" type="number" placeholder="Total Points" step="0.1">
        <button onclick="return false" class="add-assignment">+</button>
        <button onclick="return false" class="delete-assignment">-</button>
        <button onclick="return false" class="normalize-assignment">Norm</button>
    </div>
    `;

    const newCat = document.createElement("section");
    newCat.setAttribute("class", "category");

    newCat.innerHTML = content;

    const cur = e.target.parentNode.parentNode;

    cur.after(newCat);

}

const addAssignmentHTML = (e) => {
    const content = `
        <input class="name" type="text" placeholder="Assignment 1">
        <input class="yourPoints" type="number" placeholder="Your Points" step="0.1">
        <input class="totalPoints" type="number" placeholder="Total Points" step="0.1">
        <button onclick="return false" class="add-assignment">+</button>
        <button onclick="return false" class="delete-assignment">-</button>
        <button onclick="return false" class="normalize-assignment">Norm</button>
    `

    const newAssign = document.createElement("div");
    newAssign.setAttribute("class", "assignments");

    newAssign.innerHTML = content;

    const newDiv = e.target.parentNode;

    newDiv.after(newAssign);
}

const deleteCategory = (e) => {
    if (document.querySelectorAll(".category").length > 1) {
        let par = e.target.parentNode.parentNode;
        par.remove();
    }
}


const normalizeCategory = (e) => {
    let cat = e.target.parentNode.parentNode;

    for (let i = 0; i < cat.querySelectorAll(".assignments").length; i++) {
        let curA = cat.querySelectorAll(".assignments")[i];
        let curYP = parseFloat(curA.querySelector(".yourPoints").value);
        let curTP = parseFloat(curA.querySelector(".totalPoints").value);

        if (Object.is(curYP, NaN)) {
            curYP = 0;
        }
        if (Object.is(curTP, NaN)) {
            continue;
        }

        let grade = curYP * 100 / curTP
        curA.querySelector(".yourPoints").value = grade.toFixed(1);
        curA.querySelector(".totalPoints").value = 100;
    }
}

const normalizeAssignment = (e) => {
    let curA = e.target.parentNode;

    let curYP = parseFloat(curA.querySelector(".yourPoints").value);
    let curTP = parseFloat(curA.querySelector(".totalPoints").value);

    if (Object.is(curTP, NaN)) {
        return;
    }
    if (Object.is(curYP, NaN)) {
        curYP = 0;
    }

    let grade = curYP * 100 / curTP
    curA.querySelector(".yourPoints").value = grade.toFixed(1);
    curA.querySelector(".totalPoints").value = 100;
}

const reassignDefaults = (place) => {
    let categoryName = place.parentNode.parentNode.querySelector(".cat-title").querySelector(".name").value;
    if (categoryName === "") {
        categoryName = "Assignment"
    }
    let childrenArray = place.parentNode.parentNode.children
    for (let i = 1; i < childrenArray.length; i++) {
        childrenArray[i].querySelector("input").setAttribute("placeholder", categoryName + " " + i);
    }
}

const passiveDefAssign = () => {
    let categories = document.querySelectorAll(".category")
    for (let i = 0; i < categories.length; i++) {
        let curCat = categories[i]
        let catName = curCat.querySelector(".cat-title .name").value
        if (catName === "") {
            catName = "Assignment"
        }
        let childs = curCat.children
        for (let i = 1; i < childs.length; i++) {
            childs[i].querySelector("input").setAttribute("placeholder", catName + " " + i);
        }
    }

}

const formatToSend = () => {
    let end = document.querySelector("#courseName").value; //START WITH CLASS NAME
    end += "|"
    const categories = document.querySelectorAll(".category");

    for (let i = 0; i < categories.length; i++) {
        let catName = categories[i].querySelector(".name").value;
        let weight = categories[i].querySelector(".weight").value;

        end += "Y~" + i + "~999~" + catName + "~" + weight + "~~|"

        const assignments = categories[i].querySelectorAll(".assignments");
        for (let j = 0; j < assignments.length; j++) {
            let assnName = assignments[j].querySelector(".name").value;
            let yS = assignments[j].querySelector(".yourPoints").value;
            let tS = assignments[j].querySelector(".totalPoints").value;

            end += "N~" + i + "~" + j + "~" + assnName + "~~" + yS + "~" + tS + "|"
        }
    }
    document.querySelector("#sendback").setAttribute("value", end);
}

const deleteAssignment = (e) => {
    if (e.target.parentNode.parentNode.querySelectorAll(".assignments").length > 1) {
        let par = e.target.parentNode;
        let ano = par.parentNode.querySelector(".add-assignment")
        par.remove();
        reassignDefaults(ano)
    }
}

const clicked = (e) => {
    if (e.target.className === "add-assignment") {
        addAssignmentHTML(e);
        reassignDefaults(e.target);
    }
    if (e.target.className === "add-category") {
        addCategoryHTML(e);
    }
    if (e.target.className === "delete-category") {
        deleteCategory(e);
    }
    if (e.target.className === "delete-assignment") {
        deleteAssignment(e);
    }
    if (e.target.className === "normalize-category") {
        normalizeCategory(e);
    }
    if (e.target.className === "normalize-assignment") {
        normalizeAssignment(e)
    }
}

document.querySelector("body").addEventListener("click", clicked);

document.querySelector("body").addEventListener("input", function (e) {
    if (e.target.id != "courseName") {
        reassignDefaults(e.target);
    }
});

const dispWarning = () => {

    if (document.querySelector(".error") != null) {
        return;
    }

    let n = document.createElement("h3");
    n.classList.add("error");
    n.innerText = `Warning! Empty Category`;

    let foot = document.querySelector("footer h2");

    foot.before(n);
}

const clearWarning = () => {
    if (document.querySelector(".error") != null) {
        document.querySelector(".error").remove();
    }
}

const calc = () => {
    let contributions = 0;

    const categories = document.querySelectorAll(".category");

    for (let i = 0; i < categories.length; i++) { //IN EACH CATEGORY
        let weight = categories[i].querySelector(".weight").value;

        const assignments = categories[i].querySelectorAll(".assignments");

        let totalYourPoints = 0;
        let totalAllPoints = 0;

        for (let j = 0; j < assignments.length; j++) {
            let yourScore = parseFloat(assignments[j].querySelector(".yourPoints").value)
            let totalScore = parseFloat(assignments[j].querySelector(".totalPoints").value)

            if (Object.is(yourScore, NaN)) {
                yourScore = 0;
            }
            if (Object.is(totalScore, NaN)) {
                totalScore = 0;
            }

            totalYourPoints += yourScore;
            totalAllPoints += totalScore;
        }

        if (totalAllPoints == 0) {
            dispWarning();
            continue;
        }
        contributions += weight * (totalYourPoints / totalAllPoints);
    }

    return contributions;
}

document.querySelector("body").addEventListener("mouseover", function () {
    passiveDefAssign()
    formatToSend();
    clearWarning();
    let content = `
    Grade: ${calc().toFixed(3)}%
    `
    document.querySelector("footer h2").innerText = content;
})

document.querySelector("body").addEventListener("keyup", function () {
    clearWarning();
    let content = `
    Grade: ${calc().toFixed(3)}%
    `
    document.querySelector("footer h2").innerText = content;
})

// SAVE TO EXCEL ↓ ↓

function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf
}

const initializeArray = () => {
    let array = [[]]
    for (let i = 0; i < 100; i++) {
        array.push([]);
        for (let j = 0; j < 100; j++) {
            array[i].push("");
        }
    }
    return array;
}

const stringToCalc = () => {
    const dictionary = ['B', 'C', 'F', 'G', 'J', 'K', 'N', 'O', 'R', 'S', 'V', 'W', 'Z', 'AA'];
    const numCatagories = document.querySelectorAll(".category").length;
    let equation = '=';

    for (let i = 0; i < numCatagories * 2; i += 2) {
        let yourColumn = dictionary[i];
        let totalColumn = dictionary[i + 1];

        equation += "SUM(" + yourColumn + '3:' + yourColumn + '100)*' + totalColumn + '1/100/SUM(' + totalColumn + '3:' + totalColumn + '100)+'
    }

    return equation.substring(0, equation.length - 1);
}

const formatData = () => {
    let array = initializeArray();

    const catagories = document.querySelectorAll(".category");

    for (let i = 0; i < catagories.length; i++) {
        let categoryName = catagories[i].querySelector(".name").value;
        let categoryWeight = parseFloat(catagories[i].querySelector(".weight").value);

        if (Object.is(categoryWeight, NaN)) {
            categoryWeight = 0;
        }

        array[0][i * 4] = categoryName;
        array[0][i * 4 + 1] = "Weight:";
        array[0][i * 4 + 2] = categoryWeight;
        array[1][i * 4 + 1] = 'Your Score';
        array[1][i * 4 + 2] = 'Total Score';

        const assignments = catagories[i].querySelectorAll(".assignments");

        for (let j = 0; j < assignments.length; j++) {
            let assignmentName = assignments[j].querySelector(".name").value;
            let yourScore = parseFloat(assignments[j].querySelector(".yourPoints").value)
            let totalScore = parseFloat(assignments[j].querySelector(".totalPoints").value)

            if (assignmentName == "") {
                assignmentName = assignments[j].querySelector(".name").getAttribute("placeholder");
            }
            if (Object.is(yourScore, NaN)) {
                yourScore = 0;
            }
            if (Object.is(totalScore, NaN)) {
                totalScore = 0;
            }

            array[j + 2][i * 4] = assignmentName;
            array[j + 2][i * 4 + 1] = yourScore;
            array[j + 2][i * 4 + 2] = totalScore;

        }
    }
    array[0][catagories.length * 4] = "GRADE: ";
    array[0][catagories.length * 4 + 1] = stringToCalc();
    return array;
}

document.querySelector("#excel").addEventListener("click", function () {

    let className = document.querySelector("#courseName").value;

    if (className == "") {
        className = "Unnamed_Class"
    }

    let ws_data = formatData();

    let wb = XLSX.utils.book_new();

    wb.Props = {
        Title: className,
        Subject: "Grade Calculator",
        Author: "Grade Calculator Website"
    };

    wb.SheetNames.push(className);

    let ws = XLSX.utils.aoa_to_sheet(ws_data);

    wb.Sheets[className] = ws;

    let wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), className + ".xlsx");
})
