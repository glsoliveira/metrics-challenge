# Loblaw frontend test - Campaign Metrics Dashboard - MVP

_Create by Gabriel Leal Sala de Oliveira_

#### Overview

This project is a Campaign Metrics Dashboard MVP (Minimum Viable Product) created as a technical evaluation. It consists of a frontend React application and a simple Node.js server to generate consistent fake data. The objective of this MVP is to provide stakeholders with the ability to view key performance metrics for advertising campaigns.

#### Project Structure

The project is organized into two main directories:
| server | test |
| ------ | ------ |
| Contains the Node.js server responsible for generating fake data. | Contains the frontend React application.|
Please refer to the README files in each directory for detailed instructions on how to set up and run the project.

#### Getting Started

#### 1. Install all packages

```sh
yarn install
```

#### 2. Run on port 3000

```sh
yarn start
```

#### 3. Project (Files)

##### package.json:

It defines the project's metadata, dependencies, scripts, and other configurations essential for both development and production environments.

##### Details

###### Metadata

- `name: loblaw_frontend_test`: The name of the project.
- `version: "0.1.0`: The current version of the project.
- `private: true`: This flag prevents the project from being accidentally published to npm.

###### Dependencies

- `@emotion/react, @emotion/styled:` Libraries for writing CSS styles with JavaScript.
- `@fontsource/roboto:` The Roboto font, commonly used in material design.
- `@material-ui/core, @mui/icons-material, @mui/material:` Material-UI components and icons for React.
- `@testing-library/*:` A set of tools for testing React components.
- `autoprefixer, postcss:` Tools for processing CSS with an autoprefixer.
- `chart.js, chartjs-plugin-datalabels, react-chartjs-2:` Libraries for creating charts in React.
- `react, react-dom:` Core React libraries.
- `react-router-dom:` DOM bindings for React Router, used for navigation in the application.
- `react-scripts:` Scripts and configuration used by Create React App.
- `web-vitals:` Library for measuring performance metrics of the web app.

###### Scripts

`start`: "react-scripts start": Starts the development server.
`test`: "jest": Runs tests using Jest.

###### Browserslist

Defines the set of browsers the project supports in both development and production environments.

###### DevDependencies

- `@babel/preset-env, @babel/preset-react:` Babel presets for compiling modern JavaScript and React.
- `babel-jest`: Allows using the Babel transformer for Jest.
- `jest, jest-localstorage-mock:` Testing framework and a mock for the localStorage API.
- `react-test-renderer:` For rendering React components to pure JavaScript objects for testing.

##### src/App.js:

###### Overview

`App.js` is the root component of the React application. It orchestrates the overall layout and routing of the app, ensuring that different components are displayed according to the URL path. It integrates several key components and features like routing, suspense for lazy loading, and error boundaries.

###### Details

###### (Imports)

- `React, { Suspense }:` Importing React and its Suspense component for handling the lazy loading of other components.
- `BrowserRouter as Router, Routes, Route:` Imports from react-router-dom for handling in-app routing.
- `CampaignList:` A component that displays a list of advertising campaigns.
- `Dashboard:` A component that shows the dashboard for a specific campaign.
- `Navbar:` The navigation bar component for the application.
- `ErrorBoundary:` A component for handling errors in the application's components.

###### (Component)

- Defined as a functional component.
- Wraps the entire application within the Router component to enable client-side routing.
- `Navbar` is placed outside the ErrorBoundary and Suspense to ensure it is always visible.
- `ErrorBoundary` wraps the main content of the app to catch and handle errors in the child component tree.
- Inside the `ErrorBoundary`, `Suspense` is used to handle the lazy loading of routes. The fallback is a simple "Loading..." message displayed while the components for the routes are being loaded.
- The Routes component from `react-router-dom` is used to define the application's routes:
- `/dashboard/:cid` route for the `Dashboard` component, which shows details for a specific campaign.
- `/` root route for the `CampaignList` component, which displays a list of all campaigns.

##### src/screens/Dashboard/index.jsx

###### Overview

`Dashboard` is a React component responsible for rendering the dashboard of the application. It is a key part of the frontend that displays various performance metrics and charts related to advertising campaigns.

###### Details

###### (Imports)

- React hooks (`useCallback, useEffect, useMemo, useState`) for state management and lifecycle methods.
- React Router (`useParams, useLocation`) to access URL parameters and router state.
- Material-UI's `Grid` component for layout structure.
- Custom utilities and services for fetching data, creating chart data, and calculating metrics.
- Custom components (`FilterControl, MetricCard, ChartCard`) for rendering specific parts of the dashboard.
- Styles from `styles.module.css` for CSS styling.

###### (Component Structure)

- Functional component `Dashboard` is declared.
- Utilizes URL parameters (`useParams`) to obtain the campaign ID (`cid`).
- Uses `useLocation` to access the router state for additional data like campaign name.
- State variables are declared for managing data, UI states, and historical metrics.
- Callbacks and memoized functions are defined for filtering data, handling custom filter values, updating chart data, and fetching new data.
- `useEffect` hooks are used for initializing data from `localStorage` and for setting an interval to fetch new data.
- The component's return statement includes the structure of the dashboard UI, consisting of filter controls, metric cards, and chart cards.
- Each section of the dashboard is laid out using Material-UI's `Grid` system for a responsive design.

###### (Key Functionalities)

- Dynamically updates and displays metrics like total impressions, clicks, CTR (Click Through Rate), and total users.
- Provides a filtering mechanism to view data based on different criteria (e.g., most recent, custom range).
- Renders charts to visually represent historical data for impressions, clicks, CTR, and users.
- Periodically fetches new data to keep the dashboard updated.
- Saves and retrieves dashboard state from `localStorage` for persistence.

##### src/screens/CampaignList/index.jsx

###### Overview

`CampaignList` is a React component designed to display a list of advertising campaigns. It serves as the main entry point for users to view different campaigns and navigate to their respective dashboards.

###### Details

###### (Imports)

- React hooks (`useEffect, useState, useCallback`) for managing component state and lifecycle.
- `fetchCampaigns` from `../../services/api` to retrieve campaign data from the backend.
- Material-UI's `Grid` component for a responsive grid layout.
- `useNavigate` from `react-router-dom` for programmatic navigation.
- `CampaignCard` component for rendering individual campaign items.
  CSS module `styles` from `./styles.module.css` for component styling.

###### (Component Structure)

- Functional component `CampaignList` is defined.
- State variables for storing campaign data (`campaigns`), loading state (`isLoading`), and errors (`error`).
- The `useNavigate` hook is used for navigating to the campaign dashboard upon user interaction.
- The `DISPLAY_LIMIT` constant is defined to limit the number of campaigns displayed.

###### (Lifecycle and Interaction)

- `useEffect` hook is used to fetch campaign data on component mount.
- The `loadCampaigns` async function within `useEffect` handles the API call, updating state based on the response.
- Error handling within `loadCampaigns` updates the error state in case of a failure in fetching data.
- `onCampaignClick` function, memoized with useCallback, handles the navigation to the campaign's dashboard, passing campaign details as state.

###### (Rendering Logic)

- Conditional rendering based on `error` and `isLoading` states to show error messages or a loading indicator.
- The main return block renders a grid of `CampaignCard` components, each representing a campaign.
- Campaigns are mapped from the `campaigns` state, limited by `DISPLAY_LIMIT`.
- Each `CampaignCard` is configured with a click handler that triggers `onCampaignClick`.

##### src/components/CampaignCard/index.jsx

###### Overview

`CampaignCard` is a React component used for displaying individual campaign information in a card format. It's a part of the `CampaignList` component and serves as an interactive element for users to select and navigate to a specific campaign's dashboard.

###### Details

###### (Imports)

- React for building the component.
- Several components from Material-UI (`Card, CardActionArea, CardContent, Typography, Grid`) for creating a structured and styled card layout.
- CSS module `styles` from `./styles.module.css` for custom styling of the component.

###### (Component Structure)

- Functional component `CampaignCard` receives `campaign` (an object containing campaign details) and `onClick` (a function to handle click events) as props.
- The component is structured using Material-UI's `Grid` system to ensure responsive layout and alignment.

###### (Card Layout and Design)

- The `Card` component is used as the main container for the campaign information.
- `CardActionArea` wraps the content, making the entire card clickable. The onClick function passed as a prop is attached here to handle click events.
- Inside `CardActionArea, CardContent` contains the text elements.
- `Typography` components display the campaign's name and ID, with customized styling applied for visual distinction.
- The card's background color is dynamically set based on the campaign's name, providing a unique visual identifier for each campaign.

###### (Styling)

- The component makes use of Material-UI's styling capabilities combined with custom CSS classes defined in `styles.module.css`.
- Styles are applied to enhance the visual appeal of the card and improve user experience by making the information easily readable and the card easily clickable.

##### src/components/ChartCard/index.jsx

###### Overview

`ChartCard` is a React component specifically designed for displaying charts within cards. It is used in the dashboard to visually represent various metrics such as impressions, clicks, CTR (Click Through Rate), and user statistics.

###### Details

###### (Imports)

- React for building the component.
- Material-UI components (`Card, Typography, Grid`) for creating the card layout and typography.
- `Line` from `react-chartjs-2` for rendering line charts.
- `chartOptions` from `../../utils/chartUtils` for configuring chart appearance and behavior.

###### (Component Structure)

- The `ChartCard` component receives `title` and `data` as props. `title` is the heading for the card, and `data` is the dataset used to render the chart.
- Uses Material-UI's `Grid` system to ensure the card is responsive and aligns correctly in different screen sizes.

###### (Card Layout and Design)

- A `Card` component serves as the container for the chart and its title.
- `Typography` component displays the title of the chart, providing context for the data visualized.
- The `Line` component from `react-chartjs-2` renders the line chart based on the passed data. Chart configuration is derived from `chartOptions`.
- The card's style is set to have padding and centered text alignment for aesthetic consistency and readability.

##### src/components/ErrorBoundary/index.jsx

###### Overview

`ErrorBoundary` is a React component class designed to catch and handle errors in the application. It serves as a wrapper around other components to gracefully manage any unhandled exceptions that occur during rendering, in lifecycle methods, or in constructors of the child component tree.

###### Details

###### (Implementation)

- The `ErrorBoundary` class extends `React.Component`, making it a class-based component.
- The constructor initializes the component's state with `hasError` set to `false`.
- `getDerivedStateFromError` is a static lifecycle method used to update the state when an error is caught. It sets `hasError` to `true`.
- `componentDidCatch` lifecycle method is used for logging error details. It captures both the error and additional information about the error's context.

###### (Error Handling)

- In the `render` method, the component checks if `hasError` is `true`. If so, it renders a fallback UI, a simple message indicating that something went wrong.
- If no error is caught, `ErrorBoundary` renders its children components as normal. This is achieved by returning `this.props.children`.

##### src/components/FilterControl/index.jsx

###### Overview

`FilterControl` is a React functional component that provides a filtering interface for the dashboard. It allows users to select how they want to view the campaign data, offering options like viewing the most recent data points, a custom range, or all data.

###### Details

###### (Imports)

- React for building the component.
- Material-UI components (`FormControl, RadioGroup, FormControlLabel, Radio, TextField`) for creating the filter form elements.
- Icons and components from MUI (`InfoIcon, IconButton, Tooltip`) for additional UI elements and information display.

###### (Component Structure)

- `FilterControl` accepts props such as `filterOption`, `handleFilterChange`, `handleCustomValueChange`, `customValue`, and `campaignName`.
- A tooltip text `longText` provides information about the filter options.

###### (Rendering and Functionality)

- The component is rendered as a `FormControl` with a `RadioGroup` allowing the user to select between different filter options (`mostRecent, custom, all`).
- Each `FormControlLabel` corresponds to a radio button for a specific filter option.
- For the `custom` option, a `TextField` is rendered to allow users to input a custom data range.
- The `Tooltip` component provides additional information about each filter option, enhancing user understanding and interaction.
- The styling of the component is dynamically set based on the `campaignName`, providing a visual connection to the selected campaign.
- The `handleFilterChange` and `handleCustomValueChange` props are callback functions used to handle changes in the filter selection and custom value input, respectively.

##### src/components/MetricCard/index.jsx

###### Overview

`MetricCard` is a React component designed to display individual metrics in a card format within the dashboard. This component is used for presenting key data points such as total impressions, clicks, CTR (Click Through Rate), and total users in a clear and concise manner.

###### Details

###### (Imports)

- React for building the component.
- Material-UI components (`Card, CardContent, Typography, Grid`) for structuring and styling the card.
- CSS module `styles` from `./styles.module.css` for custom styling.

###### (Component Structure)

- The `MetricCard` functional component receives `title`, `value`, and `campaignName` as props.
- These props represent the title of the metric, its value, and the name of the campaign, respectively.

###### (Layout and Design)

- The component uses Material-UI's `Grid` system to ensure responsive alignment and sizing within the dashboard layout.
- A `Card` component encapsulates the metric's content, with dynamic styling that changes the background color based on the campaignName.
- `CardContent` houses the title and value of the metric, centrally aligned for readability.
- Two `Typography` components display the title and value of the metric. The `variant` and custom styles applied to these components help in distinguishing the title from the value.

##### src/components/Navbar/index.jsx

###### Overview

`Navbar` is a React component that provides the navigation bar for the application. It serves as a consistent UI element across different pages, offering navigation functionality and visual branding.

###### Details

###### (Imports)

- React for building the component.
- `Link` from `react-router-dom` for creating navigable links without reloading the page.
- Material-UI components (`AppBar, Toolbar, IconButton`) for structuring and styling the navigation bar.
- `useLocation` hook from `react-router-dom` to access the current location object.
- `ArrowBackIcon` from MUI for the back arrow icon.
- `Logo` as an image asset used for branding purposes.

###### (Component Structure)

- `Navbar` is a functional component that uses the `useLocation` hook to determine the current pathname.
- It checks if the current location is within the dashboard section of the app.

###### (Rendering Logic)

- The `AppBar` component from Material-UI is used as the main container, with `Toolbar` inside it for content alignment.
- The content of the `Navbar` changes based on whether the user is on the dashboard page or not (`isDashboard`).
- For dashboard pages, an `IconButton` with an `ArrowBackIcon` is displayed. This serves as a back button wrapped in a `Link` that navigates to the home page.
- For other pages, the `Loblaw Companies Limited (LCL)` logo is displayed as a clickable image, which also leads to the home page when clicked.

##### src/services/api.js

###### Overview

`api.js` serves as the central module for handling API requests in the application. It defines functions to fetch data from the backend and includes error handling to manage potential issues during these requests.

###### Details

###### (Base URL)

- `BASE_URL:` A constant that holds the base URL for the API (`http://localhost:4000`). This ensures consistency and easy configurability of the API endpoint throughout the application.

###### (Helper Functions)

- `processResponse:` A function to process the response from the API. It checks if the response is successful (using `response.ok`) and returns the JSON data. If the response is not successful, it throws an error.
- `handleError:` A function to handle errors that may occur during the API request. It logs the error and a custom message to the console and returns `null` to indicate a failed request.

###### (API Functions)

- `fetchCampaigns:` An asynchronous function to fetch the list of campaigns. It uses the `fetch` API to make a GET request to the `/campaigns` endpoint and processes the response. If an error occurs, it is handled by the `handleError` function. -`fetchDashboardData:` An asynchronous function to fetch dashboard data for a specific campaign. It takes `campaignId` and `number` as parameters to construct the request URL. Similar to `fetchCampaigns`, it handles the response and errors accordingly.

###### (Error Handling)

- Both API functions include try-catch blocks to catch any errors during the fetch operation, ensuring the application can handle failed requests gracefully.

##### src/utils/chartUtils.js

###### Overview

`chartUtils.js` is a utility module in the application dedicated to configuring and preparing data for chart visualizations using Chart.js, a popular JavaScript library for creating charts.

###### Details

###### (Chart.js Registration)

- The module begins by importing `Chart` and registerables from `chart.js`.
- It registers the necessary chart components (available in `registerables`) with Chart.js. This registration is crucial for enabling the full functionality of Chart.js.
- The registration is skipped in a test environment (`process.env.NODE_ENV !== "test`) to prevent issues during unit testing.

###### (Function: createChartData)

- A function to prepare the dataset for a chart.
  Parameters:
- `history:` An array of data points to be plotted.
- `label:` A label for the dataset.
- `color:` A color to be used for the dataset's background.
- Returns an object structured according to Chart.js requirements, with `labels` for the x-axis and `datasets` for the y-axis data.
- Each dataset includes properties like `label`, `data`, `fill`, `backgroundColor`, and `tension` for customization and styling of the chart.

###### (Object: chartOptions)

- Defines common options for all charts in the application.
- `responsive:` Ensures that charts are responsive to screen size changes.
- `plugins.datalabels:` Configures the appearance and position of data labels on the chart.
- `scales.y:` Configures the y-axis to start from zero.

##### src/utils/File: dataUtils.js

###### Overview

`dataUtils.js` is a utility module containing functions for data calculations and formatting. These functions are used throughout the application to process numerical data, particularly for displaying metrics in the dashboard.

###### Details

###### (Function: calculateTotal)

- Purpose: To calculate the sum of values in an array.
- Parameter: `data` (array of numbers).
- Implementation: Utilizes the `reduce` method to accumulate the total of the array elements.
- Returns: The total sum of the array values.
  Function: `calculateCTR`
- Purpose: To calculate the Click Through Rate (CTR).
  Parameters:
- `clicks` (number of clicks).
- `impressions` (number of impressions).
- Implementation: Calculates CTR as `(clicks / impressions) * 100`. If `impressions` is zero, returns zero to handle division by zero.
- Returns: The CTR as a percentage.

###### (FFunction: formatNumber)

- Purpose: To format large numbers in a human-readable format using abbreviations like "K" (thousands), "M" (millions), and "B" (billions).
- Parameter: `number` (a numerical value).
- Implementation: Checks the size of the number and formats it accordingly, rounding to one decimal place for thousands, millions, and billions.
- Returns: The formatted number as a string.
