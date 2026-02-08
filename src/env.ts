import { neonVercel, vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {},
  client: {},
  runtimeEnv: {},
  extends: [vercel(), neonVercel()],
  skipValidation: !!process.env.CI,
});
