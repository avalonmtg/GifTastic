$(document).ready( function() {

    var topics = ["Rose", "Sunflower", "Cherry Blossom", "Lily Flower", "Tulip", "Hydrangea Flower"];

    function renderButtons() {

        $("#forButtons").empty();

        for (i = 0; i < topics.length; i++) {
            console.log(topics[i])
            var f = $("<button>");
            f.addClass("flower");
            f.attr("data-name", topics[i]);
            f.text(topics[i]);
            $("#forButtons").append(f);
        }
    }
    renderButtons();

    $("#add-flowers").on("click", function () {
        event.preventDefault();
        var flower = $("#search").val().trim();
        topics.push(flower);
        renderButtons();
        return;
    });

    
    $("#add-flowers").on("click", function (event) {
        var submit = $("#flowerInput").val().trim();
        topics.push(submit);
        renderButton();
        $("#newFlower")[0].reset();
    });
//gifs
    $(document).on("click", ".flower", function() {
    //$(".flower").on("click", function () {
        var flower = $(this).attr("data-name");
        console.log(flower)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            flower + "&api_key=zLZvQScybqQWuQIVCY9UHUgmAgc1Jzyx&limit=10&offset=0&rating=G&lang=en"

        //ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                
                var results = response.data;

                $("#gifsDisplay").empty();

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    //  div tag
                    var flowerDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // image tag
                    var flowerImage = $("<img>");
                    
                    flowerImage.attr("src", results[i].images.original_still.url);
                    flowerImage.attr("data-still", results[i].images.original_still.url);
                    flowerImage.attr("data-animate", results[i].images.original.url);
                    flowerImage.attr("data-state", "still");
                    flowerImage.attr("class", "gif");

                    
                    flowerDiv.append(p);
                    flowerDiv.append(flowerImage);

                
                    $("#gifsDisplay").append(flowerDiv);
                }
            });
    });
//animation
    function gifAnimation() {

        var state = $(this).attr("data-state");
        var stillImage = $(this).attr("data-still");
        var animateImage = $(this).attr("data-animate");
        
        if (state === "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
            console.log(state)
        }
        else if (state === animate) {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
            console.log(animate)
        }
    }
    $(document).on("click", ".flower", gifsDisplay);
    $(document).on("click", ".gif", gifAnimation);
   
})