

function open_dropdown() {
    dropdown_state = document.getElementsByClassName('dropdown-content')[0].style.display;
    if (!dropdown_state) {
        document.getElementsByClassName('dropdown-content')[0].style.display = "block";
    }
    else {
        document.getElementsByClassName('dropdown-content')[0].style.display = "";
    }
};