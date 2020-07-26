import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { preserveShebangs } from "rollup-plugin-preserve-shebangs";

export default {
    input: "index.js",
    output: [
        {
            file: "index.dist.mjs",
            format: "esm",
        },
        { file: "index.dist.cjs.js", format: "cjs" },
    ],
    plugins: [
        preserveShebangs(),
        nodeResolve({
            mainFields: ["main"],
        }),
        commonjs(),
    ],
};
