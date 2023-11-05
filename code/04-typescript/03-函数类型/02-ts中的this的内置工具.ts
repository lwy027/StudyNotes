

interface Istate {
  name: string,
  age: number
}

interface Istroe {
  state: Istate
  eating?: () => void
  running?: () => void
}

const store: Istroe & ThisType<Istate> = {
  state: {
    name: "lwy",
    age: 20
  },
  eating() {
    console.log(this.name)
  }
}


store.eating?.call(store.state)


export { }