import { MediaPlaceholder, MediaStickyNote } from '../components/MediaStickyNote.jsx';
import { albumReviews, mediaPlaceholders, movieReviews } from '../data/media.js';

function ReviewColumn({ title, emptyItem, reviews }) {
  return (
    <section className="review-column" aria-labelledby={`${emptyItem.type}-reviews`}>
      <div className="column-pin" aria-hidden="true" />
      <h2 id={`${emptyItem.type}-reviews`} className="section-label">
        {title}
      </h2>
      <div className="review-scroll-area" tabIndex="0">
        {reviews.length > 0 ? (
          reviews.map((review) => <MediaStickyNote key={review.id} item={review} />)
        ) : (
          <MediaPlaceholder item={emptyItem} />
        )}
      </div>
    </section>
  );
}

export function MediaPage() {
  return (
    <section className="section-pad page-section" aria-labelledby="media-heading">
      <p className="tag-line">movie and music notes</p>
      <h1 id="media-heading" className="page-title">
        Media Reviews
      </h1>
      <p className="page-intro">
        A small space for movie and album reviews. The columns are ready for entries, and each side can scroll on its own once the lists grow.
      </p>

      <div className="media-columns">
        <ReviewColumn title="movies" emptyItem={mediaPlaceholders.movie} reviews={movieReviews} />
        <ReviewColumn title="albums" emptyItem={mediaPlaceholders.album} reviews={albumReviews} />
      </div>
    </section>
  );
}
