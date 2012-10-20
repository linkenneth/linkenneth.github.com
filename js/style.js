// JavaScript to automate the style on some items on index.html.
jQuery( function($) {

  // Automates the images in portfolio-imgs to have img-rounded class
  // Also gives images opacity of 1 on hover
  function scrollToID(j) {
    $("html, body").animate({
      scrollTop : $(j).offset().top
    }, 500, 'swing');
  }

  $("a.scroll-to").click( function(event) {
    event.preventDefault();
    var localPat = /#\w+/;
    match = localPat.exec($(this).prop("href"));
    if (match != null) {
      scrollToID(match[0]);
    }
  });

  // Fix
  $(".portfolio-imgs").find("div").addClass("img-polaroid").hover( function() {
    $(this).animate({ opacity : 1 }, 100)
  }, function() {
    $(this).animate({ opacity: 0.6 }, 300)
  });

});
