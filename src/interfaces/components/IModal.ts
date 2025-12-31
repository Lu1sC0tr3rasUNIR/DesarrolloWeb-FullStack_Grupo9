export interface IModal {
  title: string;
  description: string;
  type?: 'single' | 'double';
  isOpen: boolean;
  onAccept: () => void;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
}
