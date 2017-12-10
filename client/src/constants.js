import React, { Component } from 'react'

const CONSTANTS = {
    TRIM: (str) => {
        if (str.length > 600) {
            let array = str.split('')
            str = array.splice(0, 600)
            str.push('...')
            str = str.join('')
        }
        return str
    },
    trimLink: (str) => {
        if (str.length > 50) {
            let array = str.split('')
            str = array.splice(0, 35)
            str.push('...')
            str = str.join('')
        }
        return str
    },
    hasPhoto: (article) => article.fields.mainPhotos || Object.values(article.fields).includes('mainPhotos'),
    hasFeaturedPhoto: (article) => article.fields.featuredPhoto || Object.values(article.fields).includes('featuredPhoto'),
    IMAGE_SINGLE: (images) => {
        return (
            <div className="blog-single-main__images__container">
                {images.map(image => {
                    return (
                        <div className="blog-single-main__image_image__single_inner">
                            <img src={image.fields.file.url} />
                        </div>
                    )
                })}
            </div>
        )
    },
    IMAGE_DOUBLE: (images) => {
        return (
            <div className="blog-single-main__images__container">
                {images.map(image => {
                    return (
                        <div className="blog-single-main__image_image__double_inner">
                            <img src={image.fields.file.url} />
                        </div>
                    )
                })}
            </div>
        )
    },
    IMAGE_TRIO: (images) => {
        return (
            <div className="blog-single-main__images__container">
                {images.map(image => {
                    return (
                        <div className="blog-single-main__image_image__trio_inner">
                            <img src={image.fields.file.url} />
                        </div>
                    )
                })}
            </div>
        )
    },
    IMAGE_QUATRO: (images) => {
        return (
            <div className="blog-single-main__images__container">
                {images.map(image => {
                    return (
                        <div className="blog-single-main__image_image__quatro_inner">
                            <img src={image.fields.file.url} />
                        </div>
                    )
                })}
            </div>
        )
    },
    months: ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
}

export default CONSTANTS

