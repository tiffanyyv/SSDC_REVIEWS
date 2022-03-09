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

// iterate through characteristics
// 2 queries? 1 query - generates structure except id, 2nd query to get info we need and modify/construct object
// materialized view - like a table,

// `SELECT reviews.product_id,
//       (SELECT json_build_object(
//         1, (SELECT count(*) filter (where rating = 1)),
//         2, (SELECT count(*) filter (where rating = 2)),
//         3, (SELECT count(*) filter (where rating = 3)),
//         4, (SELECT count(*) filter (where rating = 4)),
//         5, (SELECT count(*) filter (where rating = 5))
//         ))
//         AS ratings,
//       (SELECT (json_build_object(
//       true, count(recommend) filter (where recommend = true),
//       false, count(recommend) filter (where recommend = false)
//       )))
//         AS recommended,
//         (
//           (SELECT array_to_json(array_agg(allChar))
//           FROM (
//             SELECT c.characteristic_name, c.characteristic_id AS id
//             FROM characteristics c
//             INNER JOIN characteristic_reviews cr
//             ON c.characteristic_id = cr.characteristic_id
//             WHERE c.product_id = reviews.product_id
//             GROUP BY c.characteristic_id
//           ) allChar
//         )) AS characteristics
//       FROM reviews
//     WHERE reviews.product_id = $1
//     GROUP BY reviews.product_id`



// sum char_value from product characteristics where product id = product id in characteristics table and review id = char.reviewid



// (SELECT json_object_agg(
//   characteristic_name,
//   (SELECT json_object_agg('id', characteristic_id) from characteristics WHERE product_id = $1
//   ))
//   AS characteristics FROM characteristics WHERE product_id = $1
// )
// get characteristic





// this one
// (SELECT json_build_object((SELECT jsonb_object_agg(characteristic_name, ((SELECT array_to_json(array_agg(allChar))
// FROM (
//   SELECT c.characteristic_name
//   FROM characteristics c
//   WHERE c.product_id = reviews.product_id
//   GROUP BY c.characteristic_id
// ) allChar
// ))) AS characteristics FROM characteristics WHERE product_id = 1), (SELECT jsonb_object_agg(characteristic_name, ((SELECT array_to_json(array_agg(allChar))
// FROM (
//   SELECT c.characteristic_id AS id
//   FROM characteristics c
//   WHERE c.product_id = reviews.product_id
//   GROUP BY c.characteristic_id
// ) allChar
// ))) AS characteristics FROM characteristics WHERE product_id = 1)) FROM characteristics)













// (SELECT jsonb_object_agg(
//   characteristic_name, (SELECT jsonb_object_agg('id', characteristic_id) from characteristics WHERE reviews.product_id = 1)
// ) AS characteristics FROM characteristics
// )

// SELECT reviews.product_id,
//       (SELECT json_build_object(
//         1, (SELECT count(*) filter (where rating = 1)),
//         2, (SELECT count(*) filter (where rating = 2)),
//         3, (SELECT count(*) filter (where rating = 3)),
//         4, (SELECT count(*) filter (where rating = 4)),
//         5, (SELECT count(*) filter (where rating = 5))
//         ))
//         AS ratings,
//       (SELECT (json_build_object(
//       true, count(recommend) filter (where recommend = true),
//       false, count(recommend) filter (where recommend = false)
//       )))
//         AS recommended,
//         (SELECT jsonb_object_agg(
//           characteristic_name,
//           (SELECT jsonb_object_agg('idhello', characteristic_id) from characteristics WHERE product_id = $1
//           ))
//           AS characteristics FROM characteristics WHERE product_id = $1
//         )
//       FROM reviews
//     WHERE reviews.product_id = $1
//     GROUP BY reviews.product_id





// FIX
// SELECT reviews.product_id,
//       (SELECT json_build_object(
//         1, (SELECT count(*) filter (where rating = 1)),
//         2, (SELECT count(*) filter (where rating = 2)),
//         3, (SELECT count(*) filter (where rating = 3)),
//         4, (SELECT count(*) filter (where rating = 4)),
//         5, (SELECT count(*) filter (where rating = 5))
//         ))
//         AS ratings,
//       (SELECT (json_build_object(
//       true, count(recommend) filter (where recommend = true),
//       false, count(recommend) filter (where recommend = false)
//       )))
//         AS recommended,
//         (SELECT json_object_agg(
//           characteristic_name,
//           (SELECT json_object_agg('id', characteristic_id) from characteristics WHERE product_id = $1
//           )) FROM characteristics WHERE product_id = $1
//         ) as characteristics
//       FROM reviews
//     WHERE reviews.product_id = $1
//     GROUP BY reviews.product_id



// LAST WORKING
// SELECT reviews.product_id,
//       (SELECT json_build_object(
//         1, (SELECT count(*) filter (where rating = 1)),
//         2, (SELECT count(*) filter (where rating = 2)),
//         3, (SELECT count(*) filter (where rating = 3)),
//         4, (SELECT count(*) filter (where rating = 4)),
//         5, (SELECT count(*) filter (where rating = 5))
//         ))
//         AS ratings,
//       (SELECT (json_build_object(
//       true, count(recommend) filter (where recommend = true),
//       false, count(recommend) filter (where recommend = false)
//       )))
//         AS recommended,
//         (SELECT array_to_json(array_agg(allChar))
//           FROM (
//             SELECT c.characteristic_id AS id
//             FROM characteristics c
//             WHERE c.product_id = $1
//             GROUP BY c.characteristic_id
//           ) allChar
//         ) AS characteristics
//       FROM reviews
//     WHERE reviews.product_id = $1
//     GROUP BY reviews.product_id