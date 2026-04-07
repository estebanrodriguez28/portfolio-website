

function open_dropdown() {
    $(document).ready(function () {
        let dropdown_state = $(".dropdown-content").css("display");
        console.log(dropdown_state);
        if (dropdown_state == "none") {
            $(".dropdown-content").css("display", "block");
        }

        else {
            $(".dropdown-content").css("display", "");
        }


    }
    )

};

function open_mobile_menu() {

    $(document).ready(function () {
        $("#navbar").fadeOut(80, function () {
            $("#intro").css("minHeight", "100dvh");
            //$("#intro").css("filter", "blur(6px)");
            $(".mobile-menu-popup").css("display", "flex");
            $(".mobile-menu-popup-nav ol li").click(close_mobile_popup);
            $("body").css("overflow", "hidden");


        })
    });


}

function close_mobile_popup() {

    $(document).ready(function () {
        $(".mobile-menu-popup").css("display", "");
        $("#navbar").fadeIn(300);
        $("#navbar").css("display", "flex");
        $("#intro").css("minHeight", "80dvh");
        $("body").css("overflow", "visible");
    })

}