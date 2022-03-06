const pool = require('../index.js');

const postPhotosQuery = async ({ photos }) => {

  const results = await pool.query(
    `INSERT INTO reviews_photos p (p.review_id, p.photo_url) VALUES (review_id, $1)`
  , [photos])
}

module.exports = postPhotosQuery;