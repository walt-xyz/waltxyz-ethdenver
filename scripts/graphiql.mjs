import { serveEncodedDefinition } from "@composedb/devtools-node";

/**
 * Runs GraphiQL server to view & query composites.
 */
const server = await serveEncodedDefinition({
  ceramicURL: "https://ceramic-ethdenver2023.hirenodes.io/",
  graphiql: true,
  path: "./src/__generated__/definition.json",
  port: 5001,
  url: "http://localhost:5001",
});

console.log(`Server started on ${server.url}`);

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server stopped");
  });
});
