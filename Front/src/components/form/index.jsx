///////////////////////////////////////////////////////////////
import { useEffect, useState } from "react"
import axios from "axios"
///////////////////////////////////////////////////////////////
const Form = ({NewSubmit}) => {

    const [ repository,setrepository ] = useState([])
    const [ language,setlanguage ] = useState([])

    const LoadRepository = async () => {
        const response = await axios.get("/repository")
        response.status === 200 ? setrepository( response.data ) : []
    }

    const LoadLanguage = async () => {
        const response = await axios.get("/language")
        response.status === 200 ? setlanguage( response.data ) : []
    }

    const handleSubmit = async ( event ) => {
        
        event.preventDefault()
        
        const params = {
            name:  event.target.name.value,
            language:  event.target.language.value,
            limit: event.target.limit.value 
        }

        const response = await axios.get(`/repository/report/name/${params.name}/language/${params.language}/limit/${params.limit}`)
        if( response.status === 200)
        {
            let download = `http://localhost:3000/api/repository/download/name/${params.name}/language/${params.language}/limit/${params.limit}`
            NewSubmit( response.data, download )
            event.target.reset()
        }
        else alert("Error Enviando Publicacion")
    }

    useEffect(()=>{
        LoadRepository()
        LoadLanguage()
    },[])
    

    const list_repository = repository.map( row => <option value={row.name}>{row.name}</option>)
    const list_language   = language.map( row => <option value={row.name}>{row.name}</option>)
    
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand"></a>
                <form className="d-flex"  onSubmit={handleSubmit}>
                    <select name="name" className="form-control me-2" >{list_repository}</select>
                    <select name="language" className="form-control me-2">{list_language}</select>
                    <input  name="limit" className="form-control me-2" type="number" placeholder="Limit" aria-label="Limit" required />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
///////////////////////////////////////////////////////////////
export default Form
///////////////////////////////////////////////////////////////