const pool = require('../index.js');

const markReviewHelpfulQuery = async (review_id) => {

  const results = await pool.query(
    `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1`, [review_id]
  )
  return results;
}

module.exports = markReviewHelpfulQuery;