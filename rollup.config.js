import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "dist/esm/index.js",
  output: {
    file: "dist/umd/JSONCrush.js",
    format: "umd",
    name: "window",
    extend: true
  },
  plugins: [
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: "dist/esm"
      }
    }),
    commonjs()
  ]
};
