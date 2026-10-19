from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    category: str
    wholesale_price: float
    stock_level: int
    description: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
