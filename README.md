# gls-dashboard

[![Build Status](https://travis-ci.org/GreenLightSolutionsFoundation/gls-dashboard.svg?branch=master)](https://travis-ci.org/GreenLightSolutionsFoundation/gls-dashboard)

> greenlight solutions dashboard

## Build Setup

*These instructions use [yarn](https://yarnpkg.com/) (`npm install -g yarn`), but you can also use `npm`*

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn run dev

# run the tests
yarn run test

# build for production with minification
yarn run build
```

## Deployment

Once the application is ready to be deployed to Buddy, you'll need to run a couple commands. You'll also need to configure two environment variables about the Parse app; `BUDDY_PARSE_APP_ID` and `BUDDY_PARSE_MASTER_KEY`.

Consult the Parse dashboard for these values, and set them in your environment. The easiest way to configure them is to create a `.env` file in the root of the project, with the following content:

```
BUDDY_PARSE_APP_ID=<your application's app id>
BUDDY_PARSE_MASTER_KEY=<your application's master key>
```

#### Get current version

To start, you need to get the current version of the application on Buddy's platform

```
yarn run deploy:getVersion
```

This will return a number. Next, we'll depoy with a new number. Ideally, this will simply be the current version plus 1.

#### Deploy code

Deployments will deploy both cloud code as well as the build application. The build will run automatically as part of the script. For this to work, the command needs to be given a `-c` flag, with the new version to deploy.

```
yarn run deploy -- -c <CURRENT VERSION + 1>
```

## Design Prototype/Mockups

Design prototype/mockup is available within the "mockup" folder.
