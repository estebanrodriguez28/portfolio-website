






function open_dropdown() {
    let dropdown_state = document.getElementsByClassName('dropdown-content')[0].style.display;
    if (!dropdown_state) {
        document.getElementsByClassName('dropdown-content')[0].style.display = "block";
    }
    else {
        document.getElementsByClassName('dropdown-content')[0].style.display = "";
    }
};

function open_mobile_menu() {
    document.getElementById('navbar').classList.add("fade-out");

    document.getElementById('navbar').style.display = "none";
    document.getElementById('intro').style.minHeight = "100dvh";
    document.getElementById('intro').style.paddingBottom = "5dvh";
    document.getElementsByClassName('mobile-menu-popup')[0].style.display = "flex";

    document.querySelectorAll(".mobile-menu-popup-nav ol li").forEach(list_item => {

        list_item.addEventListener("click", close_mobile_popup);

    }
    );



}

function close_mobile_popup() {
    document.getElementsByClassName('mobile-menu-popup')[0].style.display = "";
    document.getElementById('navbar').classList.add("fade-in");
    document.getElementById('navbar').style.display = "flex";
    document.getElementById('intro').style.minHeight = "80dvh";
    document.getElementById('intro').style.paddingBottom = "0dvh";


}