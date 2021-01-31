const TOKEN = "c42969e9f5f9fa48e2c0285ac72137241a9fb32e";

export class API {
    static updateMovie(mov_id, body){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        }).then(data => data.json())
    }

    static createMovie(body){
        return fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        }).then(data => data.json())
    }

    static deleteMovie(mov_id){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        })
    }
}