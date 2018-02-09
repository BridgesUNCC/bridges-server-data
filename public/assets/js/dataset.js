$(document).ready(function() {

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

  $("#schemaCodeContent").on('click', function() {
    // $(this).text('Loading...');
    $.ajax({
      url: $(this).attr("data-url") + "/one?limit=1",
      context: this,
      success: function(data){
        $('#schemaCodeContent').text(JSON.stringify(data, undefined, 2));
      }
    });

  });
});
