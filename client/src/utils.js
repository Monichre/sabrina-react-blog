const TRIM = (str) => {
    if (str.length > 505) {
        let array = str.split('')
        str = array.splice(0, 500)
        str.push('...')
        str = str.join('')
    }
    return str
}

export default TRIM