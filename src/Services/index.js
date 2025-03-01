export default class MovieService {
    _apiBase = 'https://api.themoviedb.org/3/search/movie?query=Harry&language=en-US&page=';

    options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmQ2OTdjMGNkN2Q0NTcxNDkxMDM3YjQ1NDIyNDE1MyIsIm5iZiI6MTc0MDU4MjA5MC40MTEsInN1YiI6IjY3YmYyY2NhMTBiNDY1ZGEwMjU2NDMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iwe0pq4CFWA53k-hU70p8v1w2J84aKo2-Z0CD8e9GGI'
        },
    };

    async getMovies(page) {
        const api = this._apiBase + page
        try {
            const res = await fetch(api, this.options);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const body = await res.json();

            return body;

        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}
