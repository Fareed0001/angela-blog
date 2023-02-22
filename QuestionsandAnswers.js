//MONGOOSE
1: npm i mongoose //to install mongose
2: create 2 new terminals, each enter "mongod", "mongosh"
3: require mongoose in app.js
4: create a mongoose schema to show how the content should be structured in the database
5: create a mongoose model to use the schema
6: Inside the app.post() method for your /compose route, create a new post document using your mongoose model.
7: save the new model into a document and use a callback err funtion to catch all errors if there is any
8: in the "/" root route, find all the items in the Posts collection and render them in the home route
9: in the home.ejs file, link the href to target by the document _id
10: in the app.post() method for the /post route, change the express route parameter to postId instead.
11: create a constant to capture the id value ie "requestedPostId"
