// API Functions
const API_KEY = "EFwBT80Puc8F6LcUaEeLv2JzeVW8BGOd6zYGf6RR";

// DOM variables
const button = document.querySelector(".chart-button");
const input = document.querySelector(".ticker-input");
const tickerInfoColumn = document.querySelector("#ticker-components-col");
const template = document.querySelector(".info-template");

async function getChart(ticker) {
	const url = `https://yfapi.net/v8/finance/chart/${ticker}`;
	const options = {
		method: "GET",
		withCredentials: true,
		headers: {
			"x-api-key": API_KEY,
			"Content-Type": "application/json"
		}
	};
	try {
		const response = await fetch(url, options);
		const chart = await response.json();
		return chart.chart.result[0].meta;
	} catch (err) {
		return null;
	}
}

async function handleButton() {
	// Get text in input field
	const ticker = input.value.trim();

	// If empty, do nothing
	if (ticker === "") return;

	const result = await getChart(ticker);

	// If ticker cannot be found
	if (result === null) {
		alert(`Ticker ${ticker} cannot be found`);
	} else {
		let symbol = result.symbol;
		let currency = result.currency;
		let chartPreviousClose = result.chartPreviousClose;

		// Clone tempate
		let newTickerInfo = template.content.cloneNode(true);

		// Set values
		newTickerInfo.querySelector(".symbol").textContent = symbol;
		newTickerInfo.querySelector(".currency").textContent = currency;
		newTickerInfo.querySelector(".chartPreviousClose").textContent = chartPreviousClose;

		// Append to column
		tickerInfoColumn.appendChild(newTickerInfo);
	}
}

// Add event listener
button.addEventListener("click", handleButton);
