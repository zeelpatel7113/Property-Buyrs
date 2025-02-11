import { defineField, defineType } from "sanity";

export const product = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' }
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Popular', value: 'popular' },
                    { title: 'Computer', value: 'computers' },
                    { title: 'Laptop', value: 'laptop' },
                    { title: 'Printer', value: 'Printer' },
                    { title: 'CCTV Camara', value: 'cctv-camara' },
                    { title: 'Monitor', value: 'monitor' },
                    { title: 'CPU', value: 'cpu' },
                    { title: 'GPU', value: 'gpu' },
                    { title: 'RAM', value: 'ram' },
                    { title: 'SSD', value: 'ssd' },
                    { title: 'Keyboard', value: 'keyboard' },
                    { title: 'Mouse', value: 'mouse' }

                ],
            }
        }
    ]
});
