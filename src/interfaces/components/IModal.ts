export interface IModal {
  title: string;
  description: string;
  type?: 'single' | 'double'; // 'single' = solo aceptar, 'double' = aceptar y rechazar
  isOpen: boolean;
  onAccept: () => void;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
}
