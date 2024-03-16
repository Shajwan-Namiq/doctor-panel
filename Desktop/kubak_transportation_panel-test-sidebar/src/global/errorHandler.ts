// in errorHandler.ts

const errorHandler = (error, vm, info) => {
  console.error("Error in app:", error);
  console.error("Component details:", vm);
  console.error("Error info:", info);
};

export default errorHandler;
