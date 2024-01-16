import * as yup from 'yup';

const authorSchema = yup.object().shape({
  name: yup.string().required('Author name is required'),
  about: yup.string().required('About author is required'),
});

const moreDetailsSchema = yup.object().shape({
  publisher: yup.string().required('Publisher is required'),
  firstPublished: yup.date(),
  seller: yup.string().required('Seller is required'),
  text_language: yup
    .string()
    .oneOf(
      ["english", "hindi", "sanskrit", "telugu", "bengali", "tamil"],
      'Invalid text language'
    )
    .required('Text language is required'),
  description: yup.string().required('Description is required'),
  fileSize: yup.number().required('File size is required'),
  pages: yup.number().required('Number of pages is required'),
  verified: yup.boolean(),
  edition: yup.number(),
});

const bookSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  coverImage: yup.string(),
  category: yup
    .string()
    .oneOf(
      [
        "fiction",
        "mystery",
        "arts",
        "science",
        "romance",
        "horror",
        "religion",
        "philosophy",
        "history",
        "poetry",
        "biography",
        "technology",
      ],
      'Invalid category'
    )
    .required('Category is required'),
  author: authorSchema.required(),
  rating: yup.number().required('Rating is required'),
  price: yup.number().required('Price is required'),
  moreDetails: moreDetailsSchema.required(),
});

export default bookSchema;
