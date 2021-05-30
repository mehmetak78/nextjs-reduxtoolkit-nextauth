import {Fragment, useEffect} from 'react';

import QuoteList from '../../components/quotes/QuoteList';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import NoQuotesFound from '../../components/quotes/NoQuotesFound';
import useHttp from '../../hooks/use-http';
import {getAllQuotes} from '../../helpers/QuotesHelper';

import styles from '../../styles/quotes.module.scss'
import PrivateContent from "../../components/UI/PrivateContent";

const Index = () => {
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(
    getAllQuotes,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let pageContent;

  if (status === 'pending') {
    pageContent =
        <div className={styles.centered}>
          <LoadingSpinner/>
        </div>

  }

  else if (error) {
    pageContent =  <p className={`${styles.centered} ${styles.focused}`}>{error}</p>;
  }

  else if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    pageContent =  <NoQuotesFound/>;
  }
  else  {
    pageContent = <QuoteList quotes={loadedQuotes}/>;
  }

  return <PrivateContent>{pageContent}</PrivateContent>
};

export default Index;
