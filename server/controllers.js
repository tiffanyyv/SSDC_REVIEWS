const getReviewsQuery = require('../database/queries/getReviews.js');
const postReviewQuery = require('../database/queries/postReview.js');
const postPhotosQuery = require('../database/queries/postPhotos.js');
const postCharacteristicsQuery = require('../database/queries/postCharacteristics.js');
const markReviewHelpfulQuery = require('../database/queries/markReviewHelpful.js');
const markReviewReport = require('../database/queries/markReviewReport.js');

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
    const reviewObj = {
      ...req.body,
      productId: req.params.product_id
    };

    let currentUnixDate = Math.round((new Date()).getTime() / 1000);


    try {
      const results = await postReviewQuery(reviewObj, currentUnixDate)
      res.send('Success posting review')
    }
    catch (err) {
      res.send('Error posting review')
    }


  },

  getReviewMetadata: (req, res) => {
    const productId = req.params.product_id;
  },

  markReviewHelpful: async (req, res) => {
    const { review_id } = req.params;
    try {
      const results = markReviewHelpfulQuery(review_id);
      res.send('Marked helpful!')
    }
    catch (err) {
      res.send('Error marking helpful')
    }

  },

  markReviewReport: async (req, res) => {
    const { review_id } = req.params;
    try {
      const results = markReviewReportQuery(review_id);
      res.send('Reported review!')
    }
    catch (err) {
      res.send('Error reporting review')
    }

  }


}