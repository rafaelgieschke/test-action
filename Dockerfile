from node
workdir /src
copy . .
run npm i
cmd node /src/index.js
