import unit from "./unit"
import directiveFtime from "./ftime"
export default function directs(app) {
  unit(app)
  directiveFtime(app)
}