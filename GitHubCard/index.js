/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
//const axios = require('axios').default;

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

let cards = document.querySelector('.cards');
axios.get('https://api.github.com/users/hlee2542')
  .then(response => cards.append(makeCard(response.data)));

/*axios.get('https://api.github.com/users/hlee2542/followers')
  .then(response => console.log(response));*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get('https://api.github.com/users/hlee2542/followers')
  .then(response => response.data.forEach(user => followersArray.push(user)))
    .then(() => followersArray.forEach(user => cards.append(makeCard(user))));

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function makeCard(follower) {
  let card = document.createElement('div');
  card.classList.toggle('card');

  let img = document.createElement('img');
  img.src = follower.avatar_url;
  card.append(img);

  let cardInfo = document.createElement('div');
  cardInfo.classList.toggle('card-info');

  let name = document.createElement('h3');
  name.classList.toggle('name');
  name.textContent = follower.name;
  cardInfo.append(name);

  let username = document.createElement('p');
  username.classList.toggle('username');
  username.textContent = follower.login;
  cardInfo.append(username);

  let location = document.createElement('p');
  if (follower.location) {
    location.textContent = `Location: ${follower.location}`;
  } else {
    location.textContent = `Location: Unknown`;
  }
  cardInfo.append(location);

  let profile = document.createElement('p');
  profile.textContent = "Profile: ";
  let link = document.createElement('a');
  link.href = follower.html_url;
  link.textContent = follower.url;
  profile.append(link);
  cardInfo.append(profile);

  let followers = document.createElement('p');
  if (follower.followers || follower.followers === 0) {
    followers.textContent = `Followers: ${follower.followers}`;
  } else {
    axios.get(follower.followers_url)
      .then(response => followers.textContent = `Followers: ${response.data.length}`);
  }
  cardInfo.append(followers);

  let following = document.createElement('p');
  if (follower.following || follower.following === 0) {
    following.textContent = `Following: ${follower.following}`;
  } else {
    axios.get(follower.following_url.split('{')[0])
      .then(response => following.textContent = `Following: ${response.data.length}`);
  }
  cardInfo.append(following);

  let bio = document.createElement('p');
  if (follower.bio) {
    bio.textContent = `Bio: ${follower.bio}`;
  } else {
    bio.textContent = `Bio: None`;
  }
  cardInfo.append(bio);

  card.append(cardInfo);
  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
