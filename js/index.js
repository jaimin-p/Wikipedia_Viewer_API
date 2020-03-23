$('#wikiSearch').on('click', function () {
  $("#wikiContent").empty();

  //validate input string value cannot be null

  if (($('#searchBar')).val().length === 0) {
    $('#searchBar').removeClass('animated shake border-danger').addClass('animated shake border-danger').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass('animated shake border-danger');
    });;
  }

  //process only if input is not empty
  else {
    var search = $('#searchBar');
    var searchString = search.val();
    var apiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

    $.ajax({
      url: apiUrl + searchString,
      dataType: "jsonp",
      success: function (data) {

        var post = data.query.pages; // Grab Pages from data , check api document to understand 

        $.each(post, function (index, element) {

          $('#wikiContent').append('<div id="accordion">' + '<div class="card animated slideInUp">'
            + '<div class="card-header text-primary" id="heading' + index + '"' + '>' 
            + '<h5 class="mb-0">'  +
            '<button class="btn btn-link" aria-expanded="true" data-toggle="collapse" data-target=#' + index + '' + ' aria-controls=' + index + '' + '>' + element.title + '</button>' +
            '</h5>' +
            '</div>' +
            '<div class="collapse hide" aria-labelledby="heading' + index + '"' + 'data-parent="#accordion" id=' + index + '>'
            + '<div class="card-body">' + element.extract
            + '</div>'
            +'</div>'
            +'</div>' +
            '</div>');

        });


        //clear input string once result is processed
        search.val("");
      },
      cache: false
    });
  }

});
