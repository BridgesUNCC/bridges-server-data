'use strict';
var $ = $ || null;

$( document ).ready(function() {
  /* Jump to the top of the page */
  $('#scrollToTopButton').on('click', function() {
    $('html, body').animate({
      scrollTop: 0,
      scrollLeft: 0
    });
  });
});

/* Hide/Show the scroll-to-top button */
$(document).on('scroll', function() {
  var pos = $(window).scrollTop();

  if(pos > 400) {
    if(!$('#scrollToTopButton').is(':visible')) {
      $('#scrollToTopButton').show();
    }
  } else {
    if($('#scrollToTopButton').is(':visible')) {
        $('#scrollToTopButton').hide();
    }
  }
});

/* Change the opacity of the header */
$(document).on('scroll', function() {

  var pos = $(window).scrollTop(),
    op = 0.0;

  if(pos > 600) { return; }

  if(pos < 100) { op = 0.9; }
  else if(pos < 200) { op = 0.75; }
  else if(pos < 300) { op = 0.5; }
  else if(pos < 400) { op = 0.25; }
  else if(pos < 600) { op = 0.1; }

  // $('.headerbg').stop().animate({
  //   opacity: op
  // });
  $('.header').css({
    opacity: op
  });
});

/* Get sample data (first element from endpoint)*/
$('.dataExampleButton').click(function() {

  var dataset = this.dataset.dataset;

  // set up 'loading' indicator
  $(this).text('Loading...');

  $.ajax({
    url: this.dataset.url + '?limit=1',
    context: this,
    success: function(data){
      // remove 'loading' indicator
      $(this).text('See Example Data');

      // add json data to the code snippet window
      $('#'+dataset+'Snippet').show().animate({'max-height': '400px'}).text(JSON.stringify(data.data[0], null, 4));
    }
  });
});
