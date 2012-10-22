// JavaScript to automate the style on some items on index.html.
jQuery( function($) {

  // Automates the images in portfolio-imgs to have img-rounded class
  // Also gives images opacity of 1 on hover
  function scrollToID(j) {
    $("html, body").animate({
      scrollTop : $(j).offset().top - $(".navbar").height()
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

  $(".portfolio-thumb").hover( function() {
    $(this).stop().animate({ opacity : 1 }, 300);
    $(this).next().stop().animate({ top : "100%" }, 400);
  }, function() {
    $(this).stop().animate({ opacity: 0.65 }, 300);
    $(this).next().stop().animate({ top : "80%" }, 400);
  });


});
