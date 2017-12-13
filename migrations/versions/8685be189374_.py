"""empty message

Revision ID: 8685be189374
Revises: 3c9c7bc748f0
Create Date: 2017-12-13 22:00:09.445199

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '8685be189374'
down_revision = '3c9c7bc748f0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tv_shows_detail', sa.Column('num', sa.SmallInteger(), nullable=False))
    op.drop_column('tv_shows_detail', 'type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tv_shows_detail', sa.Column('type', mysql.SMALLINT(display_width=6), autoincrement=False, nullable=False))
    op.drop_column('tv_shows_detail', 'num')
    # ### end Alembic commands ###
