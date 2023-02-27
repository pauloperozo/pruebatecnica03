///////////////////////////////////////////////////////////////
import { useEffect} from "react"
import makeBlockiesUrl from 'blockies-react-svg/dist/es/makeBlockiesUrl.mjs'
///////////////////////////////////////////////////////////////
const Table = ({table_data}) => {


    useEffect(()=>{

    },[table_data])



    return (
            <table className="table">
            <thead>
                <tr>
                <th scope="col">rank</th>
                <th scope="col">profile</th>
                <th scope="col">language</th>
                <th scope="col">repo_name</th>
                <th scope="col">username</th>
                <th scope="col">description</th>
                <th scope="col">repo_url</th>
                <th scope="col">stars</th>
                <th scope="col">forks</th>
                <th scope="col">issues</th>
                </tr>
            </thead>
            <tbody>
            {
                table_data.map( row => 
                <tr>
                    <th scope="row">{row.rank}</th>
                    <td><img class="rounded-circle shadow-1-strong me-3" src={makeBlockiesUrl(row.username)} alt="avatar" width="30" height="30" /></td>
                    <td>{row.language}</td>
                    <td>{row.repo_name}</td>
                    <td>{row.username}</td>
                    <td>{row.description}</td>
                    <td>{row.repo_url}</td>
                    <td>{row.stars}</td>
                    <td>{row.forks}</td>
                    <td>{row.issues}</td>
                </tr> 
                )
            }
            </tbody>
            </table>
    )
}
///////////////////////////////////////////////////////////////
export default Table
///////////////////////////////////////////////////////////////