import publish from "./index.js";

publish({
  prePublish: ['npm run test'],
  needOtp: true
});
