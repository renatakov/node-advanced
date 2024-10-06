module.exports = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "express",
    port: "3306",
    // ===== pool
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
}