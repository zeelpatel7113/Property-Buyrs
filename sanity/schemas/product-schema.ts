import { defineField, defineType } from "sanity";

export const product = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().min(3).error("Name must be at least 3 characters.")
        }),
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 200 }
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            validation: Rule => Rule.required().min(1).error("At least one image is required.")
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(100000).error("Price must be at least 1 Lac.")
        },
        {
            name: 'area',
            title: 'Area (sq ft)',
            type: 'number',
            validation: Rule => Rule.required().min(100).error("Area must be at least 100 sq ft.")
        },
        {
            name: 'bedrooms',
            title: 'Bedrooms',
            type: 'number',
            validation: Rule => Rule.required().min(1).error("At least 1 bedroom is required.")
        },
        {
            name: 'bathrooms',
            title: 'Bathrooms',
            type: 'number',
            validation: Rule => Rule.required().min(1).error("At least 1 bathroom is required.")
        },
        {
            name: 'floors',
            title: 'Floors',
            type: 'number'
        },
        {
            name: 'possession',
            title: 'Possession',
            type: 'string',
            options: {
                list: [
                    { title: 'Ready Possession', value: 'Ready Possession' },
                    { title: 'In 1 Year', value: 'In 1 Year' },
                    { title: 'In 2 Years', value: 'In 2 Years' },
                    { title: 'In 3 Years', value: 'In 3 Years' },
                    { title: '3 Years+', value: '3 Years+' }
                ]
            }
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            options: {
                list: [
                    { title: 'Raysan', value: 'Raysan' },
                    { title: 'Randesan', value: 'Randesan' },
                    { title: 'Koba', value: 'Koba' },
                    { title: 'Kudasan', value: 'Kudasan' },
                    { title: 'Sargasan', value: 'Sargasan' },
                    { title: 'Por', value: 'Por' },
                    { title: 'GIFT City', value: 'GIFT City' }
                ]
            }
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string'
        },
        {
            name: 'mapEmbeded',
            title: 'Map Embeded Code',
            type: 'text'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Popular', value: 'popular' },
                    { title: 'Residential', value: 'residential' },
                    { title: 'Commercial', value: 'commercial' },
                    { title: 'Apartments', value: 'apartments' },
                    { title: 'Retail', value: 'retail' }
                ]
            }
        }
    ]
});
