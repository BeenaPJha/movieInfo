$(document).ready(()=>{
    $('#searchForm').on('submit', e=>{
        let searchText = $('#searchText').val();
        getMovieDetails(searchText);
        e.preventDefault();
    });
});



function getMovieDetails(searchText){
    axios.get('http://www.omdbapi.com?apikey=e0620bd4&s='+searchText)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        console.log(movies);
        let showMovies = '';
        $.each(movies,(index,movie) => {
            showMovies+= `
            <div class="col-md-3">
                <div class="movieData text-center">
                    <div class="moviePoster"><img src="${movie.Poster}"></div>
                    <div class="movieTitle">${movie.Title}</div>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="../html/moviedetails.html">Movie Summary</a>
                </div>
            </div>
            `;
        });
        $('#movies').html(showMovies);

    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='moviedetails.html';
    return false;
}


function getMovie(){
    let movieId=sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?apikey=e0620bd4&i='+movieId)
    .then((response) => {
        console.log(response);
        let movie = response.data;
        console.log(movie);
        let showMoviesDetail = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h3>${movie.Title}</h3>
                    <div class="row">
                        <div class="movieData">
                            <h3>Summary:</h3>
                            ${movie.Plot}<hr>
                            <a href="../html/index.html" class="btn btn-default"> Go Back</a></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    $('#movies').html(showMoviesDetail);
    })
    .catch((err) => {
        console.log(err);
    });
}

























// var film = new Vue({
//     el:"#movies",
//     data:{
//         movie:[
//             {
//                 details:'Raazi'
//             }
//         ]
//     }
// })