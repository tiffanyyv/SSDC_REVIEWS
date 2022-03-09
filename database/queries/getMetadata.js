const pool = require('../index.js');

const getMetadataQuery = async (product_id) => {

  const results = await pool.query(
    `SELECT reviews.product_id,
      (SELECT json_build_object(
        1, (SELECT count(*) filter (where rating = 1)),
        2, (SELECT count(*) filter (where rating = 2)),
        3, (SELECT count(*) filter (where rating = 3)),
        4, (SELECT count(*) filter (where rating = 4)),
        5, (SELECT count(*) filter (where rating = 5))
        ))
        AS ratings,
      (SELECT (json_build_object(
      true, count(recommend) filter (where recommend = true),
      false, count(recommend) filter (where recommend = false)
      )))
        AS recommended,
        (SELECT json_object_agg(characteristic_name,
          json_build_object('id', characteristics.characteristic_id,
          'value', (SELECT CAST(avg(characteristic_value) AS TEXT) FROM characteristic_reviews WHERE characteristic_id = characteristics.characteristic_id)))
          AS characteristics FROM characteristics
          JOIN characteristic_reviews ON characteristics.characteristic_id = characteristic_reviews.metadata_id AND reviews.product_id = characteristics.product_id)
      FROM reviews
    WHERE reviews.product_id = $1
    GROUP BY reviews.product_id`, [product_id])

  return results;
}

module.exports = getMetadataQuery;