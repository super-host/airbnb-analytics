const CreateUser = document.querySelector('.CreateUser');


const post = (path, data) => {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

CreateUser.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = CreateUser.querySelector('.username').value;
  const password = CreateUser.querySelector('.password').value;
  post('/createUser', { username, password });
});
