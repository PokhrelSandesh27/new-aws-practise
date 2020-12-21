FROM mongo
WORKDIR '/app'
COPY ./events.json ./

CMD mongoimport --host db --db test --collection database --type json --file events.json --jsonArray 
#--uri "mongodb://db:27017/database"

