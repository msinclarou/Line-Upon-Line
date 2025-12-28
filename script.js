let items = []; // chapters + verses
let index = 0;

fetch("scripture.txt")
    .then(res => res.text())
    .then(data => {
        parseScripture(data);
        displayItem();
    });

function parseScripture(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

    let currentChapter = "";
    let currentVerse = "";

    for (let line of lines) {
        // Chapter header
        if (line.startsWith("#")) {
            if (currentVerse) {
                items.push(currentVerse);
                currentVerse = "";
            }
            currentChapter = line.substring(1).trim();
            items.push({ type: "chapter", text: currentChapter });
        }
        // New verse (starts with a number)
        else if (/^\d+/.test(line)) {
            if (currentVerse) {
                items.push(currentVerse);
            }
            currentVerse = line;
        }
        // Continuation of verse
        else {
            currentVerse += " " + line;
        }
    }

    if (currentVerse) {
        items.push(currentVerse);
    }
}

function displayItem() {
    const display = document.getElementById("line");
    const item = items[index];

    if (item.type === "chapter") {
        display.innerText = item.text;
        display.style.fontWeight = "bold";
        display.style.fontSize = "26px";
    } else {
        display.innerText = item;
        display.style.fontWeight = "normal";
        display.style.fontSize = "20px";
    }
}

function nextLine() {
    if (index < items.length - 1) {
        index++;
        displayItem();
    }
}

function prevLine() {
    if (index > 0) {
        index--;
        displayItem();
    }
}
