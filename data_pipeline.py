import pandas as pd
import glob
import os

print("Starting data collection pipeline...")

try:
    tmdb_df = pd.read_csv(os.path.join("tmdb-movie-metadata", "tmdb_5000_movies.csv"))

    # Create a standardized title column for matching (lowercase, no extra spaces)
    tmdb_df["clean_title"] = tmdb_df["title"].str.lower().str.strip()

    def is_adaptation(keyword_string):
        if pd.isna(keyword_string):
            return False
        keywords = str(keyword_string).lower()
        return "based on novel" in keywords or "based on book" in keywords

    tmdb_df["is_adaptation"] = tmdb_df["keywords"].apply(is_adaptation)
    adaptations_df = tmdb_df[tmdb_df["is_adaptation"]].copy()
    print(f"Found {len(adaptations_df)} movie adaptations in TMDB.")

except FileNotFoundError:
    print("Error: tmdb_5000_movies.csv not found.")
    adaptations_df = pd.DataFrame()


path = "goodreads-book-datasets-10m"
all_files = glob.glob(os.path.join(path, "book*.csv"))

df_list = []
print(f"Found {len(all_files)} Goodreads CSV files. Loading data...")

for file in all_files:
    try:
        df = pd.read_csv(file, usecols=["Name", "Rating", "Authors"])
        df_list.append(df)
    except Exception as e:
        print(f"Could not read {file}: {e}")

if df_list:
    goodreads_df = pd.concat(df_list, ignore_index=True)

    goodreads_df["clean_title"] = (
        goodreads_df["Name"].astype(str).str.lower().str.strip()
    )

    goodreads_df = goodreads_df.drop_duplicates(subset=["clean_title"])
    print("Goodreads data loaded and cleaned.")
else:
    print("Error: No Goodreads CSV files found.")
    goodreads_df = pd.DataFrame()


if not adaptations_df.empty and not goodreads_df.empty:
    import json

    def extract_primary_genre(genre_string):
        try:
            genres_list = json.loads(genre_string)
            if genres_list:
                return genres_list[0]["name"]
        except (json.JSONDecodeError, TypeError):
            pass
        return "Unknown"

    final_df = pd.merge(adaptations_df, goodreads_df, on="clean_title", how="inner")
    final_df = final_df.rename(columns={"Rating": "book_rating"})

    final_df["primary_genre"] = final_df["genres"].apply(extract_primary_genre)
    final_df = final_df.drop(columns=["genres"])

    print(f"\nSUCCESS: Matched {len(final_df)} book-movie pairs!")

    final_df.to_csv("enriched_adaptations_dataset.csv", index=False)
    print("Saved final dataset to 'enriched_adaptations_dataset.csv'.")

    print("\nData Preview:")
    print(
        final_df[
            ["title", "vote_average", "book_rating", "budget", "primary_genre"]
        ].head()
    )
