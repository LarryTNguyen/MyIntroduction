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
      <span className="media-more">ready for admin entries next pass</span>
    </article>
  );
}

export function MediaStickyNote({ item }) {
  return (
    <article className={`sticky-media sm-${item.color || 'purple'}`}>
      <span className="media-type-tag">{item.typeLabel}</span>
      <div className="media-review-head">
        {item.imageUrl ? (
          <img className="media-cover-img" src={item.imageUrl} alt={`${item.title} cover`} />
        ) : (
          <div className="media-cover-sticky" aria-hidden="true">
            {item.type === 'movie' ? 'film' : 'music'}
          </div>
        )}
        <div>
          <h3 className="media-title-sticky">{item.title}</h3>
          <p className="media-sub-sticky">
            {item.creator} · {item.dateAccessed}
          </p>
          <StarRating rating={item.rating} />
        </div>
      </div>
      <p className="media-review-sticky">{item.review}</p>
    </article>
  );
}
