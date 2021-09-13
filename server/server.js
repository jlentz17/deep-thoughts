const express = require("express");
// import ApolloServer
const { AppoloServer, ApolloServer } = require("apollo-server-express");
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const authMiddleware = require("./utils/auth")
const PORT = process.env.PORT || 3001;
const app = express();
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate our Apollo server with te Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    // log where we can go to test our GQL API
    console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
