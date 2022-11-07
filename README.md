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

`head <heading>` - rotate your turtle to the given heading

`thrust <force> <seconds>` - attempt to move your turtle forward with the given force

`turn <direction> <degrees>` - turn in the given direction by the given amount

`wait` - wait for all previous commands to complete before proceeding

### Definitions

```
<cardinal> ::= 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

<color> ::= 'black' | 'white' | 'red' | 'green' | 'blue'

<degrees> ::= <number>

<direction> ::= 'left' | 'right'

<heading> ::= <degrees> | <cardinal>

<force> ::= <number>

<seconds> ::= <number>

<number> ::= [0-9]+
```
