const pool = require('../index.js');

const markReviewHelpfulQuery = async (review_id) => {
  await pool.query(
    `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1`, [review_id]
  )
}

module.exports = markReviewHelpfulQuery;