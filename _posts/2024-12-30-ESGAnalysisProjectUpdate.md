---
layout: post                          # (require) default post layout
title: "Introduction ESG analysis"
date: 2024-12-30  16:21:02 -0230       # (require) a post date
categories: [ai, python, linux, other]
---
# Project Overview

This project aims to find text with the type as a paragraph that has the following two topics:

- Diversity (diversity, workforce, workplace, employees, inclusion, inclusive, equity, diverse, human, equality, cultural, people, blacks, gender)
- Data Security (privacy, data breaches, cybersecurity, compliance, privacy act)

## What is ESG?

ESG stands for Environmental, Social, and Governance. It refers to the three central factors in measuring the sustainability and societal impact of an investment in a company or business. These criteria help to better determine the future financial performance of companies (return and risk).

- **Environmental**: This criterion examines how a company performs as a steward of nature. It includes a company’s energy use, waste, pollution, natural resource conservation, and treatment of animals.
- **Social**: This criterion looks at how the company manages relationships with employees, suppliers, customers, and the communities where it operates. It includes issues like working conditions, health and safety, employee relations, and diversity.
- **Governance**: This criterion deals with a company’s leadership, executive pay, audits, internal controls, and shareholder rights. It includes issues like board diversity, executive compensation, and transparency.

Incorporating ESG factors into investment analysis can **help investors avoid companies that might pose a greater financial risk due to their environmental or other practices.**

The goal is to use keywords for each topic to assign and find the relevant topics. The retrieval is not based on the existence of keywords but on the context.

## Files

### `esg.ipynb`
For more information, refer to the [ESG Documentation](https://github.com/AminTaheri23/ESG-Analysis/blob/main/esg.ipynb).

This Jupyter Notebook contains the following sections:

1. **Library Installation**: Installs necessary libraries such as `transformers`, `torch`, and `sentence-transformers`.
2. **Imports**: Imports required libraries including `SentenceTransformer`, `torch`, and `pandas`.
3. **Data Reading and Manipulation**: Reads the CSV file `Chegg-ESG-Report-2021.csv` and defines the corpus and topics.
4. **Model Selection**: Uses the `msmarco-distilbert-base-v4` model for encoding the corpus and topics.
5. **Encoding and Similarity Calculation**: Encodes the corpus and topics using the model and calculates similarity scores for Diversity and Data Security.
6. **Dataframe Creation**: Creates dataframes `df_diversity` and `df_data_sec` to store text and their respective scores.
7. **Visualization**: Contains code for visualizing the results, including bar plots and word frequency counts.

### `Methods of retrieving context from keywords.pdf`

For more detailed information, refer to the [Methods of retrieving context from keywords](https://github.com/AminTaheri23/ESG-Analysis/blob/main/Methods%20of%20retrieving%20context%20from%20keywords.pdf) document.

This PDF document explains the possible solutions for retrieving context from keywords. It emphasizes accuracy over time and proposes the most accurate solution to find the context from keywords and the relevant text with each topic.

## How to Use

1. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Run the Jupyter Notebook**:
    ```sh
    jupyter notebook esg.ipynb
    ```

3. **Follow the Steps in the Notebook**:
    - Install necessary libraries.
    - Read and manipulate the data.
    - Encode the corpus and topics.
    - Calculate similarity scores.
    - Visualize the results.

## Results

The results include dataframes `df_diversity` and `df_data_sec` with text and their respective scores for Diversity and Data Security. The notebook also provides visualizations to help understand the distribution and frequency of words related to the topics.

## Conclusion

This project provides a comprehensive approach to retrieving context from keywords using advanced NLP models. The combination of Jupyter Notebook and detailed explanations in the PDF document ensures a clear understanding of the methodology and results.