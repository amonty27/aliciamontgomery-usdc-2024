/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
	//create a result JSON object to hold the results from the search and add the search term to it
	var result = {
		SearchTerm: searchTerm,
		Results: [],
	};

	// convert the search term to a regular expresion and add a space (" ") to the end of it
	// if it does not have one for searching purposes
	if (searchTerm.charAt(searchTerm.length - 1) !== " ") {
		searchTerm = searchTerm.concat("", " ");
	}
	// the RegExp uses a global modifier ("g") to search the entire book line instead of stopping at the first result
	var regSearchTerm = new RegExp(searchTerm, "g");

	// if no book was scanned, return an empty result
	if (Object.keys(scannedTextObj).length === 0) {
		return result;
	}

	//if the book's text has not been scanned (i.e. the length of the "Content" array is 0), return the empty result
	else if (Object.keys(scannedTextObj[0]["Content"]).length === 0) {
		return result;
	}

	// if there is a book and it has content scanned, continue
	else {
		// search through the entire scannedTextObj array, which could be 1 or more
		for (let x = 0; x < Object.keys(scannedTextObj).length; x++) {
			// search through the entire content array of the object, which could be 1 or more
			for (
				let i = 0;
				i < Object.keys(scannedTextObj[x]["Content"]).length;
				i++
			) {
				/* if the character at the end of the line is hyphenated at the end of the line,
				 * get the rest word and add it to the first sentence
				 * (Note: it also checks if the next line exists before trying to combine them)
				 */
				if (
					scannedTextObj[x]["Content"][i]["Text"].charAt(
						Object.keys(scannedTextObj[x]["Content"][i]["Text"]).length - 1
					) == "-"
				) {
					if (scannedTextObj[x]["Content"][i + 1] != null) {
						var combinedText = scannedTextObj[x]["Content"][i]["Text"]
							.replace("-", "")
							.concat(
								"",
								scannedTextObj[x]["Content"][i + 1]["Text"].split(" ")[0],
								" "
							);
						//search the content from the Content array wiht the new combinedText
						var searchResults = combinedText.match(regSearchTerm);
					}
				} else {
					//search the content from the Content array
					var searchResults = scannedTextObj[x]["Content"][i]["Text"]
						.concat("", " ")
						.match(regSearchTerm);
				}

				/* if the search found results, add ISBN, Page, and Line numbers to the result array
				 *
				 */
				if (searchResults != null) {
					for (let y = 0; y < searchResults.length; y++) {
						let newSearchResult = {
							ISBN: scannedTextObj[x]["ISBN"],
							Page: scannedTextObj[x]["Content"][i]["Page"],
							Line: scannedTextObj[x]["Content"][i]["Line"],
						};
						result.Results.push(newSearchResult);
					}
				}
			}
		}
	}
	return result;
}

/** Example input object. */
const twentyLeaguesIn = [
	{
		Title: "Twenty Thousand Leagues Under the Sea",
		ISBN: "9780000528531",
		Content: [
			{
				Page: 31,
				Line: 8,
				Text: "now simply went on by her own momentum.  The dark-",
			},
			{
				Page: 31,
				Line: 9,
				Text: "ness was then profound; and however good the Canadian's",
			},
			{
				Page: 31,
				Line: 10,
				Text: "eyes were, I asked myself how he had managed to see, and",
			},
		],
	},
];

/** Example output object */
const twentyLeaguesOut = {
	SearchTerm: "the",
	Results: [
		{
			ISBN: "9780000528531",
			Page: 31,
			Line: 9,
		},
	],
};

// Additional test books used in the unit testing
const TestBook1 = [
	{
		Title: "Test Book",
		ISBN: "1234567890",
		Content: [
			{
				Page: 2,
				Line: 8,
				Text: "now simply went on by her own momentum. the The dark-",
			},
			{
				Page: 2,
				Line: 9,
				Text: "ness was then profound; and however good the the Canadian's",
			},
			{
				Page: 3,
				Line: 10,
				Text: "eyes were, I asked myself how he had managed to see, and",
			},
		],
	},
];

const TestBook2 = [
	{
		Title: "Test Book",
		ISBN: "1234567890",
		Content: [
			{
				Page: 2,
				Line: 8,
				Text: "now simply went on by her own momentum. the The dark-",
			},
			{
				Page: 2,
				Line: 9,
				Text: "ness was then profound; and however good the the Canadian's",
			},
			{
				Page: 3,
				Line: 10,
				Text: "eyes were, I asked myself how he had managed to see, and",
			},
		],
	},
	{
		Title: "Twenty Thousand Leagues Under the Sea",
		ISBN: "9780000528531",
		Content: [
			{
				Page: 31,
				Line: 8,
				Text: "now simply went on by her own momentum.  The dark-",
			},
			{
				Page: 31,
				Line: 9,
				Text: "ness was then profound; and however good the Canadian's",
			},
			{
				Page: 31,
				Line: 10,
				Text: "eyes were, I asked myself how he had managed to see, and",
			},
		],
	},
];

const TestBook3 = [
	{
		Title: "Test Book",
		ISBN: "1234567890",
		Content: [],
	},
];

const TestBook4 = [];

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/* We can check that, given a known input, we get a known output. */
console.log("<----------TEST 1--------->");
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
	console.log("PASS: Test 1");
} else {
	console.log("FAIL: Test 1");
	console.log("Expected:", twentyLeaguesOut);
	console.log("Received:", test1result);
}

/* We could choose to check that we get the right number of results. */
console.log("<----------TEST 2--------->");
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
	console.log("PASS: Test 2");
} else {
	console.log("FAIL: Test 2");
	console.log("Expected:", twentyLeaguesOut.Results.length);
	console.log("Received:", test2result.Results.length);
}

/* MY UNIT TESTS */
/* TEST 3
 * If the search term appears multiple times in the same line,
 * return the same line multiple times
 *
 * Should return 3 objects from TestBook1: page 2/line 8 and page 3/line 9 two times
 */
console.log("\n" + "MY UNIT TESTS");
console.log("<----------TEST 3: Search Term appears Multiple Times--------->");
const test3results = findSearchTermInBooks("the", TestBook1);
if (test3results.Results.length == 3) {
	console.log("PASS: Test 3");
} else {
	console.log("FAIL: Test 3");
}

/* TEST 4
 * The search function is case-sensitive
 *
 * Should return 1 object from TestBook1: page2/line 8 one time
 */
console.log("<----------TEST 4: Case-sensitive Search--------->");
const test4results = findSearchTermInBooks("The", TestBook1);
if (test4results.Results.length == 1) {
	console.log("PASS: Test 4");
} else {
	console.log("FAIL: Test 4");
}

/* TEST 5
 * If the word at the end of the line is broken by the chracter, return the line it starts on
 *
 * Should return 1 object from TestBook1: page2/line 8 one time
 */
console.log("<----------TEST 5: Hyphenated Words--------->");
const test5results = findSearchTermInBooks("darkness", TestBook1);
if (test5results.Results.length == 1) {
	console.log("PASS: Test 5");
} else {
	console.log("FAIL: Test 5");
}

/* TEST 6
 * If the JSON Object has multiple books, check all the books and not just the first one
 *
 * Should return 4 objects from TestBook2: page 2/line 8 two times and page 2/ line 9 from "Test Book",
 * and page 31/ line 8 from "Twenty Thousand Leagues Under the Sea"
 */
console.log("<----------TEST 6: Multiple Books--------->");
const test6results = findSearchTermInBooks("the", TestBook2);
if (test6results.Results.length == 4) {
	console.log("PASS: Test 6");
} else {
	console.log("FAIL: Test 6");
}

/* TEST 7
 * Correctly returns if the word has non-standard characters in it
 *
 * Should return 1 objects from TestBook1: page 2/ line 9 from "Test Book"
 */
console.log("<----------TEST 7: Non-Standard Characters in Words--------->");
const test7results = findSearchTermInBooks("Canadian's", TestBook1);
if (test7results.Results.length == 1) {
	console.log("PASS: Test 7");
} else {
	console.log("FAIL: Test 7");
}

/* TEST 8
 * If the book's text has not been scanned (i.e. the length of the array is 0),
 * return the empty result
 *
 * Should return 0 objects from TestBook3
 */
console.log("<----------TEST 8: No Scanned Content--------->");
const test8results = findSearchTermInBooks("the", TestBook3);
if (test8results.Results.length == 0) {
	console.log("PASS: Test 8");
} else {
	console.log("FAIL: Test 8");
}

/* TEST 9
 * if no book was scanned, return and empty result
 *
 * Should return 0 objects from TestBook4
 */
console.log("<----------TEST 9: No Scanned Book--------->");
const test9results = findSearchTermInBooks("the", TestBook4);
if (test9results.Results.length == 0) {
	console.log("PASS: Test 9");
} else {
	console.log("FAIL: Test 9");
}
