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

`move <direction> <force>` - attempt to move your turtle in the given
direction with the given force

### Definitions

```
<cardinal> ::= 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

<color> ::= 'black' | 'white' | 'red' | 'green' | 'blue'

<direction> ::= <number> | <cardinal>

<force> ::= <number>

<number> ::= [0-9]+
```
