import { animate, easingDefinitionToFunction, stagger, delay } from "motion";




// Source - https://stackoverflow.com/a/4819886
// Posted by bolmaster2, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-16, License - CC BY-SA 4.0 

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Source - https://www.xjavascript.com/blog/how-to-scroll-to-top-of-page-with-javascript-jquery/
// Disable scroll restoration
if (history.scrollRestoration) {
    console.log("Scroll restoration present");
    history.scrollRestoration = 'manual';
}


// Source - https://stackoverflow.com/a/4326907
// Posted by Josiah Ruddell, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-09, License - CC BY-SA 3.0



function nav_scroll() {
    if (!isTouchDevice()) {
        var lastScrollTop = 0;
        $(window).scroll(function () {
            // $("#navbar").css("box-shadow", "none");
            // $("#navbar").addClass("box-shadow-fadeout");

            var st = $(this).scrollTop();
            if (st > 50) {
                $("#navbar").css("box-shadow", "0px 4px 10px -1px rgba(0, 0, 0, 0.3)");
                if (st > lastScrollTop) {
                    // downscroll code
                    $("#navbar").slideUp("fast");
                } else {
                    // upscroll code
                    $("#navbar").slideDown("fast");
                }
                lastScrollTop = st;
            }

        });
    }

    else {
        $("body").swipe({
            swipe: function (event, direction) {
                if (direction == "up") {
                    // User swipes up, screen goes down, navbar should go away
                    $("#navbar").slideUp("fast");


                }

                else if (direction == "down") {
                    $("#navbar").slideDown("fast");


                }
            },
            threshold: 50,
        });
    }


}

// Source - https://www.xjavascript.com/blog/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-refresh/
// Retrieved 2026-06-03, License - CC BY-SA 3.0

const removeHash = () => {
    if (window.location.hash) {
        // Get the current URL without the hash  
        const newUrl = window.location.href.split('#')[0];
        // Replace the current history entry with the new URL  
        history.replaceState(null, '', newUrl);
    }
}


function reset_page() {
    $("#letter-e").click(
        () => {
            // When E logo in top left of page clicked: reload page, reset url (remove hashes # from url), scroll back to very top
            removeHash();

            location.reload();


        }
    )
}


function nav_link_underline() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        $(".nav-links a").hover(
            function () {
                var link_width = $(this).width();
                document.documentElement.style.setProperty("--underline-width-hover", `${link_width}px`);
            }
        );
    }

    else {
        $(".nav-links a").click(
            function () {
                var link_width = $(this).width();
                document.documentElement.style.setProperty("--underline-width-hover", `${link_width}px`);
            }
        );
    }



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

function open_mobile_menu() {
    $("#hamburger-icon").click(
        function () {
            document.documentElement.style.setProperty("--underline-width-hover", "0px");
            $("#navbar").fadeOut("fast");
            $(".mobile-menu-popup").animate({ right: "0vw" }, 300);
            $("#mobile-menu-popup-nav li").click(close_mobile_menu);
            $("body").css("overflow", "hidden");

        }
    );



}




function close_button() {
    $(".close-menu").click(
        function () {
            close_mobile_menu();
            $("#navbar").fadeIn("slow");
        }
    );

}

function close_mobile_menu() {
    $(".mobile-menu-popup").animate(
        { right: "-100vw" },
        200);

    $("body").css("overflow", "visible");
}


function animate_nav_desktop() {
    animate(".desktop-nav-row li",
        {
            opacity: 1,
            y: [-35, 0]
        },
        { delay: stagger(0.06) }
    );


}

function animate_logo() {
    animate(
        "#letter-e",
        {
            opacity: 1
        },
        {
            duration: 1.5,
        }
    )
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

/*
const scramble_text = (element, target_string, symbols) => {
    let count = 0;
    animate(
        0, 30, {
        duration: 1.5,
        ease: "circOut",
        // on each frame of the animation (a value between 0-0.5), set the elements text 
        // to a random substring in the symbols string with onUpdate callback

        onUpdate: (latest) => (element.text(
            function () {
                // Once we reach the last frame or value in the animate function
                // set the element's text to the target value, example my name 

                if (latest === 30) {
                    return target_string;
                }

                count++;
                // On every 4th frame or value, we change the elementas content to random substring
                // by doing this slows down the animation, changing of substrings, looks better
                if (count % 4 === 0) {
                    return generate_random_substring(target_string.length, symbols);
                }

            }
        )


        ),
    }
    )

}
*/

const scramble_text = (latest, count, element, target_string, symbols) => {
    // on every 4th frame of the animation, set the elements text 
    // to a random substring in the symbols string 
    element.text(
        function () {
            // Once we reach the last frame or value 
            // set the element's text to the target value, example my name 
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

/*
function animate_text() {
    const chars = ["😀", "😃", "😄", "😁", "😆", "😅"];
    const blocks = "█▓▒░";
    const binary = "01";
    const hex = "0123456789ABCDEF";
    const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const dots = "⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏";


    const name = "Esteban Rodriguez";
    const title = "Full-Stack Developer";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡";

    // do the scramble text animation on name in hero
    const name_element = $(".bold");
    scramble_text(name_element, name, symbols);

    // do the scramble text animation on title in hero
    const title_element = $(".normal-text");
    scramble_text(title_element, title, symbols);



}

*/





function animate_hero() {
    /*
    For the hero, first fade in the navbar, then the text, then social icons
    */
    const name = "Esteban Rodriguez";
    const title = "Full-Stack Developer";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡";
    const name_element = $(".bold");
    const title_element = $(".title");
    let count = 0;
    const sequence = [
        ["#navbar", { opacity: 1 }, { duration: 0.5 }],
        ["#letter-e", { opacity: 1 }, { duration: 0.25 }],
        ["#hamburger-icon", { opacity: 1 }, { duration: 0.25 }],
        [".desktop-nav-row li", { opacity: 1, y: [-35, 0] }, { delay: stagger(0.06) }],
        ["#code-image", { opacity: 1, y: [35, 0] }, { duration: 0.25 }],
        [
            // On each value, by default latests counts from 0 to 1, for each of those values
            // between 0 and 1, runs callback to scramble the text
            (latest) => (
                scramble_text(latest, count, name_element, name, symbols),
                count++
            ),

            { at: "<-0.2", duration: 1 }
        ],

        [
            (latest) => (
                scramble_text(latest, count, title_element, title, symbols),
                count++
            ),
            {

                duration: 1
            }
        ],

        ["#github-li", { opacity: 1 }, { at: "<+0.5", duration: 1 }],
        ["#email", { opacity: 1 }, { at: "<+0.5", duration: 1 }]



    ];
    animate(sequence);
}



$(document).ready(function () {
    $(window).scrollTop(0);
    // Source - https://stackoverflow.com/a/25874044
    // Posted by elad.chen
    // Retrieved 2026-04-16, License - CC BY-SA 3.0

    //var clickHandler = ("ontouchstart" in window ? "touchend" : "click")
    //$(document.body).on('touchmove', nav_scroll);
    nav_scroll();
    // By default the browser remembers scroll positon, so when you refresh page loads position that your were previously
    //  but when refreshing the page a fter E logo clicked, I want the page to go back to very top to replay animations
    // history.scrollRestoration = "manual";

    reset_page();
    nav_link_underline();

    animate_hero();


    open_dropdown();
    open_mobile_menu();
    close_button();



});

