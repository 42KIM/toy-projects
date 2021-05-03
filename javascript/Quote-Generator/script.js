const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const kakaoBtn = document.getElementById('kakao');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    // CORS policy를 해결하기 위해, proxy url를 먼저 호출하고 그다음에 quote api 호출
    const proxyUrl = 'https://tranquil-headland-38417.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        getQuote();
    }
}

// Twitter Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Kakao Link
Kakao.init('e173def228082f57597abffb0f747f21');

function sendKakoLink() {
    Kakao.Link.sendDefault({
      objectType: 'text',
      text:
        `${quoteText.innerText} \n by ${authorText.innerText}`,
      link: {
        mobileWebUrl:
          'https://42kim.github.io/quote-generator/',
        webUrl:
          'https://42kim.github.io/quote-generator/',
      },
    })
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
kakaoBtn.addEventListener('click', sendKakoLink);

// On Load
getQuote();