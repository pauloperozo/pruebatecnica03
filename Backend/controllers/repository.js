//////////////////////////////////////////////////////////////////////////////////////////////
/* Librerias/Modulos/Herramientas */
import {Octokit} from '@octokit/rest'
import csvtojson from 'csvtojson'
import jsonexport from "jsonexport"
import Axios from 'axios'
import { setupCache } from 'axios-cache-interceptor';
//////////////////////////////////////////////////////////////////////////////////////////////
const axios = setupCache(Axios)
//////////////////////////////////////////////////////////////////////////////////////////////
const ListFilesRepo = async ( ) => {

    /* Instancia de Octokit, Manejador de repositorios git */
    const octokit = new Octokit();

    /* Creamos Configuracion Previa Con Datos Del Duño,Repositorio, y Lugar De Los Archivos */
    const payload = {
        owner: process.env.OWNER,
        repo:  process.env.REPO,
        path:  process.env.REPO_PATH
    }

    /*Cargamos El Contendio Del Repositirio  */
    const Directory = await octokit.repos.getContent( payload )
    
    /*Obtenemos Los Archivos Dentro De La Carpeta /Data 
    y Formateamos Su Salida, Extraemos las Key necesarias name y download */
    const Files = Directory.data.map( row => {
        let { name,download_url } = row
        return { name,download_url }
    })

    return { status:200,respuesta:Files }
}
//////////////////////////////////////////////////////////////////////////////////////////////
const ReadFileRepo = async ( {name,language,limit}  ) => {

    /*Consultamos Listado De Archivos En El Repositorio */
    const List = ( await ListFilesRepo()).respuesta

    /*Buscamos Un Archigo En Concreto */
    const File = List.find( row => row.name === name )
    if( !File ) return { status:400,respuesta:{message:"Archivo Data No Encontrado"} }
    
    /*Cargamo Configuracion Para el envio */
    const config = {
      method: 'get',
      url: File.download_url,
    }
    
    /*Nos Descargamos El Archivo */
    const response = await axios(config).catch( ( error ) => console.log(error) )
    const { status,data } = response
    if( status !== 200 )return { status:400,respuesta:{message:"Problema Con el Archivo"} }
    
    /* Convertimos El Archivo Para Mostrar en Front */
    const json = await csvtojson().fromString( data )

    /*Si No Se Envia Limite (N) Se Tomara El Total Del Json */
    limit  = !limit ? json.length : limit 

    /*Si Envia Un Filtro De Lenguaje Se Aplicara */
    const respuesta = !language ? json.slice(0,limit) : json.filter( row => row.language.toUpperCase().includes( language.toUpperCase() ) ).slice(0,limit)
    
    return { status:200,respuesta}
}
//////////////////////////////////////////////////////////////////////////////////////////////
const ReadFileRepoDownload = async ( {name,language,limit}  ) => {

    /*Consultamos El Archivo */
    const resultado = await ReadFileRepo({name,language,limit})
    if(resultado.status !== 200) return resultado

    /* Ajustamos Los Campos Que Solicitaron En La Prueba */
    const context = resultado.respuesta.map( (row,index) => {
        const { rank,item,repo_name,stars,forks,language,repo_url,username,issues,last_commit,description } = row
        return {id:index+1,language,repo_name,stars,forks,language_name:language,repo_url,username,issues,last_commit,description }
    })
    
    /* Convertimos El Archivo Para Descargar En El Front */
    const convert = new Promise( resolve =>  jsonexport(context,{includeHeaders:false},(err, csv) => resolve([err,csv]) ))
    const result  = await convert
    const [error,csv] = result
    if(error)return { status:400,respuesta:{message:"Problema Con el Archivo"} }   
    return { status:200,respuesta:csv}
}
//////////////////////////////////////////////////////////////////////////////////////////////
export default { ListFilesRepo,ReadFileRepo,ReadFileRepoDownload }
//////////////////////////////////////////////////////////////////////////////////////////////

