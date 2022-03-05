const controllers = require('./controllers.js');
const router = require('express').Router();


router.route('/reviews')
  .get(controllers.getReviews)
  .post(controllers.postReview)

router.get('/meta', controllers.getReviewMetadata);
router.put('/reviews/:review_id/helpful', controllers.markReviewHelpful);
router.put('/reviews/:review_id/report', controllers.markReviewReport);

//added

module.exports = router;