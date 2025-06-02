import { useState } from 'react';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import InputBox from './components/inputBox';

function App() {
  const [amount, setAmount] = useState();
  const [to, setTo] = useState("usd");
  const [from, setFrom] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    const rate = currencyInfo[to];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat bg-gray-900 text-white transition-all duration-500"
      style={{
        backgroundImage: `url('/images/bgApp.png')`,   // i don't know why this image is not working
      }}
    >
      <div className="w-full max-w-md p-6 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-5 animate-fade-in">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onAmountChange={(amount) => setAmount(amount)}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
            />
          </div>

          <div className="relative w-full h-0.5 mb-5 animate-fade-in">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-transform duration-300 transform hover:scale-105 text-white px-4 py-1 rounded-lg shadow-lg"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="w-full mb-6 animate-fade-in">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 animate-fade-in"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;