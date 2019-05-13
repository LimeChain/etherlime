# redux-cli-logger

### A redux logger for command-line environments (node.js)

No innovations here, just a logger middleware for
[redux](https://github.com/rackt/redux) that will write all redux actions and
state changes to the node.js console.

Configuration and output format inspired by [redux-logger](https://github.com/fcomb/redux-logger)

![redux-node-logger screenshot](https://cloud.githubusercontent.com/assets/9889378/9400145/f321b9fe-478b-11e5-9f77-b08baf9573b9.png
"A Redux Logger for Node Environments")

### Installation

```bash
npm install --save-dev redux-cli-logger
```

### Usage

redux-cli-logger must be called as a function before being utilized as
middleware. This allows passing in options to overwrite all colors and arrow
icons, as well as a predicate that functions like that in redux-logger. Here's
what a simple configureStore function might look like:

```javascript
import reducer from '../reducers'
import createCLILogger from 'redux-cli-logger'

const middleware = [
  // your middleware here
]

if (process.env.NODE_ENV === 'development') {
  const loggerOptions = {
    predicate: (getState, action) => !action.MONITOR_ACTION
  }
  const logger = createCLILogger(loggerOptions)
  middleware.push(logger)
}

const enhancer = compose(
  applyMiddleware(...middleware)
  // optionally, electron-enhancer, redux-loop, etc.
)

const initialState = {}
const store = createStore(reducer, initialState, enhancer)
```

### Configuration

The options object has overridable defaults that look like this:

```javascript
{
  downArrow: '▼',
  rightArrow: '▶',
  messageColor: 'bright-yellow',
  prevColor: 'grey',
  actionColor: 'bright-blue',
  nextColor: 'green',
  log: console.log,
  // when non-null, only prints if predicate(getState, action) is truthy
  predicate: null,
  // useful to trim parts of the state atom that are too verbose
  stateTransformer: (state) => state,
  // useful to censor private messages (containing password, etc.)
  actionTransformer: (action) => action,
}
```

