document.querySelectorAll("div.tab").forEach((x) => {
    const Tab_Stripe = x.querySelector(".tab-stripe");
    const Tab_Content = x.querySelector(".tab-content");
    const Tab_Stripe_a = [...Tab_Stripe.children];
    const Tab_Content_div = [...Tab_Content.children];
    for (let index = 1; index < Tab_Content_div.length; index++) {
        Tab_Content_div[index] = Tab_Content_div[0];
    }
    let current_active_tab = 0;

    function SetTab(index) {
        Tab_Stripe_a[current_active_tab].classList.remove("active");
        Tab_Content_div[current_active_tab].classList.remove("active");

        Tab_Stripe_a[index].classList.add("active");
        Tab_Content_div[index].classList.add("active");
        current_active_tab = index;
    }

    if (location.hash) {
        const UrlTab = Tab_Content.querySelector(location.hash);
        iOfUrlTab = Tab_Content_div.indexOf(UrlTab);
        iOfUrlTab = iOfUrlTab === -1 ? 0 : iOfUrlTab;
        SetTab(iOfUrlTab);
    }

    Tab_Stripe_a.forEach(
        (x, index) =>
            (x.onclick = async (e) => {
                noteToShow = (chordTab1[index] in giang) ? giang[chordTab1[index]] : chordTab1[index];

                SetTab(index);
                document
                    .querySelector("#fret0")
                    .scrollIntoView({ behavior: "smooth" });
                $(".tab-content #chord-version").text(1);
                $(".tab-content #chord-name #chord").text(noteToShow);
                currentFret = chordVersion = 0;
                console.log(noteToShow);
                await fetch(
                    `./chords/${noteToShow.replace("#", "sharp")}/major.json`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data);
                        chordActive = data["positions"];
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });

                if (floatingMenu === "note") {
                    showNotes(chordTab1[index]);
                } else if (floatingMenu === "chord") {
                    // console.log("note: " + noteToShow);
                    showNoteMode();
                } else {
                }
                chordVersion = 0;
                currentTab = index;
                e.preventDefault();
            })
    );
});
// Functions for drag scrolling, scroll-button hiding & full-screen button
document.querySelectorAll(".tab").forEach((x) => {
    const Tab_Stripe = x.querySelector(".tab-stripe");
    const Left_Button = x.querySelector(".tab-scroll-button.left");
    const Right_Button = x.querySelector(".tab-scroll-button.right");
    const Full_screen_Button = x.querySelector(".tab-full-screen-button");

    Full_screen_Button.onclick = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else x.requestFullscreen();
    };

    // Tab Scroll Button Start
    function update_steps() {
        let steps = Tab_Stripe.clientWidth - 100;
        function Scroll(steps) {
            Tab_Stripe.scrollLeft += steps;
        }
        Left_Button.onclick = () => Scroll(-steps);
        Right_Button.onclick = () => Scroll(steps);
    }
    update_steps();
    window.addEventListener("resize", update_steps);
    // Tab Scroll Button End

    // Tab Scroll Button Hiding Start
    function check_scroll() {
        let current_scroll_pos = Tab_Stripe.scrollLeft;
        let container_width = Tab_Stripe.clientWidth;
        let scrollable_width = Tab_Stripe.scrollWidth;
        let scroll_start_offset = 20;
        let scroll_end_offset =
            scrollable_width - container_width - scroll_start_offset;

        if (current_scroll_pos <= scroll_start_offset) {
            Left_Button.classList.add("hidden");
            Right_Button.classList.remove("hidden");
        } else if (current_scroll_pos < scroll_end_offset) {
            Left_Button.classList.remove("hidden");
            Right_Button.classList.remove("hidden");
        } else if (current_scroll_pos >= scroll_end_offset) {
            Left_Button.classList.remove("hidden");
            Right_Button.classList.add("hidden");
        }
    }
    Tab_Stripe.addEventListener("scroll", check_scroll);
    // Tab Scroll Button Hiding End

    // MouseDown -> MouseMove To Scroll
    let isDown;
    let startX;
    let scrollLeft;
    // Switch To Global(Window) Event Listener https://htmldom.dev/drag-to-scroll/
    // ↳ isDown = 1, ONLY when target coming from Tab_Stripe
    Tab_Stripe.addEventListener("mousedown", (e) => {
        isDown = 1;
        startX = e.pageX - Tab_Stripe.offsetLeft;
        scrollLeft = Tab_Stripe.scrollLeft;
        Tab_Stripe.classList.add("active");
        e.preventDefault();
    });
    Tab_Stripe.addEventListener("mouseleave", () => {
        isDown = 0;
        Tab_Stripe.classList.remove("active");
    });
    Tab_Stripe.addEventListener("mouseup", () => {
        isDown = 0;
        Tab_Stripe.classList.remove("active");
    });
    Tab_Stripe.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const x = e.pageX - Tab_Stripe.offsetLeft;
        const scroll = (x - startX) * 2;
        Tab_Stripe.scrollLeft = scrollLeft - scroll;
        e.preventDefault();
    });
});
showNotes("C");
