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

![img1](https://previews.dropbox.com/p/thumb/ABIDbjUEari489YwmC_O9p6BRxqA0RJqXl1sEEsxGIEtaLyShh1vVUcTuOF5Y-KFFYQuldnfqIwTMTZguN1O6tywl13wAYR52dkoxHKqSTSUcFo5XUxEsA3Cirtqon5Oy4jALItF1LGBZc8T20NRM0ROmcjBZ5dJ3lfYP3TboN6Go_C_-HFuugGoqrM-O_krelFbe4v7vmlG0Rzhrm59WuDn_XnmwcxL9ddhjiZtCeSYMMIXBcJVy7sY7iqD-6YImIHa9SEIfeuI4sEeUh80ko6cHnprrtKGLwrmqYN0b6wsr2g-5lWXXmfuEvFv29VeUApj7Xdk9H6v_Tk0w0GcMeipz8Dzyu8QFB7rtCRLvlWWRA/p.png?fv_content=true&size_mode=5 "Settings cog")

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
