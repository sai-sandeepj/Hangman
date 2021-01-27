var programming_languages = [
    "c",
    "java",
    "python",
    "javascript",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
    "ruby",
    "fortran",
    "pascal",
    "haskell",
    "r",
    "pearl"
]

// Function to generate a random word from the programming_languages array
function generateRandomWord(){
    return programming_languages[Math.floor(Math.random() * programming_languages.length)]
}

export default generateRandomWord;