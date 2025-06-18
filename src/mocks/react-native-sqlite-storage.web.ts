const SQLite = {
  enablePromise: () => {},
  openDatabase: () => ({
    transaction: () => {},
    executeSql: () => {},
    close: () => {},
  }),
};
export default SQLite; 