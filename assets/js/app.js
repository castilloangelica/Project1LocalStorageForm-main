//Variables
const tweetList = document.getElementById('tweet-list');


// Event Listener
eventListeners();

function eventListeners(){
    //Form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //Remove tweet from list
    tweetList.addEventListener('click',removeTweet);

    //document
    document.addEventListener('DOMContentLoaded',localStorageOnLoad);
}


// FuctionS
function newTweet(e){
    e.preventDefault();

    //Read the Textarea value
    const tweet = document.getElementById('tweet').value;

    // Create the removed btn 
    const removedBtn = document.createElement('a');
    removedBtn.classList='remove-tweet';
    removedBtn.textContent='X';

    // Create an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;
    

    //Add removed btn to each tweet
    li.appendChild(removedBtn);

    // Add to the list
    tweetList.appendChild(li);
    
    //Add to localstorage
    addTweetLocalStorage(tweet);

    //Print alert
        alert('Tweet added');

        this.reset();
}

    //Remove tweet from the DOM
    function removeTweet(e){
        if(e.target.classList.contains('remove-tweet')){
           e.target.parentElement.remove();
        }

        //Remove from storage
        removeTweetLocalStorage(e.target.parentElement.textContent);

    }
    //Add the tweets in the local storage
    function addTweetLocalStorage(tweet){
        let tweets = getTweetsFromStorage();

       
        //Add tweets into array 
       tweets.push(tweet);
    
        //Convert tweet array from string

      localStorage.setItem('tweets',JSON.stringify( tweets));
           
        

    }
    function getTweetsFromStorage(){
        let tweets;
        const tweetsLS = localStorage.getItem('tweets');

        //get the value, if null is returned then we create an empty array
        if(tweetsLS === null){
            tweets = [];
        }
        else{
            tweets = JSON.parse(tweetsLS);
        }
        return tweets;
    }

    //local storage tweets on load
    function localStorageOnLoad(){
        let tweets = getTweetsFromStorage();
     
     // loop throught storage and print the values
    tweets.forEach(function(tweet){

    // removed btn 
    const removedBtn = document.createElement('a');
    removedBtn.classList='remove-tweet';
    removedBtn.textContent='X';

    // create the <li> element
    const li = document.createElement('li');
    li.textContent = tweet;
    

    //add removed btn to each tweet
    li.appendChild(removedBtn);

    // addd to the list
    tweetList.appendChild(li);
    
     });
       
    }

    //Remove the tweet from local storage
    function removeTweetLocalStorage(tweet){

        //get tweet from storage
        let tweets = getTweetsFromStorage();

        //Remove the X from the tweet
        const tweetDelete = tweet.substring( 0, tweet.length -1);
        
        //Loop throught the tweets and removed the tweet that's equal
        
        tweets.forEach(function(tweetLS, index){
            if(tweetDelete === tweetLS){
                tweets.splice(index,1);
            }
        })
        //Save the data
        localStorage.setItem('tweets',JSON.stringify(tweets));
    }