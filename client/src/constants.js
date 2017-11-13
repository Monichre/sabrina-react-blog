import React, { Component } from 'react'

const CONSTANTS = {
    TRIM: (str) => {
        if (str.length > 405) {
            let array = str.split('')
            str = array.splice(0, 200)
            str.push('...')
            str = str.join('')
        }
        return str
    },
    hasPhoto: (article) => article.fields.mainPhotos || Object.values(article.fields).includes('mainPhotos'),
    hasFeaturedPhoto: (article) => article.fields.featuredPhoto || Object.values(article.fields).includes('featuredPhoto'),
    IMAGE_SINGLE: () => {
        return (
            <div>
                Single image
            </div>
        )
    },
    IMAGE_DOUBLE: () => {
        return (
            <div>
                Double image
            </div>
        )
    },
    IMAGE_TRIO: () => {
        return (
            <div>
                triple image
            </div>
        )
    },
    IMAGE_QUATRO: () => {
        return (
            <div>
                quatro image
            </div>
        )
    },
    months: ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
}

export default CONSTANTS

