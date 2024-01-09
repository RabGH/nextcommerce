export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of Product',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description of product',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'price_id',
      title: 'Stripe Price ID',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
}
