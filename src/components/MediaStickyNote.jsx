import { formatReviewDate } from '../lib/dateFormat.js';
import { InlineAdminActions } from './AdminToolbar.jsx';
import { StarRating } from './StarRating.jsx';

export function MediaPlaceholder({ item }) {
  return (
    <article className={`sticky-media sm-${item.color} placeholder-note`}>
      <span className="media-type-tag">{item.label}</span>
      <div className="media-cover-sticky" aria-hidden="true">
        {item.type === 'movie' ? 'film' : 'music'}
      </div>
      <h3 className="media-title-sticky">{item.title}</h3>
      <p className="media-review-sticky">{item.note}</p>
      <span className="media-more">ready for your first entry</span>
    </article>
  );
}

export function MediaStickyNote({ item, isAdmin = false, onEdit, onDelete }) {
  const displayDate = formatReviewDate(item.reviewDate || item.dateAccessed);

  return (
    <article className={`sticky-media sm-${item.color || 'purple'}`}>
      {isAdmin ? <InlineAdminActions onEdit={() => onEdit?.(item)} onDelete={() => onDelete?.(item)} /> : null}

      <span className="media-type-tag">{item.typeLabel}</span>
      <div className="media-review-head">
        {item.imageUrl ? (
          <img className={`media-cover-img media-cover-${item.type}`} src={item.imageUrl} alt={`${item.title} cover`} loading="lazy" />
        ) : (
          <div className="media-cover-sticky" aria-hidden="true">
            {item.type === 'movie' ? 'film' : 'music'}
          </div>
        )}
        <div className="media-review-copy">
          <h3 className="media-title-sticky">{item.title}</h3>
          <p className="media-sub-sticky">
            {item.creator} · {displayDate}
          </p>
          <StarRating rating={item.rating} />
        </div>
      </div>
      <p className="media-review-sticky">{item.review}</p>
    </article>
  );
}
