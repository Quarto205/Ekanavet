import logging
import json
import os
from sqlalchemy.orm import Session

from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session):
    # Create tables if they don't exist (redundant if main.py ran, but good for standalone)
    Base.metadata.create_all(bind=engine)

    from app.models.user import User, UserRole
    from app.core.security import get_password_hash

    # Seed Admin User if not present
    if not db.query(User).filter(User.email == "admin@ekanavet.com").first():
        admin_user = User(
            email="admin@ekanavet.com",
            full_name="System Admin",
            hashed_password=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            is_active=True,
        )
        db.add(admin_user)
        db.commit()
        logger.info("Admin user seeded.")

    # Check if products exist
    if db.query(Product).first():
        logger.info("Products already exist. Skipping seeding.")
        return

    # Load data
    file_path = os.path.join(os.path.dirname(__file__), "../data/products_initial.json")
    with open(file_path, "r") as f:
        products_data = json.load(f)

    for product in products_data:
        db_obj = Product(**product)
        db.add(db_obj)
    
    db.commit()
    logger.info("Seeding complete.")

def main():
    logger.info("Creating initial data")
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()
    logger.info("Initial data created")

if __name__ == "__main__":
    main()
