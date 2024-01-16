module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "airbnb", 
    "airbnb/hooks", 
    "plugin:react/jsx-runtime", 
    "prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.cjs', 'build'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'jsx-a11y', 'react-hooks', 'prettier', 'import'],
  rules: {
    "react/state-in-constructor": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "indent": ["error", 2],
    "prettier/prettier": "error",
    "linebreak-style": [0, "unix"],
    "quotes": ["error", "single"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "import/no-unresolved": [2, { "caseSensitive": false }],
    "react/jsx-filename-extension": [1, { "extensions": ['.js', ".jsx", '.ts', '.tsx'] }],
    "import/order": [
      2,
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always"
        }
      ]
    },
    "settings": {
      "version": "detect",
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"],
          "moduleDirectory": ["node_modules", "src/"]
        }
      }
    }
}
