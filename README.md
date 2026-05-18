# Project Proposal: The "Book vs. Movie" Showdown: A Quantitative Analysis of Adaptations

## **Motivation**

This term project addresses the age-old cultural debate: "the book was better than the movie"—by applying data science methodologies to quantify and analyze the adaptation process. The primary goal is to mathematically determine if the quality of the source material dictates cinematic success and to explore how different narrative genres survive the transition from the page to the screen.

## **Data Sources and Collection Strategy**

To fulfill the requirement of working with a publicly available dataset and enriching it by another set of data, this project will utilize a two-step collection pipeline:

- **Base Data:** I will start with a public dataset of movies, such as the TMDB 5000 dataset from Kaggle. This will provide the foundational metrics, including movie ratings, genres, and financial data like budgets and box office returns.
- **Data Enrichment:** I will enrich this base data by pulling in literary metrics. Using Python, I will write a script to query the Google Books API (or scrape Goodreads data) based on the movie titles identified as adaptations. This will allow me to extract the original book's average user rating and total review count to append to the movie records.

### **Data Characteristics**

The resulting dataset will be a joined, relational set of matched book-movie pairs. While the base dataset contains thousands of entries, filtering strictly for adaptations and successfully matching them via the API will likely yield a refined dataset of roughly 500 to 1,000 complete samples. The data will feature a mix of continuous numerical variables (book ratings, movie ratings, production budgets) and categorical variables (genres).

### **Planned Analysis and Machine Learning Approach**

- **Data Analysis & Hypothesis Testing:** The initial analysis will compare the sample variance between book ratings and their corresponding movie adaptations. I will also run hypothesis tests to determine if the rating disparity during adaptation is statistically significant depending on the genre (e.g., determining if Sci-Fi adaptations fare better or worse than Romance adaptations).
- **Machine Learning:** For the predictive modeling phase, I will train a regression model to predict a movie's final rating based on a combination of its source material's rating, its production budget, and its genre classification.

## Data Collection & Enrichment

To analyze the rating disparity between books and their film adaptations, data was collected and merged from two publicly available sources:

1. **Base Dataset:** The [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata), which provided movie titles, budgets, genres, and TMDB user ratings.
2. **Enrichment Dataset:** [The Goodreads Book Datasets 10M](https://www.kaggle.com/datasets/bahramjannesarr/goodreads-book-datasets-10m), which provided the original source material's rating.

A Python pipeline was built to filter TMDB for movies explicitly flagged as adaptations and join them with the Goodreads data via standardized string matching on the titles. The final enriched dataset consists of 124 matched book-movie pairs.

## Exploratory Data Analysis (EDA) & Hypothesis Testing

The Goodreads ratings (out of 5) were normalized to a 10-point scale to match the TMDB ratings. A `rating_disparity` metric was engineered by subtracting the normalized book rating from the movie rating (Negative = Book is better, Positive = Movie is better).

**Hypothesis Test 1: Paired T-Test (Overall Ratings)**

- **H0:** There is no significant difference between book and movie ratings.
- **H1:** There is a significant difference.
- **Result:** T-statistic: `5.9698`, P-value: `2.36e-08`. We strongly reject the null hypothesis. The data shows a statistically significant difference, with books scoring an average of 0.91 points higher than their movie adaptations.

**Hypothesis Test 2: One-Way ANOVA (Impact of Genre)**

- **H0:** Mean rating disparity is equal across all primary genres.
- **H1:** At least one genre has a significantly different mean disparity.
- **Result:** F-statistic: `0.8708`, P-value: `0.5191`. We fail to reject the null hypothesis. The primary genre of the story does not have a statistically significant impact on how well it translates to the screen.

![EDA Charts](eda_charts.png "EDA Charts")

## Machine Learning Methods

To predict a movie's final rating based on its source material and production characteristics, two regression models were implemented and evaluated:

- **Linear Regression** (Baseline)
- **Random Forest Regressor** (Final Model)

### Model Performance

The Random Forest model outperformed the baseline, achieving the following metrics on the test set:
- **RMSE (Root Mean Squared Error):** 0.62 (indicating high predictive accuracy on a 10-point scale)
- **R-squared (R2):** 0.28 (explaining 28% of the variance in adaptation ratings)

### Features and Preprocessing

The models utilized the following features to predict the TMDB movie rating (`vote_average`):

- `normalized_book_rating`: The Goodreads rating normalized to a 10-point scale.
- `budget`: Production budget (missing or zero values were imputed with the median budget).
- `primary_genre`: Categorical genre data.

The preprocessing pipeline included standard scaling for numerical features and one-hot encoding for the categorical genre data.

### Feature Importance

The Random Forest model was used to evaluate which factors most strongly influence the final movie rating. The analysis revealed that the **Book Rating (46.1%)** is the primary driver of cinematic success, followed by the **Budget (34.3%)**.

![Feature Importance](feature_importance.png "Feature Importance")

## Key Findings & Conclusions

1. **The "Book is Better" Trope is Real:** Statistical testing confirms that books consistently receive higher user ratings than their cinematic adaptations. The average disparity is significant (0.91 points on a 10-point scale).
2. **Genre Neutrality:** Surprisingly, the genre of the book does not significantly impact how much quality is "lost" or "gained" during adaptation (ANOVA p-value = 0.51). A fantasy book is just as likely to be "better than the movie" as a drama or thriller.
3. **Predictive Power:** The original book's rating (46% importance) is a significantly stronger predictor of the movie's rating than the production budget (34%). This suggests that the inherent quality of the story (as perceived by readers) is a more critical foundation for cinematic reception than financial resources.

## Limitations and Future Work

- **Sample Size:** The dataset was limited to 124 matched pairs due to strict string matching on titles. Future iterations could use fuzzy matching (Levenshtein distance) to capture titles with slight variations (e.g., "The Lord of the Rings: The Fellowship of the Ring" vs. "The Fellowship of the Ring").
- **Rating Bias:** Goodreads and TMDB users represent different demographics. Future work could include normalized critic scores (e.g., Metacritic) to provide a more balanced perspective.
- **Complexity:** The model does not account for the "Director" or "Cast" power, which are known to influence movie ratings significantly.

## Project Presentation (Web App)

A landing page summarizing these findings was built using **React + Vite**.
To view the web app:

1. Navigate to the `webapp/` directory.
2. Run `pnpm install` and `pnpm dev`.
