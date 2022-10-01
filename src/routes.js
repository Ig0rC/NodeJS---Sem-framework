const UserControler = require('./controllers/UserControllers');

module.exports = [
    {
        endPoint: '/users',
        method: 'GET',
        handler: UserControler.index,
    },
    {
        endPoint: '/users/:id',
        method: 'GET',
        handler: UserControler.getUserById,
    },
    {
        endPoint: '/users',
        method: 'POST',
        handler: UserControler.store,
    },
    {
        endPoint: '/users/:id',
        method: 'PUT',
        handler: UserControler.updated,
    },
    {
        endPoint: '/users/:id',
        method: 'DELETE',
        handler: UserControler.delete,
    },
]