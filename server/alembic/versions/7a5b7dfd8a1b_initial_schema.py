"""Initial schema."""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "7a5b7dfd8a1b"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
	op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

	op.create_table(
		"recipe_logs",
		sa.Column(
			"id",
			postgresql.UUID(as_uuid=True),
			server_default=sa.text("uuid_generate_v4()"),
			nullable=False,
		),
		sa.Column("user_input", sa.Text(), nullable=False),
		sa.Column("type", sa.Text(), nullable=False),
		sa.Column("recipe", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
		sa.Column("language", sa.Text(), nullable=False),
		sa.Column(
			"dietary_restrictions",
			postgresql.ARRAY(sa.Text()),
			server_default=sa.text("ARRAY[]::TEXT[]"),
			nullable=False,
		),
		sa.Column("additional_instructions", sa.Text(), nullable=True),
		sa.Column(
			"created_at",
			sa.DateTime(timezone=True),
			server_default=sa.text("NOW()"),
			nullable=False,
		),
		sa.PrimaryKeyConstraint("id"),
	)

	op.create_table(
		"recipe_feedback",
		sa.Column(
			"log_id",
			postgresql.UUID(as_uuid=True),
			nullable=False,
		),
		sa.Column("good_count", sa.Integer(), server_default=sa.text("0"), nullable=False),
		sa.Column("bad_count", sa.Integer(), server_default=sa.text("0"), nullable=False),
		sa.ForeignKeyConstraint(["log_id"], ["recipe_logs.id"], ondelete="CASCADE"),
		sa.PrimaryKeyConstraint("log_id"),
	)


def downgrade() -> None:
	op.drop_table("recipe_feedback")
	op.drop_table("recipe_logs")
	op.execute('DROP EXTENSION IF EXISTS "uuid-ossp";')

