module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
        // "plugin:@typescript-eslint/eslint-recommended",
        // "plugin:@typescript-eslint/recommended"
      ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json"
      },
    "plugins": [
        "react",
        "typescript",
        "@typescript-eslint"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "for-direction": "error",
        "getter-return": "error",
        "no-cond-assign": "error",
        "no-console":0,
        "valid-jsdoc": ["error", { "prefer": { "arg": "param", "argument": "param", "class": "constructor", "return": "returns", "virtual": "abstract" } }],
        // "quotes": [
        //     "error",
        //     "single"
        // ],
        "semi": [
            "warn",
            "always"
        ],
        "react/no-deprecated":1,
        "no-unused-vars":1
    }
};