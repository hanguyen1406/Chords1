var slideSpeed = 300;
const TYPES_CONTROL = {
    NOTE: "NOTE",
    CHORD: "CHORD",
};

fetch("major.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // Process the fetched data here
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

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
var chordActive = chords["C"][0];
var canClick = true;
var switchGuitar = false;
var currentTab = 0;
var chordSymbol = "C";
var floatingMenu = "note";
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

//render notes
$(".notes .mask ul").text("");
for (let i = 0; i < notes.e.length; i++) {
    $(".mask.low-e ul").append(
        "<li note-number=" +
            i +
            " note=" +
            notes.e[i] +
            ">" +
            notes.e[i] +
            "</li>"
    );
    $(".mask.a ul").append(
        "<li note-number=" +
            i +
            " note=" +
            notes.a[i] +
            ">" +
            notes.a[i] +
            "</li>"
    );
    $(".mask.d ul").append(
        "<li note-number=" +
            i +
            " note=" +
            notes.d[i] +
            ">" +
            notes.d[i] +
            "</li>"
    );
    $(".mask.g ul").append(
        "<li note-number=" +
            i +
            " note=" +
            notes.g[i] +
            ">" +
            notes.g[i] +
            "</li>"
    );
    $(".mask.b ul").append(
        "<li note-number=" +
            i +
            " note=" +
            notes.b[i] +
            ">" +
            notes.b[i] +
            "</li>"
    );
    $(".mask.high-e ul").append(
        "<li note-number=" +
            i +
            " note=" +
            notes.e[i] +
            ">" +
            notes.e[i] +
            "</li>"
    );
}

$(".dropdown #down").click(function () {
    if (!canClick) {
        return false;
    }
    canClick = false;
    document.querySelector("#fret7").scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
        canClick = true;
    }, slideSpeed + 20);

    return false;
});

$(".dropdown #up").click(function () {
    if (!canClick) {
        return false;
    }
    canClick = false;

    document.querySelector("#fret0").scrollIntoView({ behavior: "smooth" });

    setTimeout(function () {
        canClick = true;
    }, slideSpeed + 20);
    return false;
});

const showChordNumber = (chordSymbol) => {
    console.log("show chord number: " + chordSymbol);
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
    // console.log("show note mode: " + chordActive);
    if (!canClick) return;

    if (1) {
        canClick = false;
        $("li[dot-number]").animate({ opacity: 0 }, 500);
        if (chordActive) {
            console.log(chordActive);
            $("[note-number]").animate({ opacity: 0 }, 500);
            const notesClassName = [
                ".mask.low-e",
                ".mask.a",
                ".mask.d",
                ".mask.g",
                ".mask.b",
                ".mask.high-e",
            ];
            chordActive["positions"][0]["frets"].forEach((fret, index) => {
                console.log(fret);
                if (fret > 0) {
                    $(
                        `.notes ${notesClassName[index]} ul li[note-number="${fret}"]`
                    ).animate({ opacity: 1 }, 500);
                }
            });
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
    $(".mask ul").text("");
    for (var i = 0; i < notes.e.length; i++) {
        $(".mask.low-e ul").append(
            '<li note="' +
                notes.e[i] +
                '" style="opacity: 0;">' +
                notes.e[i] +
                "</li>"
        );
        $(".mask.a ul").append(
            '<li note="' +
                notes.a[i] +
                '" style="opacity: 0;">' +
                notes.a[i] +
                "</li>"
        );
        $(".mask.d ul").append(
            '<li note="' +
                notes.d[i] +
                '" style="opacity: 0;">' +
                notes.d[i] +
                "</li>"
        );
        $(".mask.g ul").append(
            '<li note="' +
                notes.g[i] +
                '" style="opacity: 0;">' +
                notes.g[i] +
                "</li>"
        );
        $(".mask.b ul").append(
            '<li note="' +
                notes.b[i] +
                '" style="opacity: 0;">' +
                notes.b[i] +
                "</li>"
        );
        $(".mask.high-e ul").append(
            '<li note="' +
                notes.e[i] +
                '" style="opacity: 0;">' +
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
    $(".dropdown #chord-class").css("visibility", "hidden");
    floatingMenu = "note";
    showNotes(chordTab1[currentTab]);
});

//show chord
$(".wrapper #chord").on("click", () => {
    $(".dropdown #chord-class").css("visibility", "unset");
    floatingMenu = "chord";
    showNoteMode(chordSymbol);
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
    showNotes(chordTab1[currentTab]);
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
