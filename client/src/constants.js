const CONSTANTS = {
    TRIM: (str) => {
        if (str.length > 205) {
            let array = str.split('')
            str = array.splice(0, 200)
            str.push('...')
            str = str.join('')
        }
        return str
    },
    hasPhoto: (article) => article.fields.photos || Object.values(article.fields).includes('photos'),
    hasFeaturedPhoto: (article) => article.fields.featuredPhoto || Object.values(article.fields).includes('featuredPhoto')
}

export default CONSTANTS