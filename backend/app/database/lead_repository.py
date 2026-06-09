from app.database.mongodb import leads_collection
def save_lead(document):
    return lead_collection.insert_one(document)

def get_all_leads():
    return list(leads_collection.find({},{"_id":0}))