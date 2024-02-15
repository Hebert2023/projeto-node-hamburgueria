const express = require("express")
const port = 3000
const app = express()
const uuid = require("uuid")
app.use(express.json())

const client = []

const chekUserId = (request, response, next) => {
    const { id } = request.params;

    const index = client.findIndex(client => client.id === id);

    if (index < 0) {
        return response.status(404).json({ error: "User not found." });
    }

    request.clientIndex = index
    request.clientId = id

    next()

}
const chekUserUrl = (request, response, next) => {
    const url = request.url
    const method = request.method

    console.log(url)
    console.log(method)

    next()
}

app.post("/client", chekUserUrl, (request, response) => {
    const { order, clientName, price, status } = request.body

    const clients = { id: uuid.v4(), order, clientName, price, status: "Em preparação" };

    client.push(clients);

    return response.status(201).json(client)
})
app.get("/client", chekUserUrl, (request, response) => {

    return response.json(client)
})
app.put("/client/:id", chekUserId,chekUserUrl, (request, response) => {
    const id = request.clientId
    const index = request.clientIndex

    const { order, clientName, price, status } = request.body;
    const updateClient = { id, order, clientName, price, status };


    client[index] = updateClient

    return response.json(updateClient)
})
app.delete("/client/:id", chekUserId,chekUserUrl, (request, response) => {
    //const { id } = request.params;

    // const index = client.findIndex(client => client.id == id)
    // if (index < 0) {
    //return response.status(404).json({ error: 'User not found.' })
    // }
    const index = request.clientIndex
    client.splice(index, 1)

    return response.status(204).json()
})
app.get("/client/:id", chekUserId,chekUserUrl, (request, response) => {
    // const { id } = request.params
    // const index = client.findIndex(client => client.id === id)
    //  if (index < 0) {
    //  return response.status(404).json({ error: "Id not found." });
    //  }
    const id = request.clientId
    const index = request.clientIndex


    return response.status(201).json(client[index])
})
app.patch("/client/:id",chekUserId,chekUserUrl, (request, response) => {
   // const { id } = request.params
   const id = request.clientId
   const index = request.clientIndex

   const { order, clientName, price, status, } = request.body
    const updateStatus = { id, order, clientName, price, status: "Pronto" }

  //  const index = client.findIndex(client => client.id === id)

  //  if (index < 0) {
       // return response.status(404).json({ error: "user not found" })
  // }
 

    client[index] = updateStatus
    return response.json(updateStatus)
})




app.listen(port, () => {
    console.log(`🙌Server is running on http://localhost:${port}`)
})