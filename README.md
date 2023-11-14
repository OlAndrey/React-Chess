React Chess
==========

A lightweight, real-time chess app built in [Node](http://nodejs.org/), [Socket.IO](http://socket.io/), [React](http://facebook.github.io/react/), and [Immutable](http://facebook.github.io/immutable-js/).

## Development

> Node.js 18 or newer is recommended.

This project is structured as a monorepo, divided into two packages:

- `client` - React.js application for the front-end, deployed to [Chess-client](https://chess-client-no8i.onrender.com).
- `server` - Node, Socket.io application for the back-end, deployed to [Chess-server](https://chess-server-ad6d.onrender.com).

## Getting Started

To get a local copy up and running follow these simple example steps.

- Clone the repo
  
#### Server
- cd into backend and write npm install or npm i in command terminal

  ```
  $ cd server
  $/server npm install
  ```

- Write npm run dev to start the backend server

  ```
  $/server npm run dev
  ```

#### Client
- cd into my-project and write npm install or npm i in command terminal

  ```
  $ cd client
  $/client npm install
  ```

- Write npm start to start the react server

  ```
  $/client npm start
  ```

Create a `.env` file in the client directory and add the next contents to it:
   
  ```
    REACT_APP_WS_URL : localhost:5000 or any other url to connect web socket`
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Support

Reach out to me at one of the following places!

- Email at <a href="mailto:oleynik.andrey01@gmail.com">`oleynik.andrey01@gmail.com`</a>