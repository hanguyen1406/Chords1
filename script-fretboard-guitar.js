var slideSpeed = 300;
var chordTab1 = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];
var chordTab2 = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
];
var noteToShow = "C";
var chordActive = 0;
var canClick = true;
var switchGuitar = false;
var currentTab = 0;
var chordVersion = 0;
var chordSymbol = "C";
var floatingMenu = "note";
var currentFret = 1;
var chordFileName = "major";
var fretOrFinger = "fret";
getDataChord();
var notes = {
    e: ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],
    a: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    d: ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],
    g: ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"],
    b: ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],
};
var note2 = {
    e: ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"],
    a: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
    d: ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db"],
    g: ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb"],
    b: ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb"],
};
var openNote = ["E", "A", "D", "G", "B", "E"];
var giang = {
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
    Ab: "G#",
    Bb: "A#",
};
var thang = {
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb",
};
var noteToSpeak = {
    C: "Đô",
    "C#": "Đô Thăng",
    D: "Rê",
    "D#": "Rê Thăng",
    E: "Mi",
    F: "Fa",
    "F#": "Fa Thăng",
    G: "Sol",
    "G#": "Sol Thăng",
    A: "La",
    "A#": "La Thăng",
    B: "Si",
    major: "Trưởng",
    minor: "Thứ",
};
//render notes and fingers
resetNote();
resetFinger();
function changeNoteName() {
    $("#chord-name #note").text(noteToShow);
    $("#chord-name #suffix").text(
        chordFileName == "major" ? "" : chordFileName
    );

    $("#chord-name #speak").text(
        noteToSpeak[noteToShow] + " " + noteToSpeak[chordFileName]
    );
}
function goCurrentFret() {
    changeNoteName();
    if (currentFret < 3) currentFret = 1;
    // console.log("fret: " + currentFret);
    document
        .querySelector("#fret" + (currentFret - 1))
        .scrollIntoView({ behavior: "smooth" });
}

$(".dropdown #down").click(function () {
    if (!canClick) {
        return false;
    }
    if (floatingMenu == "chord") {
        chordVersion++;
        if (chordVersion == chordActive.length) chordVersion = 0;
        currentFret = 24;

        if (fretOrFinger == "finger") showFingerMode();
        else showNoteMode();
        $(".tab-content #chord-version").text(chordVersion + 1);
    } else {
        if (currentFret < 7) currentFret = 8;
        else if (currentFret < 20) {
            currentFret = 20;
        } else {
            currentFret = 1;
        }
        goCurrentFret();
    }

    canClick = false;
    setTimeout(function () {
        canClick = true;
    }, slideSpeed + 20);

    return false;
});

function goToFret0() {
    document.querySelector("#fret0").scrollIntoView({ behavior: "smooth" });
}

function resetOpenNote() {
    $("#indicate .open-notes li").each((index, li) => {
        $(li).text(openNote[index]).css({
            color: "#fff",
            "background-color": "#fa990f",
        });
    });
}

$(".dropdown #up").click(function () {
    if (!canClick) {
        return false;
    }

    if (floatingMenu == "chord") {
        chordVersion--;
        if (chordVersion < 0) chordVersion = chordActive.length - 1;

        if (fretOrFinger == "fret") showNoteMode();
        else showFingerMode();
        // console.log("chord version: " + chordVersion);
        $(".tab-content #chord-version").text(chordVersion + 1);
    } else {
        canClick = false;
        if (currentFret == 1) currentFret = 20;
        else currentFret = 1;
        goCurrentFret();
    }
    setTimeout(function () {
        canClick = true;
    }, slideSpeed + 20);
    return false;
});

function convToDec(char) {
    if (!isNaN(char)) return char;

    var charCodeOfG = "G".charCodeAt(0);
    var charCode = char.charCodeAt(0);

    var decimalValue = charCode - charCodeOfG + 16;
    return decimalValue;
}

const showNoteMode = () => {
    if (!canClick) return;
    // console.log("chord version: " + chordVersion);
    currentFret = 24;
    canClick = false;
    $("li[dot-number]").animate({ opacity: 0 }, 500);
    if (chordActive) {
        // console.log(chordActive);
        allNoteElement.animate({ opacity: 0 }, 500);
        const notesClassName = [
            ".mask.low-e",
            ".mask.a",
            ".mask.d",
            ".mask.g",
            ".mask.b",
            ".mask.high-e",
        ];
        $(".tab-content #chord-version").text(1);

        [...chordActive[chordVersion]["frets"]].forEach((fret, index) => {
            // console.log(fret);

            if (fret == "x") {
                $(`#indicate ${notesClassName[index].replace(".mask", "")}`)
                    .text("")
                    .prepend(
                        '<img style="width: 20px; left: 0px; top:4px; position: relative;" src="./img/x.png"/>'
                    )
                    .css({
                        color: "#f00",
                        "background-color": "rgb(254 244 229)",
                    })
                    .animate(500);
            } else if (fret == "0") {
                $(`#indicate ${notesClassName[index].replace(".mask", "")}`)
                    .text(openNote[index])
                    .css({
                        color: "#fff",
                        "background-color":
                            noteToShow == openNote[index]
                                ? "#007D1D"
                                : "#fa990f",
                    })
                    .animate(500);
            } else if (fret != "x" && fret != "0") {
                fret = convToDec(fret.toUpperCase());
                // console.log(fret);
                var note = $(
                    `.notes ${notesClassName[index]} ul li[note-number="${fret}"]`
                ).html();
                var noteColor = "#fa990f";
                if (
                    note == noteToShow ||
                    (note == thang[noteToShow] && thang[noteToShow])
                ) {
                    noteColor = "#007D1D";
                }
                $(
                    `.notes ${notesClassName[index]} ul li[note-number="${fret}"]`
                ).css({ "background-color": noteColor });

                $(`#indicate ${notesClassName[index].replace(".mask", "")}`)
                    .text(openNote[index])
                    .css({
                        color: "rgb(134 124 108)",
                        "background-color": "rgb(254 244 229)",
                    })
                    .animate(500);
                currentFret = Math.min(currentFret, fret);
                $(
                    `.notes ${notesClassName[index]} ul li[note-number="${fret}"]`
                ).animate({ opacity: 1 }, 500);
            }
        });
        if (chordActive[chordVersion]["barres"]) {
            // console.log(currentFret);
            barres.animate({ opacity: 1, top: `${currentFret * 80}px` }, 500);
        } else {
            barres.animate({ opacity: 0 }, 500);
        }
        goCurrentFret();
    } else {
        allNoteElement.animate({ opacity: 1 }, 500);
    }
    setTimeout(() => {
        canClick = true;
    }, 500);
};

function showNotes(noteToShow) {
    // $(".guitar-neck .compartment-number").animate({ opacity: 0 }, 500);
    $("[dot-number]").animate({ opacity: 0 }, 500);
    if (noteToShow == "All") {
        $(".guitar-neck .notes li").animate({ opacity: 1 }, 500);
    } else {
        $(".guitar-neck .notes li")
            .not('[note="' + noteToShow + '"]')
            .animate({ opacity: 0 }, 500);
        $('.guitar-neck .notes li[note="' + noteToShow + '"]').animate(
            { opacity: 1 },
            500
        );
    }
}
function convToDec(char) {
    if (!isNaN(char)) return char;

    var charCodeOfG = "G".charCodeAt(0);
    var charCode = char.charCodeAt(0);

    var decimalValue = charCode - charCodeOfG + 16;
    return decimalValue;
}
const showFingerMode = () => {
    // console.log(chordActive);
    currentFret = 24;
    allNoteElement.animate({ opacity: 0 }, 500);
    if (chordActive) {
        // console.log(chordActive);
        $("[dot-number]").animate({ opacity: 0 }, 500);
        const notesClassName = [".low-e", ".a", ".d", ".g", ".b", ".high-e"];
        resetOpenNote();
        var fingers = [...chordActive[chordVersion]["fingers"]];
        [...chordActive[chordVersion]["frets"]].forEach((fret, index) => {
            console.log(fret);

            if (fret == "x") {
                $(`#indicate ${notesClassName[index]}`)
                    .text("")
                    .prepend(
                        '<img style="width: 20px; left: 0px; top:4px; position: relative;" src="./img/x.png"/>'
                    )
                    .css({
                        color: "#f00",
                        "background-color": "rgb(254 244 229)",
                    })
                    .animate(500);
            } else if (fret == "0") {
                $(`#indicate ${notesClassName[index].replace(".mask", "")}`)
                    .text(openNote[index])
                    .css({
                        color: "#fff",
                        "background-color":
                            noteToShow == openNote[index]
                                ? "#007D1D"
                                : "#fa990f",
                    })
                    .animate(500);
            } else if (fret != "x") {
                fret = convToDec(fret.toUpperCase());
                currentFret = Math.min(currentFret, fret);
                $(
                    `.red-dots ${notesClassName[index]} ul li[dot-number="${fret}"`
                )
                    .text(fingers[index])
                    .animate({ opacity: 1 }, 500);
                $(`#indicate ${notesClassName[index].replace(".mask", "")}`)
                    .text(openNote[index])
                    .css({
                        color: "rgb(134 124 108)",
                        "background-color": "rgb(254 244 229)",
                    })
                    .animate(500);
            }
        });
        if (chordActive[chordVersion]["barres"]) {
            // console.log(currentFret);
            barres.animate({ opacity: 1, top: `${currentFret * 80}px` }, 500);
        } else {
            barres.animate({ opacity: 0 }, 500);
        }
        goCurrentFret();
    }
};
function changeOpenNotes() {
    $(".guitar-neck .compartment-number").animate({ opacity: 0 }, 500);
    $("[dot-number]").animate({ opacity: 0 }, 500);
    $(".notes .mask").each(function () {
        var el = $(this);
        var elClass = el.attr("class").split(" ")[1];
        var note = el.find("li:last-child").text();

        $(".open-notes ." + elClass).text(note);
    });
}
var barres = $("#barres");

// Process chords
function resetFinger() {
    $("#barres").css({ opacity: 0 });
    // $(".red-dots .red-dot ul").text("");
    $(".guitar-neck li[dot-number]").animate({ opacity: 0 }, 500);
}
async function resetNote() {
    $("#barres").css({ opacity: 0 });
    // $(".notes .mask ul").text("");
    $(".guitar-neck li[note-number]")
        .css({ "background-color": "#fa990f" })
        .animate({ opacity: 0 }, 500);
}

function init() {
    $("ul.compartment-number").text("");
    $(".mask.low-e ul").text("");
    for (let i = 1; i <= 24; i++) {
        $("ul.compartment-number").append(`<li>${i}</li>`);
    }
    for (let i = 0; i < notes.e.length * 2; i++) {
        $(".mask.low-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i % notes.e.length] +
                " style='opacity: 0;'>" +
                notes.e[i % notes.e.length] +
                "</li>"
        );
        $(".mask.a ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.a[i % notes.e.length] +
                " style='opacity: 0;'>" +
                notes.a[i % notes.e.length] +
                "</li>"
        );
        $(".mask.d ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.d[i % notes.e.length] +
                " style='opacity: 0;'>" +
                notes.d[i % notes.e.length] +
                "</li>"
        );
        $(".mask.g ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.g[i % notes.e.length] +
                " style='opacity: 0;'>" +
                notes.g[i % notes.e.length] +
                "</li>"
        );
        $(".mask.b ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.b[i % notes.e.length] +
                " style='opacity: 0;'>" +
                notes.b[i % notes.e.length] +
                "</li>"
        );
        $(".mask.high-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i % notes.e.length] +
                " style='opacity: 0;'>" +
                notes.e[i % notes.e.length] +
                "</li>"
        );
    }
    for (let i = 0; i <= notes.e.length * 2; i++) {
        $(".red-dot.low-e ul").append(`<li dot-number="${i}">.</li>`);
        $(".red-dot.a ul").append(`<li dot-number="${i}">.</li>`);
        $(".red-dot.d ul").append(`<li dot-number="${i}">.</li>`);
        $(".red-dot.g ul").append(`<li dot-number="${i}">.</li>`);
        $(".red-dot.b ul").append(`<li dot-number="${i}">.</li>`);
        $(".red-dot.high-e ul").append(`<li dot-number="${i}">.</li>`);
    }
}
init();
var allNoteElement = $(".guitar-neck li[note-number]");
//show notes
$(".wrapper #note").on("click", () => {
    // $(".dropdown #chord-class").css("visibility", "hidden");
    $(".dropdown #chord-class").animate(
        {
            opacity: 0,
        },
        500,
        function () {
            $(this).css("visibility", "hidden");
        }
    );
    $(".tab-content #chord-name b").animate({ opacity: 0 }, 500);
    $("div.fretboard").css({ "overflow-y": "scroll", "padding-right": "0px" });
    chordVersion = 0;
    floatingMenu = "note";
    resetNote();
    resetFinger();
    resetOpenNote();
    showNotes(chordTab1[currentTab]);
});

//show chord
$(".wrapper #chord").on("click",async () => {
    // $("").css("visibility", "unset");
    $(".dropdown #chord-class").animate(
        {
            opacity: 1,
        },
        100,
        function () {
            $(this).css("visibility", "unset");
        }
    );
    //lock fretboard
    $("div.fretboard").css({ overflow: "hidden", "padding-right": "10px" });

    $(".tab-content #chord-name b").animate({ opacity: 1 }, 500);
    floatingMenu = "chord";
    currentFileName();
    await getDataChord();
    if (fretOrFinger == "finger") {
        showFingerMode();
    } else {
        showNoteMode();
    }
});

//function for display popup menu
var popupCt = $(".tab-content #popup-ct"),
    chordFilter = $("#chord-filter"),
    nol = 0;
function showPopupMenu(id, title) {
    $(".tab-content #popup-menu").css("display", "block");
    popupCt.html("");
    chordFilter.html("");
    // console.log(index);
    $("#title-popup").text(noteToShow + "(" + title.toLowerCase() + ")");
    var exclude,
        slashChord = true;

    if (id < 4) {
        // console.log("first");
        [`All`, "Major", "Minor", "Sus", "Slash Chords"].forEach((i, index) => {
            chordFilter.append(
                `<a onclick="filterChord(${index}, '${title}', '${i}')" href="#">${i}</a>`
            );
        });
    } else {
        // console.log("second");
        [`All`, "Basic", "6", "7", "Maj7"].forEach((i, index) => {
            chordFilter.append(
                `<a onclick="filterChord(${index}, '${title}', '${i}')" href="#">${i}</a>`
            );
        });
    }
    chordFilter.children("a:first").css({ "background-color": "green" });
    nol = 0;

    switch (id) {
        case 0:
            exclude = [""];
            break;
        case 1:
            exclude = ["6"];
            break;
        case 2:
            exclude = ["7"];
            break;
        case 3:
            exclude = ["maj7"];
            break;
        case 4:
            exclude = ["maj"];
            break;
        case 5:
            exclude = ["min"];
            break;
        case 6:
            exclude = ["sus"];
            break;
        case 7:
            exclude = [""];
            slashChord = false;
            n = notes.e[nol];

            if (n != noteToShow) {
                for (let i of sortedWords) {
                    if (exclude.some((substring) => i.includes(substring))) {
                        i = i + "_" + n.toLowerCase();
                        $(".tab-content #popup-ct").append(
                            `<a onclick="changeFileName('${i}')" href="#">${i}</a>`
                        );
                    }
                }
            }
            $(".tab-content #popup-ct").append(
                `<div id="load-more"><b>Load more</b></div>`
            );

            console.log(nol);

            $("#load-more").on("click", () => {
                console.log("hii");
                n = notes.e[++nol];

                if (n != noteToShow) {
                    for (let i of sortedWords) {
                        if (
                            exclude.some((substring) => i.includes(substring))
                        ) {
                            i = i + "_" + n.toLowerCase();
                            $("#load-more").before(
                                `<a onclick="changeFileName('${i}')" href="#">${i}</a>`
                            );
                        }
                    }
                }
            });

            break;

        default:
            break;
    }
    if (slashChord) {
        for (let i of sortedWords) {
            if (exclude.some((substring) => i.includes(substring))) {
                $(".tab-content #popup-ct").append(
                    `<a onclick="changeFileName('${i}')" href="#">${i}</a>`
                );
            }
        }
    }
    $("#popup-ct").scrollTop(0);
    $(".tab-content #popup-menu").animate({ opacity: 1 }, 200);
}

function filterChord(i, first, second) {
    $("#popup-ct").scrollTop(0);
    chordFilter.children("a").css({ "background-color": "#276091" });
    chordFilter.children("a").eq(i).css({ "background-color": "green" });

    if (second.split(" ")[0] == "All") {
        $("#popup-ct a").css({ display: "unset" });
        // console.log(second.split(" "));
    } else if (second == "Slash Chords") {
        console.log("slash chord");
    } else {
        $("#popup-ct a").each((i, elem) => {
            var e = $(elem);
            if (!e.text().includes(second.slice(0, 3).toLowerCase())) {
                e.css({ display: "none" });
            } else e.css({ display: "unset" });
        });
    }
}

async function changeFileName(fileName) {
    chordFileName = fileName;
    await getDataChord();
    showNoteMode();
    $("#popup-menu").css("display", "none");
}

//event for hide popup menu
$("#exit").on("click", () => {
    $("#popup-menu").animate({ opacity: 0 }, 100);
    setTimeout(() => {
        $("#popup-menu").css("display", "none");
    }, 100);
});

$("#sw-tone input").change(() => {
    // alert('hii')
    let temp1 = notes,
        temp2 = chordTab1;
    notes = note2;
    note2 = temp1;

    chordTab1 = chordTab2;
    chordTab2 = temp2;
    init();
    resetNote();
    resetFinger();
    if (floatingMenu == "chord") {
        // console.log("switch chord");
        showNoteMode();
        barres.animate({ top: `${currentFret * 80}px` }, 500);
    } else if (floatingMenu == "note") {
        showNotes(chordTab1[currentTab]);
        console.log(chordTab1[currentTab]);
    }
});

async function getDataChord() {
    const encodedChordFileName = encodeURIComponent(chordFileName);
    const url = `./chords/${noteToShow.replace(
        "#",
        "sharp"
    )}/${encodedChordFileName}.json`;
    // console.log(url);
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            chordActive = data["positions"];
            $("#noc").text(chordActive.length);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    chordVersion = 0;
}
const currentFileName = () => {
    const element = $("#sw-minor small");
    const afterContent = window
        .getComputedStyle(element[0], "::after")
        .getPropertyValue("content");
    chordFileName = afterContent.toLocaleLowerCase().slice(1, -1);
};
$(".dropdown #sw-minor input").change(async () => {
    // chordFileName = chordFileName == "major" ? "minor" : "major";
    currentFileName();
    console.log(chordFileName);
    await getDataChord();
    currentFret = 6;

    if (floatingMenu == "chord") {
        chordVersion = 0;
        if (fretOrFinger == "finger") {
            showFingerMode();
        } else {
            showNoteMode();
        }
    } else goToFret0();
});
$(".dropdown #sw-finger input").change(async () => {
    fretOrFinger = fretOrFinger == "fret" ? "finger" : "fret";
    currentFret = 6;

    if (floatingMenu == "chord") {
        // chordVersion = 0;
        if (fretOrFinger == "finger") showFingerMode();
        else showNoteMode();
    } else goToFret0();
});
$(function () {
    var $win = $(window),
        $box = $("#selector button"),
        $menu = $("#selector .dropdown-content");

    $win.on("click", function (event) {
        if (!$box.is(event.target)) {
            $menu.hide();
        }
    });
});

let sortedWords = [
    "5",
    "6",
    "7",
    "9",
    "11",
    "13",
    "m6",
    "m7",
    "m9",
    "6b5",
    "7#9",
    "7b5",
    "7b9",
    "9b5",
    "aug",
    "dim",
    "m#5",
    "m11",
    "m13",
    "add9",
    "aug7",
    "aug9",
    "dim7",
    "m7#5",
    "m7b5",
    "maj7",
    "maj9",
    "mbb5",
    "sus2",
    "sus4",
    "6add9",
    "7#9b5",
    "7sus2",
    "7sus4",
    "9sus4",
    "maj11",
    "maj13",
    "majb5",
    "major",
    "minor",
    "mmaj7",
    "mmaj9",
    "m6add9",
    "maj#11",
    "maj7b5",
    "mmaj11",
    "mmaj13",
    "sus2#5",
    "sus2b5",
    "sus4#5",
    "7sus2#5",
    "7sus4#5",
    "augmaj7",
    "augmaj9",
    "mmaj7#5",
    "mmaj7b5",
    "maj7sus2",
    "maj7sus4",
    "mmaj7bb5",
    "sus2sus4",
    "7sus2sus4",
    "maj7sus4#5",
    "maj7sus2sus4",
];
$("#sw-minor small").click();
$(document).ready(function () {
    $(".tab-a").click(function () {
        $(".ta").removeClass("tab-active");
        $(".ta[data-id='" + $(this).attr("data-id") + "']").addClass(
            "tab-active"
        );
        $(".tab-a").removeClass("active-a");
        $(this).parent().find(".tab-a").addClass("active-a");
    });
});
