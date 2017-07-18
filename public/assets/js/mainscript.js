'use strict';
var $ = $ || null;

/* Scroll to a given element on the page */
function scrollTo(el) {

  var offset = $(el).offset();
  offset.left -= 20;
  offset.top -= 20;

  $('html, body').animate({
    scrollTop: offset.top,
    scrollLeft: offset.left
  });
}

/* Jump to the top of the page */
$('#scrollToTopButton').on('click', function() {
  $('html, body').animate({
    scrollTop: 0,
    scrollLeft: 0
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

function getDatasetMetadata() {
  var datasetString = '';

  $.ajax({
    url: '/api/datasets',
    context: $('#current_datasets_content'),
    success: function(data){

      for(var d in data) {
        datasetString = '<div class="datasetMeta">';
        datasetString += '<h3>-' + d + '-</h3>';
        datasetString += data[d].description + '<br /><br />';
        datasetString += 'API endpoint: <a href="' + data[d].endpoint + '" target="_blank">' + data[d].endpoint + '</a><br /><br />';
        datasetString += '<button type="button" class="btn dataExampleButton" data-dataset="' + d + '" data-url="'+ data[d].endpoint +'">See Example Data</button>&nbsp';
        datasetString += '<button type="button" class="btn dataAssignmentExample disabled" data-url="'+ 1 +'">See Example Assignment</button>';
        datasetString += '<pre id="'+ d +'Snippet" class="snippet"></pre><br /><br />';
        datasetString += data[d].reference + '<br />';
        datasetString += '</div>';

        this.append(datasetString);
      }

      /* Get sample data (first element from endpoint)*/
      $('.dataExampleButton').click(function() {
        var dataset = this.dataset.dataset;
        $.ajax({
          url: this.dataset.url + '?limit=1',
          success: function(data){
            console.log(data)
            $('#'+dataset+'Snippet').show().animate({'max-height': '400px'}).text(JSON.stringify(data.data[0], null, 4));
          }
        });
      });

    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
    getDatasetMetadata();
}, false);
