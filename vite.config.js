import { defineConfig } from "vite";
import threePlatformAdapter from "@minisheep/three-platform-adapter/plugin";
import uni from "@dcloudio/vite-plugin-uni";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), threePlatformAdapter()],
});
