var slideSpeed = 300;
const TYPES_CONTROL = {
    NOTE: "NOTE",
    CHORD: "CHORD",
};

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
var chordActive = [
    {
        frets: "x32010",
        fingers: "032010",
    },
    {
        frets: "x35553",
        fingers: "012341",
        barres: 3,
        capo: true,
    },
    {
        frets: "xx5558",
        fingers: "001114",
        barres: 5,
    },
    {
        frets: "8aa988",
        fingers: "134211",
        barres: 8,
        capo: true,
    },
];
var canClick = true;
var switchGuitar = false;
var currentTab = 0;
var chordVersion = 0;
var chordSymbol = "C";
var floatingMenu = "note";
var currentFret = 20;
var notes = {
    e: ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
    a: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
    d: ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
    g: ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
    b: ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
};
var note2 = {
    e: ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
    a: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
    d: ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
    g: ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
    b: ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
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
//render notes
resetNote();

$(".dropdown #down").click(function () {
    if (!canClick) {
        return false;
    }
    if (floatingMenu == "chord") {
        chordVersion++;
        // console.log(chordVersion);
        if (chordVersion == chordActive.length) chordVersion = 0;
        currentFret = 20;
        showNoteMode();
        $(".tab-content #chord-version").text(chordVersion + 1);
    } else currentFret = 8;
    // console.log(currentFret);
    if (currentFret < 3) currentFret = 1;
    document
        .querySelector("#fret" + (currentFret - 1))
        .scrollIntoView({ behavior: "smooth" });

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
        // console.log(chordVersion);
        if (chordVersion < 0) chordVersion = chordActive.length - 1;
        currentFret = 20;
        showNoteMode();
        document
            .querySelector("#fret" + (currentFret - 1))
            .scrollIntoView({ behavior: "smooth" });
        $(".tab-content #chord-version").text(chordVersion + 1);
    } else {
        canClick = false;
        goToFret0();
    }
    setTimeout(function () {
        canClick = true;
    }, slideSpeed + 20);
    return false;
});

const showChordNumber = (chordSymbol) => {
    // console.log("show chord number: " + chordSymbol);
    if (!canClick) return;
    chordActive =
        chords.majors.find((item) => item.name === chordSymbol) ||
        chords.minors.find((item) => item.name === chordSymbol);
    if (!chordActive) {
        canClick = true;
        return;
    }
    // Check is show note mode
    const isShowNote = $('.checkbox-show-note input[type="checkbox"]').is(
        ":checked"
    );
    if (isShowNote) {
        showNoteMode();
        return;
    }
    canClick = false;
    $(".guitar-neck li[note-number]").animate({ opacity: 0 }, 500);
    $("li[dot-number]").animate({ opacity: 0 }, 500).promise();
    // Set and render red dot
    const guitarStrings = [
        ".red-dot.low-e",
        ".red-dot.a",
        ".red-dot.d",
        ".red-dot.g",
        ".red-dot.b",
        ".red-dot.high-e",
    ];
    chordActive.strings.forEach((item, index) => {
        const fret = item ? item.fret : 0;
        const finger = item ? item.finger : 0;
        $(`${guitarStrings[index]} li[dot-number="${fret}"]`)
            .text(finger)
            .animate({ opacity: 1 }, 500);
    });

    setTimeout(() => {
        canClick = true;
    }, 500);
};

const showNoteMode = () => {
    if (!canClick) return;

    if (1) {
        canClick = false;
        $("li[dot-number]").animate({ opacity: 0 }, 500);
        if (chordActive) {
            // console.log(chordActive);
            $("[note-number]").animate({ opacity: 0 }, 500);
            const notesClassName = [
                ".mask.low-e",
                ".mask.a",
                ".mask.d",
                ".mask.g",
                ".mask.b",
                ".mask.high-e",
            ];

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
                    fret = parseInt(fret, 16);
                    var note = $(
                        `.notes ${notesClassName[index]} ul li[note-number="${fret}"]`
                    ).html();

                    if (
                        note == noteToShow ||
                        (note == thang[noteToShow] && thang[noteToShow])
                    ) {
                        $(
                            `.notes ${notesClassName[index]} ul li[note-number="${fret}"]`
                        ).css({ "background-color": "#007D1D" });
                    }
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
                $(".guitar-neck #barres")
                    .css({ opacity: 1, top: `${currentFret * 80}px` })
                    .animate(500);
            } else {
                $(".guitar-neck #barres").css({ opacity: 0 }).animate(500);
            }
        } else {
            $(".guitar-neck li[note-number]").animate({ opacity: 1 }, 500);
        }
        setTimeout(() => {
            canClick = true;
        }, 500);
    } else {
        $(".guitar-neck li[note-number]").animate({ opacity: 0 }, 500);
        if (chordActive) showChordNumber(chordActive.name);
    }
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
// Process chords
function resetNote() {
    $(".guitar-neck #barres").css({ opacity: 0 });
    $(".notes .mask ul").text("");
    for (let i = 0; i < notes.e.length; i++) {
        $(".mask.low-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i] +
                " style='opacity: 0;'>" +
                notes.e[i] +
                "</li>"
        );
        $(".mask.a ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.a[i] +
                " style='opacity: 0;'>" +
                notes.a[i] +
                "</li>"
        );
        $(".mask.d ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.d[i] +
                " style='opacity: 0;'>" +
                notes.d[i] +
                "</li>"
        );
        $(".mask.g ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.g[i] +
                " style='opacity: 0;'>" +
                notes.g[i] +
                "</li>"
        );
        $(".mask.b ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.b[i] +
                " style='opacity: 0;'>" +
                notes.b[i] +
                "</li>"
        );
        $(".mask.high-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i] +
                " style='opacity: 0;'>" +
                notes.e[i] +
                "</li>"
        );
    }
}

// Render to UI
// chords.majors.forEach(chord => {
// 	$('ul.chord-major').append(`<li button-click id="btn-chord-${chord.name}">${chord.name}</li>`)
// });
// chords.minors.forEach(chord => {
// 	$('ul.chord-minor').append(`<li button-click id="btn-chord-${chord.name}">${chord.name}</li>`)
// });
// for (let i = 1; i <= 12; i++) {
// 	$('ul.compartment-number').append(`<li>${i}</li>`)
// }
// Render dots
// for (var i = 1; i <= 12; i++) {
// 	$('.red-dot.low-e ul').append(`<li dot-number="${i}">.</li>`)
// 	$('.red-dot.a ul').append(`<li dot-number="${i}">.</li>`)
// 	$('.red-dot.d ul').append(`<li dot-number="${i}">.</li>`)
// 	$('.red-dot.g ul').append(`<li dot-number="${i}">.</li>`)
// 	$('.red-dot.b ul').append(`<li dot-number="${i}">.</li>`)
// 	$('.red-dot.high-e ul').append(`<li dot-number="${i}">.</li>`)
// }
// Process event
// $('.controls .control-chord li').click(function () {
// 	chordSymbol = $(this).text();
// 	showChordNumber(chordSymbol);
// });
// $("[button-click]").click((e) => {
//     $("[button-click]").removeClass("active");
//     $(`#${e.target.id}[button-click]`).addClass("active");
// });

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
    resetOpenNote();
    showNotes(chordTab1[currentTab]);
});

//show chord
$(".wrapper #chord").on("click", () => {
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
    showNoteMode(chordSymbol);
    goToFret0();
});

//function for display popup menu
function showPopupMenu(id) {
    $(".tab-content #popup-menu").css("display", "unset");
    $(".tab-content #popup-menu").animate({ opacity: 1 }, 200);
}
//event for hide popup menu
$(".tab-content #popup-menu a").on("click", () => {
    $(".tab-content #popup-menu").animate({ opacity: 0 }, 100);
    setTimeout(() => {
        $(".tab-content #popup-menu").css("display", "none");
    }, 100);
});

$(".dropdown #switch-tone input").change(() => {
    // alert('hii')
    let temp1 = notes,
        temp2 = chordTab1;
    notes = note2;
    note2 = temp1;

    chordTab1 = chordTab2;
    chordTab2 = temp2;
    resetNote();

    if (floatingMenu == "chord") {
        // console.log("switch chord");
        showNoteMode();
        $(".guitar-neck #barres")
            .css({ top: `${currentFret * 80}px` })
            .animate(500);
    } else if (floatingMenu == "note") {
        showNotes(chordTab1[currentTab]);
    }
});
$(".dropdown #switch-m input").change(() => {
    resetNote();
    resetOpenNote();
    goToFret0();
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
