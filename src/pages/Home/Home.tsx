import React from "react";
import RecommendationsList from "../../features/Recommendations/components/RecommendationsList/RecommendationsList";
import { Page } from "../../interfaces/Page";
import styles from './Home.module.scss';

const Home = ({ title }: Page) => {
  return (
    <div className={`${styles.home} _container`}>
      <h2 className={`${styles.home__pageTitle} _pageTitle`}>{title}</h2>
      <RecommendationsList />
    </div>
  )
}

export default Home;