from sqlalchemy import Column, Integer, String, Float, Text
from app.db.base import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    wholesale_price = Column(Float)
    stock_level = Column(Integer)
    description = Column(Text)
    # tag_embeddings will be added later for AI
