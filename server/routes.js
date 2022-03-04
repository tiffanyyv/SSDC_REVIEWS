const controllers = require('./controllers.js');
const router = require('express').Router();


router.route('/reviews')
  .get(controllers.getReviews)
  .post(controllers.postReview)

router.get('/meta', controllers.getReviewMetadata);
// router.put('/products/:product_id/reviews/:review_id/helpful', controllers.markReviewHelpful);
// router.put('/products/:product_id/reviews/:review_id/report', controllers.markReviewReport);

//added

module.exports = router;