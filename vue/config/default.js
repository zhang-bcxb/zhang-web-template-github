const env = process.env.NODE_ENV

// development || production
// console.log(env)

const myConfig = {
  development: {
    baseUrl: "/data"
  },
  production: {
    baseUrl: "http://localhost:3300"
  }
}

export default {
  baseUrl: myConfig[env].baseUrl
}
