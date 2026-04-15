import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

print("Loading dataset for analysis...")
try:
    df = pd.read_csv("enriched_adaptations_dataset.csv")
except FileNotFoundError:
    print("Error: Could not find enriched_adaptations_dataset.csv")
    exit()

# Goodreads is out of 5, TMDB is out of 10. Perform normalization
df["normalized_book_rating"] = df["book_rating"] * 2

# Calculate the disparity: Positive means movie is better, Negative means book is better
df["rating_disparity"] = df["vote_average"] - df["normalized_book_rating"]

print("\n--- Descriptive Statistics ---")
print(df[["vote_average", "normalized_book_rating", "rating_disparity"]].describe())


print("\nGenerating EDA visualizations...")
plt.figure(figsize=(14, 6))

plt.subplot(1, 2, 1)
sns.kdeplot(
    df["normalized_book_rating"], label="Book Rating (x2)", fill=True, color="blue"
)
sns.kdeplot(df["vote_average"], label="Movie Rating", fill=True, color="orange")
plt.title("Distribution of Book vs. Movie Ratings")
plt.xlabel("Rating (1-10 Scale)")
plt.legend()

plt.subplot(1, 2, 2)
top_genres = (
    df["primary_genre"].value_counts()[df["primary_genre"].value_counts() >= 5].index
)
filtered_df = df[df["primary_genre"].isin(top_genres)]

sns.boxplot(x="primary_genre", y="rating_disparity", data=filtered_df, palette="Set2")
plt.title("Rating Disparity by Genre (Movie Rating - Book Rating)")
plt.ylabel("Disparity Score")
plt.xticks(rotation=45)
plt.axhline(0, color="red", linestyle="--", alpha=0.5)

plt.tight_layout()
plt.savefig("eda_charts.png")
print("Saved charts to 'eda_charts.png'")


print("\n--- Hypothesis Testing ---")

# Hypothesis 1: Is the difference between book and movie ratings statistically significant?
# Paired T-Test
t_stat, p_val = stats.ttest_rel(df["normalized_book_rating"], df["vote_average"])
print("\nTest 1: Paired T-Test (Books vs. Movies)")
print(f"T-statistic: {t_stat:.4f}, P-value: {p_val:.4e}")
if p_val < 0.05:
    print(
        "Result: Significant difference! The source material rating and adaptation rating differ significantly."
    )
else:
    print("Result: No significant difference.")

# Hypothesis 2: Does the genre affect the rating disparity?
# ANOVA Test across the top genres we filtered earlier
genre_groups = [
    group["rating_disparity"].values
    for name, group in filtered_df.groupby("primary_genre")
]

if len(genre_groups) > 1:
    f_stat, p_val_anova = stats.f_oneway(*genre_groups)
    print("\nTest 2: One-Way ANOVA (Impact of Genre on Disparity)")
    print(f"F-statistic: {f_stat:.4f}, P-value: {p_val_anova:.4f}")
    if p_val_anova < 0.05:
        print(
            "Result: Significant! Genre plays a role in how well a book translates to a movie."
        )
    else:
        print(
            "Result: Not significant. Genre does not statistically impact the rating disparity."
        )
