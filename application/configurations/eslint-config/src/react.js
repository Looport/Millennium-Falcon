module.exports =  {
    "extends": [
      "plugin:github/browser",
      "plugin:github/react",
      "./base.js",
    ],
    "rules": {
        "jsx-a11y/no-noninteractive-element-interactions": 1,
        "jsx-a11y/click-events-have-key-events": 1,
    }
}