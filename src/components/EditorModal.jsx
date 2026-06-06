export function EditorModal({ title, children, onClose }) {
  return (
    <div className="editor-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="editor-modal sticky-media sm-yellow"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="editor-modal-head">
          <h2 id="editor-modal-title">{title}</h2>
          <button type="button" className="icon-button" aria-label="Close editor" onClick={onClose}>
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
