export default {
  appenders: {
    console: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m",
      },
    },
    file: {
      type: "file",
      filename: "logs/app.log",
      layout: {
        type: "pattern",
        pattern: "%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m",
      },
    },
  },
  categories: {
    default: {
      appenders: ["console", "file"],
      level: "info",
    },
  },
};