from app.database.mongodb import leads_collection
def save_lead(document):
    result= leads_collection.insert_one(document)
    return str(result.inserted_id)

def get_all_leads():
    return list(leads_collection.find({},{"_id":0}))