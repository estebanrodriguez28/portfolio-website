// Source - https://stackoverflow.com/a/4819886
// Posted by bolmaster2, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-16, License - CC BY-SA 4.0

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
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
                // $("#navbar").css("box-shadow", "0px 4px 12px -1px rgba(0, 0, 0, 0.3)");
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
                    alert("Swiped Vertically Up");
                }

                else if (direction == "down") {
                    $("#navbar").slideDown("fast");
                    alert("Swiped Vertically Down");
                }
            },
            threshold: 50,
        });
    }


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
    let dropdown_state = $(".dropdown-content").css("display");
    if (dropdown_state == "none") {
        $(".dropdown-content").css("display", "block");
    }

    else {
        $(".dropdown-content").css("display", "");
    }




};

function open_mobile_menu() {

    document.documentElement.style.setProperty("--underline-width-hover", "0px");
    $("#navbar").slideUp(80, function () {
        //$(".mobile-menu-popup").css("display", "flex");
        $(".mobile-menu-popup").animate({ right: "0vw" }, 450);
        $("#mobile-menu-popup-nav li").click(close_mobile_popup);
        $("body").css("overflow", "hidden");


    })



}

function close_mobile_popup() {

    $(".mobile-menu-popup").animate(
        { right: "-100vw" },
        450,
        function () {
            //$(".mobile-menu-popup").css("display", "");
            //$("#navbar").fadeIn(300);
            //$("#navbar").css("display", "flex");
            $("body").css("overflow", "visible");

        }
    );



}



$(document).ready(function () {
    // Source - https://stackoverflow.com/a/25874044
    // Posted by elad.chen
    // Retrieved 2026-04-16, License - CC BY-SA 3.0

    var clickHandler = ("ontouchstart" in window ? "touchend" : "click")
    //$(document.body).on('touchmove', nav_scroll);
    nav_scroll();
    nav_link_underline();

});

