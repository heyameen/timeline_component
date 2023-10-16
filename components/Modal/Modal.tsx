import React from "react";
import styles from "./Modal.module.scss"

interface ModalProps {   
    toggleModal: () => void;
    content: React.JSX.Element
}

const Modal: React.FC<ModalProps> = ({content, toggleModal}) => {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <span className={styles.closeIcon} onClick={toggleModal}>x</span>
                {content}
            </div>
        </div>
    );
};

export default Modal;