//////////////////////////////////////////////////////////////////////////////////////////
import { Router }  from 'express'
import RepoValidations from '../validations/repository.js'
import RepoController from '../controllers/repository.js'
import moment from 'moment'
//////////////////////////////////////////////////////////////////////////////////////////
const router = Router()
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/', async (req, res) => {

  /* Obtener listado de archivos en el repositorio */
  const resultado = await RepoController.ListFilesRepo( )

  /* Salida mas Acorde Al Usuario y Planteado por el ejercicio */
  const fix_json  = ( data ) => data.map( row => {
    const date = row.name.substring(15,row.name.length-4) /* Obtener la fecha del archivo */
    const name = new moment(date).format("DD-MM-YYYY") /*Dar Formato Como Pide El Ejer */
    return { name}
  })

  /*Repuesta Al Usuario */
  const respuesta = resultado.status == 200 ? fix_json( resultado.respuesta ) : resultado.respuesta
  res.status( resultado.status ).send( respuesta )
 
})
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/report/name/:name/language/:language/limit/:limit',RepoValidations,async (req, res) => {

  /*Entrada de datos */
  let { name,language,limit } = req.params
        name = `github-ranking-${new moment(name,"DD-MM-YYYY").format("YYYY-MM-DD")}.csv` /*Formato Valido Interno del campo */

   /* Obtener El Archivos en el repositorio */     
  const resultado = await RepoController.ReadFileRepo({name,language,limit})
  const fix_json  = ( data ) => data.map( row => {
    let { last_commit } = row 
    last_commit = new moment(last_commit).format("DD-MM-YYYY HH:mm:ss")
    return { ...row,last_commit}
  })

  /*Repuesta Al Usuario */
  const respuesta = resultado.status == 200 ? fix_json( resultado.respuesta ) : resultado.respuesta
  res.status( resultado.status ).send( respuesta )

})
//////////////////////////////////////////////////////////////////////////////////////////
router.get('/download/name/:name/language/:language/limit/:limit',RepoValidations,async (req, res) => {

   /*Entrada de datos */
   let { name,language,limit } = req.params
        name = `github-ranking-${new moment(name,"DD-MM-YYYY").format("YYYY-MM-DD")}.csv` /*Formato Valido Interno del campo */

   /* Obtener El Archivos en el repositorio */     
   const resultado = await RepoController.ReadFileRepoDownload({name,language,limit})
   /*Si Todo esta OK, seteamos a la cabazera 2 propiedades que tipo de archivo 
    y si es descargable y cual es su nombre
    en caso contrario no agrega nada  la as cabezeras */

   resultado.status === 200 ? res.append("Content-Type","text/csv") && res.append("Content-Disposition","attachment;filename=resultado.csv") : null
  
   /*Repuesta Al Usuario */
   res.status( resultado.status ).send( resultado.respuesta )
  
})
//////////////////////////////////////////////////////////////////////////////////////////
export default router
//////////////////////////////////////////////////////////////////////////////////////////