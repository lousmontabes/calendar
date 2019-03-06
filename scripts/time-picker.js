var activeTimePicker = null;

class TimePicker {

    constructor(formInput) {
        this.input = formInput;
        this.view = $("#time-picker");
    }

    show() {
        if (/Edge\/\d./i.test(navigator.userAgent)){
           // Browser is Microsoft Edge. Do not show time picker
           // over built-in solution.
       } else {
           this.view.css("left", this.input.position().left + this.input.outerWidth(true) / 2 - this.view.outerWidth(true) / 2);
           this.view.css("top", this.input.position().top + this.input.outerHeight(true) / 2 + this.input.outerHeight());
           this.view.addClass("visible");
           this.view.removeClass("zoom-fade-out");
           this.view.addClass("zoom-fade-in");
       }
    }

    hide() {
        this.view.removeClass("zoom-fade-in");
        this.view.addClass("zoom-fade-out");
        var that = this;
        setTimeout(function() {
            that.view.removeClass("visible")
        }, 100);
    }

    resetView() {
        this.view.find(".option").removeClass("selected");
        this.view.find(".column").scrollTop(0);
    }

}

$(".option").click(function(e) {

    var div = $(this);
    var column = div.parent();
    var bubble = column.parent();
    var timeInput = activeTimePicker.input;
    var currentValue = timeInput.val();
    var selectedValue = div.html();

    // Sanitize values
    if (currentValue == "") currentValue = "00:00";

    // Update corresponding value
    if (column.hasClass("left")) {
        // Hour column
        if (selectedValue < 10) selectedValue = "0" + selectedValue;
        timeInput.val(selectedValue + currentValue.substring(2, 5));
    } else {
        // Minute column
        timeInput.val(currentValue.substring(0, 3) + selectedValue);
    }

    // UI
    column.find(".option").removeClass("selected");
    div.addClass("selected");

    $(column).animate({
        scrollTop: column.scrollTop() + div.position().top - bubble.innerHeight() / 2 + div.outerHeight() / 2
    }, 200);

    e.stopPropagation();

});
