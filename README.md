Testing superset-to-gisida API connection.

### Gisida
1. clone the gisida repo
2. switch to branch `superset-connector`
3. run `yarn install`
4. run `yarn link`

### Test-App
1. unzip and install via `yarn install`
2. link gisida via `yarn link gisida`
3. run app via `yarn start`

### Testing
1. open http://localhost:3000
2. click `Log In` button and complete implicity grant access
3. once redirected, click Request buttons to trigger AuthZ and Slice requests
