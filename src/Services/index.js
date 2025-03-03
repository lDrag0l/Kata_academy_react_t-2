export default class MovieService {
    _apiBase = 'https://api.themoviedb.org/3/search/movie?query=';

    options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmQ2OTdjMGNkN2Q0NTcxNDkxMDM3YjQ1NDIyNDE1MyIsIm5iZiI6MTc0MDU4MjA5MC40MTEsInN1YiI6IjY3YmYyY2NhMTBiNDY1ZGEwMjU2NDMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iwe0pq4CFWA53k-hU70p8v1w2J84aKo2-Z0CD8e9GGI'
        },
    };
    postOptions = {

    }

    async getMovies(page, inputValue) {
        const api = this._apiBase + inputValue + '&page=' + page
        try {
            const res = await fetch(api, this.options);
            if (!res.ok) console.log('Fetch data error')

            const body = await res.json();
            return body;

        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

    async guestSession() {
        const api = 'https://api.themoviedb.org/3/authentication/guest_session/new'

        try {
            const res = await fetch(api, this.options)
            if (!res.ok) console.log('Guest session response error')

            const body = await res.json()
            return body

        } catch (error) {
            console.error('Create guest session error', error)
        }
    }

    async addToRatedMovies(id) {
        const api = `https://api.themoviedb.org/3/movie/${id}/rating`//not ready

        try {
            const res = await fetch(api)
        }

        catch (error) {
            console.error('Add rating to film error', error)
        }
    }

    async getGenres() {
        const api = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

        try {
            const res = await fetch(api, this.options)
            if (!res.ok) console.log('Get genres response error')

            const body = await res.json()
            return body
        }

        catch (error) {
            console.error('Get genres error', error)
        }
    }
}
