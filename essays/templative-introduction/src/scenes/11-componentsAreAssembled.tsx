import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Txt, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word, range} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Img} from '@motion-canvas/2d/lib/components';
import gamecrafterImg from "../images/gamecrafter.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../../../../common/nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)
  yield* panes.terminalContentsRef().edit(0,false)`$ `
  yield* panes.fileNameRef().text(`component-compose.json`,0)
  yield* panes.contentsRef().edit(0,false)`[\n\t{\n\t\t"name": "potionDeck",\n\t\t"type": "PokerDeck",\n\t\t"quantity": 1,\n\t\t"piecesGamedataFilename": "potionDeck",\n\t\t"componentGamedataFilename": "potionDeck",\n\t\t"artdataFilename": "potionDeck-Front",\n\t\t"backArtdataFilename": "potionDeck-Back",\n\t\t"disabled": false\n\t}\n]`
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`
  // yield* panes.contentsRef().language("json", 1)
  yield* waitUntil("art")
  yield* panes.fileStructureRef().selection(lines(2),2/8)
  yield* waitUntil("gameData")
  yield* panes.fileStructureRef().selection(lines(4),2/8)
  yield* waitUntil("artdata")
  yield* panes.fileStructureRef().selection(lines(3),2/8)
  yield* panes.fileStructureRef().selection(range(0,0,100,100),4/8)

  yield* waitUntil("showGameData")
  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t${edit(`> gamedata`, `v gameData\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`)}\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("showPieceFile")
  yield* all(
    yield panes.fileNameRef().text(`potionDeck.csv`, 4/8),
    yield panes.contentsRef().edit(4/8, false)`${edit(`[\n\t{\n\t\t"name": "potionDeck",\n\t\t"type": "PokerDeck",\n\t\t"quantity": 1,\n\t\t"piecesGamedataFilename": "potionDeck",\n\t\t"componentGamedataFilename": "potionDeck",\n\t\t"artdataFilename": "potionDeck-Front",\n\t\t"backArtdataFilename": "potionDeck-Back",\n\t\t"disabled": false\n\t}\n]`, `name,displayName,quantity\n`)}`,
  )
  yield* waitUntil("potionName")
  yield* panes.contentsRef().edit(2/8, false)`name,displayName,quantity\n${insert(`poisonDrip,PoisonDrip,1`)}`,
  yield* waitUntil("power")
  yield* panes.contentsRef().edit(2/8, false)`name,displayName,quantity${insert(`,power`)}\npoisonDrip,PoisonDrip,1${insert(`,6`)}`,
  yield* waitUntil("cost")
  yield* panes.contentsRef().edit(2/8, false)`name,displayName,quantity,power${insert(`,cost`)}\npoisonDrip,PoisonDrip,1,6${insert(`,3`)}`,
  yield* waitUntil("graphic")
  yield* panes.contentsRef().edit(2/8, false)`name,displayName,quantity,power,cost${insert(`,graphic`)}\npoisonDrip,PoisonDrip,1,6,3${insert(`,droplet`)}`,

  yield* panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t${edit(`v gameData\n\t\t\tv components\n\t\t\t\tpotionDeck.json\n\t\t\tv pieces\n\t\t\t\tpotionDeck.csv`, `> gamedata`)}\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("endScene")

});