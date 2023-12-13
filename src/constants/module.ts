const MODULE_TO_ROUTE = {
  stadium: [/^\/$/, /^\/stadium\/\d+\/venue$/, /^\/stadium\/\d+\/venue\/\d+$/],
  manager: [/^\/manager\/create$/],
  background: [/^\/reserve/, /\/manage\/\d+\/[^/]+(?:\/[^/]+)?$/],
};

export default MODULE_TO_ROUTE;
