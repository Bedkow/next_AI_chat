import Head from 'next/head';
const { Configuration, OpenAIApi } = require('openai');

export default function Home({ data }) {
	console.log(data);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<p>{data.choices[0].text}</p>
			</main>
		</>
	);
}

// fix TypeError: Converting circular structure to JSON
function stringify(data) {
	let cache = [];
	let string = JSON.stringify(data, function (key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Circular reference found, discard key
				return;
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});
	cache = null; // reset the cache
	return string;
}

export async function getServerSideProps() {
	const configuration = new Configuration({
		apiKey: process.env.API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	let maxTokens = 2000;
	let maxWords = 20;

	let data = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `Introduce yourself as ChatGPT in maximum ${maxWords} words. Each time unique. Keep context from previous requests.`,
		max_tokens: maxTokens,
	});

	data = stringify(data);

	return { props: JSON.parse(data) };
}
