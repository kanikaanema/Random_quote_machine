
import './App.css';
import React from "react"

function Data() {

  const [quote, setQuote] = React.useState({
    quoteText: "Begin your day with a appropriate conception",
    quoteAuthor: "",
  })
  const [randomquote, setRandomQuote] = React.useState([])
  const [randomColor, setRandomColor] = React.useState("")
  const [animation, setAnimation] = React.useState(false);



  function Color() {
    const color = Math.floor(Math.random() * (128 - 10) + 10)
    return color
  }

  function getRandomColor() {
    const rgb = `rgb(${Color()}, ${Color()}, ${Color()})`
    return rgb
  }

  React.useEffect(() => {
    async function getQuote() {

      const res = await fetch("https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json")
      const data = await res.json()

      setRandomQuote(data)
    }
    getQuote()

  }, [])

  function handlequote() {
    const randomNumber = Math.floor(Math.random() * randomquote.length)
    const myquote = randomquote[randomNumber].quote
    const myauthor = randomquote[randomNumber].author

    setQuote(prevquote => ({
      ...prevquote,
      quoteText: myquote,
      quoteAuthor: myauthor
    }))
  }

  function handleClick() {
    setAnimation(false)
    setTimeout(() => {
      handlequote();
      setAnimation(true)
    }, 200);


    setRandomColor(getRandomColor())

  }

  
  return (
    <div className="background" style={{ backgroundColor: randomColor, transition: "all 2s ease-in-out" }}>
      <div id="quote-box" >

        <div id="text" style={{ color: randomColor }} className={`${animation ? "fade-in-text" : ''}`}>{quote.quoteText} </div>
        <div id="author" style={{ color: randomColor }} className={`${animation ? "fade-in-text" : ''}`}>-- {quote.quoteAuthor}</div>

        <button id="new-quote" style={{ backgroundColor: randomColor, transition: "all 2s ease-in-out" }} onClick={handleClick}>new quote</button>
        <a id="tweet-quote"
          href="twitter.com/intent/twee"
        >tweet</a>
      </div>
    </div>
  );
}

export default Data;
