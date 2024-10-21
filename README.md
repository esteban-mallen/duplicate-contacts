# Duplicate contacts finder

Given the example CSV file sample.csv, when executed this script will scan each record and compare them giving them a score based on how likely it is they're duplicated contacts.

## Factors
1. Email: if email is the same, we're assuming both contacts are the same. If it's the same username (i.e. the part before the TLD) we give it a high probablity score.
2. Name: the code takes into account the possibility of both names to be the same but in different order and passing only initials
3. Zip code and address: same zip code and address gives a higher probability of duplicate

## Execution
1. `node index.js`
