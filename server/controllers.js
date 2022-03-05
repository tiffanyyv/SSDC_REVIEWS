const getReviewsQuery = require('../database/queries/getReviews.js')
const pool = require('../database/index.js')


module.exports = {
  getReviews: async (req, res) => {
    const { product_id } = req.query;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'newest';
    try {
      const results = await getReviewsQuery(product_id, count, page, sort)
        res.send(results.rows[0])
    }
    catch (err) {
      res.send(err)
    }
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