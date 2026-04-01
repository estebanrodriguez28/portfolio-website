
const footer_dropdown = document.getElementById("footer-dropdown");
console.log(footer_dropdown)
footer_dropdown.onclick = function () {
    document.getElementsByClassName('dropdown-content').style.display = "block"
};