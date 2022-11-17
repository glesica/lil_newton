# Lil Newton

A programming toy.

## Development

Install dependencies: `npm install`

Build to JS: `./tool/bundle.sh`

Serve for development (auto rebuild): `./tool/serve.sh`

## Prior Art

Stanford Karel - https://en.wikipedia.org/wiki/Karel_(programming_language)
and https://stanford.edu/~cpiech/karel/ide.html

NEWLOGO - https://www.proquest.com/docview/2372037584

## Language

  * `color <color>` - set the color your turtle draws as it moves
  * `head <heading>` - rotate your turtle to the given heading
  * `thrust <force> <seconds>` - attempt to move your turtle forward with
    the given force
  * `turn <direction> <degrees>` - turn in the given direction by the given
    amount
  * `sleep <seconds>` - do nothing for the given number of seconds

### Types

  * `<color>` - an enumerated value, one of the following: `Black`, `White`,
    `Red`, `Green`, `Blue`, `Orange`, `Cyan`, `Azure`, `Violet`, `Yellow`
  * `<degrees>` - a numerical value, a heading in degrees
  * `<force>` - a numerical value, the amount of acceleration to apply
  * `<heading>` - a numerical value, in degrees, where `0` is straight up
  * `<seconds>` - a numerical value, the number of seconds to do something for

### Ideas

`stamp <shape>` - stamp the given shape at the current location of the turtle
