![Banner](https://repository-images.githubusercontent.com/456818387/f8d55d4a-d193-4483-a44d-c221aa50b984)

# Lightning fast cross platform development ð

## About

This project was created to solve a lot of issues I had with standard react app templates. Mainly being extremely slow to develop for. ð¢

How does this solve the problem...

1. ð¦ Uses Snowpack over Webpack for incredibly fast build/update times < 50 ms

3. ðª¶ Comes with Tailwindcss by default; no more thinking up css class names while still being lightweight

3. ð± Fully cross platform, you can create your web app, then deploy to both IOS and Android

4. ð¦Routing built in by default

5. ð³ï¸ MobX State Management

6. â¨ï¸ Typescript over Javascript , catch stupid errors fast

7. ð§ª Testing set up now so you don't have to worry later

8. ð¦ Webpack just for build to minimize file size

## Basic Setup

### Install dependencies

Issue a `npm install` to install the required dependencies.

### Setup Github Pages

change `homepage` in `package.json` and `buildOptions.baseUrl` to your Github Pages url for this template the url is `https://andrecox.github.io/Rocket-Template`.

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.mjs` config file.

### npm run android

Builds your app using `npm run build`
then Launches your app on an avalable android emulator

### npm run ios

Builds your app using `npm run build`
then Launches your app on an avalable ios emulator (requires an ios device)

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.

# Future Features â©

1. âï¸ Electron support for desktop apps
3. ð Github Pages Support
4. ð Better documentation (You can help with this one)

# Reporting Issues â ï¸

If you find an issue while using this template please report it [here](https://github.com/AndreCox/Rocket-Template/issues). Make sure to provide any related information that I can use to track down the problem. This includes.

1. Operating System
2. What version you are using
3. Changes made to the base template
4. Error Logs

If you want to have a go at fixing the issue feel free to submit a pull request.
