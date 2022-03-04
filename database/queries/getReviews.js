const pool = require('../index.js');

// module.exports = {
//   query: pool.query(
//     `SELECT product_id AS productId,
//       (SELECT json_agg(json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness)))
//       AS data from reviews WHERE product_id = $1`
//   )
// }

const getReviewsQuery = async ({ productId }) => {
  // const results = await pool.query(`SELECT * FROM reviews`)
  // return results;

  const results = await pool.query(

  //   `SELECT product_id AS product,
  // (SELECT json_agg(json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness))
  //   WHERE product_id = $1
  // FROM reviews WHERE product_id = $1`
  `SELECT * FROM reviews WHERE product_id = $1`
, [productId])

return results;
  //   `SELECT product_id AS product,
  //     (SELECT json_agg(json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness))
  //       AS results from reviews WHERE product_id = $1
  //     FROM reviews WHERE product_id = $1`
  // , [productId]

  // pool.query(
  //   `SELECT product_id AS productId,
  //     (SELECT json_agg(json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness)))
  //     AS data from reviews WHERE product_id = $1`)
  // const results = pool.query(`SELECT * FROM reviews`, (err, results) => {
  //   console.log(results)
  // })
  // const results = pool.query(
    // `SELECT product_id AS product,
    //   (SELECT json_agg(json_build_object('review_id', review_id, 'rating', rating, 'summary', summary, 'recommend', recommend, 'response', response, 'body', body, 'date', review_date, 'reviewer_name', reviewer_name, 'helpfulness', helpfulness
    //   ))
    //   AS results from reviews WHERE product_id = $1)
    //  FROM reviews WHERE product_id = $1`
    // `SELECT * FROM reviews`)



}

module.exports = getReviewsQuery