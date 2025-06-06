function encodeHAL(resource, req) {
  const base = `/todos/${resource.id}`;
  return {
    ...resource,
    _links: {
      self: { href: base },
      collection: { href: "/todos" },
      update: {
        href: base,
        method: "PUT",
        args: ["id", "title", "done"]
      },
      delete: {
        href: base,
        method: "DELETE"
      }
    }
  };
}

function encodeHALCollection(resources, req) {
  return {
    items: resources.map(r => encodeHAL(r, req)),
    _links: {
      self: { href: "/todos" },
      create: {
        href: "/todos",
        method: "POST",
        args: ["id", "title", "done"]
      }
    }
  };
}

function selectEncoder(req) {
  const accept = req.headers.accept || 'application/json';
  return (data, req) => {
    if (Array.isArray(data)) {
      return encodeHALCollection(data, req);
    }
    return encodeHAL(data, req);
  };
}

module.exports = { selectEncoder };
