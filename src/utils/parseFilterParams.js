export function parseFilterParams(query) {
  const { type, isFavourite } = query;
  const filters = {};
  if (type) {
    const allowedTypes = ['personal', 'home', 'work'];
    if (allowedTypes.includes(type)) {
      filters.contactType = type;
    }
  }
  if (isFavourite !== undefined) {
    filters.isFavourite = isFavourite === 'true';
  }
  return filters;
}
