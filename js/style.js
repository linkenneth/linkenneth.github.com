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

  function closeModal() {
    $(".modal-container").fadeToggle().children(".project-modal")
      .slideToggle( function() {
      $(this).remove();
    });
    $("body").removeClass("body-lock");
  };

  modalTemplate = _.template($("#project-modal-template").html());

  $(".portfolio-thumb").click( function(e) {
    modal = modals[$(e.target).attr("data-target")]
    $(".modal-container")
      .append(modalTemplate(modal))
      .fadeToggle().children(".project-modal").slideToggle();
    $(".modal-content").load("./modal-content/" + modal.id + ".html");
    $("body").addClass("body-lock");
    $(".project-modal").click( function(e) {
      e.stopPropagation();
    });
    $(".modal-thumb").click( function(e) {
      window.open($(this).attr("href"), "_blank");
    });
    $(".close").click(closeModal);
  });

  $(".modal-container").click(closeModal);

  skillNavTemplate = _.template($("#skill-navbar-template").html());

  skills.forEach( function(skill) {
    $(".skills-navbar").children("ul").append(skillNavTemplate(skill));
  });

  $(".skills-navbar").find(".skill-item").hover( function() {
    $(this).stop().animate({ opacity : 1 }, 100);
  }, function() {
    $(this).stop().animate({ opacity: 0.7 }, 100);
  });

});
