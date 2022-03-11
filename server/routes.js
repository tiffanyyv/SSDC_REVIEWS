const controllers = require('./controllers.js');
const router = require('express').Router();



router.get(`/${process.env.LOADERIO_TOKEN}`, async (req, res) => {
  try {
    res.send(process.env.LOADERIO_TOKEN);
  } catch (error) {
    res.send(error);
  }
});

router.route('/reviews')
  .get(controllers.getReviews)
  .post(controllers.postReview)

router.get('/reviews/meta', controllers.getReviewMetadata);
router.put('/reviews/:review_id/helpful', controllers.markReviewHelpful);
router.put('/reviews/:review_id/report', controllers.markReviewReport);


module.exports = router;