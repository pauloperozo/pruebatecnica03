//////////////////////////////////////////////////////////////////

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

//////////////////////////////////////////////////////////////////

export default () => {
    
    const routepath = path.join(__dirname, '../routes')
    const ref = "api"
    const routes = fs.readdirSync( routepath ).map( file => {  
        
        let obj = {
            "name": file == 'index.js' ? `/${ref}` : `/${ref}/${file.replace('.js','')}`,
            "path":`./routes/${file}`
        }

        return obj
    })
     
    return routes
}

//////////////////////////////////////////////////////////////////