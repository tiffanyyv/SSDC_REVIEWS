const pool = require('../index.js');

const getReviewsQuery = async (product_id, count, page, sort) => {
  if (sort === 'newest') {
    sort = 'ORDER BY review_date DESC';
  }
  if (sort === 'helpful') {
    sort = 'ORDER BY helpfulness DESC';
  }
  if (sort === 'relevant') {
    sort = `ORDER BY helpfulness DESC, reviews.review_date DESC`;
  }

// TODO: format date
  const results = await pool.query(
    `SELECT product_id AS product,
    (SELECT ${page} AS page),
    (SELECT ${count} AS count),
      (WITH limitrevs AS (SELECT * FROM reviews WHERE product_id = $1 ${sort} LIMIT ${count})
      SELECT array_agg
        (json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness, 'photos',
          (SELECT coalesce(array_agg(json_build_object('id', photo_id, 'url', photo_url)), '{}')
          AS photos FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id)
        ))
         AS results from limitrevs)
    FROM reviews WHERE product_id = $1`
    , [product_id])
  // results is an array of objects
  // `SELECT * FROM reviews WHERE product_id = $1`
  // `SELECT * FROM reviews`)

  return results;

}

module.exports = getReviewsQuery;