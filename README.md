# backend for coding challenge

This is the backend to the coding challenge.
It uses sequalize as a simple ORM.
This is the first time I have used this package,
most of my recent ORM experience has been with Django.



### To build
npm install

### to run
node index.js -i data.json

currently data.json is needed so that there are some users, otherwise
no one can log in. data.json defines a couple of users, and a couple
of example employees.

node index.js {--initialize=jsonfilename}


There are many things left to do before this app could be called complete
* a real user system, user editing
* actual authentication of users, returning a session token which is then used for
  subsequent requests.
* unit tests

See the README for the front end for instructions on using the system.

