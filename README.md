# StickStock
#### The only website your son should use =P
## Stack
- Angular
- Ionic
- Sinatra


----
## > How to run the app
### Step 1: Run the backend server
```docker run -it -p 8100:8100 -p 4567:4567 cesarbarone/stickstock```
### Step 2: In a new tab, get the container id from column CONTAINER_ID
```docker ps```
### Step 3: Run the frontend app
```docker exec -it -w /usr/src/app <container_id> bash run_client.sh```
### Step 4: Navigate to app
```open http://127.0.0.1:8100```

---
## > How to use

##### Add a new stock URL using stock input. Adding a URL pointing to localhost, the server will randomize open and last values:
`http://127.0.0.1:4567/marketstack/APPL`


##### You can use a MarketStack url too:
`http://api.marketstack.com/v1/intraday?access_key=<token>&symbols=AAPL&limit=1`

##### Change settings clicking on the cog at the left top corner, and after clicking on Apply.
`Try it`

----

## > How to run the tests
### Step 1: Run the container 
```docker run -it -p 8100:8100 -p 4567:4567  cesarbarone/stickstock```
### Step 2: Get the container id from column CONTAINER_ID
```docker ps```
### Step 3: Running frontend tests
```docker exec -it -w /usr/src/app <container_id> npm run test```
### Step 4: Running backend tests
```docker exec -it <container_id> rspec```
