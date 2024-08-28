<!--
 * @Author: WeijianXu weijian.xu@unidt.com
 * @Date: 2024-08-28 13:54:47
 * @LastEditors: WeijianXu weijian.xu@unidt.com
 * @LastEditTime: 2024-08-28 16:09:14
 * @FilePath: \output-verbatimd:\app\me\npm-publish-it\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# npm-publish-it
A very simple npm publish tool

## usage

Install it:
```shell
npm install -D npm-publish-it
```

Add `publish.js` in the root of your project folder:
```js
import publish from "npm-publish-it";

publish({
  title: 'your module name', // if not set, get the `name` of `package.json`,
  // prePublish is a array, support multiple commands, like `['rm -rf dist', 'npm run build']`. Default value is []
  prePublish: ['rm -rf dist', 'yarn test', 'yarn build'],
  publishCommand: 'yarn publish', // publish command string, default is `npm publish`
  needOtp: true // Set `true`, if publish needs one-time passcode, default is false.
});
```

Then execute the commands in the root of your project folder:
```shell
node publish
# or `npm pub` , if you have set a script like `"pub": "node publish"` in `package.json`.
```
## Note

> if your package is not ES Module, you need to change `publish.js` to `publish.mjs`
> and execute it with `node publish.mjs` or `npm pub`.
> Not forget to set `"pub": "node publish.mjs"` in your `package.json`.
