# %%
import numpy as np 
import pandas as pd 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from sklearn.utils import gen_batches

# Path: cleaning_data.ipynb
# Read in the data
df = pd.read_csv('../data/recipes_data.csv')
df.head()



# %%
df["NER"] = df["NER"].str.strip('[]')
df.head()

# %%
df = df.dropna(subset=["NER"])
df["NER"] = df["NER"].fillna("")  

df["NER"] = df["NER"].astype(str)
print(df["NER"].head())



# %%
tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 2), min_df=2, stop_words='english')
tfidf_matrix = tf.fit_transform(df["NER"][:1000])
tfidf_matrix.shape


# %%
def cos_compare(matrix):
   slices = gen_batches(matrix.shape[0], 1000)
   for i in slices:
       x = linear_kernel(matrix[i],matrix)
       yield x


# %%
try:
   for x in cos_compare(tfidf_matrix):
       print('Processed 1000 rows of {}:'.format(tfidf_matrix.shape[0]))
       pd.DataFrame(x).to_csv('cosine_sim.csv', header=False,index=False,mode='a')
finally:
   cosine_sim = pd.read_csv('cosine_sim.csv', header=None)


# %%
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# %%
df = df.reset_index()[:10000]
titles = df['title']
indices = pd.Series(df.index, index=df['title'])

# %%
def get_recommendations(title):
    try:
        idx = indices[title]
    except KeyError:
        print(f"Title '{title}' not found in indices.")
        return None  # or handle the error in an appropriate way

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:31]
    recipe_indices = [i[0] for i in sim_scores]
    return titles.iloc[recipe_indices]

get_recommendations('Bread')

