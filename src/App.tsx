import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
interface Quote {
  quote: string;
  author: string;
}


const App = () => {

  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const category = 'happiness';
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  const apiKey = 'oYqFmK4vlPZ5yVSxD6MCMA==qf6V1RCNElpizQXP';  // Replace with your actual API key

  useEffect(() => {
    
    // Fetch data using Axios
    const fetchQuote = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: { 'X-Api-Key': apiKey },
        });
        if (response.status === 200) {
          setQuoteData(response.data[0]); // assuming response returns an array of quotes
        }
      } catch (err) {
        setError('Error fetching the quote');
        console.error(err);
      }
    };

    fetchQuote();
  }, [apiUrl, apiKey]);
  return ( 
    <div className="wrapper" id="quote-box">
      {error && <p>{error}</p>}
      {quoteData?
      <>
      <h1 className="" id="text">{quoteData.quote}</h1>
      <p className="font-bold" id="author">{quoteData.author}</p>
      <Button id="new-quote">New Quote</Button>
      <Button id="tweet-quote">Tweet Quote</Button>
      </>
      :
      <p>Loading...</p>
}
      
    </div>



   );
}
 
export default App;