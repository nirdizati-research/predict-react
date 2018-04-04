# Nirdizati Research frontend
[![Build Status](https://travis-ci.org/TKasekamp/predict-react.svg?branch=master)](https://travis-ci.org/TKasekamp/predict-react)
[![Coverage Status](https://coveralls.io/repos/github/TKasekamp/predict-react/badge.svg?branch=master)](https://coveralls.io/github/TKasekamp/predict-react?branch=master)

Because React is better than Angular!

## Dependencies
* [Storybook](https://github.com/storybooks/storybook) for individual components.

## Thanks to
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Look there for overall documentation.

## Development help
package.json contains all commands for this code.

Run tests
```
npm run test
```

Heavily recommend [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) Chrome extensions as the make development much easier.

# Deployment

To deploy to the wonderful UT servers, I recommend to build the app first with `npm run build`. Then copy the content to the server and serve with `node server.js`.
