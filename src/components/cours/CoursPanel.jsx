export default function CoursPanel({ chapitre, open, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s',
        }}
      />

      {/* Panneau */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: 520, maxWidth: '90vw', height: '100vh',
        background: 'var(--bg2)',
        borderLeft: '1px solid var(--border)',
        zIndex: 101,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky', top: 0,
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 1,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 2 }}>
              {chapitre?.module}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
              {chapitre?.titre}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32,
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text2)',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Contenu */}
        <div style={{ padding: '24px 28px', flex: 1 }}>
          {chapitre && (
            <div
              className="theory-body"
              dangerouslySetInnerHTML={{ __html: chapitre.cours }}
            />
          )}
        </div>
      </div>
    </>
  )
}
