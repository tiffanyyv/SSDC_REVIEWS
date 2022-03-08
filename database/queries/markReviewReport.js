const pool = require('../index.js');

const markReviewReportQuery = async (review_id) => {
  await pool.query(
    `UPDATE reviews SET reported = true WHERE review_id = $1`
  , [review_id])
}

module.exports = markReviewReportQuery;