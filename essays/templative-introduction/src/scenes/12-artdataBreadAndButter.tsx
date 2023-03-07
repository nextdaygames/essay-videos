import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Layout, Text, Line, Rect, Node} from '@motion-canvas/2d/lib/components';
import {slideTransition} from '@motion-canvas/core/lib/transitions';
import {all, delay,loop,waitFor,waitUntil} from '@motion-canvas/core/lib/flow';
import {createRef, Reference} from '@motion-canvas/core/lib/utils';
import {CodeBlock, edit, insert, lines, word, range,remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import {Direction, Vector2} from '@motion-canvas/core/lib/types';
import {Image} from '@motion-canvas/2d/lib/components';
import poisonDrip from "../images/dripping-tube.png"
import fireBreath from "../images/fire-breath.png"
import { interpolation } from '@motion-canvas/2d/lib/decorators';
import nodes from "../nodes"

export default makeScene2D(function* (view) {
  const visualStudioRef = createRef<Rect>();
  yield view.add(
    <Rect ref={visualStudioRef}/>
  )
  var panes = yield* nodes.createFakeVisualStudioCode(visualStudioRef, 3, 8)
  yield* panes.fileStructureRef().edit(0, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t> artdata\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`

  yield* waitUntil("showArtdata")
  yield* all(
    yield panes.fileStructureRef().edit(1, false)`v projects\n\tv potionShmotion\n\t\t> art\n\t\t${edit(`> artdata`,`v artdata\n\t\t\tpotionDeck-Front.json\n\t\t\tpotionDeck-Back.json`)}\n\t\t> gamedata\n\t\t> output\n\t\tcomponent-compose.json\n\t\tgame-compose.json\n\t\tgame.json\n\t\trules.md\n\t\tstudio.json`,
    yield panes.fileNameRef().text("potionDeck-Front.json", 1),
    yield panes.contentsRef().edit(1, false)`${edit(`# Templative Introduction`, `{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t],\n\t"styleUpdates":[\n\t],\n\t"overlays": [\n\t]\n}`)}`,
  )
  yield* waitUntil("textReplacements")
  yield* panes.contentsRef().selection(word(3,1,18), 1/8)
  yield* waitUntil("styleUpdates")
  yield* panes.contentsRef().selection(word(5,1,15), 1/8)
  yield* waitUntil("overlays")
  yield* panes.contentsRef().selection(word(7,1,10), 1/8)
  yield* waitUntil("clear")
  yield* panes.contentsRef().selection(range(0,0,100,100), 1/8)

  yield* waitUntil("highlightTemplate")
  yield* panes.contentsRef().selection(word(2 ,20,19), 1/8)
  yield* waitUntil("clearHighlightTemplate")
  yield* panes.contentsRef().selection(range(0,0,100,100), 1/8)
  
  yield* waitUntil("clearCode")
  yield* all(
    yield panes.fileNameRef().text("potionDeck-Front.svg", 1/8),
    yield panes.contentsRef().edit(1/8, false)`${remove(`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t],\n\t"styleUpdates":[\n\t],\n\t"overlays": [\n\t]\n}`)}`
  )

  yield* waitUntil("showCard")
  const cardTextRef = createRef<CodeBlock>();
  const cardRectRef = createRef<Rect>();
  const cardImageRef = createRef<Image>();
  var card = <Rect ref={cardRectRef} fill={"#545454"} width={875/2} height={1125/2} radius={16} padding={30} paddingTop={45}>
    <CodeBlock language={"c#"} ref={cardTextRef} fill={"#000"} fontSize={35} lineHeight={35} fontFamily={'JetBrains Mono'} code={`Power: {power}\n\nCost: {cost}\n\n\n{displayName}\n{description}`}/>
  </Rect>
  yield panes.contentsRectRef().add(card)
  yield* waitUntil("variationOne")
  yield* all(
    yield cardRectRef().add(<Image ref={cardImageRef} src={poisonDrip} width={100} height={100}/>),
    yield cardTextRef().edit(4/8, false)`Power: ${edit(`{power}`,`6`)}\n\nCost: ${edit(`{cost}`,`3`)}\n\n\n${edit(`{displayName}`,`Poison Drip`)}\n${edit(`{description}`,`A poison potion.`)}`
  )
  yield* waitUntil("variationTwo")
  yield* all(
    yield cardImageRef().src(fireBreath),
    yield cardRectRef().fill("#541414",4/8), 
    yield cardTextRef().edit(4/8, false)`Power: ${edit(`6`,`3`)}\n\nCost: ${edit(`3`,`2`)}\n\n\n${edit(`Poison Drip`,`Fire Breath`)}\n${edit(`A poison potion.`,`Me after chilli.`)}`
  )

  yield* waitUntil("showCode")
  yield* all(
    yield cardRectRef().remove(),
    yield panes.fileNameRef().text("potionDeck-Front.json", 1),
    yield panes.contentsRef().edit(1, false)`${insert(`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t],\n\t"styleUpdates":[\n\t],\n\t"overlays": [\n\t]\n}`)}`
  )

  yield* waitUntil("createTextReplacement")
  yield* panes.contentsRef().edit(1, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [${insert(`\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }`)}\n\t],\n\t"styleUpdates":[\n\t],\n\t"overlays": [\n\t]\n}`
 
  yield* waitUntil("highlightGameName")
  yield* panes.contentsRef().selection(word(4 ,12,10), 1/8)
  yield* waitUntil("highlightDisplayName")
  yield* panes.contentsRef().selection(word(4 ,34,13), 1/8)
  yield* waitUntil("highlightScope")
  yield* panes.contentsRef().selection(word(4 ,57,6), 1/8)

  yield* waitUntil("clearHighlights")
  yield* panes.contentsRef().selection(range(0,0,100,100), 1/8)

  yield* waitUntil("createOverlay")
  yield* panes.contentsRef().edit(1, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }\n\t],\n\t"styleUpdates":[\n\t],\n\t"overlays": [${insert(`\n\t\t{ "source": "graphic", "scope": "piece" },`)}\n\t]\n}`
 
  yield* waitUntil("highlightGraphic")
  yield* panes.contentsRef().selection(word(9,14,9), 1/8)
  yield* waitUntil("highlightPiece")
  yield* panes.contentsRef().selection(word(9,34,8), 1/8)

  yield* waitUntil("clearOverlayHighlights")
  yield* panes.contentsRef().selection(range(0,0,100,100), 1/8)

  yield* waitUntil("createStyleUpdate")
  yield* panes.contentsRef().edit(1, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }\n\t],\n\t"styleUpdates":[${insert(`\n\t\t{ "cssValue": "fill", "id": "background", "source": "colorRGB", "scope": "piece" }`)}\n\t],\n\t"overlays": [\n\t\t{ "source": "graphic", "scope": "piece" },\n\t]\n}`
 
  yield* waitUntil("highlightFill")
  yield* panes.contentsRef().selection(word(7,15,7), 1/8)
  yield* waitUntil("highlightBackground")
  yield* panes.contentsRef().selection(word(7,30,12), 1/8)
  yield* waitUntil("highlightRGB")
  yield* panes.contentsRef().selection(word(7,54,10), 1/8)
  yield* waitUntil("highlightStyleScope")
  yield* panes.contentsRef().selection(word(7,75,7), 1/8)

  yield* waitUntil("clearStyleHighlights")
  yield* panes.contentsRef().selection(range(0,0,100,100), 1/8)

  yield* waitUntil("scopeExplanation")
  yield* panes.contentsRef().edit(2/8, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }\n\t],\n\t"styleUpdates":[\n\t\t{ "cssValue": "fill", "id": "background", "source": "colorRGB", "scope": "piece" }\n\t],\n\t"overlays": [\n\t\t{ "source": "graphic", "scope": "${edit(`piece`,`piece`)}" },\n\t]\n}`
  yield* waitUntil("componentScope")

  yield* panes.contentsRef().edit(2/8, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }\n\t],\n\t"styleUpdates":[\n\t\t{ "cssValue": "fill", "id": "background", "source": "colorRGB", "scope": "piece" }\n\t],\n\t"overlays": [\n\t\t{ "source": "graphic", "scope": "${edit(`piece`,`component`)}" },\n\t]\n}`
  yield* waitUntil("gameScope") 
  yield* panes.contentsRef().edit(2/8, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }\n\t],\n\t"styleUpdates":[\n\t\t{ "cssValue": "fill", "id": "background", "source": "colorRGB", "scope": "piece" }\n\t],\n\t"overlays": [\n\t\t{ "source": "graphic", "scope": "${edit(`component`,`game`)}" },\n\t]\n}`
  yield* waitUntil("studioScope") 
  yield* panes.contentsRef().edit(2/8, false)`{\n\t"name": "potionDeck",\n\t"templateFilename": "potionDeck-Front",\n\t"textReplacements": [\n\t\t { "key": "gameName", "source": "displayName", "scope": "game" }\n\t],\n\t"styleUpdates":[\n\t\t{ "cssValue": "fill", "id": "background", "source": "colorRGB", "scope": "piece" }\n\t],\n\t"overlays": [\n\t\t{ "source": "graphic", "scope": "${edit(`game`,`studio`)}" },\n\t]\n}`

  yield* waitUntil("endScene")

}); 