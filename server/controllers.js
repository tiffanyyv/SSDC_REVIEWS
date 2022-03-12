const getReviewsQuery = require('../database/queries/getReviews.js');
const postReviewQuery = require('../database/queries/postReview.js');
const markReviewHelpfulQuery = require('../database/queries/markReviewHelpful.js');
const markReviewReportQuery = require('../database/queries/markReviewReport.js');
const getMetadataQuery = require('../database/queries/getMetadata.js');

const pool = require('../database/index.js');


module.exports = {
  getReviews: async (req, res) => {
    const { product_id } = req.query;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'newest';
    try {
      const results = await getReviewsQuery(product_id, count, page, sort)
      let response = {
        product: product_id,
        page,
        count: Number(results.rows.length),
        results: results.rows.map(row => {
          return row.json_build_object
        })
      }
      res.send(response)
    }
    catch (err) {
      res.send('Error getting reviews')
    }
  },

  postReview: async (req, res) => {
    const reviewObj = { ...req.body };
    let currentUnixDate = Math.round((new Date()).getTime() / 1000);
    try {
      await postReviewQuery(reviewObj, currentUnixDate)
      res.send('Posted review!')
    }
    catch (err) {
      res.send('Error posting review')
    }
  },

  getReviewMetadata: async (req, res) => {
    const { product_id } = req.query;
    try {
      const results = await getMetadataQuery(product_id);
      res.send(results.rows[0])
    }
    catch (err) {
      res.send('Error getting metadata')
    }
  },

  markReviewHelpful: async (req, res) => {
    const { review_id } = req.params;
    try {
      markReviewHelpfulQuery(review_id);
      res.send('Marked helpful!')
    }
    catch (err) {
      res.send('Error marking helpful')
    }

  },

  markReviewReport: async (req, res) => {
    const { review_id } = req.params;
    try {
      markReviewReportQuery(review_id);
      res.send('Reported review!')
    }
    catch (err) {
      res.send('Error reporting review')
    }

  }


}