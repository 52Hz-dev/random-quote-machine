import {  useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import axios from "axios";


interface Quote {
  quote: string;
  author: string;
}
const category = 'happiness';
const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
const apiKey = 'oYqFmK4vlPZ5yVSxD6MCMA==qf6V1RCNElpizQXP';  // Replace with your actual API key
const App =() => {

  const [quoteData, setQuoteData] = useState<Quote | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true)
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
    finally{
      setLoading(false);
    }
  };
  
  // useEffect to fetch when component mounts
  useEffect(() => {
    fetchQuote();
  }, [apiUrl, apiKey]);
  
  const handleNewQuote = () => {
    fetchQuote(); // Call fetchQuote again
  };
  

  return ( 
    <div className="flex flex-col justify-center items-center h-screen
    " id="quote-box">
      {error && <p>{error}</p>}
      {quoteData &&! loading?
      <>
      <h1 className="md:w-" id="text">{quoteData.quote}</h1>
      <p className="font-bold" id="author">{quoteData.author}</p>
      <div className="mt-2">
      <Button variant="secondary" id="new-quote" onClick={handleNewQuote}>New Quote</Button>
      <Button variant="secondary" id="tweet-quote"><a href={`https://twitter.com/intent/tweet?text=${quoteData.quote}`}>Tweet Quote</a></Button>
      </div>
      </>
      :
      <p>Loading...</p>
          }
      
    </div>

   );
}
 
export default App;