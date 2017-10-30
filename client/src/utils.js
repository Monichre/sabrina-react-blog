const TRIM = (str) => {
    if (str.length > 205) {
        let array = str.split('')
        str = array.splice(0, 200)
        str.push('...')
        str = str.join('')
    }
    return str
}

export default TRIM