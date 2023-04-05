import styles from './index.module.less'

interface buttonProps {

    context: string
  
  }

const MyButton: React.FC<buttonProps> = ( props) => {

    
    let { context } = props;
    return <>
      
       
        <button type="button" className={styles.myButton}>
    <span className={styles.mySpan}>
    {context}
    </span >
</button>
    </>;
    
  };
  
  export default MyButton;
  