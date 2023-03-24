import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //workaround for "process is not defined" https://github.com/storybookjs/storybook/issues/18920#issuecomment-1310602214
  define: {
    "process.env": {},
  },
});
