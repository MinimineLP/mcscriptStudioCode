global.mcscriptStudioCode = {
  util: {
    address: {
      host: "localhost",
      port: 5050,
      protocol: "http",
      toString: function() {return `${mcscriptStudioCode.util.address.protocol}://${mcscriptStudioCode.util.address.host}:${mcscriptStudioCode.util.address.port}/`;}
    }
  }
}
