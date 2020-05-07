module.exports = {
    "root": true,
    "env": {
        "node": true,
        "es6": true
    },

    "parser": "@typescript-eslint/parser",

    "plugins": [
        "mocha",
        "@typescript-eslint",
        "unicorn"
    ],

    "extends": [
        "plugin:prettier/recommended"
    ],

    "rules": {
        // Error if files are not formatted with Prettier correctly.
        "prettier/prettier": 2,
        // syntax preferences
        "quotes": [2, "single", {
            "avoidEscape": true,
            "allowTemplateLiterals": true
        }],
        "spaced-comment": [2, "always", {
            "markers": ["*"]
        }],
        "eqeqeq": [2],
        "accessor-pairs": [2, {
            "getWithoutSet": false,
            "setWithoutGet": false
        }],
        "new-parens": 2,
        "func-call-spacing": 2,
        "prefer-const": 2,

        // anti-patterns
        "no-var": 2,
        "no-with": 2,
        "no-multi-str": 2,
        "no-caller": 2,
        "no-implied-eval": 2,
        "no-labels": 2,
        "no-new-object": 2,
        "no-octal-escape": 2,
        "no-self-compare": 2,
        "no-shadow-restricted-names": 2,
        "no-cond-assign": 2,
        "no-debugger": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-unreachable": 2,
        "no-unsafe-negation": 2,
        "radix": 2,
        "valid-typeof": 2,
        "no-unused-vars": [2, { "args": "none", "vars": "local", "varsIgnorePattern": "([fx]?describe|[fx]?it|beforeAll|beforeEach|afterAll|afterEach)" }],
        "no-implicit-globals": [2],

        // es2015 features
        "require-yield": 2,
        "template-curly-spacing": [2, "never"],

        // ensure we don't have any it.only or describe.only in prod
        "mocha/no-exclusive-tests": "error",

        // enforce the variable in a catch block is named error
        "unicorn/catch-error-name": "error"
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "extends": [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            "rules": {
                "no-unused-vars": 0,
                "@typescript-eslint/no-unused-vars": 2,
                "semi": 0,
                "@typescript-eslint/semi": 2,
                "@typescript-eslint/no-empty-function": 0,
                "@typescript-eslint/no-use-before-define": 0,
                // We know it's bad and use it very sparingly but it's needed :(
                "@typescript-eslint/ban-ts-ignore": 0,
                "@typescript-eslint/array-type": [2, {
                    "default": "array-simple"
                }]
            }
        }
    ]
};
