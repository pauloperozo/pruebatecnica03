import supertest from 'supertest'
import app from '../app'

const request = supertest(app)

const params = {
    name:"18-12-2018",
    language:"JavaScript",
    limit:"2"
}

describe("Servidor Activo",() => {

    /*Test 01 */
    describe("GET /", () =>{
        it("Succces", async () => {
            const response = await request.get('/api/repository').send()
            expect(response.status).toBe(200)
        })
    })

    /*Test 02 */
    describe("GET /", () =>{
        it("Succces", async () => {
            
            const response = await request.get(`/api/repository/report/name/${params.name}/language/${params.language}/limit/${params.limit}`).send()
            expect(response.status).toBe(200)
        })
    })

    /*Test 03 */
    describe("GET /", () =>{
        it("Succces", async () => {
            const response = await request.get(`/api/repository/download/name/${params.name}/language/${params.language}/limit/${params.limit}`).send()
            expect(response.status).toBe(200)
        })
    })

})