import styles from './index.module.less'

interface buttonProps {
  context: string;
  onClick?: () => void;
}

const MyButton: React.FC<buttonProps> = ( props) => {

    
    let { context, onClick } = props;
    return <>
        <button type="button" className={styles.myButton} onClick={ onClick}>
    <span className={styles.mySpan}>
    {context}
    </span >
</button>
    </>;
    
  };
  
  export default MyButton;
  