const pool = require('../index.js');

const getReviewsQuery = async (product_id, count, page, sort) => {
  if (sort === 'newest') {
    sort = 'ORDER BY review_date ASC';
  }
  if (sort === 'helpful') {
    sort = 'ORDER BY helpfulness DESC';
  }
  if (sort === 'relevant') {
    sort = `ORDER BY helpfulness DESC, reviews.review_date DESC`;
  }

  const results = await pool.query(
    `SELECT
        json_build_object(
          'review_id', r.review_id,
          'rating', r.rating,
          'summary', r.summary,
          'recommend', r.recommend,
          'response', r.response,
          'body', r.body,
          'date', to_char(to_timestamp(r.review_date), 'DD-MM-YYYY"T"HH24:MI:SS.MS"Z"'),
          'reviewer_name', r.reviewer_name,
          'helpfulness', r.helpfulness,
          'photos',
          (SELECT coalesce
            (array_agg
              (json_build_object(
                'id', p.photo_id,
                'url', p.photo_url)),
                '{}')
          AS photos FROM reviews_photos p WHERE r.review_id = p.review_id)
        )
    FROM reviews r WHERE product_id = $1 AND reported = false ${sort} LIMIT $2 OFFSET ${count * page - count}`

    , [product_id, count])
  return results;

}

module.exports = getReviewsQuery;