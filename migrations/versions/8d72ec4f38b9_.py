"""empty message

Revision ID: 8d72ec4f38b9
Revises: bdef11f54199
Create Date: 2017-12-11 14:41:18.646778

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '8d72ec4f38b9'
down_revision = 'bdef11f54199'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('username', sa.String(length=32), nullable=False))
    op.drop_index('name', table_name='users')
    op.create_unique_constraint(None, 'users', ['username'])
    op.drop_column('users', 'name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('name', mysql.VARCHAR(length=32), nullable=False))
    op.drop_constraint(None, 'users', type_='unique')
    op.create_index('name', 'users', ['name'], unique=True)
    op.drop_column('users', 'username')
    # ### end Alembic commands ###