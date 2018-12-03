# Nirdizati Research frontend
[![Build Status](https://travis-ci.org/nirdizati-research/predict-react.svg?branch=master)](https://travis-ci.org/nirdizati-research/predict-react)
[![Coverage Status](https://coveralls.io/repos/github/nirdizati-research/predict-react/badge.svg?branch=master)](https://coveralls.io/github/TKasekamp/predict-react?branch=master)

React frontend to perform Predictive Monitoring analysis over event logs.

##Running in a new environment
The docker build is available @ https://hub.docker.com/r/nirdizatiresearch/predict-react/ in any case if you prefer to setup your environment on yuor own you can refer the [Dockerfile](Dockerfile).

##Docker Compose
To run the project:
```commandline
docker-compose up react-client
```

##Run an instance of the project
If you are familiar with docker-compose the [docker-compose](docker-compose.yml) file is available, otherwise if you use pycharm as IDE is available the run configuration in the [runConfiguration](.idea/runConfiguration) settings.

package.json contains all supported commands for this project.

Run tests:
```
npm run test
```

## Thanks to
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Storybook](https://github.com/storybooks/storybook).

## Contributors
- [@TKasekamp](https://github.com/TKasekamp) Tõnis Kasekamp 
- [@stebranchi](https://github.com/stebranchi) Stefano Branchi
- [@fmmaggi](https://github.com/fmmaggi) Fabrizio Maggi
- [@dfmchiara](https://github.com/dfmchiara) Chiara Di Francescomarino 
- [@williamsrizzi](https://github.com/WilliamsRizzi) Williams Rizzi
- [@mrsonuk](https://github.com/mrsonuk) Santosh Kumar
