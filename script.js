

let apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s";

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'  //notice that last letter is the page

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s'
    }
  };




  let searchButton = document.getElementById('search');

  let searchInput = document.getElementById('searchInput')

  searchButton.addEventListener('click', function(event) {

    //alert(searchInput.value)

    mainContainer.innerHTML = "";
    

    if (searchInput.value.length != 0) {
        searchMovies();
    }
    else {
        getMovies();
    }
    
    
  });



  function searchMovies() {
        //URL FOR SEARC
        const options1 = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s'
            }
          };

          //'https://api.themoviedb.org/3/search/movie?query=SPIDERMAN&include_adult=false&language=en-US&page=1', options)
          dinamicURL = 'https://api.themoviedb.org/3/search/movie?query='+ searchInput.value +'&include_adult=false&language=en-US&page=1'
          console.log(searchInput.value)
          fetch(dinamicURL, options1)
            .then(response => response.json())
            .then(data => {
                    
                   for (let i = 0; i < data.results.length; i++ ) {
                    generateCards(data.results[i]);   
                   }
      
            
            }) /* call the generate cards with parameter of what you found*/

  }







//api have pages


  let currentPage = 1

  getMovies(currentPage)
  

function getMovies(pageNum) {
    dinamicURL = url.slice(0, -1) + pageNum;
    fetch(dinamicURL, options)
    .then(response => {return response.json()})
    .then(response => {
    console.log(response)
    return response
    })
    .then(data => {
    for (let i = 0; i < data.results.length; i++ ) {
        generateCards(data.results[i]);   
    }
    //alert('hi')

}
)
}


//eventHandler for when load more is clicked
//create event lisener so that every click we call we will call getMovies again for the next page

  
  const loadButton = document.getElementById('loadButton');
  

  loadButton.addEventListener('click', function() {
    getMovies(++currentPage);
  });






// const searchButton = document.getElementById('search')
// searchButton.addEventListener('click', function() {
//     let url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'
//     let urlSearch = 'https://api.themoviedb.org/3/search/' + movie + '?include_adult=false&language=en-US&page=1'
//     fetch(, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));


// })

// function searchMovie() {
//     const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s'
//         }
//       };
      
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////

const mainContainer = document.getElementById("movies")

function generateCards(movieObject) {

    //we are creating html elements with properties

    //create star
    let star = document.createElement('span');
    star.classList.add('star')
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);
    

    //create rating
    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.classList.add('rating')
    rating.appendChild(ratingContent);
    

    //create average container
    let averageContainer = document.createElement('div');
    averageContainer.classList.add('average')
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating)
    //document.body.appendChild(averageContainer)

    let image = document.createElement('img');
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
    //document.body.insertBefore(image, averageContainer)


    let name = document.createElement('div')
    rating.classList.add('name');
    name.innerText = movieObject.original_title;
    //document.body.insertBefore(name, averageContainer.nextSibling);

    let movie = document.createElement('section')
    movie.classList.add('movie')
    movie.appendChild(image);
    movie.appendChild(averageContainer);
    movie.appendChild(name);


    //const mainContainer = document.getElementById("movies") //did it outside
    mainContainer.appendChild(movie);


    movie.style.display = 'inline-block';
    movie.style.width = '30%';
    movie.style.padding = '10px';
    movie.style.boxSizing = 'border-box';
    movie.style.textAlign = 'center';


    movie.style.marginLeft = '45px'; // Adjust the margin value as needed

}

