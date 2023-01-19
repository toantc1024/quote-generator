const quoteContainer = document.getElementById('quote-container'),
      quoteText = document.getElementById('quote'),
      authorText = document.getElementById('author'),
      twitterBtn = document.getElementById('twitter'),
      newQuoteBtn = document.getElementById('new-quote'),
      loader = document.getElementById('loader');

let apiQuote = [];
localStorage.setItem('salt', (localStorage.getItem('salt')===null?0:parseInt(localStorage.getItem('salt'))));

const dailyQuote = () => {
    showLoadingSpinner();
    // let date = new Date();
    // let salt = parseInt(localStorage.getItem('salt'));
    // let year = date.getFullYear()-1;
    // let months = date.getMonth();
    // let dayMonth = 0;
    // const fixedDay = [31, (year+1)%4 == 0? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // for(let month = 0; month < months; month++) {
    //     dayMonth += fixedDay[month];
    // }
    // const days = parseInt(year/4)+year*365 + dayMonth + date.getDate() + salt;
    // const todayQuote = apiQuote[days % apiQuote.length];
    const todayQuote = apiQuote[Math.floor(Math.random() * (apiQuote.length - 1))];
    quoteText.textContent = todayQuote.text;
    //Check if author is blank so fill Unknow
    authorText.textContent = (!todayQuote.author) 
                                ? "Unknow" 
                                : todayQuote.author;
    // Check quote length to determine styling
    if(todayQuote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    hideLoadingSpinner();
}

const newQuote = () => {
    localStorage.setItem('salt', (localStorage.getItem('salt')===null?1: Math.floor(Math.random() * (apiQuote.length-1))))
    dailyQuote();
}

async function getQuote() {
    showLoadingSpinner();
    const apiUrl = './data/quotes.json';
    // Local Quotes
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        dailyQuote();
    } catch (err) {
        // Catch Error Here
        console.log(err);
    }
    hideLoadingSpinner();
}

// Tweet A Quote

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// Show loading
const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loadig
const hideLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

getQuote();
