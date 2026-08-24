import { createServer } from "node:http";
import worker from "../src/worker.js";

const port = Number(process.env.PORT || 4173);
const server = createServer(async (req, res) => {
  const request = new Request(`http://localhost:${port}${req.url}`, { method: req.method });
  const response = await worker.fetch(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`FaithCraft preview: http://127.0.0.1:${port}`);
});

