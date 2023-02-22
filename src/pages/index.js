import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
const { Configuration, OpenAIApi } = require('openai');

export default function Home({ data, isError, errorDevOnly }) {
	/*
  1 API CALL APPROACH - PROBLEMS WITH TOKEN LIMIT
  */

	//do not deploy to prod, may expose api key
	// errorDevOnly ? console.log(errorDevOnly) : null;
	// console.log(data);

	// function createResponseHTML(data) {
	// 	let responseHTML;
	// 	if (data) {
	// 		responseHTML = { __html: data.data.choices[0].text };
	// 	} else {
	// 		responseHTML = { __html: <div>error fetching data</div> };
	// 	}
	// 	return responseHTML;
	// }

	// let response = createResponseHTML(data);

	//   console.log(response);

	const [topicInput, setTopicInput] = useState("")
	const router = useRouter();

	function handleUserInput(e) {
		setTopicInput(e.target.value);
		// console.log(e.target.value);
	}

	function handleArgueButtonClick() {
		// console.log(topicInput);
		// console.log(router);

		// create cookie with argument topic with max age of 10 minutes //
		document.cookie = `topic_input=${topicInput}; max-age=600`;
		
		// console.log(document.cookie);
	}

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<input type="text" placeholder="Insert argument topic" onChange={handleUserInput}></input>
				<button onClick={handleArgueButtonClick} >Start arguing!</button>
				{/* {!response && !isError && <div>Loading...</div>}
				{isError && <div>Error! Reload the page.</div>}
				{!isError && response && <div dangerouslySetInnerHTML={response}></div>} */}
			</main>
		</>
	);
}

// fix TypeError: Converting circular structure to JSON
// function stringify(data) {
// 	let cache = [];
// 	let string = JSON.stringify(data, function (key, value) {
// 		if (typeof value === "object" && value !== null) {
// 			if (cache.indexOf(value) !== -1) {
// 				// Circular reference found, discard key
// 				return;
// 			}
// 			// Store value in our collection
// 			cache.push(value);
// 		}
// 		return value;
// 	});
// 	cache = null; // reset the cache
// 	return string;
// }
/*
export async function getServerSideProps() {
	const configuration = new Configuration({
		apiKey: process.env.API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	let maxTokens = 3600;
	// let maxWords = 20;
	let conversationTopic = "gun problem in the US";
	let data;
	let isError = false;
	let errorDevOnly = false;

	try {
		data = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `From now on keep context and roleplay 2 different people arguing back and forth about a topic, 1 argument at a time. They have to have opposing views at the beginning. Each person has to react to the other one's argument and create a counterargument. The topic is \"${conversationTopic}\". Put each person's arguments in separate responses and wrap them in html <div> elements with two unique classes of \"person1 argument1\", \"person1 argument2\". Do not change the editing of the <div> or classes throughout the conversation, write them in lower case only. Use the HTML standard of writing <div> and adding classes to it. Do not join person and argument classes.  Do not create any conclusion elements with other classes. Each person has to say minimum 2 arguments, maximum 3 arguments.\nThe pattern of the conversation should be:\n<div class=\"person1 argument1\">Person 1: Argument1</div>\n<div class=\"person2 argument1\">Person 2: Argument 1 based on Person 1's Argument 1</div>\n<div class=\"person1 argument2\">Person 1: Response to Person 2's Argument 1</div>\nEtc.\nConclude the conversation with the two agreeing on an agrument. Close all html <div> tags. Do not create any other dialogs or summaries than those spoken by Person 1 and Person 2.`,
			temperature: 0.2,
			max_tokens: maxTokens,
			top_p: 1,
			frequency_penalty: 0.2,
		});
		//Node.js success console log
		console.log(`@@@@@@@@@@@@@@@@@@@@\nSuccess\n${data.statusText}\n${data.status}\n@@@@@@@@@@@@@@@@@@@@`);
	} catch (error) {
		isError = true;
		errorDevOnly = JSON.parse(stringify(error));
		// Node.js error console log
		console.log(`////////////////////\n${errorDevOnly.name}\n${errorDevOnly.status}\n${errorDevOnly.message}\n////////////////////`);
	}

	if (data) {
		data = JSON.parse(stringify(data));
	} else {
		data = null;
	}

	return {
		props: {
			data: data,
			isError: isError,
			errorDevOnly: errorDevOnly,
		},
	};
}
*/
