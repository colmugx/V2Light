import rabbit, { Model } from "reabit"

const models: Model[] = [
  {
    name: "global",
    state: {
      night: false
    },
    reducers: {
    },
    effects: {
    }
  }
]

const store = rabbit(models, {
  middleware: [require('redux-logger').createLogger()]
})

export default store
