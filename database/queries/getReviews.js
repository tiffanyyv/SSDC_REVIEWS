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

  // avoid using template literals
  // add alias name to rename table

  const results = await pool.query(
//     `SELECT review_id, rating, summary, recommend, response, (SELECT review_date AS date), reviewer_name, helpfulness, (SELECT coalesce(array_agg(json_build_object('id', photo_id, 'url', photo_url)), '{}') AS photos FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id) AS photos)
// FROM reviews r WHERE product_id = $1 ${sort} LIMIT $2 OFFSET ${count * page - count}`

// remove extra nested object
// format date
    `SELECT
        json_build_object('review_id', r.review_id, 'rating', r.rating, 'summary', r.summary, 'recommend', r.recommend, 'response', r.response, 'body', r.body, 'date', r.review_date, 'reviewer_name', r.reviewer_name, 'helpfulness', r.helpfulness, 'photos',
          (SELECT coalesce(array_agg(json_build_object('id', p.photo_id, 'url', p.photo_url)), '{}')
          AS photos FROM reviews_photos p WHERE r.review_id = p.review_id)
        )
    FROM reviews r WHERE product_id = $1 ${sort} LIMIT $2 OFFSET ${count * page - count}`



    // `SELECT product_id AS product,
    // (SELECT ${page} AS page),
    // (SELECT ${count} AS count),
    //   (SELECT array_agg
    //     (json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness, 'photos',
    //       (SELECT coalesce(array_agg(json_build_object('id', photo_id, 'url', photo_url)), '{}')
    //       AS photos FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id)
    //     ) ${sort})
    //     AS results from reviews WHERE product_id = $1)
    // FROM reviews WHERE product_id = $1`
    , [product_id, count])
  return results;

}

module.exports = getReviewsQuery;