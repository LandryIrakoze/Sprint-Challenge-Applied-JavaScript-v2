// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios.get('https://lambda-times-backend.herokuapp.com/articles')
    .then(data => {
        const articles = data.data.articles;
        const cardsContainer = document.querySelector('.cards-container');
        const articleArray = Object.values(articles);
        const articleCategory = Object.keys(articles);
        console.log(articleCategory);
        articleArray.forEach((item, index) => {
            item.forEach(topic => {
                cardsContainer.appendChild(Cards(topic, articleCategory[index]))
            })
        })
    })
    .catch(response => {
        console.log('its broken, try again later', response);
    })

const Cards = (data, category) => {
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const authorContainer = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const authorName = document.createElement('span');

    card.setAttribute('data-tab', category);

    card.classList.add('card');
    headline.classList.add('headline');
    authorContainer.classList.add('author');
    imgContainer.classList.add('img-container');

    headline.textContent = `${data.headline}`;
    authorName.textContent = `${data.authorName}`;

    img.src = `${data.authorPhoto}`;

    card.appendChild(headline);
    card.appendChild(authorContainer);
    
    authorContainer.appendChild(imgContainer);
    authorContainer.appendChild(authorName);

    imgContainer.appendChild(img);

    return card;
}

