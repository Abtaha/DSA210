import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

print("Loading dataset for Machine Learning...")
try:
    df = pd.read_csv("enriched_adaptations_dataset.csv")
except FileNotFoundError:
    print("Error: Could not find enriched_adaptations_dataset.csv")
    exit()

print("Preprocessing data...")
df = df.dropna(subset=["vote_average", "book_rating"])

df["normalized_book_rating"] = df["book_rating"] * 2

median_budget = df[df["budget"] > 0]["budget"].median()
df["budget"] = df["budget"].replace(0, median_budget).fillna(median_budget)

X = df[["normalized_book_rating", "budget", "primary_genre"]]
y = df["vote_average"]

numeric_features = ["normalized_book_rating", "budget"]
numeric_transformer = StandardScaler()

categorical_features = ["primary_genre"]
categorical_transformer = OneHotEncoder(handle_unknown="ignore")

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features),
    ]
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


def evaluate_model(model, name):
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, predictions)

    print(f"\n--- {name} Performance ---")
    print(f"RMSE (Root Mean Squared Error): {rmse:.4f}")
    print(f"R-squared (R2): {r2:.4f}")
    return model


lr_pipeline = Pipeline(
    steps=[("preprocessor", preprocessor), ("regressor", LinearRegression())]
)
evaluate_model(lr_pipeline, "Linear Regression")

rf_pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("regressor", RandomForestRegressor(n_estimators=100, random_state=42)),
    ]
)
trained_rf = evaluate_model(rf_pipeline, "Random Forest Regressor")

print("\nGenerating Feature Importance Chart...")
ohe = trained_rf.named_steps["preprocessor"].named_transformers_["cat"]
cat_feature_names = ohe.get_feature_names_out(categorical_features)
all_feature_names = numeric_features + list(cat_feature_names)

importances = trained_rf.named_steps["regressor"].feature_importances_

importance_df = pd.DataFrame({"Feature": all_feature_names, "Importance": importances})
importance_df = importance_df.sort_values(by="Importance", ascending=False).head(10)

plt.figure(figsize=(10, 6))
sns.barplot(x="Importance", y="Feature", data=importance_df, palette="viridis")
plt.title("Top 10 Feature Importances (Random Forest)")
plt.xlabel("Relative Importance")
plt.ylabel("Feature")
plt.tight_layout()
plt.savefig("feature_importance.png")
print("Saved feature importance chart to 'feature_importance.png'")
