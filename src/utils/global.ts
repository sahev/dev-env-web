export const getRandomName = () => {
    const words1 = ['beautiful', 'biggest', 'greatest', 'worst', 'smallest']
    const words2 = ['flower', 'night', 'day', 'january', 'december', 'spider']

    const word1 = words1[Math.floor(Math.random() * words1.length)];
    const word2 = words2[Math.floor(Math.random() * words2.length)];
    const time = new Date()

    const word = `${word1}-${word2}-${time.getMilliseconds() + time.getDate()}`

    return word
}