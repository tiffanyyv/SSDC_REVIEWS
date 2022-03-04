const getReviewsQuery = require('../database/queries/getReviews.js')
const pool = require('../database/index.js')


module.exports = {
  getReviews: async (req, res) => {
    const productId = req.query.product_id;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'newest';
    try {
      const results = await getReviewsQuery({productId})
      // const results = await pool.query(`SELECT * FROM characteristic_reviews`)

      // const results = await pool.query(
        // `SELECT product_id AS product,
        //   (SELECT json_agg(json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness
        //   ))
        //   AS results from reviews WHERE product_id = $1)
        //  FROM reviews WHERE product_id = $1`
        // `SELECT * FROM characteristic_reviews`)

  // import db queries
  console.log(req.params)
        res.send(results.rows[0])
      // await getReviewsQuery()
    }
    catch (err) {
      res.send(err)
    }
  // let result = await getReviewsQuery(productId)
  // res.send(result)
  },

  postReview: (req, res) => {
    const params = {
      ...req.body,
      productId: req.params.product_id
    };
  },

  getReviewMetadata: (req, res) => {
    const productId = req.params.product_id;
  },

  markReviewHelpful: (req, res) => {
    const reviewId = req.params.review_id;

  },

  markReviewReport: (req, res) => {
    const reviewId = req.params.review_id;

  }


}