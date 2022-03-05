const pool = require('../index.js');

const getReviewsQuery = async (product_id, count, page, sort) => {
  if (sort === 'newest') {
    sort = 'ORDER BY reviews.review_date DESC';
  }
  if (sort === 'helpful') {
    sort = 'ORDER BY reviews.helpfulness DESC';
  }
  if (sort === 'relevant') {
    sort = `ORDER BY reviews.helpfulness DESC, reviews.review_date DESC`;
  }


  const results = await pool.query(
    `SELECT product_id AS product,
    (SELECT ${page} AS page),
    (SELECT ${count} AS count),
      (SELECT array_agg
        (json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness, 'photos', (SELECT coalesce(array_agg(json_build_object('id', photo_id, 'url', photo_url)), '{}') AS photos FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id)
      ))
        AS results from reviews WHERE product_id = $1)
    FROM reviews WHERE product_id = $1
    ORDER BY helpfulness ASC`
    , [product_id])
  // results is an array of objects
  // `SELECT * FROM reviews WHERE product_id = $1`
  // `SELECT * FROM reviews`)

  return results;

}

module.exports = getReviewsQuery;