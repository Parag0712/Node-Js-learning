var oneLinerJoke = require('one-liner-joke');
var figlet = require("figlet");

var getRandomJoke = oneLinerJoke.getRandomJoke();
console.log(getRandomJoke.body);

figlet("P a r a g*", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});

figlet()