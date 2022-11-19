This solution is the result of completion a test task, according to which a Web application should be created in accordance with the following requirements:

- Requests data from [swapi.dev](https://swapi.dev) (first 10 entities).
- Stores the data to browser's local storage for the first time, gets data from the storage for consequence requests.
- Contains following pages:
  - _/_ or _/people_ – to show people as a table and set person to be beloved. Columns: ID, Name, Height, Mass, Gender, Birth year, Beloved.
  - _/planets_ – to show planets as a table with following columns: ID, Name, Climate, Terrain, Diameter, Population, Created.
  - _/starships_ – to show starships as a table with following columns: ID, Name, Model, Class, Manufacturer, Cost, Crew.
  - _/something/add_ – to add something, e.g. _/people/add_.
  - _/something/{id}_ – to edit something, e.g. _/planets/123_.
- Implement form validation.
- Technologies:
  - React
  - React Router
  - Redux
  - Other technologies are up to you

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
