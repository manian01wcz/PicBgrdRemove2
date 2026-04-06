import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-pages",
      converter: "edge",
      incrementalCache: "none",
      tagCache: "none",
      logging: "none",
      revalidate: "none",
    },
  },
};

export default config;
