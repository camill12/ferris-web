// Array of Rust code snippets for animation
const rustCodes = [
    `fn main() {
    println!("Raped in trenches :(");
}`,
    `let ferris: &str = "Rustacean";
let coins = 10;
println!("Cooking 100x...");`,
    `struct Memecoin {
    name: String,
    value: u32,
}

impl Memecoin {
    fn new(name: &str, value: u32) -> Memecoin {
        Memecoin { name: name.to_string(), value }
    }
}

let ferris_coin = Memecoin::new("FerrisCoin", 100);
println!("Created memecoin: Ferris");`,
];

const codeBlock = document.getElementById("code-block");
const consoleOutput = document.getElementById("console-output");

// Function to simulate code typing
function typeCode(code, delay, consoleLogs, onComplete) {
    let i = 0;
    codeBlock.textContent = "";  // Clear previous code at the start

    function type() {
        if (i < code.length) {
            codeBlock.textContent += code.charAt(i);  // Append characters one by one
            codeBlock.scrollTop = codeBlock.scrollHeight;  // Ensure the scroll stays at the bottom
            i++;
            setTimeout(type, delay);
        } else {
            // After typing finishes, send println! content to the fake console
            consoleLogs.forEach(log => logToConsole(log));
            if (onComplete) onComplete();  // Callback after this code runs
        }
    }
    type();
}

// Function to extract println! content
function extractPrintln(code) {
    const regex = /println!\("([^"]+)"(?:,)?\s*(.*?)\);/g;
    let match;
    let logs = [];

    while ((match = regex.exec(code)) !== null) {
        let output = match[1];
        if (match[2]) {
            output = output.replace("{}", match[2].trim());
        }
        logs.push(output);
    }
    return logs;
}

// Fake console log generator
function logToConsole(log) {
    const logElement = document.createElement('p');
    logElement.textContent = "sol@rust:~$ " + log;
    consoleOutput.appendChild(logElement);
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll to bottom
}

// Triggering the code typing and running one by one
let currentCodeIndex = 0;

function runNextCode() {
    if (currentCodeIndex < rustCodes.length) {
        const currentCode = rustCodes[currentCodeIndex];
        const logs = extractPrintln(currentCode);

        typeCode(currentCode, 50, logs, () => {
            setTimeout(() => {
                if (currentCodeIndex + 1 < rustCodes.length) {
                    codeBlock.textContent = ""; // Clear the current code only if more snippets are left
                }
                currentCodeIndex++;
                runNextCode(); // Run the next code snippet
            }, 2000); // Delay before erasing and running the next code
        });
    }
}

window.onload = function() {
    runNextCode();
};


// Function to trigger the turbofish
function triggerTurbofish() {
    const turbofish = document.querySelector(".turbofish");
    turbofish.style.animation = "swim 5s linear infinite";
}

// Example: Trigger the Turbofish when specific code (generics) is typed
function typeCode(code, delay, consoleLogs, onComplete) {
    let i = 0;
    codeBlock.textContent = "";  // Clear previous code

    function type() {
        if (i < code.length) {
            codeBlock.textContent += code.charAt(i);
            codeBlock.scrollTop = codeBlock.scrollHeight;
            
            // Trigger the turbofish if "::<>" (turbofish syntax in Rust generics) is typed
            if (code.includes("::<")) {
                triggerTurbofish();
            }

            i++;
            setTimeout(type, delay);
        } else {
            consoleLogs.forEach(log => logToConsole(log));
            if (onComplete) onComplete();
        }
    }
    type();
}
