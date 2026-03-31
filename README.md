### Project Proposal: The "Book vs. Movie" Showdown: A Quantitative Analysis of Adaptations

**Motivation**
This term project addresses the age-old cultural debate—"the book was better than the movie"—by applying data science methodologies to quantify and analyze the adaptation process. The primary goal is to mathematically determine if the quality of the source material dictates cinematic success and to explore how different narrative genres survive the transition from the page to the screen.

**Data Sources and Collection Strategy**
To fulfill the requirement of working with a publicly available dataset and enriching it by another set of data, this project will utilize a two-step collection pipeline:

- **Base Data:** I will start with a public dataset of movies, such as the TMDB 5000 dataset from Kaggle. This will provide the foundational metrics, including movie ratings, genres, and financial data like budgets and box office returns.
- **Data Enrichment:** I will enrich this base data by pulling in literary metrics. Using Python, I will write a script to query the Google Books API (or scrape Goodreads data) based on the movie titles identified as adaptations. This will allow me to extract the original book's average user rating and total review count to append to the movie records.

**Data Characteristics**
The resulting dataset will be a joined, relational set of matched book-movie pairs. While the base dataset contains thousands of entries, filtering strictly for adaptations and successfully matching them via the API will likely yield a refined dataset of roughly 500 to 1,000 complete samples. The data will feature a mix of continuous numerical variables (book ratings, movie ratings, production budgets) and categorical variables (genres).

**Planned Analysis and Machine Learning Approach**

- **Data Analysis & Hypothesis Testing:** The initial analysis will compare the sample variance between book ratings and their corresponding movie adaptations. I will also run hypothesis tests to determine if the rating disparity during adaptation is statistically significant depending on the genre (e.g., determining if Sci-Fi adaptations fare better or worse than Romance adaptations).
- **Machine Learning:** For the predictive modeling phase, I will train a regression model to predict a movie's final rating based on a combination of its source material's rating, its production budget, and its genre classification.
