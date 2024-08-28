import publish from "./publish.js";

publish({
  title: 'Test this package!',
  prePublish: [],
  publishCommand: 'node -v', // just for test.
});
