let noOfSongs = 5
let singerOfSong = "1 1 2 2 4"

const hashtable = {}
for (const singer of singerOfSong.split(" ")) {
    hashtable[singer] ? ++hashtable[singer] : hashtable[singer] = 1
}

let fans = 0

for (const cumul in hashtable) {
    if (hashtable[cumul] > 1) {
        fans++
    }
}
console.log(hashtable)
console.log(fans)
