var config = {
    development: {
        //mongodb connection settings
        database: {
            host:   '127.0.0.1',
            port:   '27017',
            DATABASE_NAME: 'NOIDMembers',
            noid_password: 'billDaddy2021',
            noid_admin: 'noidAdmin'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    }
};
module.exports = config;