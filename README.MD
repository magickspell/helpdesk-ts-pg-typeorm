
# TS App

TS App.
<br>
<br>
<b>Techies</b>: Typescript, Postgresql, TypeOrm, Docker.
<br>
<hr>

### How to start local:
check .env and run this
```
make start
```
```
make stop
```
### Test
#### unit:
```
npm i
```
```
npm test
```
#### integration:
use postman with runnign docker composition.<br>
import postman file:
```
heldeskJS.postman_collection.json
```


#### App listening ports by default:
1) backend:  3000.
2) pg: 6432 (5432 in docker).