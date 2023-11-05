
interface colorful {
  color: string
}
interface Irun {
  running: () => void
}

type newType = colorful & Irun

const obj: newType = {
  color: "red",
  running() {

  }
}


interface Iperson {
  name: string
  age: number
}

interface Ikun extends Iperson {
  say: () => void
}



export { }