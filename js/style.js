// JavaScript to automate the style on some items on index.html.
jQuery( function($) {

  // TODO: clean up all javascript

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
    var match = localPat.exec($(this).prop("href"));
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

  var modalTemplate = _.template($("#project-modal-template").html());

  _.each(modals, function(modal) {
    $.ajax({
      url : "./modal-content/" + modal.id + ".html",
      dataType : "html",
      success : function(data) { modal.content = data; }
    });
  });

  $(".portfolio-thumb").click( function(e) {
    var modal = modals[$(e.target).attr("data-target")]
    shit = modalTemplate;
    var modalContainer = $(".modal-container").append(modalTemplate(modal));
    $(".modal-content").html(modal.content);
    modalContainer.fadeToggle().children(".project-modal").slideToggle();
    $("body").addClass("body-lock");
    $(".project-modal").click( function(e) {
      e.stopPropagation();
    });
    $(".modal-thumb").click( function(e) {
      var href = $(this).attr("href");
      if (href) {
	window.open(href, "_blank");
      }
    }).hover( function() {
      var href = $(this).attr("href");
      if (!href) {
	$(this).css('cursor', 'auto');
      }
    });
    $(".close").click(closeModal);
  });

  $(".modal-container").click(closeModal);

  $(".social-icon").hover( function() {
    $(".social-text").html(
      $(this).stop().animate({ opacity : 1 }, 100)
	.attr("data-display"))
      .stop().animate({ opacity : 1 }, 200);
  }, function() {
    $(this).stop().animate({ opacity : 0.7 }, 100);
    $(".social-text").stop().animate({ opacity : 0 }, 300);
  }).click( function(e) {
    var href = $(this).attr("href");
    if (href) {
      if (href.charAt(0) === "m") {
	window.open(href, "_self");
      } else {
	window.open(href, "_blank");
      }
    }
  });

});
