import { animate, easingDefinitionToFunction, stagger, delay, hover } from "motion";




// Source - https://www.xjavascript.com/blog/what-s-the-best-way-to-detect-a-touch-screen-device-using-javascript/

const is_touch_device = () => {

    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (window.PointerEvent && window.matchMedia('(pointer: coarse)').matches)
    );
};






// Source - https://www.xjavascript.com/blog/how-to-scroll-to-top-of-page-with-javascript-jquery/
// Disable scroll restoration
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

if (window.location.hash) {
    window.location.hash = "";
}




// Source - https://stackoverflow.com/a/4326907
// Posted by Josiah Ruddell, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-09, License - CC BY-SA 3.0



const nav_scroll = () => {
    var lastScrollTop = 0;
    $(window).scroll(function () {


        var st = $(this).scrollTop();

        // Sometimes user can scroll to very top of page without navbar coming down/appearing
        if (st === 0) {
            if ($(".navigation").hasClass("slide-up")) {
                $(".navigation").removeClass("slide-up");
            }
        }

        // After scrolling slightly, box shadow added under top navigation
        if (st > 20) {
            $(".navigation").css("filter", "drop-shadow(0px -1px 8px black)");
        }

        else {
            $(".navigation").css("filter", "drop-shadow(0px 0px black)");
        }

        // Scroll some more the top nav will slde up as user scrolls down page and slide down or appear again when user scrolls up page
        if (st > 100) {
            if (st > lastScrollTop) {
                // downscroll code
                $(".navigation").addClass("slide-up");
            } else {
                // upscroll code
                $(".navigation").removeClass("slide-up");
            }
        }

        lastScrollTop = st;

    });
}




function reset_page() {
    $("#letter-e").click(
        () => {
            // When E logo in top left of page clicked reload page
            // Reloading page will reset url (remove hashes # from url), scroll back to very top
            location.reload();


        }
    )
}







function open_dropdown() {

    $("#footer-dropdown").click(

        function () {
            let dropdown_state = $(".dropdown-content").css("display");
            if (dropdown_state == "none") {
                $(".dropdown-content").css("display", "block");
            }

            else {
                $(".dropdown-content").css("display", "");
            }
        }
    );


};




function toggle_mobile_menu() {
    $(".hamburger").click(
        function () {

            const mobile_nav_open = $(".nav-links").hasClass("active");
            if (mobile_nav_open) {
                close_mobile_menu();
            }

            else {
                $(".nav-links").addClass("active");
                animate_hamburger();
                $(".hamburger").attr("aria-expanded", "true");
                $("body").css("overflow", "hidden");

            }


        }
    );



}





const animate_hamburger = () => {
    const hamburger_bars = [
        [".hamburger .bar:nth-child(2) ", { opacity: 0 }],
        [".hamburger .bar:nth-child(3)", { width: "35px", transform: "translateY(-12px)" }],
        [".hamburger .bar:nth-child(1)", { transform: "translateY(13px)" }],
        // Pause for a second when the bars meet in middle for dramatic effect with delay
        [".hamburger .bar:nth-child(1)", { transform: "translateY(12px) rotate(45deg)" }, { delay: 0.1 }],
        [".hamburger .bar:nth-child(3)", { transform: "translateY(-13px) rotate(-45deg)" }],
        // Starts animating nav links 0.25 seconds from start of animation sequence
        [".nav-links li", { opacity: 1, y: [-50, 0] }, { delay: stagger(0.05), at: 0.25 }],



    ]

    animate(hamburger_bars, {
        // each item in sequence has duration of 0.1 seconds
        defaultTransition: { duration: 0.1 }
    }
    );

}

const reverse_hamburger_animation = () => {
    const hamburger_bars = [
        [".hamburger .bar:nth-child(1)", { transform: "rotate(0deg)" }],
        [".hamburger .bar:nth-child(3)", { transform: "rotate(0deg) ", width: "25px" }],
        [".hamburger .bar:nth-child(2) ", { opacity: 1 }]



    ]
    animate(hamburger_bars, {
        defaultTransition: { duration: 0.1 }
    }
    );

}





const mobile_nav_links = () => {
    if (is_touch_device()) {
        $(".nav-links a").click(
            function () {
                close_mobile_menu();
            }
        );
    }



}

const close_mobile_menu = () => {
    animate(".nav-links li", { opacity: 0, y: [0, -50] }, { delay: stagger(0.05) });
    reverse_hamburger_animation();
    $(".nav-links").removeClass("active");
    $("body").css("overflow", "visible");
    $(".hamburger").attr("aria-expanded", "false")
}
// Source: https://thesyntaxdiaries.com/responsive-navbar-html-css-js
const add_accessibility = () => {
    $(".hamburger").attr("aria-label", "Toggle navigation menu");
    $(".hamburger").attr("aria-expanded", "false");
    $(".hamburger").attr("role", "button");
    $(".hamburger").attr("tabindex", "0");
    // Keyboard activation of hamburger menu
    $(".hamburger").on("keydown",
        (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                $(".hamburger").click();
            }
        }
    );

}




const generate_random_substring = (length, symbols) => {
    let random_substring = "";
    for (let i = 0; i <= length; i++) {
        // Chose a random character in symbols string, concatenate that character
        // to our string variable
        random_substring += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    return random_substring;
}



const scramble_text = (latest, count, element, target_string, symbols) => {
    // on every 4th frame of the animation, set the elements text 
    // to a random substring in the symbols string 
    element.text(
        function () {
            // Once we reach the last frame or value set the element's text to one of the words in the array
            if (latest === 1) {

                return target_string;
            }

            // On every 4th frame or value, we change the elementas content to a random substring
            // this slows down the animation, changing of substrings, which looks better
            // than having elemnts text change substrings on every frame
            if (count % 4 === 0) {
                return generate_random_substring(target_string.length, symbols);
            }

        }

    )



}




async function animate_hero() {
    /*
    For the hero, first fade in the navbar, then the text, then social icons
    */
    const chars = ["😀", "😃", "😄", "😁", "😆", "😅"];
    const blocks = "█▓▒░";
    const binary = "01";
    const hex = "0123456789ABCDEF";
    const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const dots = "⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏";
    const name = "Esteban Rodriguez";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡";
    const name_element = $(".bold");
    const title_element = $(".title");
    let count = 0;
    const titles = ["Full-Stack Developer", "Front-End Engineer", "Web Developer"];
    const sequence = [
        [".navigation", { opacity: 1 }, { duration: 0.5 }],
        ["#letter-e", { opacity: 1 }, { duration: 0.25 }],
        ["#code-image", { opacity: 1, y: [35, 0] }, { duration: 0.25 }],
        [
            // On each value, by default latests counts from 0 to 1, for each of those values
            // between 0 and 1, runs callback to scramble the text
            (latest) => {
                scramble_text(latest, count, name_element, name, symbols);
                count++;

            },


            { at: "<-0.2", duration: 1 }
        ],

        [
            (latest) => {
                scramble_text(latest, count, title_element, titles[0], symbols);
                count++;
            },

            {

                duration: 1
            }
        ],

        [".github-linkedin", { opacity: 1 }, { at: "<+0.5", duration: 1 }],
        [".mail-icon", { opacity: 1 }, { at: "<+0.5", duration: 1 }]


    ];

    if (is_touch_device()) {
        sequence.splice(2, 0, [".hamburger .bar", { opacity: 1, y: [-15, 0] }, { delay: stagger(0.06) }]);
    }
    else {
        sequence.splice(2, 0, [".nav-links li", { opacity: 1, y: [-35, 0] }, { delay: stagger(0.06) }]);
    }


    const hero_animation = animate(sequence);
    await hero_animation;



    default_hover_states();
    scramble_text_infinte(symbols, titles);

}



const scramble_text_infinte = (symbols, titles) => {

    let is_repeating = false;
    let current_title = 0;
    let next_title = 0;
    let count = 0;
    animate(
        0, 1, {
        duration: 1.5,
        ease: "circOut",
        // on each frame of the animation (a value between 0-1), set the elements text 
        // to a random substring in the symbols string with onUpdate callback

        onUpdate: (latest) => {
            if (is_repeating === false || latest < 1) {
                ($(".title").text(
                    function () {
                        // Once we reach the last frame or value in the animate function
                        // set the element's text to the target value, example my name 
                        if (latest === 1) {
                            // Check if the index is outside of the bounds of array, if so reset the index
                            // Otherwise set the element text to the curent index of the array
                            current_title++;
                            next_title = current_title + 1;
                            if (current_title > titles.length - 1) {
                                current_title = 0;
                            }

                            if (next_title > titles.length - 1) {
                                next_title = 0;
                            }
                            is_repeating = true;


                            return titles[current_title];



                        }
                        is_repeating = false;
                        count++;
                        // On every 4th frame or value, we change the elementas content to random substring
                        // by doing this slows down the animation, changing of substrings, looks better
                        if (count % 6 === 0) {

                            return generate_random_substring(titles[next_title].length, symbols);
                        }

                    }

                )


                )
            }

        },
        repeat: Infinity, repeatType: "loop", repeatDelay: 2
    }
    );







}

// Since motion library changes opacity, I have to continue to use Motion if I want to animate same value
// in this case opacity, otherwise if I try to animate opacity on hover state in css, will cause issue (flickering bug)

const default_hover_states = () => {
    hover(
        ".default-hover-state", (element) => {
            // runs when hover starts

            element.style.cursor = "pointer";
            animate(element, { opacity: 0.5, transform: "translateY(-6px)" });

            // runs when hover ends
            return () => {

                animate(element, { opacity: 1, transform: "translateY(0px)" });
            }
        }
    )

}




$(document).ready(function () {
    $(window).scrollTop(0);

    nav_scroll();


    reset_page();
    add_accessibility();
    animate_hero();


    open_dropdown();
    toggle_mobile_menu();
    mobile_nav_links();



});

