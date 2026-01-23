
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function testOptions() {
    try {
        console.log("Fetching options for ^NSEI (Nifty 50)...");
        const niftyOptions = await yahooFinance.options('^NSEI');
        console.log("Nifty Options Result:");
        console.log(JSON.stringify(niftyOptions, null, 2).slice(0, 500) + "...");

        console.log("\nFetching options for ^NSEBANK (Bank Nifty)...");
        const bankNiftyOptions = await yahooFinance.options('^NSEBANK');
        console.log("Bank Nifty Options Result:");
        console.log(JSON.stringify(bankNiftyOptions, null, 2).slice(0, 500) + "...");

    } catch (error) {
        console.error("Error fetching options:", error);
    }
}

testOptions();
