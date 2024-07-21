// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// ;(Hint: setTimeout)
let count = 0

function counter() {
    console.log(count)
    count++
    setTimeout(counter, 1000) // Call the counter function again after 1000 milliseconds (1 second)
}

counter()
