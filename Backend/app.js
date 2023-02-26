////////////////////////////////////////////////////////////////////////////////////////////

/* Cargamos Modulo/Tools Express */
import express from 'express'
import logger  from 'morgan'
import cors    from 'cors'
import dotenv  from 'dotenv'

/*Cargamos Rutas */
import  HandleRoute from './tools/routes.js'

/*Cargamos Middleware */
import  Handle404   from './middleware/404.js'
import  Handle503   from './middleware/503.js'

////////////////////////////////////////////////////////////////////////////////////////////

/*Init Express */

const app = express()

      dotenv.config() 
      app.use( cors() )
      app.use( logger("dev") )
      app.use( express.json({limit: '50mb'}) )
      app.use( express.urlencoded( { limit: '50mb', extended: true } ) ) /* Tamaño De 50MB  */

      app.use(Handle503) /*Http Verifica El Timeout errores*/
      
      /*Routes */
      for( let route of HandleRoute() )
      {
        const module = await import( route.path )
        app.use(route.name,module.default)
      }

      app.use(Handle404) /*Error 404*/

      export default app
      
////////////////////////////////////////////////////////////////////////////////////////////      