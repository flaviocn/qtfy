"""empty message

Revision ID: 6771ba784d3e
Revises: 0facfe743383
Create Date: 2017-12-18 21:28:12.969133

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6771ba784d3e'
down_revision = '0facfe743383'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('variety_comment',
    sa.Column('create_time', sa.DateTime(), nullable=True),
    sa.Column('update_time', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=32), nullable=False),
    sa.Column('comment', sa.String(length=128), nullable=False),
    sa.Column('variety_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['variety_id'], ['varietys.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('variety_comment')
    # ### end Alembic commands ###
