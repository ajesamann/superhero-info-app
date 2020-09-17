//url to the superhero api
let URL = "https://superheroapi.com/api.php/1266552910342985/search/";
//the button that will search the api for the input from the user
const searchBtn = $("#search-btn");

//the callback function that will run once the search button is clicked
searchBtn.click(() => {
  //the input from the user
  let userInput = $("#search-input").val();
  //the conditional that is ran to make sure the input isn't empty
  handleEmptySearch = () => {
    $(".error").text("Search field can't be empty!");
    $(".results-text").text("");
    //empty whatever info was previously requested by the user
    $(".superhero-cards").empty();
  };
  !userInput
    ? handleEmptySearch()
    : //the get request to the url to retrieve the desired data
      $.ajax({
        url: URL + userInput,
        type: "GET",
        success: (data) => {
          $(".superhero-cards").empty();
          console.log(data);
          //check if the users search has any results
          data.results == undefined ? $(".error").text("") : null;
          data.error
            ? $(".results-text").text(
                `No results were found for "${userInput}"`
              )
            : null;
          //empty whatever info was previously requested by the user
          $(".superhero-cards").empty();
          //set the text for the total results field
          $(".results-text").text(
            `There are ${data.results.length} results for "${userInput}"`
          );
          let info = data.results;
          info.forEach((hero) => {
            //the info for each villain or hero
            $(".superhero-cards").append(
              `<div class="superhero-card">
              <div class="name">${hero.name}</div>
              <img class="img" src=${hero.image.url}>
              <div class="real-name">Real Name: ${
                hero.biography["full-name"]
              }</div>
              <hr>
              <div class="f-appear">${hero.biography["first-appearance"]}</div>
              <hr>
              <div class="alignment">Alignment: ${hero.biography.alignment.toUpperCase()}</div>
            </div>`
            );
          });

          //set the error back to empty
          $(".error").text("");
        },
      });
});
