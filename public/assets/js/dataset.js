$(document).ready(function() {
  /* Get sample data (passed from nav tab in dataset.pug)*/
  $('a[data-toggle="tab"]').on('click', function (e) {
    $("#exampleCodeContent").text('Loading...');

    $(".nav").find(".active").removeClass("active");
    $(e.target).parent().addClass("active"); // activated tab

    $.ajax({
      url: $(e.target).attr("data-link"),
      context: this,
      success: function(data){
        $('#exampleCodeContent').text(data);
      }
    });
  });
});
