var users = {
  admin: { id: 1, username: 'admin', password: '1234'},
  pepe: { id: 2, username: 'pepe', password: '5678'}
};

exports.autenticar = function(login, pass, callback) {
  if (users[login]){
    if (pass === users[login].password){
      callback(null, users[login]);
    } else { callback(new Error('Password erróneo.')); }
  } else { callback(new Error('No existe el usuario.')); }
};
