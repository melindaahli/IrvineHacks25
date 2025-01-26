class Business:
    def __init__(self, name, owner_name, description, category, address, phone, 
                 website=None, social_media_links=None, opening_hours=None, latitude=None, longitude=None):
        self.name = name
        self.owner_name = owner_name
        self.description = description
        self.category = category
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
        self.rating = None
        self.review_count = 0
        self.phone = phone
        self.website = website
        self.social_media_links = social_media_links or []
        self.opening_hours = opening_hours
        self.images = []