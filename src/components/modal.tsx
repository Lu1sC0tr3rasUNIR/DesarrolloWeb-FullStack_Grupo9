import { IModal } from "@/interfaces/components/IModal";
import Button from "./button";

export default function Modal({
  title,
  description,
  type = 'single',
  isOpen,
  onAccept,
  onReject,
  acceptLabel = 'Aceptar',
  rejectLabel = 'Rechazar'
}: IModal) {
  // Si el modal no está abierto, no se renderiza
  if (!isOpen) return null;

  const handleAccept = () => {
    onAccept();
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        {/* HEADER */}
        <header className="modal__header">
          <h2>{title}</h2>
        </header>

        {/* BODY */}
        <div className="modal__body">
          <p className="modal__description">{description}</p>
        </div>

        {/* FOOTER CON BOTONES */}
        <footer className="modal__footer">
          {type === 'double' && (
            <Button
              label={rejectLabel}
              onClick={handleReject}
              variant="danger"
            />
          )}
          <Button
            label={acceptLabel}
            onClick={handleAccept}
            variant="primary"
          />
        </footer>
      </div>
    </div>
  );
}
