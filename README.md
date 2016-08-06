Para levantar la base
```
#!javascript
mongod
```

Para limpiar la base
```
#!javascript
mongo
use tracs-db
db.dropDatabase();
```

Para instalar las dependencias
```
#!javascript
npm install
```

Para levantar el server en development
```
#!javascript
npm start

package.json: [start: node-inspector & nodemon --debug ./bin/www]
```

Para levantar el server en production
```
#!javascript
set NODE_ENV=production && npm start
```

Para correr los tests
```
#!javascript
npm install -g mocha

set NODE_ENV=testing && mocha
```
