import React from "react";
import RecommendationsList from "../features/Recommendations/components/RecommendationsList/RecommendationsList";
import styles from './Recommendations.module.scss';

const Recommendations = () => {
  const recommendationsPageTitle = 'Recommendations';

  return (
    <div className={`${styles.recommendations} _container`}>
      <h2 className={`${styles.recommendations__pageTitle} _pageTitle`}>{recommendationsPageTitle}</h2>
      <RecommendationsList />
    </div>
  )
}

export default Recommendations;