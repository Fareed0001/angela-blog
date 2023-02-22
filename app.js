const express = require("express"); //is a layer built on the top of the Node js that helps manage servers and routes.
const bodyParser = require("body-parser"); //used to process data sent in an HTTP request body. JSON, Text, URL-encoded, and raw data sets
const ejs = require("ejs"); //used to embed JavaScript code in a template language that is then used to generate HTML.
const _ = require("lodash"); //For adding spaces, mixing caps and small letters in link
const mongoose = require("mongoose"); //A database to store items

mongoose.connect("mongodb://localhost:27017/blogDB"); //to connect to mongoose database

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs'); //This defaults to the views directory in the application root directory.

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//CREATING A SCHEMA TO HOLD ITEMS
const postSchema = ({ //mongoose schema for the blog
  title: String,
  content: String
});

//MODEL FOR THE SCHEMA
const Post = mongoose.model("Post", postSchema); //mongoose model for the blog


app.get("/", function(req, res) {
  Post.find({}, function(err, foundPosts) { //to find all the items in the posts collection
    if (err) { //if there are errors, catch it
      console.log(err);
    } else { //else show the home page with the foundPosts
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundPosts
      });
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) { //This displays a compose page for admin to compose a new post
  res.render("compose");
});

app.post("/compose", function(req, res) { //this posts what the admin has entered into the compose page
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err) { //adding a callback function in the ".save()" method so that if it doesnt save properly we will get an error notification
    if (!err) { //if there is no error then res.redirect to the home page
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.get("/posts/:postId", function(req, res) { //This takes you to a blog post that already exists
  const requestedPostId = req.params.postId; //req.params are URL segments that are used to capture the values specified at their position in the URL. In this case to capture the id of the document

  Post.findOne({_id: requestedPostId}, function(err, post){//find the document with the matching _id
    if (err) { //if there are errors catch them
      console.log(err);
    } else { //else render the post.ejs page
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


//"show dbs" to see all database in terminal
//"use <database-name>" to use a database
//"show collection" to see all collections in a database
//"db.<collection-name>.find()" to see everything in a collection
