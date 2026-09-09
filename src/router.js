import siteWorker from "./worker.js";

export default {
  async fetch(request, env, ctx) {
    return siteWorker.fetch(request, env, ctx);
  }
};
