from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        "products.id")), nullable=False)
    user_id = db.Column(db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship("Product", back_populates="cart_item")
    user = db.relationship("User", back_populates="cart_items")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "user_id": self.user_id,
            "quantity": self.quantity
        }
