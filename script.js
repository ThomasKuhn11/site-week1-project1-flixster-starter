

let apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s";

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'  //notice that last letter is the page

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDExYzRmMjJkN2VmMzRhNWU1MmQwMGNlZjgzZDBlMSIsInN1YiI6IjY0ODIwNDg5YmYzMWYyMDExZDQyMTE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qDBwCjX6tmtAwMEnJQ5J-5-jMP5JW-9reCkDqiD-n-s'
    }
  };





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

  
  const button = document.getElementById('loadButton');
  

  button.addEventListener('click', function() {
    getMovies(++currentPage);
  });




//create apiPage variable to keep track of page



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


    const mainContainer = document.getElementById("movies")
    mainContainer.appendChild(movie);


    movie.style.display = 'inline-block';
    movie.style.width = '30%';
    movie.style.padding = '10px';
    movie.style.boxSizing = 'border-box';
    movie.style.textAlign = 'center';


    movie.style.marginLeft = '45px'; // Adjust the margin value as needed

}

