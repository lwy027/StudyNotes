
function foo(this: { name: string }, age: number) {
  console.log(this, age)
}



foo.apply({ name: "lwy" }, [20])

type ThisType = ThisParameterType<typeof foo>
type FnType = OmitThisParameter<typeof foo>

export { }