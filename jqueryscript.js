$(document).ready(function() {
    $(function() {
        $(".js__mini__page").draggable({
            scroll: false,
            cursor: "crosshair",
            cursorAt: { top: -10, left: -10 }
        });
    });

    $(function() {
        $(".form__input").datepicker({
            changeMonth: true,
            changeYear: true
        });
    });
})


$(document).ready(function() {
    $('.close').click(function() {
        $('.js__mini__page').hide()
    })
});