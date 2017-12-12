"""empty message

Revision ID: 564a8d888e83
Revises: d3f01d454732
Create Date: 2017-12-12 19:29:21.627520

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '564a8d888e83'
down_revision = 'd3f01d454732'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('theatrical_films',
    sa.Column('create_time', sa.DateTime(), nullable=True),
    sa.Column('update_time', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=32), nullable=False),
    sa.Column('profile', sa.String(length=128), nullable=False),
    sa.Column('actor', sa.String(length=32), nullable=False),
    sa.Column('premiere', sa.Date(), nullable=False),
    sa.Column('country', sa.String(length=32), nullable=False),
    sa.Column('default_image', sa.String(length=128), nullable=False),
    sa.Column('score', sa.Float(), nullable=False),
    sa.Column('is_delete', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('teleplays')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('teleplays',
    sa.Column('create_time', mysql.DATETIME(), nullable=True),
    sa.Column('update_time', mysql.DATETIME(), nullable=True),
    sa.Column('id', mysql.INTEGER(display_width=11), nullable=False),
    sa.Column('name', mysql.VARCHAR(length=32), nullable=False),
    sa.Column('profile', mysql.VARCHAR(length=128), nullable=False),
    sa.Column('premiere', sa.DATE(), nullable=False),
    sa.Column('country', mysql.VARCHAR(length=32), nullable=False),
    sa.Column('default_image', mysql.VARCHAR(length=128), nullable=False),
    sa.Column('score', mysql.FLOAT(), nullable=False),
    sa.Column('is_delete', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_default_charset=u'utf8',
    mysql_engine=u'InnoDB'
    )
    op.drop_table('theatrical_films')
    # ### end Alembic commands ###