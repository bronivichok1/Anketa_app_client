import cl from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal];

    if (visible) {
        rootClasses.push(cl.active);
    }

    return(
        <div onMouseDown={() => setVisible(false)} className={rootClasses.join(' ')} >
            <div onMouseDown={(e) => e.stopPropagation()} className={cl.myModalContent}>
                {children}
            </div>
        </div>
    );
}

export default MyModal;