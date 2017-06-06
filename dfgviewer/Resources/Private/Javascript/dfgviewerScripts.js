/*!

    Custom scripts
    ------------------------
    DFG viewer script for cookies, sidebar adaption eg.

!*/

$(document).ready(function() {

    // check mobile device to specify click events
    function mobileCheck() {
        var check = false;
        (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    var mobileEvent = mobileCheck() ? 'touchstart' : 'click';

    // menu toggles for offcanvas toc and metadata
    $('.offcanvas-toggle').on(mobileEvent, function(event) {
        $(this).parent().toggleClass('open');
    });

    // active toggle for submenus
    $('li.submenu > a').on(mobileEvent, function(event) {
        $('li.submenu.open a').not(this).parent().removeClass('open');
        $(this).parent().toggleClass('open');
    });

    // secondary nav toggle
    $('nav .nav-toggle').on(mobileEvent, function(event) {
        $(this).toggleClass('active');
        $('nav .secondary-nav').toggleClass('open');
    });

    // calendar dropdowns
    $('.calendar-view .contains-issues').on(mobileEvent, function(event) {
        $('.calendar-view table td.open').not($(this).parent()).removeClass('open');
        $(this).parent().toggleClass('open');
    });

    // add body class if any calendar is present
    $('.tx-dfgviewer-newspaper-calendar').parents('body').addClass('calendar');

    // Inject view switch functions for calendar/list view (initial show calendar)
    $('.tx-dfgviewer-newspaper-calendar .calendar-list-selection a.select-calendar-view, .tx-dfgviewer-newspaper-calendar .calendar-view').addClass('active');
    $('.tx-dfgviewer-newspaper-calendar .calendar-list-selection a').on(mobileEvent, function(event) {
        if(!$(this).hasClass('active')) {
        var targetElement = '.'+$(this).attr('class').replace('select-','');
        $('.tx-dfgviewer-newspaper-calendar .active').removeClass('active');
        $(this).addClass('active');
        $(targetElement).addClass('active');
        }
    });

    // enable click on fullscreen button
    $('a.fullscreen').on(mobileEvent, function() {
        if($('body.fullscreen')[0]) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    });

    // if cookie for fullscreen view is present adapat initial page rendering
    if(Cookies.get('tx-dlf-pageview-zoomFullscreen')) {
        $('body').addClass('fullscreen static');
        $('.zoom .fullscreen').addClass('active');
    }

    // Finally all things are settled. Curtain up and bring back animations a second later.
    $('body').removeClass('hidden');
    setTimeout(function() { $('body').removeClass('static'); }, 1000);

});

$(document).keyup(function(e) {

    // Check if ESC key is pressed. Then end fullscreen mode or close SRU form.
    if (e.keyCode == 27) {
        if($('body.fullscreen')[0]) {
            return exitFullscreen();
        }
        if($('.document-functions .search.open')[0]) {
            $('.document-functions .search').removeClass('open');
        }
    }
    // Check if the F key is pressed and no text input in SRU form is taking place.
    if (e.keyCode == 70 && !$('#tx-dfgviewer-sru-query').is(':focus')) {
        return enterFullscreen();
    }

});

// Activate fullscreen mode and set corresponding cookie
function enterFullscreen() {
    setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 220);
    $("body").addClass('fullscreen'); $('.zoom .fullscreen').addClass('active');
    Cookies.set('tx-dlf-pageview-zoomFullscreen', 'true');
}

// Exit fullscreen mode and drop cookie
function exitFullscreen() {
    setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 220);
    $("body").removeClass('fullscreen'); $('.zoom .fullscreen').removeClass('active');
    Cookies.remove('tx-dlf-pageview-zoomFullscreen');
}


// EOF