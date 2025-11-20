import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.sql import func, text

from core.db import Base


class RecipeLog(Base):
	__tablename__ = "recipe_logs"

	id = sa.Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuid_generate_v4()"))
	user_input = sa.Column(sa.Text, nullable=False)
	type = sa.Column(sa.Text, nullable=False)
	recipe = sa.Column(JSONB, nullable=False)
	language = sa.Column(sa.Text, nullable=False)
	dietary_restrictions = sa.Column(ARRAY(sa.Text), nullable=False, server_default=text("ARRAY[]::TEXT[]"))
	additional_instructions = sa.Column(sa.Text)
	created_at = sa.Column(sa.DateTime(timezone=True), nullable=False, server_default=func.now())


class RecipeFeedback(Base):
	__tablename__ = "recipe_feedback"

	log_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey("recipe_logs.id", ondelete="CASCADE"), primary_key=True)
	good_count = sa.Column(sa.Integer, nullable=False, server_default=text("0"))
	bad_count = sa.Column(sa.Integer, nullable=False, server_default=text("0"))

