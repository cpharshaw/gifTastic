

$(document).ready(function () {




    let gifLogic = {

        'search': function (event, text) {
            event.preventDefault();

            var searchTerm = "";

            if (!text) {
                searchTerm = $('#searchText').val().trim();
            } else if (text) {
                searchTerm = text.trim();
            }

            console.log("search: " + searchTerm + "; text: " + text);

            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&rating=pg-13&api_key=OCn5Gtyp5Lv543syaowh2uvdv25m4MAk",
                method: 'GET',
            }).done(function (result) {

                var data = result.data;

                for (var i = 0; i < 10; i++) {

                    var imgState = data[i];
                    var imgURLAnimated = data[i].images.fixed_height.url;
                    var imgURLStill = data[i].images.fixed_height_still.url;
                    var imgSrc = imgURLStill;
                    var imgRating = data[i].rating;
                    var imgID = "img_" + i;
                    var imgDivID = "imgDiv_" + i;
                    var imgClass;

                    var newImgDiv = $('<div class="col-lg-4 col-md-6 col-sm-12">');
                    var newImg = $('<img class="img-fluid gif" data-state="still">');

                    newImgDiv.attr('ID', imgDivID);
                    newImg.attr('ID', imgID);
                    newImg.attr('data-rating', imgRating);
                    newImg.attr('data-animate', imgURLAnimated);
                    newImg.attr('data-still', imgURLStill);
                    newImg.attr('src', imgSrc);

                    newImgDiv.append(newImg);

                    $('#images').append(newImgDiv);



                }

                if (!text) {
                    newButton = $("<button id='' class='btn btn-outline-secondary '>").text(searchTerm.trim());
                    $('#buttons').append(newButton);
                } 

            });
        }







    };


    $('#submit').on('click', function (event) {


        if (!$('#searchText').val().trim()) {
            event.preventDefault();
            $('#searchText').attr('placeholder', "Enter something first!");
        }  else {
            $('#images').empty();
            gifLogic.search(event);
        }


    });

    $('.btn').on('click', function() {
        $('#images').empty();

        gifLogic.search(event, $(this).text());
    });


    $("body").on("click", '.gif', function () {

        var state = $(this).attr('data-state');

        if (state === 'still') {

            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        };

        if (state === 'animate') {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        };
    });




















});
