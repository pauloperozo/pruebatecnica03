import { fileURLToPath } from 'url';
export default ( modulo ) => fileURLToPath( modulo ).split("/").pop().replace('.js','')

