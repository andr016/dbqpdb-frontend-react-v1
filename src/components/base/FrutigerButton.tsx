import * as styles from './FrutigerButton.css';

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode; // Optional: for icons, text, etc.
  label?: string;             // Optional: text label
}

// Component
const FrutigerButton: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  label 
}) => {
    return(
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
};

export default FrutigerButton