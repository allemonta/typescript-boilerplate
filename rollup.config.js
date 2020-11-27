import pkg from "./package.json"
import typescript from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"


export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [

    terser(),

    commonjs({
      include: "node_modules/**"
    }),

    typescript({
      typescript: require("typescript"),
      tsconfig: "./tsconfig.rollup.json"
    }),

    resolve()
  ]
}
