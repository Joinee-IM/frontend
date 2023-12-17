const MODULE_TO_ROUTE = {
  stadium: [/^\/$/, /^\/stadium\/\d+\/venue$/, /^\/stadium\/\d+\/venue\/\d+$/],
  partner: [/^\/partner$/],
  managerCrate: [/^\/manage\/\d+\/create/],
  manage: [/^\/$/, /^\/manage\/\d+$/],
  background: [/^\/reservation/, /\/manage\/\d+\/[^/]+(?:\/[^/]+)?$/],
};

export default MODULE_TO_ROUTE;
