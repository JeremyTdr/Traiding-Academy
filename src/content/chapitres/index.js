import ch01 from './01'
import ch02 from './02'
import ch03 from './03'
import ch04 from './04'
import ch05 from './05'
import ch06 from './06'
import ch07 from './07'
import ch08 from './08'
import ch09 from './09'
import ch10 from './10'
import ch11 from './11'
import ch12 from './12'

const chapitres = [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12]

export default chapitres

export function getChapitre(id) {
  return chapitres.find(ch => ch.id === id) ?? null
}
