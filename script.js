

let apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s";

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'

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


    mainContainer.innerHTML = "";
    

    if (searchInput.value.length !== 0) {
        searchMovies();
    }
    else {
        getMovies();
    }
    
    
  });


  function searchMovies() {
        //URL FOR SEARCH
        const options1 = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s'
            }
          };

          dinamicURL = 'https://api.themoviedb.org/3/search/movie?query='+ searchInput.value +'&include_adult=false&language=en-US&page=1'
          console.log(searchInput.value)

          /* call the generate cards with parameter of what you found*/
          fetch(dinamicURL, options1)
            .then(response => response.json())
            .then(data => {
                    
                   for (let i = 0; i < data.results.length; i++ ) {
                    generateCards(data.results[i]);   
                   }
      
            
            }) 

  }


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

}
)
}
 
  const loadButton = document.getElementById('loadButton');
  

  loadButton.addEventListener('click', function() {
    getMovies(++currentPage);
  });


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

    let image = document.createElement('img');
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
    image.alt = "Poster for the movie: " + movieObject.original_title //Accessibility feature


    let name = document.createElement('div')
    rating.classList.add('name');
    name.innerText = movieObject.original_title;

    let movie = document.createElement('section')
    movie.classList.add('movie')
    movie.appendChild(image);
    movie.appendChild(averageContainer);
    movie.appendChild(name);


    mainContainer.appendChild(movie);


    movie.style.display = 'inline-block';
    movie.style.width = '30%';
    movie.style.padding = '10px';
    movie.style.boxSizing = 'border-box';
    movie.style.textAlign = 'center';


    movie.style.marginLeft = '45px'; // Adjust the margin value as needed

}

