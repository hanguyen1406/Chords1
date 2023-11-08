var slideSpeed = 300;
const TYPES_CONTROL = {
    NOTE: "NOTE",
    CHORD: "CHORD",
};
// Process Note
var noteToShow = "C";
var canClick = true;
var switchGuitar = false;
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
}


$(".dropdown #down").click(function () {
    if (!canClick) {
        return false;
    }
    canClick = false;

    $(".mask").each(function () {
        var el = $(this);
        var nextNote = el.find("li:nth-child(12)").text();

        el.animate({ top: 80 }, slideSpeed);
        setTimeout(function () {
            el.find("ul").prepend(
                "<li note=" + nextNote + ">" + nextNote + "</li>"
            );
            el.find("li:last-child").remove();
            el.css({ top: 0 });
        }, slideSpeed + 20);
    });

    setTimeout(function () {
        changeOpenNotes();
        showNotes(noteToShow);
        canClick = true;
    }, slideSpeed + 20);

    return false;
});

$(".dropdown #up").click(function () {
    if (!canClick) {
        return false;
    }
    canClick = false;

    $(".mask").each(function () {
        var el = $(this);
        var nextNote = el.find("li:nth-child(2)").text();

        $("<li note=" + nextNote + ">" + nextNote + "</li>").appendTo(
            el.find("ul")
        );
        el.css({ top: 80 });
        el.find("li:first-child").remove();
        el.animate({ top: 0 }, slideSpeed);
    });

    changeOpenNotes();
    showNotes(noteToShow);

    setTimeout(function () {
        canClick = true;
    }, slideSpeed + 20);
    return false;
});

// $('.controls .control-note li').click(function () {
// 	noteToShow = $(this).text();
// 	showNotes(noteToShow);
// });

function showNotes(noteToShow) {
    $(".guitar-neck .compartment-number").animate({ opacity: 0 }, 500);
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
const chords = {
    majors: [
        {
            name: "C",
            strings: [
                null,
                { finger: 1, fret: 1 },
                null,
                { finger: 2, fret: 2 },
                { finger: 3, fret: 3 },
                null,
            ],
        },
        {
            name: "D",
            strings: [
                { finger: 2, fret: 2 },
                { finger: 3, fret: 3 },
                { finger: 1, fret: 2 },
                null,
                null,
                null,
            ],
        },
        {
            name: "E",
            strings: [
                null,
                null,
                { finger: 1, fret: 1 },
                { finger: 3, fret: 2 },
                { finger: 2, fret: 2 },
                null,
            ],
        },
        {
            name: "F",
            strings: [
                { finger: 1, fret: 1 },
                { finger: 1, fret: 1 },
                { finger: 2, fret: 2 },
                { finger: 3, fret: 3 },
                { finger: 4, fret: 3 },
                { finger: 1, fret: 1 },
            ],
        },
        {
            name: "G",
            strings: [
                { finger: 3, fret: 3 },
                null,
                null,
                null,
                { finger: 1, fret: 2 },
                { finger: 2, fret: 3 },
            ],
        },
        {
            name: "A",
            strings: [
                null,
                { finger: 2, fret: 2 },
                { finger: 3, fret: 2 },
                { finger: 4, fret: 2 },
                null,
                null,
            ],
        },
        {
            name: "B",
            strings: [
                { finger: 1, fret: 2 },
                { finger: 4, fret: 4 },
                { finger: 3, fret: 4 },
                { finger: 2, fret: 4 },
                { finger: 1, fret: 2 },
                null,
            ],
        },
    ],
    minors: [
        {
            name: "Cm",
            strings: [
                { finger: 1, fret: 3 },
                { finger: 2, fret: 4 },
                { finger: 4, fret: 5 },
                { finger: 3, fret: 5 },
                { finger: 1, fret: 3 },
                null,
            ],
        },
        {
            name: "Dm",
            strings: [
                { finger: 1, fret: 1 },
                { finger: 3, fret: 3 },
                { finger: 2, fret: 2 },
                null,
                null,
            ],
        },

        {
            name: "Em",
            strings: [
                null, // 1
                null, // 2
                null, // 3,
                { finger: 3, fret: 2 }, // 4
                { finger: 2, fret: 2 }, // 5
                null, // 6
            ],
        },
        {
            name: "Fm",
            strings: [
                { finger: 1, fret: 1 }, // 1
                { finger: 1, fret: 1 }, // 2
                { finger: 2, fret: 2 }, // 3,
                { finger: 4, fret: 3 }, // 4
                { finger: 3, fret: 3 }, // 5
                { finger: 1, fret: 1 }, // 6
            ],
        },
        {
            name: "Gm",
            strings: [
                { finger: 1, fret: 3 }, // 1
                { finger: 1, fret: 3 }, // 2
                { finger: 1, fret: 3 }, // 3,
                { finger: 4, fret: 5 }, // 4
                { finger: 3, fret: 5 }, // 5
                { finger: 1, fret: 3 }, // 6
            ],
        },
        {
            name: "Am",
            strings: [
                null, // 1
                { finger: 1, fret: 1 }, // 2
                { finger: 3, fret: 2 }, // 3,
                { finger: 2, fret: 2 }, // 4
                null, // 5
                null, // 6
            ],
        },
        {
            name: "Bm",
            strings: [
                { finger: 1, fret: 2 },
                { finger: 2, fret: 3 }, // 2
                { finger: 4, fret: 4 }, // 3,
                { finger: 3, fret: 4 }, // 4
                { finger: 1, fret: 2 }, // 5
                null, // 6
            ],
        },
    ],
};
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

async function showChordNumber(chordSymbol) {
    // if (!canClick) {
    //     return false;
    // }
    // canClick = false;
    // const chord =
    //     chords.majors.find((item) => item.name === chordSymbol) ||
    //     chords.minors.find((item) => item.name === chordSymbol);
    // if (!chord) {
    //     canClick = true;
    //     return;
    // }
    $(".guitar-neck li[note]").animate({ opacity: 0 }, 500);
    $(".guitar-neck .compartment-number").animate({ opacity: 1 }, 500);
    await $("li[dot-number]").animate({ opacity: 0 }, 500).promise();
    // Set open note
    const notOpens = [
        { className: "low-e", note: "E" },
        { className: "b", note: "B" },
        { className: "g", note: "G" },
        { className: "d", note: "D" },
        { className: "a", note: "A" },
        { className: "high-e", note: "E" },
    ];
    notOpens.forEach((item) =>
        $(".open-notes ." + item.className).text(item.note)
    );
    // Set and render red dot
    const guitarStrings = [
        ".red-dot.high-e",
        ".red-dot.b",
        ".red-dot.g",
        ".red-dot.d",
        ".red-dot.a",
        ".red-dot.low-e",
    ];
    chord.strings.forEach((item, index) => {
        if (item) {
            $(`${guitarStrings[index]} li[dot-number="${item.fret}"]`)
                .text(item.finger)
                .animate({ opacity: 1 }, 500);
        }
    });

    canClick = true;
}

$("[button-click]").click((e) => {
    $("[button-click]").removeClass("active");
    $(`#${e.target.id}[button-click]`).addClass("active");
});

$("[tab-name]").click((e) => {
    $("[tab-name]").removeClass("active");
    const targetId = e.target.id;
    $(`#${targetId}[tab-name]`).addClass("active");
    if (targetId === "tab-note") {
        $(
            [
                ".controls .control-note",
                ".controls .up",
                ".controls .down",
            ].join(",")
        ).show();
        $(".control-chord").hide();
        $("#btn-note-all[button-click]").click();
    } else if (targetId === "tab-chord") {
        $(".control-chord").show();
        $(
            [
                ".controls .control-note",
                ".controls .up",
                ".controls .down",
            ].join(",")
        ).hide();
        $("#btn-chord-C[button-click]").click();
    }
});

$('[tab-name="note"]').click();
// code for menu chsoose
function showmenu() {
    $("#selector .dropdown-content").show();
}
$("#selector .dropdown-content #notes").on("click", () => {
	$("#selector .dropbtn img").attr("src", "./img/note.png");
    $(".dropdown #chord-class").css("visibility", "hidden");
    showNotes('All');
});
$("#selector .dropdown-content #chords").on("click",async () => {
	$("#selector .dropbtn img").attr("src", "./img/chord.png");
    $(".dropdown #chord-class").css("visibility", "unset");
    await showChordNumber();

});

$(".dropdown .switch input").change( () => {
    alert('hii')
    if(!switchGuitar) {
        let temp = notes;
        notes = note2;
        note2 = temp;
        $('.mask ul').text('');
        for (var i = 0; i < notes.e.length; i++) {
            $('.mask.low-e ul').append('<li note="' + notes.e[i] + '">' + notes.e[i] + '</li>')
            $('.mask.a ul').append('<li note="' + notes.a[i] + '">' + notes.a[i] + '</li>')
            $('.mask.d ul').append('<li note="' + notes.d[i] + '">' + notes.d[i] + '</li>')
            $('.mask.g ul').append('<li note="' + notes.g[i] + '">' + notes.g[i] + '</li>')
            $('.mask.b ul').append('<li note="' + notes.b[i] + '">' + notes.b[i] + '</li>')
            $('.mask.high-e ul').append('<li note="' + notes.e[i] + '">' + notes.e[i] + '</li>')
        }
        showNotes('C');
    }else {
    }
    switchGuitar = !switchGuitar;
})

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
