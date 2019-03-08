var activeTimePicker = null;

class TimePicker {

    constructor(formInput, initialHour, initialMin) {
        this.input = formInput;
        this.view = $("#time-picker");
        this.hColumn = this.view.find("#hour-column");
        this.mColumn = this.view.find("#minute-column");
        this.iH = initialHour;
        this.iM = initialMin;
    }

    show() {
        if (/Edge\/\d./i.test(navigator.userAgent)){
           // Browser is Microsoft Edge. Do not show time picker
           // over built-in solution.
       } else {
           // Place view under time input
           this.view.css("left", this.input.position().left + this.input.outerWidth(true) / 2 - this.view.outerWidth(true) / 2);
           this.view.css("top", this.input.position().top + this.input.outerHeight(true) / 2 + this.input.outerHeight());

           // Scroll to initial hh:mm
           /*
           console.log(this.hColumn);
           console.log(this.hColumn.find(`[data-value='${this.iH}']`));
           this.hColumn.scrollTop(this.hColumn.find(`[data-value='${this.iH}']`).offset().top - this.hColumn.offset().top);
           this.mColumn.scrollTop(this.mColumn.find(`[data-value='${this.iM}']`).offset().top - this.mColumn.offset().top);
           */

           // Animate & make view visible
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
            that.view.removeClass("visible");
        }, 100);
    }

    resetView() {
        this.view.find(".option").removeClass("selected");
        this.hColumn.scrollTop(0);
        this.mColumn.scrollTop(0);
    }

}

$(".option").click(function(e) {

    var div = $(this);
    var column = div.parent();
    var bubble = column.parent();
    var timeInput = activeTimePicker.input;
    var currentValue = timeInput.val();
    var selectedValue = div.attr("data-value");

    // Sanitize values
    if (currentValue == "") currentValue = "00:00";

    // Update corresponding value
    if (column.hasClass("left")) {
        // Hour column
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
