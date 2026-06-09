import pandas as pd

def exports_leads(data, file_path):
    df=pd.DataFrame(data)
    df.to_csv(file_path,index=False)
    return file_path