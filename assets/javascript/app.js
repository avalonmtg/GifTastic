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

    $(document).on("click", ".flower", function() {
    //$(".flower").on("click", function () {
        var flower = $(this).attr("data-name");
        console.log(flower)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            flower + "&api_key=zLZvQScybqQWuQIVCY9UHUgmAgc1Jzyx&limit=10&offset=0&rating=G&lang=en"

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                $("#gifsDisplay").empty();

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var flowerDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var flowerImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    flowerImage.attr("src", results[i].images.original_still.url);
                    flowerImage.attr("data-still", results[i].images.original_still.url);
                    flowerImage.attr("data-animate", results[i].images.original.url);
                    flowerImage.attr("data-state", "still");
                    flowerImage.attr("class", "gif");

                    // Appending the paragraph and image tag to the animalDiv
                    flowerDiv.append(p);
                    flowerDiv.append(flowerImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifsDisplay").append(flowerDiv);
                }
            });
    });

    function gifAnimation() {

        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            console.log(state)
        }
        else if (state === animate) {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            console.log(animate)
        }
    }

    $(document).on("click", "gif", gifAnimation);
})