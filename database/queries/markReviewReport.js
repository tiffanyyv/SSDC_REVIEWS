const pool = require('../index.js');

const markReviewReportQuery = async (review_id) => {
  const results = await pool.query(
    `UPDATE reviews SET reported = true WHERE review_id = $1`
  , [review_id])
  return results;
}

module.exports = markReviewReportQuery;