import { app } from "./app"
import { env } from "./env"

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0'
  })
  .then((err, address) => {
    if (err) {
      console.log(err)
    }
    console.log(`HTTP Server Running at port ${env.PORT}!`)
  })
