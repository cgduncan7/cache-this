# cache-this-client

cache-this-client is a Vue app which communicates with cache-this-server in order to provide cache-this memory game

## Technologies
- Vue.js
- Typescript
- Sass (because ; and {} are a waste of time)
- Axios (perform fetch request to backend)
- Mocha+Chai

## Explanation

### Libraries

I used vue-cli to create this project because I felt it was a good fit for this app (and I am trying to learn more about it). Typescript for me is a must in new projects as it adds type-safety and allows/makes (imo) you follow better coding practices when developing. Sass was used to style the app, preprocessors are super handy when working with CSS and Sass/SCSS is one of my favorites. I prefer Sass because of lack of annoying characters and I prefer it over Less simply because I've used it more. Mocha+Chai I haven't used much, I tend to use Jest, but it was the default with Vue and I decided to try it out. I still like Jest more :)

### Structure

The structure of the project is a based on around a central App class and within the App class there is a Board component. This Board component is where the logic of the game takes place. The App deals with communicating to the server and setting up the Board then the Board creates the required amount of Card components. The Card components expose one control (start) to the Board that is triggered via an eventBus. The Card component is able to be flipped by the user and if it is the correct card it stays flipped. The Card component checks if it is the correct card by calling a method in it's parent (Board) and if it is correct the Board then updates the next card which will be considered correct. After all cards have been flipped, the Board then stops the timer and lets the user play again if they want.

#### Basic flow

1. App start
2. User selects difficulty
3. App requests values/solution from backend based on difficulty
4. App displays Board component and passes the values/solution to the Board
5. User views Cards and clicks on start to begin
6. Timer starts and all Cards are flipped over
7. User clicks on a Card
8. Card checks if this is the correct card; if so it stays flipped, otherwise it flips back over
9. User proceeds until all cards are flipped in correct order
10. Board alerts player they have won
11. User selects play again and goes back to #2

## Usage

### Installation
```
yarn install
```

### Run development server
```
yarn serve
```

### Build
```
yarn build
```

### Unit tests
```
yarn test:unit
```