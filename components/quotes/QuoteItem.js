import classes from './QuoteItem.module.css';
import Link from 'next/link'

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link href={`/quotes/${props.id}`}>View Fullscreen</Link>
    </li>
  );
};

export default QuoteItem;
