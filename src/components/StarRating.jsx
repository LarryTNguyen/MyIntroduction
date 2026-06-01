export function StarRating({ rating = 0, max = 5 }) {
  const stars = Array.from({ length: max }, (_, index) => {
    const value = index + 1;
    if (rating >= value) return 'full';
    if (rating >= value - 0.5) return 'half';
    return 'empty';
  });

  return (
    <div className="star-rating" aria-label={`${rating} out of ${max} stars`}>
      {stars.map((state, index) => (
        <span key={index} className={`star ${state}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}
