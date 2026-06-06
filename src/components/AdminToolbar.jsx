export function AdminToolbar({ onAdd, addLabel, status }) {
  return (
    <div className="admin-toolbar">
      <div>
        <span className="admin-badge">admin mode</span>
        {status ? <span className="admin-status">{status}</span> : null}
      </div>
      {onAdd ? (
        <button type="button" className="btn-primary-warm compact-action" onClick={onAdd}>
          {addLabel}
        </button>
      ) : null}
    </div>
  );
}

export function InlineAdminActions({ onEdit, onDelete, deleteLabel = 'delete' }) {
  return (
    <div className="inline-admin-actions" aria-label="Admin controls">
      <button type="button" onClick={onEdit}>
        edit
      </button>
      <button type="button" className="danger-action" onClick={onDelete}>
        {deleteLabel}
      </button>
    </div>
  );
}
