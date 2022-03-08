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
        (
          (SELECT array_to_json(array_agg(allChar))
          FROM (
            SELECT c.characteristic_name, c.characteristic_id AS id
            FROM characteristics c
            INNER JOIN characteristic_reviews cr
            ON c.characteristic_id = cr.characteristic_id
            WHERE c.product_id = reviews.product_id
            GROUP BY c.characteristic_id
          ) allChar
        )) AS characteristics
      FROM reviews
    WHERE reviews.product_id = $1
    GROUP BY reviews.product_id`, [product_id])

  return results;
}

module.exports = getMetadataQuery;

// (SELECT json_object_agg(
//   characteristic_name,
//   (SELECT json_object_agg('id', characteristic_id) from characteristics WHERE product_id = $1
//   ))
//   AS characteristics FROM characteristics WHERE product_id = $1
// )
// get characteristic

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
//           (SELECT json_object_agg('idhello', characteristic_id) from characteristics WHERE product_id = $1
//           ))
//           AS characteristics FROM characteristics WHERE product_id = $1
//         )
//       FROM reviews
//     WHERE reviews.product_id = $1
//     GROUP BY reviews.product_id

















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