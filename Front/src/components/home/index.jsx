///////////////////////////////////////////////////////////////
import { useEffect, useState } from "react"
///////////////////////////////////////////////////////////////
import Header from '../header'
import Form   from '../form'
import Table  from '../table'
import Footer from '../footer'
///////////////////////////////////////////////////////////////
const Home = () => {

    const[ table_data,set_table_data] = useState([])
    const[ footer_data,set_footer_data] = useState('http://localhost:3000/api/repository/download/name/18-12-2018/language/JavaScript/limit/2')
    const NewSubmit = ( data, download ) => {
        set_table_data(data)
        set_footer_data( download)
    }

    return (
        <div>
            <Header/>
            <Form  NewSubmit={NewSubmit}/>
            <Table table_data={table_data}/>
            <Footer url={footer_data}/>
        </div>
    )
}
///////////////////////////////////////////////////////////////
export default Home
///////////////////////////////////////////////////////////////