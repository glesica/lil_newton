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

`color <color>` - set the color your turtle draws as it moves

`move <force>` - attempt to move your turtle forward with the given force

`head <heading>` - rotate your turtle to the given heading

`turn <direction> <degrees>` - turn in the given direction by the given amount

### Definitions

```
<cardinal> ::= 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

<color> ::= 'black' | 'white' | 'red' | 'green' | 'blue'

<degrees> ::= <number>

<direction> ::= 'left' | 'right'

<heading> ::= <degrees> | <cardinal>

<force> ::= <number>

<number> ::= [0-9]+
```
